'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, BookOpen, Lightbulb, Target,
  Quote, GraduationCap, ListChecks,
} from 'lucide-react';

const metodologiData: Record<string, {
  title: string;
  icon: string;
  subtitle: string;
  filosofi: string[];
  kutipan: { teks: string; tokoh: string };
  pendekatan: { langkah: string; detail: string }[];
  cocok: string;
  platform: string;
  color: string;
}> = {
  'game-based-learning': {
    title: 'Game-Based Learning',
    icon: '🎮',
    subtitle: 'Pembelajaran Berbasis Game',
    color: 'from-green-50 to-emerald-100',
    filosofi: [
      'Game-Based Learning (GBL) menggunakan elemen dan prinsip game untuk mencapai tujuan belajar spesifik.',
      'Dalam konteks coding, ini berarti mengubah proses belajar pemrograman menjadi sebuah permainan yang menarik dengan aturan, tujuan, dan tantangan yang jelas.',
      'Belajar coding bisa terasa abstrak — GBL menyediakan konteks yang jelas, umpan balik instan, dan motivasi intrinsik.',
    ],
    kutipan: {
      teks: 'Game yang baik adalah sistem belajar yang kompleks. Mereka mendorong pemain untuk berpikir kritis dan memecahkan masalah yang rumit — keterampilan yang sama persis dengan yang dibutuhkan dalam pemrograman.',
      tokoh: '— James Paul Gee, Peneliti Game-Based Learning',
    },
    pendekatan: [
      {
        langkah: 'Mulai dengan Game Murni',
        detail: 'Gunakan platform yang sepenuhnya berbasis game. Contoh: Lightbot dan Kodable. Siswa belajar sekuens, prosedur, dan loop dengan memecahkan puzzle visual dalam sebuah game tanpa beban sintaks.',
      },
      {
        langkah: 'Transisi ke Kode dengan Game',
        detail: 'Setelah logika dasar terbentuk, gunakan platform yang meminta siswa menulis kode nyata untuk mengontrol game. CodeCombat dan CodeMonkey sangat cocok — siswa mengetik Python/JavaScript untuk memenangkan level.',
      },
      {
        langkah: 'Tantang Siswa Membuat Game',
        detail: 'Ini level tertinggi GBL. Gunakan Scratch, Tynker, atau App Inventor. Beri tantangan: "Buat game platformer dengan 3 level" atau "Rancang game edukasi tentang pahlawan nasional."',
      },
      {
        langkah: 'Adakan Kompetisi Kelas',
        detail: 'Buat leaderboard siapa yang menyelesaikan level paling cepat atau dengan kode paling efisien. Ini memanfaatkan elemen kompetisi sehat dalam game.',
      },
    ],
    cocok: 'Semua usia — terutama SD & SMP',
    platform: 'Lightbot, Kodable, CodeCombat, CodeMonkey, Scratch, Tynker',
  },
  'project-based-learning': {
    title: 'Project-Based Learning',
    icon: '🏗️',
    subtitle: 'Pembelajaran Berbasis Proyek (PjBL)',
    color: 'from-blue-50 to-indigo-100',
    filosofi: [
      'Dalam Project-Based Learning, proyek bukanlah puncak dari pembelajaran — melainkan kendaraan utama untuk belajar itu sendiri.',
      'Siswa belajar coding karena mereka membutuhkannya untuk membuat aplikasi atau game mereka berfungsi. Ini mendorong pembelajaran kontekstual dan kepemilikan siswa.',
      'PjBL secara alami membangun keterampilan abad 21: kolaborasi, komunikasi, dan pemecahan masalah kompleks.',
    ],
    kutipan: {
      teks: 'Belajar melalui perbuatan (Learning by doing). Pengetahuan dibangun melalui pengalaman aktif dalam menciptakan sesuatu.',
      tokoh: '— John Dewey, Filsuf Pendidikan',
    },
    pendekatan: [
      {
        langkah: 'Mulai dengan Pertanyaan Pemicu',
        detail: 'Jangan mulai dengan "Hari ini kita belajar variabel." Mulailah dengan "Bagaimana kita bisa membuat aplikasi untuk membantu siswa baru di sekolah?" atau "Bisakah kita membuat game dari cerita rakyat lokal?"',
      },
      {
        langkah: 'Gunakan Platform Kreatif sebagai Kanvas',
        detail: 'Scratch adalah "raja" PjBL untuk SD/SMP. App Inventor untuk aplikasi mobile di SMP/SMA. Tynker dan mBlock dengan robotika juga menyediakan kanvas luar biasa.',
      },
      {
        langkah: 'Fasilitasi, Jangan Menggurui',
        detail: 'Peran guru adalah fasilitator: menyediakan sumber daya, mengajukan pertanyaan, membantu saat buntu — tetapi tidak memberikan semua jawaban.',
      },
      {
        langkah: 'Adakan Pameran Proyek',
        detail: 'Di akhir proyek, adakan sesi showcase. Siswa mempresentasikan aplikasi/game mereka, menjelaskan cara kerja, dan tantangan yang dihadapi. Ajak audiens (kelas lain, guru, orang tua) memberi umpan balik.',
      },
    ],
    cocok: 'SMP & SMA',
    platform: 'Scratch, App Inventor, mBlock, Khan Academy, Tynker',
  },
  'problem-based-learning': {
    title: 'Problem-Based Learning',
    icon: '🔎',
    subtitle: 'Pembelajaran Berbasis Masalah (PBL)',
    color: 'from-yellow-50 to-amber-100',
    filosofi: [
      'Problem-Based Learning berorientasi pada proses pemecahan masalah. Hasil akhirnya bisa berupa solusi, rekomendasi, atau analisis — bukan selalu artefak.',
      'PBL mengembangkan berpikir kritis, pembelajaran mandiri, dan ketekunan menghadapi masalah yang tidak terstruktur — sama seperti di dunia nyata.',
      'PBL sejalan dengan konstruktivisme: pembelajar membangun pengetahuannya sendiri dengan bergulat (berproses) pada sebuah masalah.',
    ],
    kutipan: {
      teks: 'PBL adalah metode yang dihasilkan dari proses bekerja menuju pemahaman atau penyelesaian suatu masalah. Masalah yang otentik adalah kunci motivasi siswa.',
      tokoh: '— Howard Barrows, Pionir PBL',
    },
    pendekatan: [
      {
        langkah: 'Sajikan Skenario Masalah',
        detail: 'Contoh: "Kantin sekolah ramai saat jam istirahat dan antriannya panjang. Bagaimana kita bisa merancang sistem antrian lebih efisien?" Siswa membuat simulasi di Scratch atau Python.',
      },
      {
        langkah: 'Gunakan Tantangan Debugging',
        detail: 'Berikan program yang sengaja dibuat salah. "Identifikasi, dokumentasikan, dan perbaiki semua bug." Ini meniru pekerjaan Quality Assurance engineer.',
      },
      {
        langkah: 'Studi Kasus Dunia Nyata',
        detail: '"Layanan streaming ingin membuat sistem rekomendasi. Algoritma apa yang bisa digunakan?" Fokus pada analisis dan desain algoritma, bukan produk sempurna.',
      },
      {
        langkah: 'Puzzle Logika sebagai PBL Mikro',
        detail: 'Setiap level di Blockly Games dan Lightbot adalah PBL skala mikro: masalah jelas, siswa cari solusi lewat trial and error.',
      },
    ],
    cocok: 'SMP & SMA',
    platform: 'Scratch, Tynker, Blockly Games, CodeCombat, Lightbot',
  },
  'collaborative-learning': {
    title: 'Collaborative Learning',
    icon: '🤝',
    subtitle: 'Pembelajaran Kolaboratif',
    color: 'from-purple-50 to-violet-100',
    filosofi: [
      'Belajar coding sering dianggap soliter, namun aplikasi terbaik dibangun oleh tim. Kolaborasi bukan pilihan — ini keharusan.',
      'Dua kepala lebih baik dari satu. Siswa belajar mendengarkan ide orang lain, menggabungkan pendekatan, dan berkomunikasi secara teknis.',
      'Konsep "Zone of Proximal Development" (Vygotsky): siswa belajar paling baik saat mengerjakan tugas sedikit di atas kemampuan mereka dengan bantuan teman sebaya.',
    ],
    kutipan: {
      teks: 'Dua programmer yang bekerja di satu komputer akan menghasilkan kode dengan kualitas lebih tinggi dan bug yang lebih sedikit.',
      tokoh: '— Konsep Pair Programming, Extreme Programming',
    },
    pendekatan: [
      {
        langkah: 'Terapkan Pair Programming',
        detail: 'Satu siswa adalah Driver (mengetik/menyeret blok), satu Navigator (mengamati, mengarahkan, menangkap kesalahan). Rotasi peran setiap 10-15 menit.',
      },
      {
        langkah: 'Proyek Kelompok',
        detail: 'Bagi siswa ke kelompok 3-4 orang. Bantu mereka membagi tugas: desain karakter, coding gerakan, desain level. Gunakan Scratch atau Tynker.',
      },
      {
        langkah: 'Peer Code Review',
        detail: 'Minta siswa bertukar program dengan teman. Tugas mereka: baca kode, jalankan, dan beri umpan balik membangun. Melatih membaca dan memahami kode orang lain.',
      },
      {
        langkah: 'Aktifkan Diskusi Kelas',
        detail: 'Tanyakan ke seluruh kelas: "Ada yang punya solusi berbeda untuk level ini?" Ajak siswa membandingkan pendekatan coding mereka di SMART Board.',
      },
    ],
    cocok: 'Semua usia',
    platform: 'Scratch, Tynker, App Inventor, CodeCombat, mBlock',
  },
  'inquiry-based-learning': {
    title: 'Inquiry-Based Learning',
    icon: '🤔',
    subtitle: 'Pembelajaran Berbasis Inkuiri',
    color: 'from-cyan-50 to-sky-100',
    filosofi: [
      'Inti pemrograman adalah pemecahan masalah. Programmer hebat tidak hanya tahu sintaks — mereka tahu cara menemukan jawaban saat tidak tahu.',
      'Inkuiri menekankan proses penemuan, bukan transfer informasi. Guru sebagai fasilitator yang mengajukan pertanyaan lanjutan.',
      'Konstruksionisme (Seymour Papert): pembelajaran terjadi paling efektif saat siswa secara aktif membangun sesuatu yang dapat dibagikan.',
    ],
    kutipan: {
      teks: 'Kita tidak belajar dari pengalaman... kita belajar dari merefleksikan pengalaman itu.',
      tokoh: '— John Dewey',
    },
    pendekatan: [
      {
        langkah: 'Mulai dengan "Bagaimana Jika..."',
        detail: 'Berikan program jadi di Scratch. Tanya: "Apa yang terjadi jika kita ubah move 10 steps jadi -10? Jika ganti if dengan if/else?" Biarkan siswa bereksperimen.',
      },
      {
        langkah: 'Tantangan Terbuka',
        detail: 'Daripada "Buat karakter melompat 10 kali", katakan "Buatlah karakter melakukan tarian perayaan." Beri kebebasan mendefinisikan "tarian" sendiri.',
      },
      {
        langkah: 'Model Tinkering (Utak-atik)',
        detail: 'Dorong siswa "mengutak-atik" kode. Ambil proyek orang lain dari galeri Scratch dan modifikasi. Proses remixing adalah bentuk inkuiri paling kuat.',
      },
      {
        langkah: 'Ajarkan Keterampilan Riset',
        detail: 'Saat siswa tanya "Bagaimana cara membuat skor?", balas dengan: "Menurutmu, di kategori blok mana kita bisa menemukan sesuatu tentang data atau angka?"',
      },
    ],
    cocok: 'SMP & SMA',
    platform: 'Scratch, Tynker, Blockly, Khan Academy, App Inventor',
  },
  'mastery-based-learning': {
    title: 'Mastery-Based Learning',
    icon: '🏆',
    subtitle: 'Pembelajaran Berbasis Penguasaan',
    color: 'from-orange-50 to-red-100',
    filosofi: [
      'Siswa harus menunjukkan penguasaan tinggi pada suatu topik sebelum melanjutkan ke topik berikutnya. Kemajuan berdasarkan bukti pemahaman, bukan waktu.',
      'Mastery Learning memastikan fondasi yang kokoh sebelum naik ke level berikutnya — seperti tidak membangun rumah di atas fondasi yang baru 70% selesai.',
      'Waktu sebagai variabel: siswa yang butuh waktu lebih bisa mengambilnya, yang lebih cepat bisa melaju atau mendalami topik lebih jauh.',
    ],
    kutipan: {
      teks: 'Apakah Anda akan membangun sebuah rumah di atas fondasi yang baru 70% selesai? Tentu tidak. Mengapa kita melakukan itu dengan pendidikan anak-anak kita?',
      tokoh: '— Sal Khan, Pendiri Khan Academy',
    },
    pendekatan: [
      {
        langkah: 'Gunakan Platform Berbasis Level',
        detail: 'Kodable, Lightbot, CodeMonkey, dan CodeCombat menggunakan model mastery — siswa tidak bisa maju ke tantangan loop jika belum menunjukkan penguasaan sekuens.',
      },
      {
        langkah: 'Terapkan Tantangan Penguasaan',
        detail: 'Setelah ajarkan sebuah konsep, beri tantangan spesifik yang harus diselesaikan tanpa bantuan sebelum lanjut ke proyek kelompok.',
      },
      {
        langkah: 'Izinkan Penilaian Ulang',
        detail: 'Siswa boleh mencoba lagi tantangan setelah belajar dari kesalahan. Tujuannya belajar, bukan nilai pada percobaan pertama.',
      },
      {
        langkah: 'Diferensiasi Kecepatan',
        detail: 'Biarkan siswa maju dengan kecepatan sendiri. Untuk yang cepat: siapkan proyek pengayaan. Untuk yang lambat: beri perhatian ekstra pada konsep sulit.',
      },
    ],
    cocok: 'Semua usia',
    platform: 'Kodable, Lightbot, CodeMonkey, Khan Academy, CodeCombat',
  },
};

export default function MetodologiDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const m = metodologiData[slug];

  if (!m) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Metodologi Tidak Ditemukan</h1>
          <Button size="lg" onClick={() => router.push('/metodologi')}><ArrowLeft className="mr-2 h-5 w-5" /> Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="outline" size="lg" className="mb-6 h-14 text-lg" onClick={() => router.push('/metodologi')}>
            <ArrowLeft className="mr-2 h-5 w-5" /> Semua Metodologi
          </Button>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl bg-gradient-to-br ${m.color} border-2 p-8 mb-8 shadow-lg`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-7xl md:text-8xl">{m.icon}</div>
            <div>
              <Badge variant="outline" className="text-lg px-4 py-2 mb-3">{m.cocok}</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{m.title}</h1>
              <p className="text-xl text-gray-600">{m.subtitle}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filosofi */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-2 border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Lightbulb className="h-7 w-7 text-yellow-500" />
                    Latar Belakang & Filosofi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {m.filosofi.map((f, i) => (
                      <p key={i} className="text-lg text-gray-700 leading-relaxed">{f}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kutipan */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Quote className="h-6 w-6 text-indigo-600" />
                    Pandangan dari Narasumber
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-xl text-gray-700 italic leading-relaxed border-l-4 border-indigo-400 pl-6">
                    {m.kutipan.teks}
                    <footer className="text-base not-italic text-gray-500 mt-3">{m.kutipan.tokoh}</footer>
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>

            {/* Langkah Aksi */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-2 border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <ListChecks className="h-7 w-7 text-indigo-600" />
                    Langkah Aksi untuk Guru
                  </CardTitle>
                  <CardDescription className="text-base">
                    Terapkan metodologi ini di kelas dengan langkah-langkah berikut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {m.pendekatan.map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-start gap-4 p-5 rounded-lg bg-white border border-indigo-100 shadow-sm"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{p.langkah}</h3>
                          <p className="text-lg text-gray-700 leading-relaxed">{p.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <GraduationCap className="inline h-6 w-6 mr-2" />
                    Informasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-indigo-200 text-base">Cocok untuk</p>
                    <p className="text-xl font-semibold">{m.cocok}</p>
                  </div>
                  <div>
                    <p className="text-indigo-200 text-base">Platform Rekomendasi</p>
                    <p className="text-lg">{m.platform}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-2 border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="h-6 w-6 text-indigo-600" />
                    Aksi Cepat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button size="lg" className="w-full h-16 text-lg justify-start" variant="outline" onClick={() => router.push('/dashboard')}>
                    <GraduationCap className="mr-3 h-5 w-5" /> Dashboard Guru
                  </Button>
                  <Button size="lg" className="w-full h-16 text-lg justify-start" variant="outline" onClick={() => router.push('/platform')}>
                    <BookOpen className="mr-3 h-5 w-5" /> Lihat Platform
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
