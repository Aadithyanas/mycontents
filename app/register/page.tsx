import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 w-full max-w-md">
          <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
