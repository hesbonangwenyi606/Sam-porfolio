import React from 'react';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';

const education = [
  {
    school: 'Moringa School',
    program: 'Certificate in Full Stack Software Engineering',
    year: '2024',
  },
  {
    school: 'Multimedia University of Kenya (MMU)',
    program: 'Diploma in Computer Science',
    year: '2022',
  },
  {
    school: 'Nduru Boys High School',
    program: 'Kenya Certificate of Secondary Education (KCSE)',
    year: '2019',
  },
];

const highlights = [
  'Delivered multiple full-stack applications from concept to deployment',
  'Recognized for writing clean, maintainable code and following industry best practices',
  'Experienced in collaborative agile development',
  'Strong problem-solving and analytical thinking skills',
  'Passionate about learning emerging technologies such as DevOps and cloud deployment',
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan-600 font-semibold tracking-widest text-sm uppercase mb-3">Education & Certifications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1020] mb-4">
            Academic & Professional Credentials
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-cyan-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1020]">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((e, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h4 className="font-bold text-[#0b1020]">{e.school}</h4>
                    <span className="text-sm font-semibold text-cyan-600 whitespace-nowrap">{e.year}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{e.program}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1020]">Certifications & Highlights</h3>
            </div>

            <div className="bg-gradient-to-br from-[#0b1020] to-slate-800 rounded-2xl p-6 text-white mb-4">
              <div className="text-sm text-cyan-300 font-semibold mb-1">Featured Certification</div>
              <div className="text-lg font-bold mb-1">Full Stack Software Engineering</div>
              <div className="text-slate-400 text-sm">Moringa School • 2024</div>
            </div>

            <ul className="space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
