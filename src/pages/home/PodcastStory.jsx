import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "antd";
import PodcastCarousel from "./PodcastCarousel";

export default function PodcastStory() {
  return (
    <div className="relative bg-cover bg-center  pt-6 lg:pt-11 p-10 lg:pb-20   "
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url('/podcastBgImg1.jpg')"
      }}
    >
      <div>
        <h1 className="text-center text-[#ECEBEA] lg:text-5xl text-2xl lg:leading-16 font-semibold">
          Podcast & Success stories
        </h1>
        <p className="lg:text-center text-center mt-4 lg:mt-0  lg:w-[600px]  mx-auto text-[#ECEBEA] text-xl leading-8 font-thin ">
          From pain to power, these brave women found hope, healing, and a <br />
          new beginning. Their journeys inspire us all to believe in the <br />
          strength of the human spirit
        </p>
        <div className="  mt-6 lg:mt-12">
          <button className="bg-[#FFFFFF] block mx-auto cursor-pointer text-black px-6 py-3 font-semibold text-sm rounded-lg hover:bg-[#6A55441A] hover:text-white ">
            Explore more
          </button>
        </div>
        <PodcastCarousel></PodcastCarousel>
      </div>
    </div>
  );
}
