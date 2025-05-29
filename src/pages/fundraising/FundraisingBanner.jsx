import React from "react";

const FundraisingBanner = () => {
  return (
    <div className="z-0 pt-20 relative">
      <div className="relative w-full lg:h-[55vh] h-[40vh] bg-cover bg-center bg-[url('/funderingBannerImg.jpg')] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/50 before:to-black/80">
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center text-white px-6 text-center ">
          <p className="text-lg mb-2 uppercase tracking-wide lg:mt-10 mt-5 text-[16px] font-semibold leading-6 ">Way to help</p>
          <h1 className="text-2xl  lg:text-5xl lg:leading-16 text-white font-semibold lg:mt-4 ">
            Support our mission by-
          </h1>

          {/* List */}
          <ul className="lg:mt-6 lg:space-y-3 text-lg lg:text-xl">
            {[
              "Participating in art auctions",
              "Donating antiques",
              "Contributing directly to help us build the retreat",
              "Expanding our programs",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.2071 5.29289C21.5976 5.68342 21.5976 6.31658 21.2071 6.70711L10.2071 17.7071C9.81658 18.0976 9.18342 18.0976 8.79289 17.7071L3.79289 12.7071C3.40237 12.3166 3.40237 11.6834 3.79289 11.2929C4.18342 10.9024 4.81658 10.9024 5.20711 11.2929L9.5 15.5858L19.7929 5.29289C20.1834 4.90237 20.8166 4.90237 21.2071 5.29289Z"
                    fill="white"
                  />
                </svg>
                <span className=" font-medium leading-8 lg:text-xl text-sm   " >{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FundraisingBanner;
