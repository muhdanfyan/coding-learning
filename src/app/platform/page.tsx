'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Code, Sparkles, Users, BarChart3 } from 'lucide-react';

const platforms = [
  { id: 'scratchjr', name: 'ScratchJr', usia: '5-7', level: 'Pemula', color: 'green', desc: 'Platform pemrograman visual berbasis blok untuk anak usia dini. Anak dapat membuat cerita dan animasi sederhana.', link: 'https://scratchjr.org', icon: '🧩' },
  { id: 'kodable', name: 'Kodable', usia: '5-10', level: 'Pemula', color: 'green', desc: 'Mengajarkan konsep pemrograman melalui game dengan karakter lucu. Cocok untuk pra-sekolah hingga kelas 2 SD.', link: 'https://kodable.com', icon: '🦊' },
  { id: 'scratch', name: 'Scratch', usia: '8-16', level: 'Pemula', color: 'green', desc: 'Platform ikonik dari MIT untuk membuat game, animasi, dan cerita interaktif menggunakan blok kode.', link: 'https://scratch.mit.edu', icon: '🐱' },
  { id: 'tynker', name: 'Tynker', usia: '5-14', level: 'Menengah', color: 'yellow', desc: 'Gabungan pembelajaran berbasis game dan kursus terstruktur. Fitur AI, robotika, dan Minecraft.', link: 'https://tynker.com', icon: '🎮' },
  { id: 'codemonkey', name: 'CodeMonkey', usia: '8-14', level: 'Menengah', color: 'yellow', desc: 'Belajar coding melalui teka-teki membantu monyet dapat pisang. Pengenalan CoffeeScript dan Python.', link: 'https://codemonkey.com', icon: '🐒' },
  { id: 'blockly', name: 'Blockly Games', usia: '8-14', level: 'Pemula', color: 'green', desc: 'Seri game teka-teki menyusun blok kode. Terintegrasi dengan JavaScript dan Python.', link: 'https://blockly.games', icon: '🧊' },
  { id: 'khanacademy', name: 'Khan Academy', usia: '12+', level: 'Menengah', color: 'yellow', desc: 'Platform edukasi dengan kursus pemrograman JavaScript, HTML/CSS, SQL lewat video interaktif.', link: 'https://khanacademy.org/computing', icon: '📚' },
  { id: 'codecombat', name: 'CodeCombat', usia: '10+', level: 'Menengah', color: 'yellow', desc: 'Game RPG yang mengharuskan pemain menulis kode Python/JavaScript untuk mengontrol karakter.', link: 'https://codecombat.com', icon: '⚔️' },
  { id: 'appinventor', name: 'App Inventor', usia: '12+', level: 'Lanjut', color: 'red', desc: 'Platform visual untuk membuat aplikasi Android tanpa perlu pengalaman coding sebelumnya.', link: 'https://appinventor.mit.edu', icon: '📱' },
  { id: 'lightbot', name: 'Lightbot', usia: '6+', level: 'Pemula', color: 'green', desc: 'Game puzzle memprogram robot untuk menyalakan lampu. Tersedia sebagai aplikasi mobile.', link: 'https://lightbot.com', icon: '🤖' },
  { id: 'codeforlife', name: 'Code for Life', usia: '8-14', level: 'Menengah', color: 'yellow', desc: 'Sumber daya gratis untuk sekolah. Game Rapid Router dengan kurikulum align standar pendidikan.', link: 'https://codeforlife.education', icon: '🌐' },
  { id: 'mblock', name: 'mBlock', usia: '8-18+', level: 'Lanjut', color: 'red', desc: 'Pengembangan dari Scratch dengan fitur AI dan IoT. Mendukung transisi dari blok ke Python.', link: 'https://mblock.cc', icon: '🧠' },
];

const levelColor: Record<string, string> = {
  'Pemula': 'bg-green-100 text-green-700 border-green-200',
  'Menengah': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Lanjut': 'bg-red-100 text-red-700 border-red-200',
};

const levelBadge: Record<string, string> = {
  'Pemula': '🟢',
  'Menengah': '🟡',
  'Lanjut': '🔴',
};

export default function PlatformPage() {
  const router = useRouter();
  const [filterUsia, setFilterUsia] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = platforms.filter((p) => {
    if (filterUsia !== 'all') {
      const usiaNum = parseInt(p.usia);
      if (filterUsia === '5-7' && (usiaNum < 5 || usiaNum > 7)) return false;
      if (filterUsia === '8-12' && (usiaNum < 8 || usiaNum > 12)) return false;
      if (filterUsia === '12+' && usiaNum < 12) return false;
    }
    if (filterLevel !== 'all' && p.level !== filterLevel) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 flex items-center gap-4">
            <Code className="h-10 w-10 text-indigo-600" />
            12 Platform Coding
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Pilih platform coding yang sesuai dengan usia dan kemampuan siswa. Setiap platform siap digunakan langsung di SMART Board.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="border-2 border-indigo-100">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Search className="h-5 w-5" /> Cari Platform
                  </label>
                  <input
                    type="text"
                    placeholder="Cari nama atau deskripsi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-14 px-4 text-lg border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5" /> Usia
                  </label>
                  <select
                    value={filterUsia}
                    onChange={(e) => setFilterUsia(e.target.value)}
                    className="h-14 px-4 text-lg border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none min-w-[140px]"
                  >
                    <option value="all">Semua Usia</option>
                    <option value="5-7">5-7 tahun (TK-SD1)</option>
                    <option value="8-12">8-12 tahun (SD)</option>
                    <option value="12+">12+ tahun (SMP-SMA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" /> Level
                  </label>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="h-14 px-4 text-lg border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none min-w-[140px]"
                  >
                    <option value="all">Semua Level</option>
                    <option value="Pemula">🟢 Pemula</option>
                    <option value="Menengah">🟡 Menengah</option>
                    <option value="Lanjut">🔴 Lanjut</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Card
                className="border-2 hover:shadow-2xl transition-all cursor-pointer h-full"
                onClick={() => router.push(`/platform/${p.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{p.icon}</span>
                    <Badge className={`text-sm px-3 py-1 ${levelColor[p.level]}`}>
                      {levelBadge[p.level]} {p.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold">{p.name}</CardTitle>
                  <CardDescription className="text-gray-500 text-base">
                    <Users className="inline h-4 w-4 mr-1" />
                    Usia {p.usia} tahun
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-700 leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full h-14 text-lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Detail Platform
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">Tidak ada platform yang cocok dengan filter.</p>
            <Button variant="outline" size="lg" className="mt-4 h-14 text-lg" onClick={() => { setFilterUsia('all'); setFilterLevel('all'); setSearch(''); }}>
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
