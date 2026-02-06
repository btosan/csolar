"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    package: "",
    type: "start_project", // start_project | request_quote
  });

  // Auto-handle ?type=start_project or ?type=quote bg-gray-900 rounded-2xl
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam === "start_project" || typeParam === "quote") {
      setFormData((prev) => ({ ...prev, type: typeParam }));
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = `Hi, my name is ${formData.name}. I run ${formData.business}. 
I'm interested in the ${formData.package} package and would like to ${
      formData.type === "start_project"
        ? "start my website/web app project"
        : "request a detailed quote"
    }.
You can reach me on ${formData.phone}.`;

    const url = `https://wa.me/2349123631219?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    // <section
    //   id="enquiry"
    //   className="w-full   "
    // >
      <div className="w-full mx-auto text-center text-gray-100">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Whatsapp Contact Form</h2>
        {/* Whatsapp Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 p-4 md:p-6 lg:p-8 mb-8 md:mb-0 rounded-2xl shadow-lg"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address (optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <input
            type="text"
            name="business"
            placeholder="Business Name"
            value={formData.business}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:border-purple-100 outline-none md:col-span-2"
          >
            <option value="">Select Package</option>
            <option value="Starter">Starter Website Package</option>
            <option value="Growth">Growth Web App Package</option>
            <option value="Pro">Pro Automation Package</option>
            <option value="Enterprise">Enterprise Custom Solution</option>
          </select>

          {/* Radio buttons */}
          <div className="md:col-span-2 flex justify-center gap-8 mt-4">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="radio"
                name="type"
                value="start_project"
                checked={formData.type === "start_project"}
                onChange={handleChange}
              />
              Start My Project
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="radio"
                name="type"
                value="quote"
                checked={formData.type === "quote"}
                onChange={handleChange}
              />
              Request Detailed Quote
            </label>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-6 w-full ">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="
                bg-linear-to-r
                from-purple-50 via-purple-100 to-indigo-100
                text-black md:text-xl text-lg font-semibold md:uppercase
                rounded-2xl md:px-12 px-6 md:py-4 py-4 w-full
                hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600
                hover:text-white transition-all hover:cursor-pointer
              "
            >
              Continue on WhatsApp
            </motion.button>
          </div>
        </form>
      </div>
    // </section>
  );
}
