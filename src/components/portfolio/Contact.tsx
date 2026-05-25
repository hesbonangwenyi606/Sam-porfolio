import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Send, CheckCircle2, Loader2 } from 'lucide-react';

const references = [
  { name: 'John Mwangi', role: 'Senior Software Engineer, Tech Solutions Ltd', email: 'john.mwangi@techsolutions.co.ke', phone: '+254 700 123456' },
  { name: 'Grace Wanjiru', role: 'Project Manager, BrightCode Technologies', email: 'grace.wanjiru@brightcode.co.ke', phone: '+254 701 654321' },
  { name: 'Samuel Karanja', role: 'Lecturer, Multimedia University of Kenya', email: 'skaranja@mmu.ac.ke', phone: '+254 702 987654' },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      await fetch('/api/crm/6a14161523547f4294e8098a/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.name, message: form.message }),
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#0b1020] via-slate-900 to-[#0b1020] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan-400 font-semibold tracking-widest text-sm uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Build Something Great</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Drop me a message and I'll get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-4 mb-10">
              <a href="mailto:Sammbogo81@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                <div className="w-11 h-11 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="font-medium">Sammbogo81@gmail.com</div>
                </div>
              </a>
              <a href="tel:+254271115681" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                <div className="w-11 h-11 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Phone</div>
                  <div className="font-medium">+254 27 115 681</div>
                </div>
              </a>
              <a href="https://github.com/samuel-m765" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                <div className="w-11 h-11 rounded-lg bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                  <Github className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">GitHub</div>
                  <div className="font-medium">samuel-m765</div>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-11 h-11 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Location</div>
                  <div className="font-medium">Nairobi, Kenya</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">References</h3>
            <div className="space-y-3">
              {references.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-semibold text-cyan-300">{r.name}</div>
                  <div className="text-xs text-slate-400 mb-2">{r.role}</div>
                  <div className="text-xs text-slate-300">
                    <a href={`mailto:${r.email}`} className="hover:text-cyan-400">{r.email}</a>
                    <span className="mx-2 text-slate-600">|</span>
                    <span>{r.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0b1020] font-semibold hover:shadow-xl hover:shadow-cyan-500/40 transition-all disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : status === 'success' ? (
                    <><CheckCircle2 className="w-4 h-4" /> Message Sent!</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
