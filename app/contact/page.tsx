'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, MapPin, Phone, Send, Clock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Commercial Campaign Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please complete all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Your message has been transmitted to Aadithyan A.S. and production management.');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-2 border-b border-white/5 pb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              <Mail className="w-4 h-4" />
              Direct Communication Channel
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Commercial Directing & Licensing Inquiries
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Inquire regarding automotive commercial direction, documentary co-productions, high-speed cinematography, or secure screener licensing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information & Studios */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Studio Locations
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-200 block">Mumbai Production Hub</strong>
                      <span className="text-zinc-400 leading-relaxed">
                        Bandra West Film Quarter, Mumbai, Maharashtra 400050
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-200 block">Kochi Post-Production Suite</strong>
                      <span className="text-zinc-400 leading-relaxed">
                        Fort Kochi Waterfront Media Labs, Kochi, Kerala 682001
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-zinc-300 font-mono">aadithyan@creatorstudio.dev</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-zinc-400">Response turnaround: Within 24 Hours</span>
                  </div>
                </div>
              </div>

              {/* Security Policy Badge */}
              <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/15 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Confidentiality Assured
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  All treatments, script drafts, and unreleased client footage requests are protected under mutual NDA protocols.
                </p>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl glass-dropdown border border-white/10 space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Patel"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1.5">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@agency.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Commercial Campaign Inquiry">Commercial Campaign Directing Inquiry</option>
                    <option value="Feature / Short Film Co-Production">Feature / Short Film Co-Production</option>
                    <option value="Festival Screener Rights">Film Festival Screener & Panorama Rights</option>
                    <option value="Color Conform & Technical Post">ACEScg Color Grading & Post-Production</option>
                    <option value="Other Commercial Collaboration">Other Commercial Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5">Message / Project Brief</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Outline your project scope, timeline, shooting location, and required deliverables..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-xs bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Transmitting...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
