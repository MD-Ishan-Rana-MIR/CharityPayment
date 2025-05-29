import React from 'react'

const extra = () => {
  return (
    <div>
      <div className=" max-w-[1512px] mx-auto ">
        {/* large device  */}
        <div className="relative hidden lg:flex   ">
          <Slider {...settings} className="w-full">
            {/* 1st slide  */}

            <div className="" >
              <div className="relative lg:w-[715px] w-full mt-5 ">
                <img
                  src="/auctionBg-img.jpg"
                  className="w-full h-[83vh] object-cover rounded-2xl "
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent rounded-2xl "></div>
                <div className="absolute left-0 pl-6 bottom-0">
                  <p className="lg:text-5xl text-2xl text-white lg:pb-8 pb-2">
                    Empower women to <br />
                    <span className="font-bold">
                      buy or list your
                    </span> <br /> auctions
                  </p>
                  <div className="lg:pb-8 pb-4">
                    <button
                      onClick={() => setPersonalDetailsModal(true)}
                      className="bg-[#F6F6F7] cursor-pointer text-[#172B4D] font-bold text-sm hover:bg-[#ecebea] transition-all duration-200 rounded px-6 py-2.5"
                    >
                      Contribute your Auction
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* 2nd slide  */}

            <div className="  max-w-7xl  " >
              <AuctionSlider />
            </div>

          </Slider>
        </div>

        {/* small device  */}

        <div className=" lg:hidden block px-3 ">
          {/* 1st slide  */}
          <div>
            <div>
              <div className="relative lg:w-[715px]  w-full h-auto lg:h-[70vh]">
                <img
                  src="/auctionBg-img.jpg"
                  className="w-full h-full object-cover rounded-2xl "
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent "></div>
                <div className="absolute left-0 pl-6 bottom-0">
                  <p className="lg:text-5xl text-2xl text-white lg:pb-8 pb-2">
                    Empower women to <br />
                    <span className="font-bold">
                      buy or list your
                    </span> <br /> auctions
                  </p>
                  <div className="lg:pb-8 pb-4">
                    <button
                      onClick={() => setPersonalDetailsModal(true)}
                      className="bg-[#F6F6F7] cursor-pointer text-[#172B4D] font-bold text-sm hover:bg-[#ecebea] transition-all duration-200 rounded px-6 py-2.5"
                    >
                      Contribute your Auction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd slide  */}
          <AuctionSlider />
        </div>
      </div>

    </div>
  )
}

export default extra
