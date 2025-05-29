import React from "react";

const ContactBanner = () => {
  return (
    <div className="relative w-full h-[50vh] lg:h-[90vh] bg-[url('/contactImg.jpg')] bg-cover bg-center flex items-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center text-center lg:text-left lg:items-start">
        {/* Title */}
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-[70px] font-semibold leading-tight">
          Empowering <br />
          <span className="font-bold">women through</span> <br />
          <span className="font-bold">healing & hope.</span>
        </h1>

        {/* Description */}
        <p className="text-[#B1ADAA] mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:w-[528px] leading-relaxed">
          Our mission is to empower women to heal and thrive. We provide resources, 
          education, and support for women who have experienced trauma. Join us in our 
          mission to create a world where all women can heal and thrive.
        </p>
      </div>
    </div>
  );
};

export default ContactBanner;
