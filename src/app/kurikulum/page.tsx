'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen, ExternalLink,
  Lightbulb, Globe,
} from 'lucide-react';

const tabs = [
  { id: 'hour-of-code', label: 'Hour of Code', icon: '🚀', color: 'bg-purple-500' },
  { id: 'cs-fundamentals', label: 'CS Fundamentals SD', icon: '🧩', color: 'bg-green-500' },
  { id: 'cs-discoveries', label: 'CS Discoveries SMP', icon: '🔍', color: 'bg-yellow-500' },
  { id: 'cs-principles', label: 'CS Principles SMA', icon: '🧠', color: 'bg-orange-500' },
];

const tabContent: Record<string, {
  title: string;
  desc: string;
  info: { label: string; value: string }[];
  tips: string[];
  link: string;
  tabel?: { kolom1: string; kolom2: string; kolom3: string }[];
  sections?: { title: string; content: string; icon: string }[];
  linkLabel: string;
}> = {
  'hour-of-code': {
    title: 'Hour of Code 🚀',
    desc: 'Hour of Code adalah gerakan global untuk memperkenalkan puluhan juta siswa pada Ilmu Komputer dalam waktu 1 jam. Aktivitas ini dirancang untuk menghilangkan misteri di balik kode dan menunjukkan bahwa siapa pun bisa belajar dasar-dasar pemrograman.',
    info: [
      { label: 'Tujuan', value: 'Memicu minat coding — bukan menjadi ahli dalam 1 jam' },
      { label: 'Target Usia', value: 'Semua usia (efektif untuk SD, SMP, SMA)' },
      { label: 'Durasi', value: '45-60 menit (fleksibel)' },
      { label: 'Alat', value: 'Berbasis web, tidak perlu instalasi' },
    ],
    tips: [
      'Anda tidak perlu pengalaman coding — tutorial dirancang untuk dipelajari mandiri oleh siswa',
      'Biarkan siswa memilih tutorial berdasarkan minat (Minecraft, Frozen, Star Wars, Musik, AI)',
      'Hour of Code bisa jadi kegiatan interdisipliner di kelas Matematika, Bahasa, atau Seni',
      'Siswa bisa mendapatkan sertifikat penyelesaian di akhir sesi',
    ],
    link: 'https://code.org/hour-of-code',
    linkLabel: 'Buka Hour of Code Activities',
    sections: [
      { title: 'Pilih Aktivitas', content: 'Siswa menjelajahi puluhan tutorial dan memilih satu yang paling menarik.', icon: '🎯' },
      { title: 'Ikuti Tutorial', content: 'Instruksi interaktif dan video pendek memandu siswa langkah demi langkah.', icon: '📖' },
      { title: 'Buat Proyek Pertama', content: 'Siswa menghasilkan kode sederhana untuk game, animasi, atau musik.', icon: '🎨' },
      { title: 'Bagikan Hasil Karya', content: 'Siswa mendapatkan sertifikat dan dapat membagikan proyek mereka.', icon: '🏆' },
    ],
  },
  'cs-fundamentals': {
    title: 'CS Fundamentals — SD 🧩',
    desc: 'CS Fundamentals (CSF) adalah kurikulum ilmu komputer dari Code.org untuk siswa SD (kelas K-5, usia 5-12 tahun). Kurikulum ini mengubah konsep pemrograman abstrak menjadi aktivitas menyenangkan dan interaktif menggunakan blok visual.',
    info: [
      { label: 'Tujuan', value: 'Perkenalkan konsep dasar CS: algoritma, loop, kondisional' },
      { label: 'Struktur', value: '6 kursus (A-F), tingkat kesulitan meningkat sesuai jenjang' },
      { label: 'Alat', value: 'Sprite Lab, Play Lab — pemrograman blok visual' },
      { label: 'Usia', value: '5-12 tahun (Kelas K-5)' },
    ],
    tips: [
      'Manfaatkan aktivitas "Unplugged" (tanpa komputer) untuk ajarkan Computational Thinking',
      'Daftarkan kelas di Code.org untuk akses dashboard guru — pantau kemajuan tiap siswa',
      'Fokus pada konsep, bukan kesempurnaan — mengapa kita pakai loop (efisiensi)',
      'Dorong pair programming: Driver + Navigator, rotasi peran tiap 10-15 menit',
    ],
    link: 'https://code.org/student/elementary',
    linkLabel: 'Buka Portal Siswa SD',
    tabel: [
      { kolom1: 'Course A', kolom2: 'TK (5-6 thn)', kolom3: 'Algoritma (urutan) & debugging' },
      { kolom1: 'Course B', kolom2: 'Kelas 1 (6-7 thn)', kolom3: 'Loop & event' },
      { kolom1: 'Course C', kolom2: 'Kelas 2 (7-8 thn)', kolom3: 'Kondisional (jika-maka) & logika' },
      { kolom1: 'Course D', kolom2: 'Kelas 3 (8-9 thn)', kolom3: 'Fungsi & puzzle kompleks' },
      { kolom1: 'Course E', kolom2: 'Kelas 4 (9-10 thn)', kolom3: 'Game & aplikasi sederhana' },
      { kolom1: 'Course F', kolom2: 'Kelas 5 (10-11 thn)', kolom3: 'Konsep lanjutan → CS Discoveries' },
    ],
  },
  'cs-discoveries': {
    title: 'CS Discoveries — SMP 🔍',
    desc: 'CS Discoveries (CSD) adalah kursus pengantar ilmu komputer untuk SMP (kelas 6-10, usia 12-16 tahun). Kurikulum modular dan fleksibel — fokus pada eksplorasi berbagai bidang kreatif dalam teknologi.',
    info: [
      { label: 'Tujuan', value: 'Pemahaman luas tentang CS melalui proyek nyata' },
      { label: 'Filosofi', value: 'Modular — sesuaikan dengan minat siswa dan durasi tersedia' },
      { label: 'Alat', value: 'App Lab, Game Lab, Web Lab' },
      { label: 'Usia', value: '12-16 tahun (Kelas 6-10)' },
    ],
    tips: [
      'Anda tidak harus mengajar semua unit — pilih 2-3 yang paling relevan',
      'Kombinasi populer: Unit 2 (Web Development) + Unit 3 (Interactive Animations)',
      'Fokus pada proses desain: Identifikasi Masalah → Brainstorming → Prototipe → Uji → Iterasi',
      'Proyek akhir terbuka — beri siswa kebebasan berkreasi sesuai minat',
    ],
    link: 'https://studio.code.org/projects/',
    linkLabel: 'Jelajahi Proyek Siswa',
    tabel: [
      { kolom1: 'Unit 1', kolom2: 'Problem Solving & Computing', kolom3: 'Solusi masalah nyata (unplugged)' },
      { kolom1: 'Unit 2', kolom2: 'Web Development', kolom3: 'Website portofolio dengan HTML & CSS' },
      { kolom1: 'Unit 3', kolom2: 'Interactive Animations & Games', kolom3: 'Game & animasi dengan Game Lab (JS)' },
      { kolom1: 'Unit 4', kolom2: 'The Design Process', kolom3: 'Aplikasi mobile untuk komunitas' },
      { kolom1: 'Unit 5', kolom2: 'Data and Society', kolom3: 'Analisis data & visualisasi' },
      { kolom1: 'Unit 6', kolom2: 'Physical Computing', kolom3: 'Micro:bit & perangkat interaktif' },
    ],
  },
  'cs-principles': {
    title: 'CS Principles — SMA 🧠',
    desc: 'CS Principles (CSP) adalah kursus pengantar CS mendalam untuk SMA, setara satu semester kuliah. Diakui College Board sebagai kursus AP (Advanced Placement). Fokus pada internet, data, algoritma, dan dampak global komputasi.',
    info: [
      { label: 'Tujuan', value: 'Pemahaman kuat tentang konsep CS fundamental' },
      { label: 'Struktur', value: '8 unit + persiapan ujian AP' },
      { label: 'Bahasa', value: 'JavaScript di App Lab Code.org' },
      { label: 'Usia', value: '14-18 tahun (Kelas 9-12)' },
    ],
    tips: [
      'Pahami struktur ujian AP CSP: Performance Tasks (Create & Explore) adalah komponen besar nilai',
      'Gunakan panduan pacing Code.org untuk merencanakan kurikulum setahun penuh',
      'Tekankan "Big Ideas": Kreativitas, Abstraksi, Data, Algoritma, Dampak Global',
      'Dorong kolaborasi, tapi ingatkan bahwa Performance Tasks harus karya individu',
    ],
    link: 'https://studio.code.org/projects/applab/new',
    linkLabel: 'Coba App Lab (Lingkungan CSP)',
    tabel: [
      { kolom1: 'Unit 1', kolom2: 'Digital Information', kolom3: 'Biner, kompresi data, enkripsi' },
      { kolom1: 'Unit 2', kolom2: 'The Internet', kolom3: 'HTTP, DNS, TCP/IP, keamanan siber' },
      { kolom1: 'Unit 3', kolom2: 'Intro to Programming', kolom3: 'Variabel, fungsi, kondisional, loop (JS)' },
      { kolom1: 'Unit 4', kolom2: 'Libraries & Algorithms', kolom3: 'Library, efisiensi algoritma, simulasi' },
      { kolom1: 'Unit 5', kolom2: 'Data Analysis', kolom3: 'Visualisasi data, etika, pencarian info' },
      { kolom1: 'Unit 6', kolom2: 'Cybersecurity & Global Impacts', kolom3: 'Kriptografi, dampak sosial, inovasi' },
      { kolom1: 'Unit 7', kolom2: 'AP Performance Tasks', kolom3: 'Create Task & Explore Task' },
      { kolom1: 'Unit 8', kolom2: 'AP Exam Prep', kolom3: 'Review & latihan soal pilihan ganda' },
    ],
  },
};

export default function KurikulumPage() {
  const [activeTab, setActiveTab] = useState('hour-of-code');
  const content = tabContent[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 flex items-center gap-4">
            <BookOpen className="h-10 w-10 text-indigo-600" />
            Kurikulum Code.org
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Roadmap interaktif kurikulum coding dari Code.org — dari Hour of Code untuk pemula hingga CS Principles setara kuliah untuk SMA.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                size="lg"
                className={`h-16 text-lg font-bold px-6 ${
                  activeTab === tab.id
                    ? `${tab.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2 text-2xl">{tab.icon}</span>
                {tab.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {content.info.map((item, i) => (
              <Card key={i} className="border-2 border-indigo-100">
                <CardHeader className="pb-2">
                  <CardDescription className="text-base font-semibold text-indigo-600">{item.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-800">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Description */}
          <Card className="border-2 border-indigo-100 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-gray-700 leading-relaxed">{content.desc}</p>
            </CardContent>
          </Card>

          {/* Sections for Hour of Code */}
          {content.sections && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {content.sections.map((sec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-white h-full">
                    <CardHeader className="items-center text-center">
                      <span className="text-5xl mb-3">{sec.icon}</span>
                      <CardTitle className="text-xl">{sec.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base text-gray-700 text-center">{sec.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Table */}
          {content.tabel && (
            <Card className="border-2 border-indigo-100 mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Peta Kurikulum Berjenjang</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-indigo-100">
                        <th className="py-3 pr-4 text-base font-semibold text-gray-700">Kursus/Unit</th>
                        <th className="py-3 pr-4 text-base font-semibold text-gray-700">Target</th>
                        <th className="py-3 text-base font-semibold text-gray-700">Fokus Topik</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.tabel.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-indigo-50/50">
                          <td className="py-3 pr-4 text-base font-bold text-gray-800">{row.kolom1}</td>
                          <td className="py-3 pr-4 text-base text-gray-700">{row.kolom2}</td>
                          <td className="py-3 text-base text-gray-600">{row.kolom3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips & CTA */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-2 border-yellow-100 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                  Tips untuk Pengajar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {content.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                      <CheckCircleIcon className="mt-1" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">
                  <Globe className="inline h-6 w-6 mr-2" />
                  Mulai Sekarang
                </CardTitle>
                <CardDescription className="text-base text-indigo-100">
                  Buka langsung di Code.org untuk mulai mengajar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href={content.link} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full h-20 text-xl font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg">
                    <ExternalLink className="mr-3 h-7 w-7" />
                    {content.linkLabel}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={`h-6 w-6 text-yellow-500 flex-shrink-0 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
