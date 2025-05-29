import React from "react";

export const SponserSection = () => {
  return (
    <div className=" bg-[#ecebea] py-5 ">
      <div className=" max-w-[1480px] shadow mx-auto bg-white ">
        <div className=" max-w-[1216px] mx-auto md:py-24 py-8  ">
          <p className="text-center text-[#4B5557] text-[16px] leading-6 font-medium ">
            Our partners & sponsors
          </p>
          <div className=" flex justify-center items-center md:justify-between mt-8 gap-3.5  flex-col md:flex-row md:px-3.5  ">
            {/* 1st partner */}
            <div className="flex flex-row items-center gap-3.5 ">
              <span>
                <img src="/sponser/logo-1.png" />
              </span>
            </div>

            {/* 2nd partner */}
            <div className="flex gap-3.5 items-center ">
              <img src="/sponser/logo-2.png"/>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};
