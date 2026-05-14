import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Globe, MessageCircle } from "lucide-react";

const services = [
  "Business Website Development",
  "Portfolio Website Design",
  "Restaurant Website Design",
  "Salon Website Design",
  "Gym Website Design",
  "Landing Page Design",
  "WordPress Website Development",
  "Website Redesign",
  "E-commerce Website Design",
];

const projects = [
  "Restaurant Website",
  "Salon Booking Website",
  "Coaching Institute Website",
  "Business Landing Page",
  "Personal Portfolio Website",
];

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "WordPress",
  "Shopify",
  "SEO",
  "Responsive Design",
  "UI/UX Design",
];

const testimonials = [
  "Professional work, clean design, and fast delivery. Highly recommended!",
  "My business website looks premium and helped improve client trust.",
  "Very responsive developer with excellent communication and support.",
];

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = { name: "", email: "", message: "" };

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function PortfolioWebsite() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const isValid = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (status.type !== "idle") {
        setStatus({ type: "idle", message: "" });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const text = encodeURIComponent(
        `New Website Inquiry\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
      );
      window.open(`https://wa.me/919936035019?text=${text}`, "_blank");

      setStatus({
        type: "success",
        message: "Message prepared successfully. WhatsApp opened in a new tab.",
      });
      setForm(initialForm);
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="px-6 md:px-16 py-20 bg-gradient-to-br from-slate-950 to-blue-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-blue-300 font-medium mb-2">Hello, I&apos;m</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Narayan P Mishra</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-200 mb-4">
              Professional Website Developer & Freelancer
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              I create modern websites, business websites, portfolio websites, restaurant websites, salon websites,
              gym websites, and custom web solutions that help businesses grow online.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/919936035019" target="_blank" rel="noreferrer">
                <Button className="rounded-2xl text-base px-6 py-6">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Me
                </Button>
              </a>

              <a href="https://narayanmishracom.vercel.app" target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-2xl text-base px-6 py-6 text-black">
                  View Portfolio
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-72 h-72 rounded-3xl bg-white/10 border border-white/20 shadow-2xl flex items-center justify-center text-center p-6">
              <div>
                <p className="text-lg text-blue-200">Profile Photo</p>
                <p className="text-sm text-gray-300 mt-2">Add your professional image here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          I am a skilled website developer and freelancer helping businesses build a strong online presence with
          responsive, modern, and high-converting websites.
        </p>
      </section>

      <section className="px-6 md:px-16 py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="rounded-2xl bg-white/5 border-white/10 text-white">
                <CardContent className="p-6">
                  <p className="font-medium">{service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Portfolio Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <Card key={i} className="rounded-2xl bg-white/5 border-white/10 text-white">
              <CardContent className="p-6">
                <p className="text-lg font-semibold">{project}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, i) => (
              <span key={i} className="px-5 py-3 rounded-2xl bg-blue-900/40 border border-blue-300/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <Card key={i} className="rounded-2xl bg-white/5 border-white/10 text-white">
              <CardContent className="p-6 text-gray-300">&ldquo;{item}&rdquo;</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 bg-gradient-to-br from-blue-950 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Build Your Dream Website</h2>
          <p className="text-gray-300 mb-8">Ready to grow your business online? Let&apos;s create something premium together.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center gap-3"><Phone size={18} /> +91 9936035019</p>
              <p className="flex items-center gap-3"><Mail size={18} /> mishranarayan978@gmail.com</p>
              <p className="flex items-center gap-3"><MapPin size={18} /> India</p>
              <p className="flex items-center gap-3"><Globe size={18} /> narayanmishracom.vercel.app</p>
            </div>

            <Card className="rounded-2xl bg-white/5 border-white/10 text-white">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <input
                      placeholder="Your Name"
                      value={form.name}
                      onChange={onChange("name")}
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={onChange("email")}
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      value={form.message}
                      onChange={onChange("message")}
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting || !isValid} className="w-full rounded-2xl py-6 disabled:opacity-60">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  {status.type === "success" && <p className="text-green-300 text-sm">{status.message}</p>}
                  {status.type === "error" && <p className="text-red-300 text-sm">{status.message}</p>}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
