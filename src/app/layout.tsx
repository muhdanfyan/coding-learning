'use client';

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Code, LayoutDashboard, BookOpen, GraduationCap,
  Beaker, LogIn, Moon, Sun, Menu, X,
} from 'lucide-react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const navLinks = [
  { href: '/', label: 'Beranda', icon: Code },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/platform', label: 'Platform', icon: BookOpen },
  { href: '/metodologi', label: 'Metodologi', icon: Beaker },
  { href: '/kurikulum', label: 'Kurikulum', icon: GraduationCap },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Skip navbar for auth pages
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/api');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  // For auth pages, render minimal layout
  if (isAuthPage) {
    return (
      <html lang="id" className={`${inter.variable}`}>
        <body className={`font-sans antialiased ${isDark ? 'dark' : ''}`}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="id" className={`${inter.variable}`}>
      <body className={`font-sans antialiased ${isDark ? 'dark' : ''}`}>
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md dark:bg-gray-900/95 dark:border-gray-700">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <Code className="h-7 w-7 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Coding Learning
              </span>
              <Badge className="ml-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xs">
                SMART Board
              </Badge>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <Button
                    key={link.href}
                    variant={isActive ? 'default' : 'ghost'}
                    size="lg"
                    className={`h-12 text-base font-medium ${
                      isActive
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => router.push(link.href)}
                  >
                    <link.icon className="mr-2 h-5 w-5" />
                    {link.label}
                  </Button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="lg"
                className="h-12 w-12 p-0"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </Button>

              {/* Login */}
              <Button
                size="lg"
                className="hidden md:flex h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => router.push('/login')}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Masuk Guru
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="lg"
                className="md:hidden h-12 w-12 p-0"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4 px-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                  return (
                    <Button
                      key={link.href}
                      variant={isActive ? 'default' : 'ghost'}
                      size="lg"
                      className={`justify-start h-14 text-lg ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => {
                        router.push(link.href);
                        setMenuOpen(false);
                      }}
                    >
                      <link.icon className="mr-3 h-5 w-5" />
                      {link.label}
                    </Button>
                  );
                })}
                <Button
                  size="lg"
                  className="justify-start h-14 text-lg bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
                  onClick={() => {
                    router.push('/login');
                    setMenuOpen(false);
                  }}
                >
                  <LogIn className="mr-3 h-5 w-5" />
                  Masuk Guru
                </Button>
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}
