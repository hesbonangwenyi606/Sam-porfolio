import React, { useState } from 'react';
import { Briefcase, ChevronDown, MapPin, Calendar } from 'lucide-react';

const jobs = [
  {
    role: 'Full Stack Software Engineer',
    company: 'Tech Solutions Ltd',
    location: 'Nairobi, Kenya',
    period: 'January 2022 – Present',
    points: [
      'Developed and maintained high-performing web applications used by over 1,000 daily active users.',
      'Designed and implemented RESTful APIs, integrating front-end interfaces with back-end databases.',
      'Led the migration of legacy systems to modern web technologies, improving performance by 30%.',
      'Collaborated with designers, QA, and project managers to deliver features on schedule.',
      'Implemented authentication, authorization, and secure data handling to ensure compliance with best practices.',
      'Mentored junior developers on coding standards, debugging techniques, and best practices.',
    ],
  },
  {
    role: 'Junior Web Developer',
    company: 'BrightCode Technologies',
    location: 'Nairobi, Kenya',
    period: 'January 2021 – December 2021',
    points: [
      'Assisted in creating dynamic web applications and internal management tools.',
      'Maintained databases and implemented data models to support application functionalities.',
      'Participated in agile workflows, including sprint planning, daily stand-ups, and retrospectives.',
      'Contributed to improving code quality through peer reviews and documentation.',
      'Gained hands-on experience in deploying web applications to production environments.',
    ],
  },
];

const Experience: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan-600 font-semibold tracking-widest text-sm uppercase mb-3">Work Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1020] mb-4">
            My Professional Journey
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-orange-400 to-transparent" />

          {jobs.map((job, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="relative pl-12 sm:pl-16 pb-10 last:pb-0">
                <div className="absolute left-0 sm:left-2 w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-orange-500 flex items-center justify-center ring-4 ring-white">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>

                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-6 transition-all"
                >
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#0b1020]">{job.role}</h3>
                      <p className="text-cyan-600 font-semibold">{job.company}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {job.period}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-2 text-slate-600">
                      {job.points.map((p, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-cyan-500 mt-1.5 flex-shrink-0">▹</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
