"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Target,
  Eye,
  GraduationCap,
  Send,
  CheckCircle,
  Mail,
  User,
  MessageSquare,
  FileText,
  ArrowUpRight,
  Asterisk
} from "lucide-react";
import { milestones, facultyAdvisors } from "@/data/about";
import { stringToColor, getInitials, cn } from "@/lib/utils";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Timeline() {
  return (
    <section className="py-32 relative">
      <div className="flex flex-col items-center mb-20 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40 mb-6">Our Evolution</span>
        <h2 className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter leading-[0.9]">
          The Journey <br/> So Far.
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Cinematic Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#111111]/10 to-transparent hidden md:block" />

        <div className="space-y-24">
          {milestones.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  isLeft ? "md:text-right" : "md:flex-row-reverse md:text-left"
                )}
              >
                {/* Year Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#f5f0e8] border border-[#111111]/10 z-10 hidden md:flex items-center justify-center font-black text-[10px] text-[#111111]">
                  {milestone.year}
                </div>

                <div className={cn("w-full md:w-[45%]", isLeft ? "md:pr-12" : "md:pl-12")}>
                  <span className="text-[10px] font-black text-[#A3E635] uppercase tracking-widest mb-2 block md:hidden">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-[#111111] tracking-tight mb-4 leading-none">
                    {milestone.title}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-[#111111]/50 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
                
                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group bg-[#111111] rounded-[40px] p-10 md:p-16 overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#A3E635]/10 blur-[80px] pointer-events-none" />
          <Target size={40} className="text-[#A3E635] mb-8" strokeWidth={1.5} />
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6">Our Mission</h3>
          <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed">
            To foster a vibrant community of computing enthusiasts at SVNIT, bridging the gap between academic learning and real-world craftsmanship. We empower students to innovate through collaborative building.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group bg-white border border-[#111111]/5 rounded-[40px] p-10 md:p-16 overflow-hidden shadow-2xl shadow-[#111111]/5"
        >
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#8B5CF6]/5 blur-[80px] pointer-events-none" />
          <Eye size={40} className="text-[#8B5CF6] mb-8" strokeWidth={1.5} />
          <h3 className="text-3xl md:text-4xl font-black text-[#111111] tracking-tighter mb-6">Our Vision</h3>
          <p className="text-[#111111]/50 text-base md:text-lg font-medium leading-relaxed">
            To be recognized as a world-class launching pad for future tech leaders and innovators — where every student has access to high-end computing education and creative mentorship.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FacultyAdvisors() {
  return (
    <section className="py-32">
      <div className="flex flex-col items-start mb-16">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40 mb-6">Academic Guidance</span>
        <h2 className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter leading-[0.9]">
          Mentorship & <br/> Leadership.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {facultyAdvisors.map((advisor, i) => (
          <motion.div 
            key={advisor.name} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#111111]/[0.02] border border-[#111111]/5 rounded-[32px] p-8 md:p-10 hover:bg-white hover:shadow-2xl hover:shadow-[#111111]/5 transition-all duration-500"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 text-xl font-black text-white border border-[#111111]/10 overflow-hidden"
                style={{ backgroundColor: stringToColor(advisor.name) }}
              >
                {getInitials(advisor.name)}
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#111111] tracking-tight">{advisor.name}</h3>
                <p className="text-sm font-bold text-[#8B5CF6] uppercase tracking-widest mt-1">{advisor.title}</p>
                <div className="flex items-center gap-1.5 text-xs font-black text-[#111111]/30 mt-3 uppercase tracking-widest">
                  <GraduationCap size={14} />
                  {advisor.department}
                </div>
              </div>
            </div>
            <p className="text-sm md:text-base font-medium text-[#111111]/50 leading-relaxed mt-8">
              {advisor.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyles = cn(
    "w-full px-0 py-4 bg-transparent border-b border-[#111111]/10 text-[#111111] text-lg font-medium placeholder:text-[#111111]/20 focus:outline-none focus:border-[#A3E635] transition-all"
  );

  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40 mb-6 block">Get In Touch</span>
          <h2 className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter leading-[0.9] mb-8">
            Let&apos;s Build <br/> Together.
          </h2>
          <p className="text-lg font-medium text-[#111111]/50 leading-relaxed mb-12">
            Have a question, a proposal, or just want to say hi? Our collective is always open to curious minds and creative collaborations.
          </p>
          
          <div className="flex flex-col gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-[#A3E635]">
                  <Mail size={18} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#111111]/30">Email Us</p>
                   <p className="text-lg font-black text-[#111111]">acm@svnit.ac.in</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-[#8B5CF6]">
                  <Target size={18} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#111111]/30">Location</p>
                   <p className="text-lg font-black text-[#111111]">SVNIT Surat, India</p>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-[#111111]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Asterisk size={120} strokeWidth={1} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative z-10" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#111111]/30">Full Name</label>
                <input {...register("name", { required: "Name is required" })} className={inputStyles} placeholder="John Doe" />
                {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.name.message}</p>}
              </div>
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#111111]/30">Email Address</label>
                <input type="email" {...register("email", { required: "Email is required" })} className={inputStyles} placeholder="john@example.com" />
                {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.email.message}</p>}
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#111111]/30">Subject</label>
              <input {...register("subject", { required: "Subject is required" })} className={inputStyles} placeholder="Inquiry about domains" />
              {errors.subject && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.subject.message}</p>}
            </div>

            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#111111]/30">Your Message</label>
              <textarea rows={4} {...register("message", { required: "Message is required" })} className={cn(inputStyles, "resize-none")} placeholder="Tell us what's on your mind..." />
              {errors.message && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full flex items-center justify-center gap-3 px-10 py-6 rounded-2xl bg-[#111111] text-white text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-[#A3E635] hover:text-[#111111] disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Submit Message"}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>

          {submitted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-[#A3E635] z-50 flex flex-col items-center justify-center text-center p-12"
            >
              <CheckCircle size={64} className="text-[#111111] mb-6" />
              <h3 className="text-3xl font-black text-[#111111] tracking-tighter mb-4">Message Received.</h3>
              <p className="text-[#111111]/70 font-medium max-w-xs mx-auto">We&apos;ll get back to you shortly. Stay curious.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AboutPageContent() {
  return (
    <div className="bg-[#f5f0e8] min-h-screen pt-40 pb-20 selection:bg-[#111111] selection:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-32"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40 mb-8 block">About The Chapter</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#111111] tracking-tighter leading-[0.8] mb-10">
            A Collective <br/> Built on <span className="italic font-serif font-normal pr-4">Craft.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#111111]/60 leading-relaxed max-w-2xl">
            Founded in 2011, we are the SVNIT chapter of the world&apos;s largest computing society — pushing the boundaries of code, design, and innovation.
          </p>
        </motion.div>

        <MissionVision />
        <Timeline />
        <FacultyAdvisors />
        <ContactSection />
      </div>
    </div>
  );
}
