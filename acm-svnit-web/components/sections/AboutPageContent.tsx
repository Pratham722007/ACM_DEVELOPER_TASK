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
      <h2 className="font-serif text-4xl text-foreground text-center mb-14">
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
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block" />
              <div className="absolute left-[20px] -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 md:hidden" />

              {/* Content */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                } pl-10 md:pl-0`}
              >
                <Badge variant="primary" className="mb-2">
                  {milestone.year}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground mb-1">
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
        <div className="card-surface rounded-xl p-6 sm:p-8">
          <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Target size={22} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
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
        <div className="card-surface rounded-xl p-6 sm:p-8">
          <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
            <Eye size={22} className="text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
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
      <h2 className="font-serif text-4xl text-foreground mb-8">
        Faculty Advisors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {facultyAdvisors.map((advisor) => (
          <div key={advisor.name} className="card-surface rounded-xl p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-base font-bold text-white"
                style={{ backgroundColor: stringToColor(advisor.name) }}
              >
                {getInitials(advisor.name)}
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {advisor.name}
                </h3>
                <p className="text-sm text-primary">{advisor.title}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
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
    // Fake submission delay
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

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
        <h2 className="font-serif text-4xl text-foreground text-center mb-3">
          Get In Touch
        </h2>
        <p className="text-muted text-center mb-10">
          Have questions or want to join ACM SVNIT? Drop us a message.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2"
            >
              <User size={14} className="text-muted" />
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2"
            >
              <Mail size={14} className="text-muted" />
              Email
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
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="contact-subject"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2"
            >
              <FileText size={14} className="text-muted" />
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              placeholder="What's this about?"
            />
            {errors.subject && (
              <p className="text-xs text-red-400 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2"
            >
              <MessageSquare size={14} className="text-muted" />
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
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Tell us more..."
            />
            {errors.message && (
              <p className="text-xs text-red-400 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            <Send size={14} />
          </Button>
        </form>

        {/* Success toast */}
        {submitted && (
          <div className="toast flex items-center gap-3">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">
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
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground mb-3">
            About ACM SVNIT
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
