import React from "react";

const SupportSection = () => {
  return (
    <div className="bg-[#ecebea] p-2 ">
      <div className="max-w-[1480px] lg:p-0  mx-auto bg-[#FFFFFF] rounded-2xl ">
        <div className="flex lg:flex-row flex-col justify-between p-4 lg:px-16">
          <div className="lg:py-28 max-w-[675px]">
            <h1 className=" text-[#403730] font-medium text-3xl lg:text-7xl  ">
              Emotional support group
            </h1>
            <p className=" text-[#263234] leading-7 text-lg mt-3 lg:mt-6 text-justify lg:text-start ">
              Our emotional support groups provide a nurturing community where
              women can share their stories and experiences in a safe and
              confidential setting. These groups foster a sense of belonging and
              understanding, allowing participants to connect with others who
              have faced similar challenges. Through shared experiences, you
              will find comfort, encouragement, and strength in numbers. Led by
              trained facilitators, our groups focus on emotional recovery and
              personal development, creating an empowering atmosphere that
              promotes healing and resilience. Join us to build connections and
              reclaim your confidence in a supportive space.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:gap-8 gap-x-2 gap-y-3.5 max-w-[580px] lg:mt-16 mt-3.5 mx-auto ">
            <div>
              <img src="support-img-1.png" alt="" />
            </div>
            <div>
              <img src="support-img-2.png" alt="" />
            </div>
            <div className="col-span-2  ">
              <img src="support-img-3.png" className="w-full  " alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
