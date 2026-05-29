'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Target, Layers, BookOpen, Code } from 'lucide-react';

const materiByUsia: Record<string, Array<{
  id: string;
  title: string;
  durasi: string;
  tujuan: string;
  platform: string;
  steps: string[];
  link: string;
}>> = {
  sd: [
    {
      id: 'pengenalan-scratchjr',
      title: 'Pengenalan ScratchJr',
      durasi: '45 menit',
      tujuan: 'Siswa dapat membuat animasi sederhana dengan blok kode visual di ScratchJr',
      platform: 'ScratchJr',
      link: 'https://scratchjr.org',
      steps: [
        'Tampilkan ScratchJr di SMART Board — jelaskan 4 area utama: stage, blok, script, karakter',
        'Demo: buat karakter kucing bergerak maju 10 langkah. Ajak siswa menyusun blok bersama',
        'Tantangan 1: Buat karakter berjalan dalam kotak (gunakan repeat/loop)',
        'Tantangan 2: Tambahkan karakter kedua dan buat mereka bertemu',
        'Bahas hasil: tanya siswa apa yang terjadi jika urutan blok diubah',
      ],
    },
    {
      id: 'puzzle-lightbot',
      title: 'Puzzle Logika Lightbot',
      durasi: '40 menit',
      tujuan: 'Siswa memahami konsep algoritma dan prosedur dengan memprogram robot',
      platform: 'Lightbot',
      link: 'https://lightbot.com',
      steps: [
        'Buka Lightbot di SMART Board — jelaskan misi: menyalakan semua kotak biru',
        'Selesaikan level 1-2 bersama: tunjukkan hubungan perintah dengan gerakan robot',
        'Tantangan: Siswa maju bergiliran menyelesaikan level 3-5 di SMART Board',
        'Diskusikan konsep prosedur: bagaimana membuat kotak berulang tanpa perintah yang sama',
        'Refleksi: tanya siswa bagaimana ini terhubung dengan cara kerja komputer',
      ],
    },
    {
      id: 'animasi-scratch',
      title: 'Animasi & Game Scratch',
      durasi: '60 menit',
      tujuan: 'Siswa dapat membuat interaksi antara sprite menggunakan event dan loop',
      platform: 'Scratch',
      link: 'https://scratch.mit.edu',
      steps: [
        'Tampilkan proyek Scratch contoh di SMART Board — mainkan bersama',
        'Bongkar (remix) kode: tunjukkan blok event, loop, dan motion',
        'Siswa membuat proyek sendiri: kucing mengejar tikus dengan arrow keys',
        'Tambahkan skor dan suara — ajarkan variabel sederhana',
        'Gallery walk: siswa mempresentasikan game mereka ke kelas',
      ],
    },
    {
      id: 'game-kodable',
      title: 'Petualangan Kodable',
      durasi: '35 menit',
      tujuan: 'Siswa memahami logika kondisi (if/else) melalui game petualangan',
      platform: 'Kodable',
      link: 'https://kodable.com',
      steps: [
        'Buka Kodable — jelaskan bahwa kita memprogram fuzz untuk melewati rintangan',
        'Selesaikan level-loop level bersama di SMART Board',
        'Level kondisi: saat ada lubang, fuzz harus lompat — ajarkan if/else',
        'Siswa bergiliran ke SMART Board menyelesaikan level kondisi',
        'Tanya: bagaimana kondisi dalam game ini mirip dengan aturan di kehidupan sehari-hari?',
      ],
    },
    {
      id: 'blockly-teka-teki',
      title: 'Teka-Teki Blockly',
      durasi: '30 menit',
      tujuan: 'Siswa dapat memecahkan masalah menggunakan blok logika dan loop',
      platform: 'Blockly Games',
      link: 'https://blockly.games',
      steps: [
        'Buka Blockly Games → pilih Maze — jelaskan cara blok terhubung',
        'Selesaikan Maze level 1-3 bersama di SMART Board',
        'Siswa maju bergiliran menyelesaikan level 4-6',
        'Bahas perbedaan solusi: mana yang paling efisien (paling sedikit blok)?',
        'Tantangan lanjutan: coba level Bird atau Turtle',
      ],
    },
  ],
  smp: [
    {
      id: 'game-dev-scratch',
      title: 'Game Development Scratch',
      durasi: '90 menit (2 sesi)',
      tujuan: 'Siswa dapat membuat game platformer sederhana dengan variabel skor',
      platform: 'Scratch',
      link: 'https://scratch.mit.edu',
      steps: [
        'Review blok dasar: event, motion, looks, control di SMART Board',
        'Tunjukkan game platformer contoh — bongkar kodenya bersama',
        'Siswa membuat karakter, latar, dan kontrol gerak (left/right/jump)',
        'Tambahkan musuh, koin, dan variabel skor',
        'Presentasi: setiap siswa memainkan game temannya dan memberikan feedback',
      ],
    },
    {
      id: 'rpg-codecombat',
      title: 'Petualangan RPG CodeCombat',
      durasi: '60 menit',
      tujuan: 'Siswa dapat menulis kode Python/JavaScript untuk menyelesaikan level',
      platform: 'CodeCombat',
      link: 'https://codecombat.com',
      steps: [
        'Buka CodeCombat di SMART Board — jelaskan antarmuka: kode di kiri, game di kanan',
        'Selesaikan level Kithgard Dungeon bersama: pelajari hero.moveRight() dll',
        'Tantangan level dengan loop: while loop untuk mengumpulkan permata',
        'Siswa bergiliran menulis kode di SMART Board untuk level selanjutnya',
        'Bahas: bagaimana perintah teks (Python) berbeda dengan blok Scratch?',
      ],
    },
    {
      id: 'app-inventor',
      title: 'Membuat Aplikasi Android App Inventor',
      durasi: '90 menit (2 sesi)',
      tujuan: 'Siswa dapat membuat aplikasi Android sederhana menggunakan blok visual',
      platform: 'App Inventor',
      link: 'https://appinventor.mit.edu',
      steps: [
        'Buka App Inventor — jelaskan Designer (tata letak) dan Blocks (logika)',
        'Demo: buat aplikasi kalkulator sederhana bersama di SMART Board',
        'Siswa mendesain UI aplikasi mereka sendiri (pilih tema)',
        'Siswa memprogram logika blok untuk tombol-tombol aplikasi',
        'Uji coba: jika ada emulator/smartphone, jalankan aplikasi',
      ],
    },
    {
      id: 'tynker-ai',
      title: 'AI & Minecraft Tynker',
      durasi: '60 menit',
      tujuan: 'Siswa mengenal konsep AI dan modding melalui Tynker',
      platform: 'Tynker',
      link: 'https://tynker.com',
      steps: [
        'Buka Tynker — pilih modul AI atau Minecraft modding',
        'Tunjukkan cara kerja AI: bagaimana model dikenali?',
        'Siswa mengikuti tutorial AI: membuat chatbot sederhana',
        'Alternatif: modding Minecraft — ubah perilaku karakter',
        'Diskusi: apa dampak AI di kehidupan nyata?',
      ],
    },
  ],
  sma: [
    {
      id: 'khan-academy-js',
      title: 'Pemrograman JavaScript Khan Academy',
      durasi: '90 menit (2 sesi)',
      tujuan: 'Siswa dapat menulis program JavaScript interaktif dengan canvas drawing',
      platform: 'Khan Academy',
      link: 'https://khanacademy.org/computing',
      steps: [
        'Buka Khan Academy — computing → pilih Intro to JS',
        'Review variabel dan fungsi di JavaScript menggunakan SMART Board',
        'Siswa mengikuti tutorial drawing & animation di Khan Academy',
        'Tantangan: buat program menggambar rumah dengan CSS/JS',
        'Bagikan hasil: siswa mempresentasikan kode mereka',
      ],
    },
    {
      id: 'mblock-python',
      title: 'Transisi ke Python dengan mBlock',
      durasi: '90 menit (2 sesi)',
      tujuan: 'Siswa dapat menulis kode Python untuk mengontrol animasi',
      platform: 'mBlock',
      link: 'https://mblock.cc',
      steps: [
        'Buka mBlock — tunjukkan mode blok dan mode Python',
        'Buat program sederhana di blok, lalu lihat kode Python-nya',
        'Siswa menulis langsung Python: variabel, loop, kondisi',
        'Buat game tebak angka menggunakan Python',
        'Perbandingan: blok vs teks — mana yang lebih fleksibel?',
      ],
    },
    {
      id: 'codecombat-python',
      title: 'Algorithmic Thinking CodeCombat',
      durasi: '60 menit',
      tujuan: 'Siswa dapat menggunakan algoritma pencarian dan pengurutan dalam game',
      platform: 'CodeCombat',
      link: 'https://codecombat.com',
      steps: [
        'Open CodeCombat level Python — fokus pada level algoritma',
        'Tunjukkan cara kerja while loop dan if/else untuk navigasi',
        'Tantangan: kumpulkan semua permata dengan rute paling efisien',
        'Siswa membandingkan solusi: siapa yang menggunakan loop paling sedikit?',
        'Hubungkan dengan konsep algoritma di kehidupan (rute terpendek)',
      ],
    },
    {
      id: 'lightbot-prosedur',
      title: 'Prosedur & Fungsi Lightbot',
      durasi: '40 menit',
      tujuan: 'Siswa dapat menggunakan prosedur (fungsi) untuk menyederhanakan kode',
      platform: 'Lightbot',
      link: 'https://lightbot.com',
      steps: [
        'Buka Lightbot level prosedur — jelaskan: prosedur = grup perintah yang bisa dipanggil ulang',
        'Selesaikan satu level dengan dan tanpa prosedur — bandingkan panjang kode',
        'Siswa membuat prosedur untuk pola berulang (misal: 4 kotak)',
        'Tantangan: level prosedur lanjutan dengan prosedur bersarang',
        'Diskusi: analogi fungsi di kode kehidupan (resep masakan sebagai prosedur)',
      ],
    },
  ],
};

export default function MateriPage() {
  const params = useParams();
  const router = useRouter();
  const usia = params.usia as string;

  const labelMap: Record<string, string> = { sd: 'SD', smp: 'SMP', sma: 'SMA' };
  const colorMap: Record<string, string> = { sd: 'green', smp: 'yellow', sma: 'orange' };
  const bgMap: Record<string, string> = { sd: 'from-green-50 to-green-100 border-green-200', smp: 'from-yellow-50 to-yellow-100 border-yellow-200', sma: 'from-orange-50 to-orange-100 border-orange-200' };
  const btnMap: Record<string, string> = { sd: 'bg-green-600 hover:bg-green-700', smp: 'bg-yellow-600 hover:bg-yellow-700', sma: 'bg-orange-600 hover:bg-orange-700' };

  const materiList = materiByUsia[usia] || [];
  const label = labelMap[usia] || usia.toUpperCase();
  const color = colorMap[usia] || 'indigo';
  const bg = bgMap[usia] || 'from-indigo-50 to-indigo-100 border-indigo-200';
  const btn = btnMap[usia] || 'bg-indigo-600 hover:bg-indigo-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="outline" size="lg" className="mb-6 h-14 text-lg" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Kembali ke Dashboard
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Badge className={`text-lg px-6 py-2 ${
            color === 'green' ? 'bg-green-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-orange-500'
          } text-white mb-4`}>
            Jenjang {label}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Pilih Materi Pembelajaran
          </h1>
          <p className="text-xl text-gray-600">Pilih materi yang akan ditampilkan di SMART Board</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {materiList.map((materi, idx) => (
            <motion.div
              key={materi.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className={`border-2 ${bg} hover:shadow-xl transition-all h-full`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-base px-3 py-1">
                      <Clock className="mr-1 h-4 w-4" />
                      {materi.durasi}
                    </Badge>
                    <Badge className="bg-indigo-100 text-indigo-700 text-base px-3 py-1">
                      <Target className="mr-1 h-4 w-4" />
                      {materi.platform}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold">{materi.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-700">
                    {materi.tujuan}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Layers className="h-5 w-5 text-indigo-600" />
                      Langkah Pembelajaran:
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      {materi.steps.map((step, i) => (
                        <li key={i} className="text-base text-gray-700 leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <a
                    href={materi.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button size="lg" className={`w-full h-16 text-lg font-bold text-white ${btn}`}>
                      <Code className="mr-2 h-6 w-6" />
                      Buka {materi.platform}
                      <span className="ml-2 text-sm opacity-75">(tab baru)</span>
                    </Button>
                  </a>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-16 text-lg"
                    onClick={() => router.push(`/teach/${usia}/${materi.id}`)}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Lesson Plan Detail
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
