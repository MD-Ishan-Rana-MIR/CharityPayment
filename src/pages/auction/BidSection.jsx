import React, { useState } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";

const BidSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#ecebea]">
      <div className="max-w-[1478px] lg:py-24 lg:pl-[72px] lg:pr-[168px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          {/* Left Text Section */}
          <div className="text-left">
            <p className="lg:text-3xl text-xl text-gray-500">Learn</p>
            <h2 className="text-4xl lg:text-8xl mb-3.5 lg:mb-0 font-bold text-black">
              How to bid?
            </h2>
          </div>

          {/* Right Video Section */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="/videoImg.jpg"
              alt="Video Thumbnail"
              className="lg:w-[771px] lg:h-[434px] w-full h-full object-cover"
            />
            {/* Play Button */}
            <button
              onClick={showModal}
              className="absolute inset-0 cursor-pointer flex items-center justify-center"
            >
              <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center">
                <svg
                  width="62"
                  height="62"
                  viewBox="0 0 62 62"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.6">
                    <rect x="6" y="6" width="50" height="50" rx="25" fill="white" />
                  </g>
                  <g opacity="0.4">
                    <rect x="3" y="3" width="56" height="56" rx="28" fill="white" />
                  </g>
                  <g opacity="0.2">
                    <rect width="62" height="62" rx="31" fill="white" />
                  </g>
                  <rect x="9" y="9" width="44" height="44" rx="22" fill="white" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.5208 21.1223C25.8419 20.947 26.233 20.961 26.5408 21.1588L40.5408 30.1588C40.827 30.3428 41 30.6597 41 31C41 31.3403 40.827 31.6572 40.5408 31.8412L26.5408 40.8412C26.233 41.039 25.8419 41.053 25.5208 40.8777C25.1997 40.7024 25 40.3658 25 40V22C25 21.6342 25.1997 21.2976 25.5208 21.1223ZM27 23.8317V38.1683L38.1507 31L27 23.8317Z"
                    fill="#457205"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        title="How to Bid?"
        open={isModalOpen}
        onCancel={handleCancel} // Close modal
        footer={null}
        centered
        width={800}
        destroyOnClose={true} // Completely remove ReactPlayer on close
      >
        {isModalOpen && (
          <ReactPlayer
            url="https://youtu.be/jC0CRFxJ2jU?si=rmoU1l2o0RnWAFmM" // Replace with your video URL
            controls
            width="100%"
            height="400px"
            playing={true} // Auto-play video
          />
        )}
      </Modal>
    </div>
  );
};

export default BidSection;
