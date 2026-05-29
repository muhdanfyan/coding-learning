'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  BookOpen,
  Code,
  Users,
  GraduationCap,
  School,
  ArrowRight,
  Lightbulb,
  BookMarked,
  LogOut,
  Beaker,
} from 'lucide-react';

const jenjangList = [
  {
    id: 'sd',
    label: 'SD',
    usia: 'Kelas 1-6 (6-12 tahun)',
    color: 'green',
    gradient: 'from-green-50 to-green-100',
    border: 'border-green-200',
    iconColor: 'text-green-600',
    badgeColor: 'bg-green-500',
    platforms: 'Scratch, Lightbot, Kodable, Blockly',
    description: 'Fondasi coding visual untuk pemula',
  },
  {
    id: 'smp',
    label: 'SMP',
    usia: 'Kelas 7-9 (12-15 tahun)',
    color: 'yellow',
    gradient: 'from-yellow-50 to-yellow-100',
    border: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    badgeColor: 'bg-yellow-500',
    platforms: 'Scratch, CodeCombat, App Inventor, Tynker',
    description: 'Eksplorasi coding interaktif & aplikasi',
  },
  {
    id: 'sma',
    label: 'SMA',
    usia: 'Kelas 10-12 (15-18 tahun)',
    color: 'orange',
    gradient: 'from-orange-50 to-orange-100',
    border: 'border-orange-200',
    iconColor: 'text-orange-600',
    badgeColor: 'bg-orange-500',
    platforms: 'Python, mBlock, Khan Academy, CodeCombat',
    description: 'Pemrograman teks & persiapan AP/IB',
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-10 w-10 text-indigo-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Dashboard Guru
              </h1>
            </div>
            <Button variant="outline" size="lg" className="h-14 text-base" onClick={() => router.push('/')}>
              <LogOut className="mr-2 h-5 w-5" />
              Keluar
            </Button>
          </div>
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                <GraduationCap className="h-8 w-8" />
                Selamat datang, Guru Coding!
              </CardTitle>
              <CardDescription className="text-lg text-indigo-100">
                Hari ini kamu siap mengajar? Pilih jenjang kelas di bawah untuk memulai.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Pilih Jenjang */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <School className="h-7 w-7 text-indigo-600" />
            Pilih Jenjang Kelas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {jenjangList.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => router.push(`/teach/${item.id}`)}
              >
                <Card className={`bg-gradient-to-br ${item.gradient} ${item.border} hover:shadow-2xl transition-all border-2 h-full`}>
                  <CardHeader className="items-center text-center">
                    <Users className={`h-20 w-20 ${item.iconColor} mb-2`} />
                    <CardTitle className="text-3xl font-extrabold">{item.label}</CardTitle>
                    <CardDescription className="text-lg">{item.usia}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-base text-gray-700 mb-4">{item.description}</p>
                    <Badge className={`${item.badgeColor} text-white text-base px-4 py-1`}>
                      {item.platforms}
                    </Badge>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button size="lg" className={`h-16 w-full text-lg font-bold text-white shadow-lg ${
                      item.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                      item.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' :
                      'bg-orange-600 hover:bg-orange-700'
                    }`}>
                      Mulai Mengajar {item.label}
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rekomendasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card className="border-2 border-indigo-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lightbulb className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle className="text-xl">Rekomendasi Materi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg text-gray-600">
                Berdasarkan jenjang yang dipilih, kami rekomendasikan:
              </p>
              <ul className="space-y-2 text-base">
                <li className="flex items-center gap-2 text-gray-700">
                  <Badge className="bg-green-500 text-white">SD</Badge>
                  ScratchJr → Lightbot → Scratch
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Badge className="bg-yellow-500 text-white">SMP</Badge>
                  Scratch → CodeCombat → App Inventor
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Badge className="bg-orange-500 text-white">SMA</Badge>
                  Khan Academy → mBlock → Python
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookMarked className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle className="text-xl">Akses Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button size="lg" variant="outline" className="w-full h-16 text-lg justify-start" onClick={() => router.push('/platform')}>
                <Code className="mr-3 h-6 w-6 text-indigo-600" />
                12 Platform Coding
                <ArrowRight className="ml-auto h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full h-16 text-lg justify-start" onClick={() => router.push('/metodologi')}>
                <Beaker className="mr-3 h-6 w-6 text-indigo-600" />
                6 Metodologi Pembelajaran
                <ArrowRight className="ml-auto h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full h-16 text-lg justify-start" onClick={() => router.push('/kurikulum')}>
                <BookOpen className="mr-3 h-6 w-6 text-indigo-600" />
                Kurikulum Code.org
                <ArrowRight className="ml-auto h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
