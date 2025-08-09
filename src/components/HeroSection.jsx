import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-[#05070D] text-white overflow-hidden">
      {/* Background Stars Effect */}
      <div className="absolute inset-0 bg-[url('/images/stars.png')] bg-cover bg-center opacity-40"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Logo" className="h-8" />
            <span className="text-sm tracking-wide text-gray-300">Chamber</span>
          </div>
          <button className="bg-gray-800 px-5 py-2 rounded-full text-sm hover:bg-gray-700 transition">
            Contact Us
          </button>
        </div>

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-[#112233] px-4 py-1 rounded-full text-xs text-gray-300 border border-gray-700 flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            Smarter ideas, instant solutions
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center mt-6 text-4xl md:text-6xl font-bold leading-tight">
          We are your{" "}
          <span className="text-teal-400">Software</span>
          <br />
          <span className="text-teal-400">Development</span>{" "}
          <span className="inline-flex gap-1 align-middle">
            <span>🖥️</span> <span>📱</span>
          </span>{" "}
          Team
          <br />
          in The Cloud
        </h1>

        {/* Contact Button */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full hover:bg-gray-700 transition">
            Contact Us
            <span className="bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">→</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="mt-16 flex justify-center">
          <div className="bg-[#0A0F1A] rounded-3xl p-6 shadow-lg w-full max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left: Timeline */}
              <div className="bg-gradient-to-br from-[#0F1929] to-[#0C1422] rounded-xl p-6 flex-1">
                <div className="flex flex-col gap-4">
                  <div className="bg-[#1A2535] px-3 py-1 rounded-lg text-xs w-fit">Software</div>
                  <div className="bg-[#1A2535] px-3 py-1 rounded-lg text-xs w-fit">Mobile App</div>
                  <div className="bg-[#1A2535] px-3 py-1 rounded-lg text-xs w-fit">Website</div>
                </div>
              </div>

              {/* Right: Text */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  Software Service Solutions
                </h3>
                <p className="text-gray-400 mb-4">
                  Plan, track, and manage projects with precision tools.
                </p>
                <button className="bg-teal-500 text-black px-5 py-2 rounded-full font-medium hover:bg-teal-400 transition">
                  Discover
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Side Labels */}
        <div className="hidden md:block">
          {/* Left Side */}
          <div className="absolute top-[60%] left-0 -translate-y-1/2">
            <div className="mb-6 bg-gray-800 px-3 py-1 rounded-full text-xs">
              Website Development
            </div>
            <div className="bg-gray-800 px-3 py-1 rounded-full text-xs">
              Mobile App Development
            </div>
          </div>
          {/* Right Side */}
          <div className="absolute top-[60%] right-0 -translate-y-1/2">
            <div className="mb-6 bg-gray-800 px-3 py-1 rounded-full text-xs">
              UI/UX Engineering
            </div>
            <div className="bg-gray-800 px-3 py-1 rounded-full text-xs">
              Software Services
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
