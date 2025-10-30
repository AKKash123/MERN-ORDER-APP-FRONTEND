"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
    <main className="min-h-screen bg-gray-50 text-gray-800">
     
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-b-3xl shadow-lg">
        <div className="max-w-lg space-y-6">
          <h1 className="text-5xl font-bold leading-tight drop-shadow-md">
            Design Your Own <br />
            <span className="text-yellow-300">Wollen Collection</span>
          </h1>
          <p className="text-lg opacity-90">
            Create, customize, and order premium woolen apparel crafted with your unique design — delivered with warmth and style.
          </p>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Explore Designs
            </Link>
            <Link
              href="/track"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Track Order
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <Image
            src="/hero-wollen.png"
            alt="Wollen Clothes Design"
            width={450}
            height={450}
            className="rounded-2xl shadow-2xl"
            priority />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-700">Why Choose Wollen?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Quality",
              desc: "Only the finest wool and materials, ensuring unmatched comfort and durability.",
              icon: "🧶",
            },
            {
              title: "Custom Designs",
              desc: "Upload your own designs or choose from our curated collection to stand out.",
              icon: "🎨",
            },
            {
              title: "Fast Delivery",
              desc: "Quick processing and doorstep delivery for a smooth shopping experience.",
              icon: "🚚",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Create Your Signature Wollen Piece?
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Start your design journey today and bring your ideas to life.
        </p>
        <Link
          href="/items"
          className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition"
        >
          Get Started
        </Link>
      </section>
    
    </main>
    </>
  );
}
