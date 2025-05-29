import React from "react";

const HelpBanner = () => {
  return (
    <div className="bg-[#ecebea] px-4 mt-4">
      <div className="max-w-[1480px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-3 mb-5">
          

          {/* Box 1 */}
          <div className="relative w-full lg:w-[933px] h-[379px]">
            <img
              src="/dibImg.png"
              className="rounded-2xl w-full shadow-2xl border border-white h-full object-cover"
              alt="Help"
            />

            {/* Gradient Overlay */}
            {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent"></div> */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[e0dcdc]/100 to-transparent"></div>
            {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/70 to-transparent"></div> */}

            {/* Text Overlay */}
            <div className="absolute top-4 left-4 sm:left-8 text-white z-10">
              <span className="text-2xl text-[#403730] sm:text-2xl">Discover</span>
              <p className="lg:text-7xl text-3xl text-[#403730] sm:text-[36px] leading-8 sm:leading-11 font-semibold">
                The way to <br />help
              </p>
            </div>
          </div>


          {/* Box 2 */}
          <div className="relative w-full lg:w-[527px] h-[379px]">
            {/* Main Image */}
            <img
              src="/help-img-2.jpg"
              className="rounded-2xl w-full h-full object-cover"
              alt="Help"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-black/70 to-transparent"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/70 to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-4 left-4 sm:left-8 text-white z-10">
              <span className="text-lg sm:text-2xl">By</span>
              <p className="text-2xl sm:text-[36px] leading-8 sm:leading-11 cursor-pointer font-semibold">
                Supporting survivors
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Box 1 */}
          <div className="relative w-full lg:w-[527px] h-[379px]">
            <img
              src="/help-img-4.jpg"
              className="rounded-2xl w-full h-full object-cover"
              alt="Help"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-black/70 to-transparent"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/70 to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-4 left-4 sm:left-8 text-white z-10">
              <span className="text-lg sm:text-2xl">By</span>
              <p className="text-2xl sm:text-[36px] leading-8 sm:leading-11 cursor-pointer font-semibold">
                Supporting survivors
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="relative w-full lg:w-[933px] h-[379px]">
            <img
              src="/help-img-3.jpg"
              className="rounded-2xl w-full h-full object-cover"
              alt="Help"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-black/70 to-transparent"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/70 to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute top-4 left-4 sm:left-8 text-white z-10">
              <span className="text-lg sm:text-2xl">By</span>
              <p className="text-2xl sm:text-[36px] leading-8 sm:leading-11 font-semibold">
                Donating luxurious <br /> products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpBanner;
