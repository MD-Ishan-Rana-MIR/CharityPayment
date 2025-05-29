import React from "react";
import { Button } from "antd";

const Banner = () => {
  return (
    <div className="lg:pt-20 pt-10 max-w-7xl mx-auto px-4">
      <div className="flex flex-col mx-auto w-full  lg:flex-row justify-between items-center lg:items-start">
        {/* left side */}
        <div className="mt-10 lg:mt-20 px-4 text-center lg:text-left max-w-xl">
          <div className="text-[32px] sm:text-[48px] lg:text-[70px] font-bold leading-tight text-[#263234] mb-6">
            <p>Empowering</p>
            <p>women through</p>
            <p className="bg-gradient-to-b from-[#1F2B2F] to-gray-300 bg-clip-text text-transparent">
              healing & hope.
            </p>
          </div>
          <span className="text-[#263234] text-sm sm:text-base lg:text-xl leading-6 sm:leading-7 block">
            Our mission is to empower women to heal and thrive. We provide
            resources, education, and support for women who have experienced
            trauma. Join us in our mission to create a world where all women can
            heal and thrive.
          </span>
          <div className="mt-8 sm:mt-5 lg:mt-12">
            <Button
              className="homeBtn px-6 py-3 text-base"
              icon={
                <span className="lg:mt-0.5 block hidden lg:flex">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.01387 1.41485C3.22792 1.29799 3.4887 1.30733 3.69384 1.43921L13.0272 7.43921C13.218 7.56188 13.3333 7.77315 13.3333 8C13.3333 8.22684 13.218 8.43811 13.0272 8.56078L3.69384 14.5608C3.4887 14.6927 3.22792 14.702 3.01387 14.5851C2.79982 14.4683 2.66666 14.2439 2.66666 14V2C2.66666 1.75612 2.79982 1.53171 3.01387 1.41485ZM4 3.22111V12.7789L11.4338 8L4 3.22111Z"
                      fill="white"
                    />
                  </svg>
                </span>
              }
            >
              Explore our Works
            </Button>
          </div>
        </div>

        {/* right side */}
        <div className="mt-10 lg:mt-0 w-full lg:w-auto">
          <img
            src="/homePageUpdateImg.jpg"
            className="w-full max-h-[500px] sm:max-h-[600px] lg:h-[874px] object-cover rounded-lg"
            alt="Empowering women through healing and hope"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
