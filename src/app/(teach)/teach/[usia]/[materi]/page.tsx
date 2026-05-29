'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Clock,
  Target,
  Layers,
  Code,
  Timer,
  Shuffle,
  Play,
  Pause,
  RotateCcw,
  Users,
  ExternalLink,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

// Data lengkap lesson plan (sama seperti di halaman sebelumnya)
const lessonPlans: Record<string, Record<string, {
  title: string;
  durasi: string;
  tujuan: string;
  platform: string;
  link: string;
  steps: string[];
  tips: string[];
}>> = {
  sd: {
    'pengenalan-scratchjr': {
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
      tips: [
        'Gunakan SMART Board touch untuk demo langsung — siswa bisa drag blok dengan jari',
        'Bagi siswa dalam pasangan untuk pair programming',
        'Siapkan stiker bintang untuk setiap tantangan yang selesai',
      ],
    },
    'puzzle-lightbot': {
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
      tips: [
        'Gunakan spidol board untuk menggambar grid dan simulasi gerakan robot',
        'Tantang siswa mencari solusi dengan jumlah langkah paling sedikit',
      ],
    },
    'animasi-scratch': {
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
      tips: [
        'Siapkan akun Scratch kelas sebelumnya untuk menghemat waktu login',
        'Gunakan remix untuk memulai dari template yang sudah ada',
      ],
    },
    'game-kodable': {
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
      tips: ['Ajak siswa memprediksi apa yang terjadi sebelum menjalankan kode'],
    },
    'blockly-teka-teki': {
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
      tips: ['Buat kompetisi siapa yang bisa selesai dengan blok paling sedikit'],
    },
  },
  smp: {
    'game-dev-scratch': {
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
      tips: ['Buat rubrik penilaian sederhana: kreativitas, fungsionalitas, kerapihan kode'],
    },
    'rpg-codecombat': {
      title: 'Petualangan RPG CodeCombat',
      durasi: '60 menit',
      tujuan: 'Siswa dapat menulis kode Python/JavaScript untuk menyelesaikan level',
      platform: 'CodeCombat',
      link: 'https://codecombat.com',
      steps: [
        'Buka CodeCombat di SMART Board — jelaskan antarmuka',
        'Selesaikan level Kithgard Dungeon bersama',
        'Tantangan level dengan loop',
        'Siswa bergiliran menulis kode di SMART Board',
        'Bahas perbedaan blok vs teks',
      ],
      tips: ['Fokus pada logika, bukan sintaks — siswa bisa copy-paste perintah dasar'],
    },
    'app-inventor': {
      title: 'Membuat Aplikasi Android App Inventor',
      durasi: '90 menit (2 sesi)',
      tujuan: 'Siswa dapat membuat aplikasi Android sederhana menggunakan blok visual',
      platform: 'App Inventor',
      link: 'https://appinventor.mit.edu',
      steps: [
        'Buka App Inventor — jelaskan Designer dan Blocks',
        'Demo: buat aplikasi kalkulator sederhana bersama',
        'Siswa mendesain UI aplikasi mereka sendiri',
        'Siswa memprogram logika blok untuk tombol',
        'Uji coba aplikasi',
      ],
      tips: ['Siapkan emulator Android di laptop jika smartphone tidak tersedia'],
    },
    'tynker-ai': {
      title: 'AI & Minecraft Tynker',
      durasi: '60 menit',
      tujuan: 'Siswa mengenal konsep AI dan modding melalui Tynker',
      platform: 'Tynker',
      link: 'https://tynker.com',
      steps: [
        'Buka Tynker — pilih modul AI atau Minecraft modding',
        'Tunjukkan cara kerja AI',
        'Siswa mengikuti tutorial AI: membuat chatbot sederhana',
        'Alternatif: modding Minecraft',
        'Diskusi dampak AI',
      ],
      tips: ['Tanyakan ke siswa: apa yang membedakan AI dengan program biasa?'],
    },
  },
  sma: {
    'khan-academy-js': {
      title: 'Pemrograman JavaScript Khan Academy',
      durasi: '90 menit (2 sesi)',
      tujuan: 'Siswa dapat menulis program JavaScript interaktif dengan canvas drawing',
      platform: 'Khan Academy',
      link: 'https://khanacademy.org/computing',
      steps: [
        'Buka Khan Academy computing → Intro to JS',
        'Review variabel dan fungsi di JavaScript',
        'Siswa mengikuti tutorial drawing & animation',
        'Tantangan: buat program menggambar rumah',
        'Presentasi hasil',
      ],
      tips: ['Buat tantangan tambahan bagi yang selesai lebih cepat'],
    },
    'mblock-python': {
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
        'Perbandingan blok vs teks',
      ],
      tips: ['Tekankan bahwa Python case-sensitive — perhatikan huruf besar/kecil'],
    },
    'codecombat-python': {
      title: 'Algorithmic Thinking CodeCombat',
      durasi: '60 menit',
      tujuan: 'Siswa dapat menggunakan algoritma pencarian dan pengurutan dalam game',
      platform: 'CodeCombat',
      link: 'https://codecombat.com',
      steps: [
        'Open CodeCombat level Python — fokus pada level algoritma',
        'Tunjukkan cara kerja while loop dan if/else',
        'Tantangan: kumpulkan semua permata dengan rute paling efisien',
        'Bandingkan solusi siswa',
        'Hubungkan dengan algoritma di kehidupan',
      ],
      tips: ['Diskusikan Big O sederhana: mana yang lebih cepat?'],
    },
    'lightbot-prosedur': {
      title: 'Prosedur & Fungsi Lightbot',
      durasi: '40 menit',
      tujuan: 'Siswa dapat menggunakan prosedur (fungsi) untuk menyederhanakan kode',
      platform: 'Lightbot',
      link: 'https://lightbot.com',
      steps: [
        'Buka Lightbot level prosedur',
        'Selesaikan satu level dengan dan tanpa prosedur',
        'Siswa membuat prosedur untuk pola berulang',
        'Tantangan prosedur lanjutan',
        'Diskusi analogi fungsi',
      ],
      tips: ['Hubungkan dengan DRY principle (Don\'t Repeat Yourself)'],
    },
  },
};

const namePool = [
  'Ahmad', 'Siti', 'Budi', 'Dewi', 'Rizky', 'Nurul',
  'Adi', 'Rina', 'Bayu', 'Maya', 'Cahyo', 'Putri',
  'Dimas', 'Intan', 'Eko', 'Fitri', 'Fajar', 'Ratna',
  'Gilang', 'Rani', 'Hendra', 'Wulan', 'Indra', 'Yuni',
];

export default function LessonPlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const usia = params.usia as string;
  const materiSlug = params.materi as string;

  const plan = lessonPlans[usia]?.[materiSlug];

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Random name picker state
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const pickRandomName = useCallback(() => {
    setSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setSelectedName(namePool[Math.floor(Math.random() * namePool.length)]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 80);
  }, []);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson Plan Tidak Ditemukan</h1>
          <Button size="lg" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-5 w-5" /> Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="outline" size="lg" className="mb-6 h-14 text-lg" onClick={() => router.push(`/teach/${usia}`)}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Kembali ke Daftar Materi
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="text-lg px-6 py-2 bg-indigo-500 text-white">
              {usia.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Clock className="mr-2 h-5 w-5" />
              {plan.durasi}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 text-lg px-4 py-2">
              <Target className="mr-2 h-5 w-5" />
              {plan.platform}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            {plan.title}
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed max-w-4xl">
            {plan.tujuan}
          </p>
        </motion.div>

        {/* SMART Board Display */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 border-indigo-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Layers className="h-7 w-7 text-indigo-600" />
                    Langkah Pembelajaran di SMART Board
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plan.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-white border border-indigo-100"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                          {i + 1}
                        </div>
                        <p className="text-xl text-gray-800 leading-relaxed pt-2">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-yellow-100 bg-yellow-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-yellow-600" />
                    Tips Pengajar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                        <CheckCircle2 className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Platform Link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a href={plan.link} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full h-20 text-2xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl">
                  <Code className="mr-3 h-8 w-8" />
                  Buka {plan.platform} di Tab Baru
                  <ExternalLink className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Sidebar: Timer & Name Picker */}
          <div className="space-y-6">
            {/* Timer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Timer className="h-6 w-6 text-indigo-600" />
                    Timer Kelas
                  </CardTitle>
                  <CardDescription className="text-base">Pantau durasi kegiatan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl md:text-6xl font-bold text-center py-6 font-mono text-gray-900">
                    {formatTime(timerSeconds)}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="lg"
                      className={`h-16 text-lg ${timerRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                      onClick={() => setTimerRunning(!timerRunning)}
                    >
                      {timerRunning ? <><Pause className="mr-1 h-5 w-5" /> Stop</> : <><Play className="mr-1 h-5 w-5" /> Mulai</>}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-16 text-lg"
                      onClick={() => { setTimerRunning(false); setTimerSeconds(0); }}
                    >
                      <RotateCcw className="mr-1 h-5 w-5" /> Reset
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-16 text-lg"
                      onClick={() => setTimerSeconds(timerSeconds + 60)}
                    >
                      +1 menit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Random Name Picker */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Shuffle className="h-6 w-6 text-indigo-600" />
                    Random Name Picker
                  </CardTitle>
                  <CardDescription className="text-base">Pilih siswa secara acak</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <motion.div
                      key={selectedName || 'empty'}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`text-3xl md:text-4xl font-bold py-8 rounded-lg mb-4 ${
                        selectedName
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Users className={`h-10 w-10 mx-auto mb-2 ${selectedName ? 'text-indigo-600' : 'text-gray-400'}`} />
                      {selectedName || 'Klik tombol'}
                    </motion.div>
                    <Button
                      size="lg"
                      className="w-full h-16 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={pickRandomName}
                      disabled={spinning}
                    >
                      <Shuffle className="mr-2 h-5 w-5" />
                      {spinning ? 'Memilih...' : 'Pilih Acak!'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
