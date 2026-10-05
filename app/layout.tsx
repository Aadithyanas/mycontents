import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Neutral_fx | Secure Creator Portfolio & Protected Media Management',
  description:
    'A high-end cinematic creator portfolio and protected media streaming system featuring Zero-Trust RBAC, dynamic forensic watermarking, and network telemetry.',
  keywords: [
    'Digital Creator Portfolio',
    'Protected Video Management',
    'Cinematic 4K 8K Video',
    'Information Security',
    'Forensic Watermarking',
    'Advanced Computer Networks',
  ],
  authors: [{ name: 'Aadithyan A.S.' }],
  openGraph: {
    title: 'Neutral_fx - Secure Creator Portfolio & Protected Video Management',
    description: 'Cinematic digital creator portfolio and protected video content management system.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07080b] text-[#f4f4f5] flex flex-col font-sans selection:bg-amber-500 selection:text-black`}
      >
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            theme="dark"
            closeButton
            toastOptions={{
              style: {
                background: '#0d1117',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f4f4f5',
                fontSize: '12px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
