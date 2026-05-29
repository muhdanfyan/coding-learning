import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Code,
  GraduationCap,
  Laptop,
  LayoutDashboard,
  LogIn,
  Menu,
  Users,
  Smartphone,
  Brain,
  Gamepad2,
  Globe,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-indigo-600">
              Coding Learning
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tentang" className="text-sm font-medium hover:text-indigo-600">
              Tentang
            </a>
            <a href="#platform" className="text-sm font-medium hover:text-indigo-600">
              Platform
            </a>
            <a href="#kurikulum" className="text-sm font-medium hover:text-indigo-600">
              Kurikulum
            </a>
          </nav>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <LogIn className="mr-2 h-4 w-4" />
            Masuk Guru
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-sm px-4 py-1">
          🚀 Untuk Guru di SMART Board
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
          Ajarkan Coding
          <span className="text-indigo-600"> di SMART Board</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Panduan interaktif untuk guru mengajar coding di sekolah.
          Lengkap dengan lesson plan, link langsung ke 12 platform coding,
          dan metodologi pembelajaran terbaik.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6">
            <GraduationCap className="mr-2 h-5 w-5" />
            Mulai Mengajar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-indigo-200 hover:bg-indigo-50"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Lihat Kurikulum
          </Button>
        </div>
      </section>

      {/* Fitur Cards */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Satu Dashboard untuk Semua Kebutuhan Mengajar
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <LayoutDashboard className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Dashboard Guru</CardTitle>
              <CardDescription>
                Pilih kelas, usia, dan langsung dapatkan lesson plan siap-pakai
                untuk ditampilkan di SMART Board.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Laptop className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>12 Platform Coding</CardTitle>
              <CardDescription>
                Dari ScratchJr hingga mBlock — semua platform dengan link langsung
                dan tips mengajar khusus guru.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>6 Metodologi</CardTitle>
              <CardDescription>
                Game-Based Learning, Project-Based, Collaborative, dan lainnya
                dalam format aksi langsung di kelas.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Jenjang Pendidikan */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pilih Jenjang Kelas
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all cursor-pointer">
            <CardHeader className="items-center text-center">
              <Users className="h-16 w-16 text-green-600 mb-2" />
              <CardTitle className="text-2xl">SD</CardTitle>
              <CardDescription className="text-base">
                Kelas 1-6 (usia 6-12 tahun)
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-green-700">
              <p>Scratch, Lightbot, Kodable, Blockly</p>
            </CardContent>
            <CardFooter className="justify-center">
              <Badge className="bg-green-500 text-white">Mulai</Badge>
            </CardFooter>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-xl transition-all cursor-pointer">
            <CardHeader className="items-center text-center">
              <Users className="h-16 w-16 text-yellow-600 mb-2" />
              <CardTitle className="text-2xl">SMP</CardTitle>
              <CardDescription className="text-base">
                Kelas 7-9 (usia 12-15 tahun)
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-yellow-700">
              <p>Scratch, CodeCombat, App Inventor, Tynker</p>
            </CardContent>
            <CardFooter className="justify-center">
              <Badge className="bg-yellow-500 text-white">Mulai</Badge>
            </CardFooter>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-xl transition-all cursor-pointer">
            <CardHeader className="items-center text-center">
              <Users className="h-16 w-16 text-orange-600 mb-2" />
              <CardTitle className="text-2xl">SMA</CardTitle>
              <CardDescription className="text-base">
                Kelas 10-12 (usia 15-18 tahun)
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-orange-700">
              <p>Python, mBlock, Khan Academy, CodeCombat</p>
            </CardContent>
            <CardFooter className="justify-center">
              <Badge className="bg-orange-500 text-white">Mulai</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-indigo-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <Code className="h-10 w-10 mx-auto mb-4 opacity-75" />
          <p className="text-lg opacity-75">
            Kurikulum oleh <strong>Muhdan Fyan Syah Sofian, S.Kom</strong>
          </p>
          <p className="text-sm opacity-50 mt-2">
            Dikembangkan oleh santri Pondok Informatika
          </p>
        </div>
      </footer>
    </div>
  );
}
