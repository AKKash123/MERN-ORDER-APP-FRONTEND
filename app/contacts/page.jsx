"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill in all fields!");
    }

    setLoading(true);
    try {
      // Example: replace with your actual backend endpoint
      const res = await fetch("https://mern-order-app-backend.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("❌ Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-center" />

      {/* 🌈 Hero Section */}
      <section className="relative w-full overflow-hidden py-24 flex flex-col items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2),_transparent_70%)] blur-3xl opacity-70" />

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mt-4 max-w-2xl mx-auto">
            We’d love to hear from you! Get in touch for queries, custom designs,
            or support — we’ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* 💌 Contact Section */}
      <section className="w-full flex flex-col md:flex-row justify-center items-start gap-10 py-16 px-6 max-w-6xl mx-auto">
        {/* 📞 Info Section */}
        <div className="bg-white shadow-md rounded-2xl p-8 w-full md:w-1/3 border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is ready to help you with your order, design queries, or
            feedback.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>
              📍 <strong>Address:</strong> Alipurduar, West Bengal, India
            </p>
            <p>
              📞 <strong>Phone:</strong>{" "}
              <a href="tel:+918777766555" className="text-indigo-600 hover:underline">
                +91 87777 66555
              </a>
            </p>
            <p>
              ✉️ <strong>Email:</strong>{" "}
              <a
                href="mailto:info@meralaydesigns.com"
                className="text-indigo-600 hover:underline"
              >
                info@meralaydesigns.com
              </a>
            </p>
            <p>
              ⏰ <strong>Hours:</strong> Mon – Sat: 10:00 AM – 7:00 PM
            </p>
          </div>
        </div>

        {/* 📝 Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 w-full md:w-2/3 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Send Us a Message
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-6"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* 🌸 Footer Gradient Line */}
      <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </div>
  );
}
