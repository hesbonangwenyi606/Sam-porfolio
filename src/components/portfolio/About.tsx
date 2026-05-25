import React from 'react';
import { Users, Zap, ShieldCheck, GraduationCap } from 'lucide-react';

const stats = [
  { icon: Users, value: '1,000+', label: 'Daily Active Users Served' },
  { icon: Zap, value: '30%', label: 'Performance Improvement' },
  { icon: ShieldCheck, value: '5+', label: 'Full Stack Apps Deployed' },
  { icon: GraduationCap, value: '3', label: 'Certifications Earned' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan-600 font-semibold tracking-widest text-sm uppercase mb-3">About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1020] mb-4">
            Building software that drives real impact
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            I'm passionate about continuous learning, problem-solving, and using technology to drive
            innovation. With strong foundations in both front-end and back-end development, I love
            collaborating with cross-functional teams to deliver projects that meet business needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group bg-slate-50 hover:bg-gradient-to-br hover:from-[#0b1020] hover:to-slate-800 border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-100 group-hover:bg-cyan-400/20 flex items-center justify-center mb-4 transition-colors">
                <s.icon className="w-6 h-6 text-cyan-600 group-hover:text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-[#0b1020] group-hover:text-white mb-1">{s.value}</div>
              <div className="text-sm text-slate-600 group-hover:text-slate-300">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#0b1020] to-slate-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">What I Bring</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3"><span className="text-cyan-400 mt-1">▹</span> Clean, maintainable code following industry best practices</li>
              <li className="flex gap-3"><span className="text-cyan-400 mt-1">▹</span> Strong problem-solving and analytical thinking skills</li>
              <li className="flex gap-3"><span className="text-cyan-400 mt-1">▹</span> Collaborative agile development experience</li>
              <li className="flex gap-3"><span className="text-cyan-400 mt-1">▹</span> Mentorship and code review leadership</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-slate-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 text-[#0b1020]">Currently Exploring</h3>
            <div className="flex flex-wrap gap-2">
              {['DevOps', 'AWS Cloud', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Microservices', 'GraphQL', 'TypeScript'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-sm font-medium border border-cyan-200">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 text-slate-600 text-sm leading-relaxed">
              Passionate about learning emerging technologies and applying them to build robust,
              production-ready systems that scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
