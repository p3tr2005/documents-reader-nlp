# 🤖 RAG Graph-Based NLP Assistant

**Proyek Akhir Semester - Mata Kuliah Pemrosesan Bahasa Alami**

Aplikasi Chatbot berbasis **Retrieval-Augmented Generation (RAG)** yang dirancang untuk memenuhi syarat Proyek Akhir Semester mata kuliah NLP. Aplikasi ini memungkinkan pengguna mengunggah dokumen PDF dan melakukan tanya-jawab cerdas berdasarkan konteks dokumen tersebut.

<img width="1587" height="938" alt="20260203_23h03m37s_grim" src="https://github.com/user-attachments/assets/5197ea02-68cc-4cdb-a0af-3a7ac1d61751" />
<img width="1587" height="943" alt="20260203_23h04m19s_grim" src="https://github.com/user-attachments/assets/3e6c70b0-5e57-426c-895a-75c7ee8fdb41" />
---

## 🚀 Fitur Utama

- **Document Ingestion**: Ekstraksi teks dari PDF menggunakan `PyPDFLoader`.
- **Semantic Search**: Pencarian informasi relevan menggunakan FAISS Vector DB dan HuggingFace Embeddings.
- **Streaming Response**: Output jawaban AI secara real-time untuk pengalaman pengguna yang lebih baik.
- **Markdown Support**: Jawaban diformat dengan header, tabel, dan penekanan istilah teknis agar mudah dibaca.
- **Modern UI**: Antarmuka responsif menggunakan Next.js, Tailwind CSS, dan sistem komponen `@/ui` yang modular.

---

## 🛠️ Arsitektur Sistem

Sesuai dengan instruksi pengerjaan, sistem ini terdiri dari:

1.  **Input**: Pengguna memberikan input teks dan dokumen PDF.
2.  **Pemrosesan NLP**:
    - Mengintegrasikan model _pretrained_ Llama 3 melalui API Groq.
    - Melakukan preprocessing teks (chunking) dan embedding.
3.  **Output**: Menghasilkan jawaban yang bermakna, akurat, dan dapat dijelaskan berdasarkan konteks.

---

## 📦 Teknologi yang Digunakan

- **Bahasa Pemrograman**: Python (Backend) & TypeScript (Frontend).
- **AI Framework**: LangChain.
- **Model Pretrained**: Llama 3 (via Groq) & HuggingFace (Embeddings).
- **Database**: FAISS (Vector Store).
- **Web Framework**: FastAPI (Python) & Next.js (React).

---

## 🔧 Cara Menjalankan

### 1. Backend (Python)

1. Masuk ke direktori backend: `cd backend`.
2. Buat virtual environment: `python -m venv venv`.
3. Instal dependensi: `pip install -r requirements.txt`.
4. Set API Key: `export GROQ_API_KEY=your_api_key_here`.
5. Jalankan server: `python main.py`.

### 2. Frontend (Next.js)

1. Masuk ke direktori frontend: `cd frontend`.
2. Instal dependensi: `npm install`.
3. Jalankan aplikasi: `npm run dev`.
4. Akses di: `http://localhost:3000`.

---

## 📝 Analisis & Evaluasi

Sesuai dengan kriteria evaluasi proyek:

- **Kelebihan**: Menggunakan arsitektur RAG untuk meminimalkan halusinasi model AI dan memberikan jawaban berbasis data nyata.
- **Keterbatasan**: Akurasi jawaban sangat bergantung pada kualitas ekstraksi teks dari PDF.
- **Etika**: Penggunaan AI dalam proyek ini dilakukan secara bertanggung jawab dengan pemahaman penuh terhadap setiap bagian kode.

---

**Disusun oleh:** Peter  
**Mata Kuliah:** Pemrosesan Bahasa Alami (NLP)
**Pendekatan:** Outcome-Based Education (OBE)
