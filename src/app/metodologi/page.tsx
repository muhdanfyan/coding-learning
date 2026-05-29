'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beaker, BookOpen, ArrowRight } from 'lucide-react';

const metodologi = [
  {
    id: 'game-based-learning',
    title: 'Game-Based Learning',
    icon: '🎮',
    subtitle: 'Pembelajaran Berbasis Game',
    color: 'from-green-50 to-emerald-100',
    border: 'border-emerald-200',
    desc: 'Mengubah proses belajar pemrograman menjadi permainan yang menarik dengan aturan, tujuan, dan tantangan yang jelas.',
    cocok: 'Semua usia — terutama SD & SMP',
    platform: 'Lightbot, Kodable, CodeCombat, CodeMonkey',
  },
  {
    id: 'project-based-learning',
    title: 'Project-Based Learning',
    icon: '🏗️',
    subtitle: 'Pembelajaran Berbasis Proyek',
    color: 'from-blue-50 to-indigo-100',
    border: 'border-indigo-200',
    desc: 'Siswa belajar coding dengan membuat proyek nyata yang bermakna — bukan sekadar latihan, tapi produk yang bisa dibagikan.',
    cocok: 'SMP & SMA',
    platform: 'Scratch, App Inventor, mBlock, Khan Academy',
  },
  {
    id: 'problem-based-learning',
    title: 'Problem-Based Learning',
    icon: '🔎',
    subtitle: 'Pembelajaran Berbasis Masalah',
    color: 'from-yellow-50 to-amber-100',
    border: 'border-amber-200',
    desc: 'Siswa belajar coding melalui pemecahan masalah kompleks dan otentik yang disajikan di awal pembelajaran.',
    cocok: 'SMP & SMA',
    platform: 'Scratch, Tynker, Blockly, CodeCombat',
  },
  {
    id: 'collaborative-learning',
    title: 'Collaborative Learning',
    icon: '🤝',
    subtitle: 'Pembelajaran Kolaboratif',
    color: 'from-purple-50 to-violet-100',
    border: 'border-violet-200',
    desc: 'Siswa bekerja bersama dalam kelompok. Pair programming dan code review adalah praktik inti dalam metodologi ini.',
    cocok: 'Semua usia',
    platform: 'Scratch, Tynker, App Inventor, CodeCombat',
  },
  {
    id: 'inquiry-based-learning',
    title: 'Inquiry-Based Learning',
    icon: '🤔',
    subtitle: 'Pembelajaran Berbasis Inkuiri',
    color: 'from-cyan-50 to-sky-100',
    border: 'border-sky-200',
    desc: 'Siswa didorong oleh rasa ingin tahu untuk menyelidiki, bereksperimen, dan membangun pemahaman coding secara mandiri.',
    cocok: 'SMP & SMA',
    platform: 'Scratch, Tynker, Blockly, Khan Academy',
  },
  {
    id: 'mastery-based-learning',
    title: 'Mastery-Based Learning',
    icon: '🏆',
    subtitle: 'Pembelajaran Berbasis Penguasaan',
    color: 'from-orange-50 to-red-100',
    border: 'border-orange-200',
    desc: 'Siswa harus menguasai satu konsep sebelum melanjutkan ke konsep berikutnya. Waktu adalah variabel, bukan target.',
    cocok: 'Semua usia',
    platform: 'Kodable, Lightbot, CodeMonkey, Khan Academy',
  },
];

export default function MetodologiPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 flex items-center gap-4">
            <Beaker className="h-10 w-10 text-indigo-600" />
            6 Metodologi Pembelajaran
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Pilih pendekatan pengajaran yang paling sesuai dengan kelasmu. Setiap metodologi dilengkapi langkah aksi langsung untuk guru.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metodologi.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Card className={`border-2 ${m.border} bg-gradient-to-br ${m.color} hover:shadow-2xl transition-all h-full cursor-pointer`}
                onClick={() => router.push(`/metodologi/${m.id}`)}
              >
                <CardHeader className="text-center">
                  <span className="text-6xl mb-4 block">{m.icon}</span>
                  <CardTitle className="text-2xl font-bold">{m.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-600">{m.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">{m.desc}</p>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-sm">{m.cocok}</Badge>
                    <p className="text-sm text-gray-500 mt-2">Platform: {m.platform}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full h-14 text-lg">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Lihat Langkah Aksi
                    <ArrowRight className="ml-2 h-5 w-5" />
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
