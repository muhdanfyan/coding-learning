'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="border-2 border-indigo-100 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Code className="h-20 w-20 mx-auto text-indigo-600 mb-4" />
            </motion.div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
              Masuk Guru
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 mt-2">
              SMART Board Teaching Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-4">
            <Button
              size="lg"
              className="w-full h-20 text-xl font-semibold bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-800 shadow-md"
              variant="outline"
            >
              <svg className="mr-4 h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              Masuk dengan Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-base">
                <span className="bg-white px-4 text-gray-500">atau</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email Guru
                </label>
                <input
                  type="email"
                  placeholder="guru@sekolah.sch.id"
                  className="w-full h-14 px-4 text-lg border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  placeholder="Masukkan kata sandi"
                  className="w-full h-14 px-4 text-lg border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
              </div>
              <Button size="lg" className="w-full h-16 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
                Masuk ke Dashboard
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center pb-6">
            <a href="/" className="text-indigo-600 hover:text-indigo-800 text-base flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </a>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
