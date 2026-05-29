'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, ExternalLink, Users, Target,
  Sparkles, BookOpen, Lightbulb, GraduationCap,
  Globe, Cpu,
} from 'lucide-react';

const platformData: Record<string, {
  name: string;
  icon: string;
  usia: string;
  level: string;
  levelBadge: string;
  color: string;
  desc: string;
  fitur: string[];
  link: string;
  tabelKurikulum: { usia: string; konsep: string; kegiatan: string }[];
  tips: string[];
  kategori: string;
}> = {
  scratchjr: {
    name: 'ScratchJr',
    icon: '🧩',
    usia: '5-7 tahun',
    level: 'Pemula',
    levelBadge: '🟢',
    color: 'green',
    desc: 'Platform pemrograman visual berbasis blok untuk anak usia dini. Dikembangkan oleh Tufts University & MIT. Anak dapat membuat cerita dan animasi interaktif dengan menyeret blok kode berwarna. Antarmuka sepenuhnya visual tanpa teks, sempurna untuk anak yang belum lancar membaca.',
    fitur: [
      'Antarmuka visual tanpa teks',
      'Blok kode berwarna per kategori (trigger, motion, looks, sound, control, end)',
      'Karakter (sprite) dapat diedit dan dibuat sendiri',
      'Rekaman suara langsung untuk dialog karakter',
      'Kompatibel dengan tablet dan SMART Board touch',
    ],
    link: 'https://scratchjr.org',
    tabelKurikulum: [
      { usia: '5-6 thn (TK)', konsep: 'Algoritma dasar (urutan)', kegiatan: 'Buat kucing berjalan dan berbicara' },
      { usia: '6-7 thn (Kls 1)', konsep: 'Event & trigger', kegiatan: 'Buat cerita 2 karakter berdialog' },
      { usia: '7 thn (Kls 1)', konsep: 'Pengulangan sederhana', kegiatan: 'Buat animasi berulang (bunga mekar)' },
    ],
    tips: [
      'Gunakan SMART Board untuk demo drag-and-drop blok dengan jari',
      'Mulai dengan proyek sederhana — karakter bergerak dan bersuara',
      'Ajak siswa memprediksi hasil sebelum menjalankan program',
    ],
    kategori: 'Blok Visual',
  },
  kodable: {
    name: 'Kodable',
    icon: '🦊',
    usia: '5-10 tahun',
    level: 'Pemula',
    levelBadge: '🟢',
    color: 'green',
    desc: 'Platform pembelajaran coding berbasis game dengan karakter fuzz yang lucu. Mengajarkan konsep pemrograman dari sekuens hingga kondisi melalui level-level puzzle yang progresif. Tersedia versi web dan aplikasi iOS.',
    fitur: [
      'Level progresif dari sekuens ke kondisi & loop',
      'Karakter fuzz yang bisa dikustomisasi',
      'Dashboard guru untuk tracking kemajuan',
      'Transisi dari blok visual ke JavaScript',
      'Aktivitas unplugged (tanpa komputer) termasuk',
    ],
    link: 'https://kodable.com',
    tabelKurikulum: [
      { usia: '4-5 thn (Pra-TK)', konsep: 'Sekuens & urutan', kegiatan: 'Bawa fuzz ke tujuan-lewat jalur' },
      { usia: '5-7 thn (TK-Kls1)', konsep: 'Loop & pola', kegiatan: 'Ulangi gerakan untuk kumpulkan koin' },
      { usia: '7-10 thn (Kls 2-4)', konsep: 'Kondisi & if/else', kegiatan: 'Pilih jalur berdasarkan warna' },
    ],
    tips: ['Gunakan untuk pengenalan logika sebelum Scratch', 'Buat kompetisi level siapa tercepat'],
    kategori: 'Game-Based',
  },
  scratch: {
    name: 'Scratch',
    icon: '🐱',
    usia: '8-16 tahun',
    level: 'Pemula',
    levelBadge: '🟢',
    color: 'green',
    desc: 'Platform coding ikonik dari MIT Media Lab. Scratch memungkinkan anak membuat game, animasi, cerita interaktif, dan simulasi menggunakan blok kode warna-warni. Komunitas global dengan jutaan proyek yang bisa di-remix.',
    fitur: [
      'Lingkungan blok visual yang lengkap (motion, looks, sound, events, control, sensing, operators, variables)',
      'Komunitas global — jutaan proyek dapat di-remix',
      'Ekstensi: Text-to-Speech, Translate, Micro:bit, LEGO, Makey Makey',
      'Editor gambar dan suara built-in',
      'Dukungan lebih dari 70 bahasa',
    ],
    link: 'https://scratch.mit.edu',
    tabelKurikulum: [
      { usia: '8-10 thn', konsep: 'Event & motion dasar', kegiatan: 'Buat kucing mengejar mouse pointer' },
      { usia: '10-12 thn', konsep: 'Loop, kondisi, variabel', kegiatan: 'Buat game catch-the-apple dengan skor' },
      { usia: '12-14 thn', konsep: 'Fungsi, clone, broadcast', kegiatan: 'Buat game platformer multi-level' },
      { usia: '14-16 thn', konsep: 'Operator logika & sensing', kegiatan: 'Buat quiz interaktif dengan timer' },
    ],
    tips: ['Scratch adalah fondasi terbaik sebelum beralih ke teks', 'Manfaatkan remix untuk memulai proyek'],
    kategori: 'Blok Visual',
  },
  tynker: {
    name: 'Tynker',
    icon: '🎮',
    usia: '5-14 tahun',
    level: 'Menengah',
    levelBadge: '🟡',
    color: 'yellow',
    desc: 'Platform pembelajaran coding komprehensif dengan pendekatan berbasis game dan kursus terstruktur. Fitur AI, robotika, integrasi Minecraft, dan modul pembuatan aplikasi mobile.',
    fitur: [
      'Kursus terstruktur dari pemula hingga mahir',
      'Modul AI — machine learning untuk anak',
      'Integrasi Minecraft: modding & skin design',
      'Robotika: drone programming, LEGO, Sphero',
      'Dashboard guru dengan assessment tools',
    ],
    link: 'https://tynker.com',
    tabelKurikulum: [
      { usia: '5-7 thn', konsep: 'Puzzle blok visual', kegiatan: 'Puzzle drag-drop sederhana' },
      { usia: '8-10 thn', konsep: 'Game design', kegiatan: 'Buat game arcade dengan skor' },
      { usia: '10-14 thn', konsep: 'Python & web dev', kegiatan: 'Website HTML/CSS + Python dasar' },
    ],
    tips: ['Cocok untuk akselerasi siswa yang sudah kuasai Scratch', 'Gunakan modul Minecraft untuk engagement tinggi'],
    kategori: 'Kursus Terstruktur',
  },
  codemonkey: {
    name: 'CodeMonkey',
    icon: '🐒',
    usia: '8-14 tahun',
    level: 'Menengah',
    levelBadge: '🟡',
    color: 'yellow',
    desc: 'Platform belajar coding melalui teka-teki seru membantu monyet mendapatkan pisang. Menggunakan CoffeeScript (transisi ke JavaScript) dan Python. Didukung oleh dashboard guru dan kurikulum terstruktur.',
    fitur: [
      'Teka-teki progresif dengan karakter monyet',
      'Transisi dari blok ke teks (CoffeeScript → Python)',
      'Dashboard guru dengan progress tracking',
      'Game design course — buat game sendiri',
      'Challenge mode untuk kompetisi kelas',
    ],
    link: 'https://codemonkey.com',
    tabelKurikulum: [
      { usia: '8-10 thn', konsep: 'Sekuens & perintah', kegiatan: 'Bantu monyet dapat pisang-gerakan dasar' },
      { usia: '10-12 thn', konsep: 'Loop & kondisi', kegiatan: 'Kumpulkan semua pisang dengan loop' },
      { usia: '12-14 thn', konsep: 'Variabel & fungsi', kegiatan: 'Buat game sederhana dengan timing' },
    ],
    tips: ['Gunakan mode tantangan untuk kompetisi kelas', 'Transisi natural dari Scratch ke teks'],
    kategori: 'Game-Based',
  },
  blockly: {
    name: 'Blockly Games',
    icon: '🧊',
    usia: '8-14 tahun',
    level: 'Pemula',
    levelBadge: '🟢',
    color: 'green',
    desc: 'Seri game teka-teki edukatif dari Google yang mengajarkan konsep pemrograman melalui puzzle visual. Setiap game fokus pada konsep spesifik: Maze, Bird, Turtle, Movie, Pond Tutor, Pond.',
    fitur: [
      '6 game berbeda: Maze, Bird, Turtle, Movie, Pond Tutor, Pond',
      'Visual blok yang mirip dengan Scratch',
      'Melihat kode JavaScript langsung dari blok',
      'Game Pond: perkenalan AI/kompetisi algoritma',
      'Gratis total, tanpa login, akses offline tersedia',
    ],
    link: 'https://blockly.games',
    tabelKurikulum: [
      { usia: '8-10 thn', konsep: 'Sekuens & loop', kegiatan: 'Maze — pandu karakter ke tujuan' },
      { usia: '10-12 thn', konsep: 'Kondisi & logika', kegiatan: 'Bird — tebak posisi dengan yes/no' },
      { usia: '12-14 thn', konsep: 'Prosedur & parameter', kegiatan: 'Turtle — gambar geometri dengan prosedur' },
    ],
    tips: ['Sempurna untuk ice breaking sebelum coding serius', 'Tantangan Pond (AI) untuk siswa mahir'],
    kategori: 'Puzzle Game',
  },
  khanacademy: {
    name: 'Khan Academy',
    icon: '📚',
    usia: '12+ tahun',
    level: 'Menengah',
    levelBadge: '🟡',
    color: 'yellow',
    desc: 'Platform edukasi gratis dengan kursus komputasi mendalam. Dari JavaScript drawing & animation hingga HTML/CSS dan SQL. Video interaktif + coding challenge langsung di browser.',
    fitur: [
      'Video interaktif dengan coding challenge langsung',
      'Kursus: Intro to JS, HTML/CSS, SQL, Algorithms',
      'Project-based: buat program, game, website sendiri',
      'Progress tracking untuk siswa',
      'Gratis selamanya, tanpa iklan',
    ],
    link: 'https://khanacademy.org/computing',
    tabelKurikulum: [
      { usia: '12-14 thn', konsep: 'JS dasar — drawing & animation', kegiatan: 'Buat scene matahari terbenam' },
      { usia: '14-16 thn', konsep: 'HTML/CSS — web design', kegiatan: 'Buat website portofolio pribadi' },
      { usia: '16-18+ thn', konsep: 'SQL & algoritma', kegiatan: 'Buat database & query sederhana' },
    ],
    tips: ['Video tutorial bisa ditonton bersama di SMART Board', 'Tantangan proyek untuk penilaian akhir'],
    kategori: 'Kursus Video',
  },
  codecombat: {
    name: 'CodeCombat',
    icon: '⚔️',
    usia: '10+ tahun',
    level: 'Menengah',
    levelBadge: '🟡',
    color: 'yellow',
    desc: 'Game RPG seru yang mengharuskan pemain menulis kode nyata (Python, JavaScript, Lua) untuk mengontrol karakter. Bertarung melawan monster, kumpulkan permata, dan selesaikan dungeon.',
    fitur: [
      'Game RPG dengan grafis pixel art',
      'Bahasa nyata: Python, JavaScript, Lua, C++, Java',
      'Level dari pemula hingga algoritma kompleks',
      'Mode multiplayer arena PvP',
      'Dashboard guru untuk kelas management',
    ],
    link: 'https://codecombat.com',
    tabelKurikulum: [
      { usia: '10-12 thn', konsep: 'Sintaks Python/JS dasar', kegiatan: 'Gerakkan hero, kumpulkan permata' },
      { usia: '12-14 thn', konsep: 'Loop, kondisi, fungsi', kegiatan: 'Kalahkan ogre dengan strategi loop' },
      { usia: '14-16 thn', konsep: 'Algoritma & AI', kegiatan: 'Tantangan arena — kalahkan hero AI' },
    ],
    tips: ['Transisi sempurna dari blok ke teks', 'Arena mode untuk kompetisi coding'],
    kategori: 'Game RPG',
  },
  appinventor: {
    name: 'App Inventor',
    icon: '📱',
    usia: '12+ tahun',
    level: 'Lanjut',
    levelBadge: '🔴',
    color: 'red',
    desc: 'Platform visual dari MIT untuk membuat aplikasi Android. Menggunakan blok kode untuk memprogram logika aplikasi. Hasilnya aplikasi nyata yang bisa diinstal di smartphone.',
    fitur: [
      'Desain UI drag-and-drop untuk tampilan aplikasi',
      'Blok logika untuk behavior aplikasi',
      'Komponen: kamera, GPS, sensor, database TinyDB',
      'Live testing dengan AI Companion app',
      'Hasil jadi file .apk siap install',
    ],
    link: 'https://appinventor.mit.edu',
    tabelKurikulum: [
      { usia: '12-14 thn', konsep: 'UI design & event', kegiatan: 'Buat aplikasi kalkulator sederhana' },
      { usia: '14-16 thn', konsep: 'Sensor & database', kegiatan: 'Buku harian digital dengan TinyDB' },
      { usia: '16-18+ thn', konsep: 'GPS & API', kegiatan: 'Aplikasi lokasi tempat wisata lokal' },
    ],
    tips: ['Siapkan emulator Android untuk testing di kelas', 'Proyek akhir bisa jadi portofolio siswa'],
    kategori: 'Aplikasi Mobile',
  },
  lightbot: {
    name: 'Lightbot',
    icon: '🤖',
    usia: '6+ tahun',
    level: 'Pemula',
    levelBadge: '🟢',
    color: 'green',
    desc: 'Game puzzle programming yang mengajak anak memprogram robot untuk menyalakan semua kotak biru. Konsep algoritma, prosedur, dan loop dikemas dalam puzzle 3D yang adiktif.',
    fitur: [
      'Puzzle 3D dengan robot ikonik',
      'Level progresif: sekuens → loop → prosedur',
      'Mode tantangan dengan batasan langkah',
      'Tersedia web, iOS, Android, dan desktop',
      'Visual, tanpa teks — cocok untuk semua usia',
    ],
    link: 'https://lightbot.com',
    tabelKurikulum: [
      { usia: '6-8 thn', konsep: 'Algoritma & sekuens', kegiatan: 'Nyalakan 3 kotak — urutkan perintah' },
      { usia: '8-10 thn', konsep: 'Loop & pengulangan', kegiatan: 'Nyalakan baris kotak dengan 1 prosedur' },
      { usia: '10-12 thn', konsep: 'Prosedur & parameter', kegiatan: 'Buat prosedur, panggil berulang' },
    ],
    tips: ['Bagus untuk pengenalan computational thinking', 'Tantangan: selesaikan dengan langkah paling sedikit'],
    kategori: 'Puzzle Game',
  },
  codeforlife: {
    name: 'Code for Life',
    icon: '🌐',
    usia: '8-14 tahun',
    level: 'Menengah',
    levelBadge: '🟡',
    color: 'yellow',
    desc: 'Sumber daya gratis untuk sekolah dan orang tua dalam mengajarkan coding. Game utama "Rapid Router" mengajarkan pemrograman Python melalui puzzle pengiriman paket. Kurikulum align dengan standar pendidikan Inggris.',
    fitur: [
      'Game Rapid Router — antar paket dengan kode',
      'Transisi dari blok visual ke Python murni',
      'Kurikulum lengkap untuk guru (lesson plans)',
      'Tersedia dalam banyak bahasa',
      'Gratis selamanya — open source',
    ],
    link: 'https://codeforlife.education',
    tabelKurikulum: [
      { usia: '8-10 thn', konsep: 'Blok visual dasar', kegiatan: 'Antar paket dengan rute sederhana' },
      { usia: '10-12 thn', konsep: 'Loop & kondisi blok', kegiatan: 'Rute kompleks dengan rintangan' },
      { usia: '12-14 thn', konsep: 'Python teks murni', kegiatan: 'Kode Python langsung untuk kurir' },
    ],
    tips: ['Gunakan lesson plans yang sudah disediakan', 'Transisi bertahap dari blok ke Python'],
    kategori: 'Game-Based',
  },
  mblock: {
    name: 'mBlock',
    icon: '🧠',
    usia: '8-18+ tahun',
    level: 'Lanjut',
    levelBadge: '🔴',
    color: 'red',
    desc: 'Platform coding berbasis Scratch dengan tambahan fitur AI, IoT, dan robotika. Mendukung transisi dari pemrograman blok ke Python. Kompatibel dengan robot Makeblock dan micro:bit.',
    fitur: [
      'Antarmuka blok (berbasis Scratch 3.0) + Python editor',
      'AI: face detection, speech recognition, object tracking',
      'IoT: koneksi sensor, smart home simulation',
      'Robotika: kompatibel dengan robot Makeblock',
      'Upload kode ke hardware: Arduino, micro:bit',
    ],
    link: 'https://mblock.cc',
    tabelKurikulum: [
      { usia: '8-12 thn', konsep: 'Blok visual lanjutan', kegiatan: 'Buat game dengan AI face tracking' },
      { usia: '12-16 thn', konsep: 'Python & hardware', kegiatan: 'Program robot line follower' },
      { usia: '16-18+ thn', konsep: 'IoT & AI project', kegiatan: 'Smart home simulation sensor suhu' },
    ],
    tips: ['Ideal untuk siswa yang siap ke hardware', 'Fitur AI-nya jadi daya tarik besar untuk remaja'],
    kategori: 'AI & Robotika',
  },
};

const levelColor: Record<string, string> = {
  'Lanjut': 'bg-red-100 text-red-700 border-red-300',
  'Menengah': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'Pemula': 'bg-green-100 text-green-700 border-green-300',
};

const colorMap: Record<string, string> = {
  green: 'from-green-50 to-green-100 border-green-200',
  yellow: 'from-yellow-50 to-yellow-100 border-yellow-200',
  red: 'from-red-50 to-red-100 border-red-200',
};

export default function PlatformDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const p = platformData[slug];

  if (!p) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Platform Tidak Ditemukan</h1>
          <Button size="lg" onClick={() => router.push('/platform')}><ArrowLeft className="mr-2 h-5 w-5" /> Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="outline" size="lg" className="mb-6 h-14 text-lg" onClick={() => router.push('/platform')}>
            <ArrowLeft className="mr-2 h-5 w-5" /> Semua Platform
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border-2 ${colorMap[p.color] || 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-white'} p-8 mb-8 shadow-lg`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-7xl md:text-8xl">{p.icon}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge className={`text-lg px-4 py-2 ${levelColor[p.level]}`}>
                  {p.levelBadge} {p.level}
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  <Users className="mr-2 h-5 w-5" /> Usia {p.usia}
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  <Cpu className="mr-2 h-5 w-5" /> {p.kategori}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">{p.name}</h1>
              <p className="text-xl text-gray-700 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Fitur */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-2 border-indigo-100 h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-yellow-500" />
                  Fitur Unggulan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {p.fitur.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                      <span className="text-indigo-600 mt-1">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Peta Kurikulum */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-2 border-indigo-100 h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <BookOpen className="h-7 w-7 text-indigo-600" />
                  Peta Kurikulum
                </CardTitle>
                <CardDescription className="text-base">Rekomendasi pembelajaran berdasarkan usia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-indigo-100">
                        <th className="py-3 pr-4 text-base font-semibold text-gray-700"><Users className="inline h-4 w-4 mr-1" /> Usia</th>
                        <th className="py-3 pr-4 text-base font-semibold text-gray-700"><Target className="inline h-4 w-4 mr-1" /> Konsep</th>
                        <th className="py-3 text-base font-semibold text-gray-700"><Lightbulb className="inline h-4 w-4 mr-1" /> Kegiatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.tabelKurikulum.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-3 pr-4 text-base text-gray-700">{row.usia}</td>
                          <td className="py-3 pr-4 text-base text-gray-700 font-medium">{row.konsep}</td>
                          <td className="py-3 text-base text-gray-600">{row.kegiatan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tips & Link */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tips */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <Card className="border-2 border-yellow-100 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-yellow-600" />
                  Tips untuk Pengajar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {p.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                      <Lightbulb className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Link CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Mulai Menggunakan</CardTitle>
                <CardDescription className="text-base text-indigo-100">
                  Buka {p.name} langsung untuk mengajar di SMART Board
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full h-20 text-xl font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg">
                    <Globe className="mr-3 h-7 w-7" />
                    Buka {p.name}
                    <ExternalLink className="ml-3 h-6 w-6" />
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-16 text-lg border-white/30 text-white hover:bg-white/10"
                  onClick={() => router.push('/dashboard')}
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Kembali ke Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
