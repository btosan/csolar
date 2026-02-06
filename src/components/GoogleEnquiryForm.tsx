"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck } from "react-icons/fi";
import TiptapEditor from "./editor/TiptapEditor";

/* ================= GOOGLE FORM CONFIG ================= */

const FORM_ID = "1FAIpQLSfpLGcdv-l_zhRkgZUf5Ye9ghl_dzVtQjGAG4sPOFRIreqqNA";
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

// ENTRY IDs (must match Google Form exactly)
const ENTRY_NAME     = "entry.637622503";
const ENTRY_EMAIL    = "entry.754221519";
const ENTRY_PHONE    = "entry.129574009";
const ENTRY_SUBJECT  = "entry.1469936530";
const ENTRY_PROJECT  = "entry.41709357";
const ENTRY_DETAILS  = "entry.805790689";
const ENTRY_HONEYPOT = "entry.884448233"; // honeypot field (hidden in form)

/* ===================================================== */

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  projectType: string;
}

export default function GoogleEnquiryForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    projectType: "",
  });

  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ details?: string }>({});

  /* ===== Auto-prefill subject from URL ===== */
  useEffect(() => {
    const type = searchParams.get("type");

    const map: Record<string, string> = {
      start_project: "New Project Enquiry",
      web_app: "Web Application Development",
      website: "Website Development",
      automation: "AI Automation / Integration",
    };

    if (type && map[type]) {
      setFormData((prev) => ({ ...prev, subject: map[type] }));
    }
  }, [searchParams]);

  /* ===== Handlers ===== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!details.trim()) {
      setErrors({ details: "Project details are required" });
      return;
    }

    setIsSubmitting(true);

    /* ===== IMPORTANT PART (THIS TRIGGERS Apps Script) ===== */
    const payload = new URLSearchParams();
    payload.append(ENTRY_NAME, formData.fullname.trim());
    payload.append(ENTRY_EMAIL, formData.email.trim());
    payload.append(ENTRY_PHONE, formData.phone.trim());
    payload.append(ENTRY_SUBJECT, formData.subject.trim());
    payload.append(ENTRY_PROJECT, formData.projectType.trim());
    payload.append(ENTRY_DETAILS, details.trim());
    payload.append(ENTRY_HONEYPOT, ""); // MUST be empty

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      setIsSuccess(true);
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        subject: formData.subject, // keep subject if coming from CTA
        projectType: "",
      });
      setDetails("");

      setTimeout(() => {
        setIsSuccess(false);
        onSuccess?.();
      }, 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ===== Styles ===== */

  const inputClasses =
    "w-full px-4 py-3 bg-black border border-gray-600 text-gray-100 placeholder-gray-400 rounded-xl focus:outline-none focus:border-gray-400 transition";

  const labelClasses =
    "block text-sm font-medium text-purple-50 mb-2 uppercase";

  /* ===== Render ===== */

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-purple-100 mb-8 text-center">
        Email Enquiry Form
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 mb-8 md:mb-0">
        {/* Full Name */}
        <div>
          <label className={labelClasses}>Full Name *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="fullname"
            required
            value={formData.fullname}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClasses}>Email *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClasses}>Phone *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="09012345678"
            className={inputClasses}
          />
        </div>

        {/* Subject */}
        <div>
          <label className={labelClasses}>Subject *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="Web App Development"
            className={inputClasses}
          />
        </div>

        {/* Project Type */}
        <div>
          <label className={labelClasses}>Project Type *</label>
          <motion.select
            whileFocus={{ scale: 1.01 }}
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select project type</option>
            <option value="Custom Website">Custom Website</option>
            <option value="Web Application">Web Application</option>
            <option value="E-commerce Platform">E-commerce Platform</option>
            <option value="AI Automation / Integration">
              AI Automation / Integration
            </option>
            <option value="Not sure yet">Not sure yet</option>
          </motion.select>
        </div>

        {/* Details */}
        <div>
          <label className={labelClasses}>Project Details *</label>
          <TiptapEditor
            content={details}
            onChange={setDetails}
            placeholder="Describe your project..."
          />
          {errors.details && (
            <p className="text-sm text-red-500 mt-1">{errors.details}</p>
          )}
        </div>

        {/* Submit / Success */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <FiCheck className="w-16 h-16 text-green-400" />
              <p className="text-2xl font-bold text-purple-100">
                Enquiry Sent Successfully!
              </p>
              <p className="text-sm text-gray-400 text-center">
                Check your email — we’ve already replied 🚀
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              type="submit"
              disabled={isSubmitting}
              className="
                w-full sm:w-auto px-8 py-4
                border-t-2 border-b-2 border-purple-100
                text-purple-100 font-medium text-lg rounded-xl
                hover:bg-purple-100 hover:text-black
                transition-all duration-300 flex items-center justify-center gap-3
              "
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-6 h-6 border-4 border-t-transparent border-purple-100 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-6 h-6" />
                  Send Message
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
