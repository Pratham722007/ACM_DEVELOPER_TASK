"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { milestones, facultyAdvisors } from "@/data/about";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { stringToColor, getInitials } from "@/lib/utils";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Timeline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="font-serif text-5xl text-foreground text-center mb-14 italic">
        Our Journey
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="timeline-line" />

        {milestones.map((milestone, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative flex items-center mb-12 ${
                isLeft
                  ? "md:flex-row flex-row"
                  : "md:flex-row-reverse flex-row"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-3 border-foreground z-10 hidden md:block" />
              <div className="absolute left-[20px] -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-3 border-foreground z-10 md:hidden" />

              {/* Content */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                } pl-10 md:pl-0`}
              >
                <Badge variant="primary" className="mb-2">
                  {milestone.year}
                </Badge>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              {/* Empty spacer for other side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

function MissionVision() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mission */}
        <div className="card-surface p-6 sm:p-8">
          <div className="w-12 h-12 rounded-xl bg-primary border-2 border-foreground flex items-center justify-center mb-4">
            <Target size={24} className="text-foreground" />
          </div>
          <h3 className="text-2xl font-black text-foreground mb-3">
            Our Mission
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            To foster a vibrant community of computing enthusiasts at SVNIT, bridging
            the gap between academic learning and real-world application. We empower
            students to explore, build, and innovate through hands-on workshops,
            competitive programming, open-source contributions, and collaborative
            projects.
          </p>
        </div>

        {/* Vision */}
        <div className="card-surface p-6 sm:p-8">
          <div className="w-12 h-12 rounded-xl bg-secondary border-2 border-foreground flex items-center justify-center mb-4">
            <Eye size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-black text-foreground mb-3">
            Our Vision
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            To be recognized as one of the most impactful ACM student chapters in
            India — a launchpad for future tech leaders, innovators, and
            open-source contributors. We envision a community where every student,
            regardless of their background, has access to world-class computing
            education and mentorship.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function FacultyAdvisors() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="font-serif text-5xl text-foreground mb-8 italic">
        Faculty Advisors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {facultyAdvisors.map((advisor) => (
          <div key={advisor.name} className="card-surface p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-lg font-black text-white border-2 border-foreground"
                style={{ backgroundColor: stringToColor(advisor.name) }}
              >
                {getInitials(advisor.name)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {advisor.name}
                </h3>
                <p className="text-sm font-semibold text-secondary">{advisor.title}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted mt-1 uppercase tracking-wide">
                  <GraduationCap size={12} />
                  {advisor.department}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mt-4">
              {advisor.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
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

  const inputStyles =
    "w-full px-4 py-3 rounded-xl bg-surface border-2 border-foreground text-foreground text-sm font-medium placeholder:text-muted/50 focus:outline-none focus:border-secondary focus:shadow-[3px_3px_0px_#7C5CFC] transition-all";

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="font-serif text-5xl text-foreground text-center mb-3 italic">
          Get In Touch
        </h2>
        <p className="text-muted text-center mb-10">
          Have questions or want to join ACM SVNIT? Drop us a message.
        </p>

        <div className="card-surface p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2 uppercase tracking-widest"
              >
                <User size={12} />
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className={inputStyles}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2 uppercase tracking-widest"
              >
                <Mail size={12} />
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={inputStyles}
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="contact-subject"
                className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2 uppercase tracking-widest"
              >
                <FileText size={12} />
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className={inputStyles}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2 uppercase tracking-widest"
              >
                <MessageSquare size={12} />
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
                className={`${inputStyles} resize-none`}
                placeholder="Tell us more..."
              />
              {errors.message && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Sending..." : "Enter The World →"}
              <Send size={14} />
            </Button>
          </form>
        </div>

        {/* Success toast */}
        {submitted && (
          <div className="toast flex items-center gap-3">
            <CheckCircle size={18} />
            <span className="text-sm font-bold">
              Message sent successfully!
            </span>
          </div>
        )}
      </div>
    </motion.section>
  );
}

export default function AboutPageContent() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="pill-badge pill-badge--accent mb-4 inline-flex">About Us</span>
          <h1 className="font-serif text-6xl sm:text-7xl text-foreground mb-3 italic">
            ACM SVNIT
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Founded in 2013, we are the SVNIT chapter of the world&apos;s largest
            computing society — building the next generation of tech leaders.
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
