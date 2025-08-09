import React from "react";
import heroPhoto from "../../assets/images/Hero.png";

const Hero = () => {
  return (
    <section className="hero-section max-w-5xl mx-auto px-4 py-10">
      {/* Hero image */}
      <img
        src={heroPhoto}
        alt="Hero Banner"
        className="w-full max-h-[420px] object-cover"
        style={{ borderRadius: 0 }}
      />
    </section>
  );
};

export default Hero;
