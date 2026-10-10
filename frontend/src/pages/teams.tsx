import Head from 'next/head';
import { Navbar } from '@/components/navigation/Navbar';
import { teacherMentor, organizers, coreTeam } from '@/data/team';
import { TeamCard } from '@/components/team/TeamCard';
import { motion } from 'framer-motion';

export default function Teams() {
  return (
    <>
      <Head>
        <title>Team | GDGoc FIEM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative min-h-screen bg-white font-sans selection:bg-[#050505] selection:text-[#F3F0E8] overflow-hidden">
        {/* Background Gridlines */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)`,
            backgroundSize: '4rem 4rem',
          }}
        />

        <Navbar theme="light" />
        
        <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
          {/* Header Section */}
          <div className="max-w-4xl mb-24 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block py-1.5 px-3 border-[2px] border-[#050505] bg-white text-[#050505] text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-[3px_3px_0px_#050505] mb-8">
                The People Behind The Progress
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#050505] tracking-tighter mb-6 uppercase leading-[0.9]">
                Different Minds.<br />One Community.
              </h1>
              <p className="text-lg md:text-xl text-[#575550] max-w-2xl font-medium leading-relaxed">
                Meet the people turning curiosity into creation and bringing our developer community to life.
              </p>
            </motion.div>
          </div>

          {/* Teacher Mentor */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <div className="text-center w-full mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-[#050505] uppercase tracking-tighter border-b-[3px] border-[#050505] pb-2 inline-block px-4">
                Faculty Coordinator
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {teacherMentor.map((member) => (
                <div key={member.id} className="lg:col-span-1">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </motion.section>

          {/* Organizers */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <div className="text-center w-full mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-[#050505] uppercase tracking-tighter border-b-[3px] border-[#050505] pb-2 inline-block px-4">
                Organizers
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {organizers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </motion.section>

          {/* Core Team */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <div className="text-center w-full mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-[#050505] uppercase tracking-tighter border-b-[3px] border-[#050505] pb-2 inline-block px-4">
                Core Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
              {coreTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
