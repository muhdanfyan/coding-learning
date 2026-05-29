# CODING LEARNING — SMART Board Teaching Dashboard

## 📋 Deskripsi Proyek
Aplikasi web interaktif untuk **Guru** yang mengajar coding di **SMART Board / Interactive Whiteboard** di sekolah.
Bukan aplikasi untuk murid, melainkan **Teacher Dashboard** yang tampil di layar besar kelas.

## 🎯 Tujuan
Memanfaatkan SMART Board di sekolah untuk pembelajaran coding dengan panduan terstruktur,
rekomendasi platform sesuai usia, dan lesson plan siap-pakai.

## 👤 Profil Pengguna
- **Guru SD/SMP/SMA** — login via Google OAuth
- **Anak-anak** — melihat materi dari SMART Board (tidak perlu login)

## 🗺️ Roadmap Pengembangan

### FASE 0: Setup ✅
- [x] Clone repo konten kurikulumkoding-anaksekolah
- [x] Setup Next.js 14 + TypeScript + Tailwind
- [x] Install dependencies (shadcn/ui, next-auth, framer-motion)

### FASE 1: Dashboard Guru
- [ ] Halaman login Google OAuth
- [ ] Dashboard utama: pilih kelas (SD/SMP/SMA)
- [ ] Tampilkan rekomendasi materi sesuai usia
- [ ] Tombol "Mulai Mengajar" → masuk ke Mode Kelas

### FASE 2: Mode Kelas (Tampilan SMART Board)
- [ ] Tampilan fullscreen-friendly
- [ ] Lesson Plan detail per pertemuan (tujuan, durasi, langkah)
- [ ] Tombol link langsung ke platform (Scratch, CodeCombat, dll)
- [ ] Skrip ngomong untuk guru ("Kata Guru:")

### FASE 3: Pemilih Usia & Rekomendasi
- [ ] Pilih rentang usia (SD 6-12, SMP 12-15, SMA 15-18)
- [ ] Rekomendasi otomatis platform & materi
- [ ] Filter berdasarkan tingkat kesulitan

### FASE 4: 12 Platform Coding
Halaman detail tiap platform dengan:
- [ ] Hero + logo + deskripsi
- [ ] Target usia + level kesulitan (🟢🟡🔴)
- [ ] Link langsung buka platform (tombol besar SMART Board)
- [ ] Tips pengajar
- [ ] Contoh proyek

Daftar platform:
1. ScratchJr (5-7 thn) 🟢
2. Kodable (5-10 thn) 🟢
3. Scratch (8-16 thn) 🟢
4. Tynker (5-14 thn) 🟡
5. CodeMonkey (8-14 thn) 🟡
6. Blockly Games (8-14 thn) 🟢
7. Khan Academy (12+ thn) 🟡
8. CodeCombat (10+ thn) 🟡
9. App Inventor (12+ thn) 🔴
10. Lightbot (6+ thn) 🟢
11. Code for Life (8-14 thn) 🟡
12. mBlock (8-18+ thn) 🔴

### FASE 5: 6 Metodologi Pembelajaran
Halaman aksi untuk guru:
1. Game-Based Learning 🎮
2. Project-Based Learning 🏗️
3. Problem-Based Learning 🔎
4. Collaborative Learning 🤝
5. Inquiry-Based Learning 🤔
6. Mastery-Based Learning 🏆

### FASE 6: Roadmap Code.org
Tampilan interaktif per jenjang:
- Hour of Code 🚀
- CS Fundamentals (SD)
- CS Discoveries (SMP)
- CS Principles (SMA)

### FASE 7: Tools Guru
- [ ] QR Code per sesi (siswa scan dapet link)
- [ ] Timer built-in
- [ ] Random Name Picker
- [ ] Mode Malam

### FASE 8: Desain SMART Board
- [ ] Font minimal 28px
- [ ] Tombol minimal 80x80px
- [ ] Kontras tinggi (#000/#fff)
- [ ] Fullscreen mode
- [ ] Dark/Light mode

### FASE 9: Deploy
- [ ] Push ke GitHub
- [ ] Deploy ke Vercel
- [ ] Domain: codlearn.sarjanakomputer.id

## 🏗️ Struktur Folder

```
coding-learning/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            ← Landing Page
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── api/auth/[...nextauth]/route.ts
│   │   ├── (dashboard)/
│   │   │   └── dashboard/page.tsx  ← Dashboard Guru
│   │   ├── (teach)/
│   │   │   └── teach/[usia]/[materi]/page.tsx  ← Mode Kelas
│   │   ├── platform/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── metodologi/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── kurikulum/
│   │   │   └── page.tsx
│   │   └── referensi/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/          ← shadcn/ui components
│   │   └── custom/      ← komponen kustom kita
│   ├── lib/
│   │   ├── utils.ts
│   │   └── auth.ts
│   └── data/            ← konten dari repo lama
│       ├── platform/
│       ├── metodologi/
│       └── referensi/
├── public/
├── REPO_PLAN.md
└── package.json
```

## 🔧 Teknologi
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- NextAuth.js (Google OAuth)
- Framer Motion
- Lucide React (icons)

## 📦 Konten
Semua konten diadaptasi dari: https://github.com/muhdanfyan/kurikulumkoding-anaksekolah

## 🚀 Deploy
- Platform: Vercel
- Domain: codlearn.sarjanakomputer.id

## 👨‍💻 Developer
Dikembangkan oleh santri Pondok Informatika
Kurikulum oleh: Muhdan Fyan Syah Sofian, S.Kom
