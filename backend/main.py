import os
from fastapi import FastAPI, UploadFile, File, Query, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS agar @/ui (Next.js) bisa akses
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_db = None

llm = ChatGroq(
    temperature=0.2,
    model_name="llama-3.3-70b-versatile",
    groq_api_key=GROQ_API_KEY
)

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global vector_db
    file_path = f"temp_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    try:
        # 1. Load PDF
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        
        # 2. Chunking
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(pages)
        
        # 3. Save to Vector Store (FAISS)
        vector_db = FAISS.from_documents(chunks, embeddings)
        
        return {"status": "success", "message": f"{file.filename} berhasil di-index!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

async def generate_rag_stream(query: str):
    if vector_db is None:
        yield "data: [INFO] Silahkan upload PDF terlebih dahulu.\n\n"
        return

    docs = vector_db.similarity_search(query, k=4)
    context = "\n---\n".join([doc.page_content for doc in docs])
    
    prompt = (
        "Anda adalah pakar Analisis Jejaring dan NLP. Jawablah berdasarkan konteks.\n"
        "PENTING: Gunakan dua baris baru (\\n\\n) antar paragraf dan sebelum judul.\n"
        "Gunakan format:\n"
        "- ## Heading untuk poin utama\n"
        "- **Simpul** untuk identitas (N1, N2)\n"
        "- Tabel untuk bobot jika relevan\n\n"
        f"Konteks: {context}\n\n"
        f"Pertanyaan: {query}"
    )

    try:
        async for chunk in llm.astream(prompt):
            if chunk.content:
                content = chunk.content
                
                if "##" in content or "1." in content:
                    content = f"\n\n{content}"
                
                yield f"data: {content}\n\n"
    except Exception as e:
        yield f"data: Error: {str(e)}\n\n"

@app.get("/chat-stream")
async def chat_stream(message: str = Query(...)):
    return StreamingResponse(generate_rag_stream(message), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
