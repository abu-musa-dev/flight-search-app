import React from "react";
import heroPhoto from "../../assets/images/Screenshot_42.png";

const Hero = () => {
  return (
    <section className="hero-section max-w-5xl mx-auto px-4 py-10">
      <img
        src={heroPhoto}
        alt="Hero Banner"
        className="w-full max-h-[420px] object-cover"  // height একটু বাড়ানো হয়েছে (420px)
        style={{ borderRadius: 0 }}                    // কোনো রাউন্ডেড কর্ণার নেই
      />
      {/* অন্যান্য content */}
    </section>
  );
};

export default Hero;
