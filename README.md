# 🤖 RAG Graph-Based NLP Assistant

**Proyek Akhir Semester - Mata Kuliah Pemrosesan Bahasa Alami**

[cite_start]Aplikasi Chatbot berbasis **Retrieval-Augmented Generation (RAG)** yang dirancang untuk memenuhi syarat Proyek Akhir Semester mata kuliah NLP[cite: 1, 2]. [cite_start]Aplikasi ini memungkinkan pengguna mengunggah dokumen PDF dan melakukan tanya-jawab cerdas berdasarkan konteks dokumen tersebut[cite: 27].

---

## 🚀 Fitur Utama

- **Document Ingestion**: Ekstraksi teks dari PDF menggunakan `PyPDFLoader`.
- **Semantic Search**: Pencarian informasi relevan menggunakan FAISS Vector DB dan HuggingFace Embeddings[cite: 34, 37].
- **Streaming Response**: Output jawaban AI secara real-time untuk pengalaman pengguna yang lebih baik[cite: 21].
- **Markdown Support**: Jawaban diformat dengan header, tabel, dan penekanan istilah teknis agar mudah dibaca.
- **Modern UI**: Antarmuka responsif menggunakan Next.js, Tailwind CSS, dan sistem komponen `@/ui` yang modular[cite: 58].

---

## 🛠️ Arsitektur Sistem

Sesuai dengan instruksi pengerjaan[cite: 38], sistem ini terdiri dari:

1.  **Input**: Pengguna memberikan input teks dan dokumen PDF[cite: 19].
2.  **Pemrosesan NLP**:
    - Mengintegrasikan model _pretrained_ Llama 3 melalui API Groq[cite: 32, 35].
    - Melakukan preprocessing teks (chunking) dan embedding[cite: 55].
3.  **Output**: Menghasilkan jawaban yang bermakna, akurat, dan dapat dijelaskan berdasarkan konteks[cite: 21].

---

## 📦 Teknologi yang Digunakan

- **Bahasa Pemrograman**: Python (Backend) [cite: 31] & TypeScript (Frontend).
- **AI Framework**: LangChain[cite: 34].
- **Model Pretrained**: Llama 3 (via Groq) & HuggingFace (Embeddings)[cite: 37].
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

[cite_start]Sesuai dengan kriteria evaluasi proyek[cite: 59, 64]:

- [cite_start]**Kelebihan**: Menggunakan arsitektur RAG untuk meminimalkan halusinasi model AI dan memberikan jawaban berbasis data nyata[cite: 27].
- [cite_start]**Keterbatasan**: Akurasi jawaban sangat bergantung pada kualitas ekstraksi teks dari PDF[cite: 63].
- [cite_start]**Etika**: Penggunaan AI dalam proyek ini dilakukan secara bertanggung jawab dengan pemahaman penuh terhadap setiap bagian kode[cite: 85, 90].

---

**Disusun oleh:** Peter  
[cite_start]**Mata Kuliah:** Pemrosesan Bahasa Alami (NLP) [cite: 2]  
[cite_start]**Pendekatan:** Outcome-Based Education (OBE) [cite: 10]
