import React, { useEffect, useRef, useState } from 'react';
import { Layout, Server, Database, Wrench } from 'lucide-react';

type Skill = { name: string; level: number };
type Category = { title: string; icon: React.ElementType; color: string; skills: Skill[] };

const categories: Category[] = [
  {
    title: 'Front-end',
    icon: Layout,
    color: 'from-cyan-400 to-blue-500',
    skills: [
      { name: 'React', level: 92 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML & CSS', level: 95 },
      { name: 'Redux', level: 82 },
      { name: 'Responsive Design', level: 90 },
    ],
  },
  {
    title: 'Back-end',
    icon: Server,
    color: 'from-orange-400 to-red-500',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 87 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'Authentication & Authorization', level: 85 },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'from-emerald-400 to-teal-500',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 78 },
      { name: 'Firebase', level: 75 },
    ],
  },
  {
    title: 'Tools & Practices',
    icon: Wrench,
    color: 'from-violet-400 to-purple-500',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'Docker', level: 72 },
      { name: 'Jest Testing', level: 78 },
      { name: 'Agile & Scrum', level: 85 },
      { name: 'CI/CD Basics', level: 70 },
    ],
  },
];

const Skills: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan-600 font-semibold tracking-widest text-sm uppercase mb-3">Technical Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1020] mb-4">
            My Tech Stack & Expertise
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A versatile toolkit honed across 2+ years of professional development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0b1020]">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((s, j) => (
                  <div key={j}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">{s.name}</span>
                      <span className="text-slate-500">{s.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: visible ? `${s.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
