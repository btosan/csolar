"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck } from "react-icons/fi";
import TiptapEditor from "./editor/TiptapEditor";

/* ================= GOOGLE FORM CONFIG ================= */

const FORM_ID = "1FAIpQLSfpLGcdv-l_zhRkgZUf5Ye9ghl_dzVtQjGAG4sPOFRIreqqNA";
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

const ENTRY_NAME     = "entry.637622503";
const ENTRY_EMAIL    = "entry.754221519";
const ENTRY_PHONE    = "entry.129574009";
const ENTRY_SUBJECT  = "entry.1469936530";
const ENTRY_PROJECT  = "entry.41709357";
const ENTRY_DETAILS  = "entry.805790689";
const ENTRY_HONEYPOT = "entry.884448233";

/* ===================================================== */

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  projectType: string;
}

export default function GoogleEnquiryLightFull({ onSuccess }: { onSuccess?: () => void }) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    projectType: "",
  });

  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<{ details?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ===== Auto-prefill subject ===== */
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

    const payload = new URLSearchParams();
    payload.append(ENTRY_NAME, formData.fullname.trim());
    payload.append(ENTRY_EMAIL, formData.email.trim());
    payload.append(ENTRY_PHONE, formData.phone.trim());
    payload.append(ENTRY_SUBJECT, formData.subject.trim());
    payload.append(ENTRY_PROJECT, formData.projectType.trim());
    payload.append(ENTRY_DETAILS, details.trim());
    payload.append(ENTRY_HONEYPOT, "");

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
        subject: formData.subject,
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

  /* ===== Light UI Styles ===== */

  const input =
    "w-full mt-2 p-3 rounded-lg bg-white text-gray-700 outline-none border border-gray-200 focus:border-purple-400 transition";

  const label = "font-medium text-gray-800";

  /* ===== Render ===== */

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-50 p-8 text-black rounded-2xl space-y-5 shadow-2xl"
    >
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Request a Free Estimate
        </h2>
        <p className="text-sm md:text-base my-2 text-gray-600">
          Tell us about your project — we’ll reply within 24 hours.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <FiCheck className="w-14 h-14 text-green-500" />
            <p className="text-xl font-bold text-purple-900">
              Enquiry Sent Successfully!
            </p>
            <p className="text-sm text-gray-600 text-center">
              Check your email — we’ve already replied 🚀
            </p>
          </motion.div>
        ) : (
          <>
            {/* Name */}
            <div>
              <label className={label}>Full Name *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="fullname"
                required
                value={formData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className={input}
              />
            </div>

            {/* Email */}
            <div>
              <label className={label}>Email *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={input}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={label}>Phone *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="09012345678"
                className={input}
              />
            </div>

            {/* Subject */}
            <div>
              <label className={label}>Subject *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Web App Development"
                className={input}
              />
            </div>

            {/* Project Type */}
            <div>
              <label className={label}>Project Type *</label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleChange}
                className={input}
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

            {/* Details (Tiptap) */}
            <div className="">
              <label className={label}>Project Details *</label>
              <div className="mt-2 tiptap-light ">
                <TiptapEditor
                  content={details}
                  onChange={setDetails}
                  placeholder="Describe your project..."
                  
                />
              </div>
              {errors.details && (
                <p className="text-sm text-red-500 mt-1">{errors.details}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-fit mx-auto bg-purple-900 text-white hover:bg-purple-800 transition p-3 lg:p-4 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend />
                  Send Message
                </>
              )}
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </form>
  );
}



// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiSend, FiCheck } from "react-icons/fi";

// /* ================= GOOGLE FORM CONFIG ================= */

// const FORM_ID = "1FAIpQLSfpLGcdv-l_zhRkgZUf5Ye9ghl_dzVtQjGAG4sPOFRIreqqNA";
// const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

// const ENTRY_NAME     = "entry.637622503";
// const ENTRY_EMAIL    = "entry.754221519";
// const ENTRY_DETAILS  = "entry.805790689";
// const ENTRY_HONEYPOT = "entry.884448233";

// /* ===================================================== */

// export default function GoogleEnquiryLight() {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [details, setDetails] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!details.trim()) return;

//     setIsSubmitting(true);

//     const payload = new URLSearchParams();
//     payload.append(ENTRY_NAME, fullname.trim());
//     payload.append(ENTRY_EMAIL, email.trim());
//     payload.append(ENTRY_DETAILS, details.trim());
//     payload.append(ENTRY_HONEYPOT, "");

//     try {
//       await fetch(GOOGLE_FORM_URL, {
//         method: "POST",
//         mode: "no-cors",
//         body: payload,
//       });

//       setIsSuccess(true);
//       setFullname("");
//       setEmail("");
//       setDetails("");

//       setTimeout(() => setIsSuccess(false), 4000);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const input =
//     "w-full mt-2 p-3 rounded-lg bg-white text-gray-700 outline-none border border-gray-200 focus:border-purple-400 transition";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-purple-50 p-8 text-black rounded-2xl space-y-4 shadow-2xl"
//     >
//       <div>
//         <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
//           Request a Free Estimate
//         </h2>
//         <p className="text-sm md:text-base my-2 md:my-3 text-gray-600">
//           Tell us about your project — we’ll reply within 24 hours.
//         </p>
//       </div>

//       <AnimatePresence mode="wait">
//         {isSuccess ? (
//           <motion.div
//             key="success"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex flex-col items-center gap-4 py-8"
//           >
//             <FiCheck className="w-14 h-14 text-green-500" />
//             <p className="text-xl font-bold text-purple-900">
//               Request Sent Successfully!
//             </p>
//             <p className="text-sm text-gray-600 text-center">
//               We’ll reach out shortly 🚀
//             </p>
//           </motion.div>
//         ) : (
//           <>
//             <div>
//               <label className="font-medium">Your Name*</label>
//               <motion.input
//                 whileFocus={{ scale: 1.02 }}
//                 required
//                 value={fullname}
//                 onChange={(e) => setFullname(e.target.value)}
//                 placeholder="Full Name"
//                 className={input}
//               />
//             </div>

//             <div>
//               <label className="font-medium">Work Email*</label>
//               <motion.input
//                 whileFocus={{ scale: 1.02 }}
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className={input}
//               />
//             </div>

//             <div>
//               <label className="font-medium">How can we help?*</label>
//               <motion.textarea
//                 whileFocus={{ scale: 1.02 }}
//                 required
//                 rows={4}
//                 value={details}
//                 onChange={(e) => setDetails(e.target.value)}
//                 placeholder="Describe your project..."
//                 className={input}
//               />
//             </div>

//             <motion.button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-purple-900 text-white hover:bg-purple-800 transition p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <motion.div
//                     className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   />
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   <FiSend />
//                   Get Started
//                 </>
//               )}
//             </motion.button>
//           </>
//         )}
//       </AnimatePresence>
//     </form>
//   );
// }
