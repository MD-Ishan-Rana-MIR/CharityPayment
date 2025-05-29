import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { CiPause1 } from "react-icons/ci";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { imgUrl } from "../../helper/imgUrl";
const audios = [
  {
    podcast_title: "Tech Talks",
    host_title: "Hosted by John Doe",
    guest_title: "Guest: Jane Smith",
    host_profile: "/host-john.png",
    guest_profile: "/guest-jane.png",
    description:
      "In this episode, we dive into the future of AI with Jane Smith.",
    date: "21 February, 2025",
    file: "audio/podcast-1.mp3",
    thumbnail: "/podcast-thumbnail1.png",
    title: "Season 2 Episode 6 - The London",
  },
  {
    title: "Season 2 Episode 7 - The Return",
    date: "1 March, 2025",
    file: "audio/podcast-2.mp3",
    thumbnail: "/podcast-thumbnail2.png",
  },
  {
    podcast_title: "Tech Talks",
    host_title: "Hosted by John Doe",
    guest_title: "Guest: Jane Smith",
    host_profile: "/host-john.png",
    guest_profile: "/guest-jane.png",
    description:
      "In this episode, we dive into the future of AI with Jane Smith.",
    date: "21 February, 2025",
    file: "audio/podcast-1.mp3",
    thumbnail: "/podcast-thumbnail1.png",
    title: "Season 2 Episode 6 - The London",
  },
  {
    title: "Season 2 Episode 9 - The Finale",
    date: "20 March, 2025",
    file: "audio/podcast-4.mp3",
    thumbnail: "/podcast-thumbnail3.png",
  },
  {
    podcast_title: "Tech Talks",
    host_title: "Hosted by John Doe",
    guest_title: "Guest: Jane Smith",
    host_profile: "/host-john.png",
    guest_profile: "/guest-jane.png",
    description:
      "In this episode, we dive into the future of AI with Jane Smith.",
    date: "21 February, 2025",
    file: "audio/podcast-1.mp3",
    thumbnail: "/podcast-thumbnail1.png",
    title: "Season 2 Episode 6 - The London",
  },
  {
    podcast_title: "Tech Talks",
    host_title: "Hosted by John Doe",
    guest_title: "Guest: Jane Smith",
    host_profile: "/host-john.png",
    guest_profile: "/guest-jane.png",
    description:
      "In this episode, we dive into the future of AI with Jane Smith.",
    date: "21 February, 2025",
    file: "audio/podcast-1.mp3",
    thumbnail: "/podcast-thumbnail1.png",
    title: "Season 2 Episode 6 - The London",
  },
];
const PodcastBanner = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const axiosPublic = useAxiosPublic()
  const [loading, setLoading] = useState(false);
  const [audios, setAudios] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get("/get-podcast");
        if (res.status === 200) {
          setAudios(res.data?.data?.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosPublic]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }



  useEffect(() => {
    if (!waveformRef.current || !audios[currentTrack]?.mp3) return;

    const url = `${imgUrl}/${audios[currentTrack].mp3}`;
    waveformRef.current.innerHTML = "";

    if (wavesurfer.current) {
      if (wavesurfer.current.isPlaying()) wavesurfer.current.pause();
      wavesurfer.current.destroy();
    }

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4b5563",
      progressColor: "#3b82f6",
      height: 40,
      barWidth: 2,
      responsive: true,
      normalize: true,
      xhr: {
        cache: 'default',
        mode: 'cors',
        method: 'GET',
        credentials: 'same-origin',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    });

    wavesurfer.current.load(url).catch((err) => {
      console.log(`url is ${url}`)
      console.error("Failed to load audio:", err);
    });

    wavesurfer.current.on("ready", () => {
      setTotalDuration(wavesurfer.current.getDuration());
      setCurrentTime(wavesurfer.current.getCurrentTime());
      if (isPlaying) {
        wavesurfer.current.play();
      }
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on("finish", () => {
      setIsPlaying(false);
      handleNext();
    });

    wavesurfer.current.on("error", (e) => {
      console.error("WaveSurfer error:", e);
    });

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [currentTrack, audios, imgUrl, isPlaying]);

  const togglePlay = () => {
    if (!wavesurfer.current) return;
    if (wavesurfer.current.isPlaying()) {
      wavesurfer.current.pause();
      setIsPlaying(false);
    } else {
      wavesurfer.current.play();
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + audios.length) % audios.length);
    setIsPlaying(true); // autoplay previous
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % audios.length);
    setIsPlaying(true); // autoplay next
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const timeLeft = totalDuration - currentTime;

  return (
    <div className="pt-20">
      <div className="relative bg-[url('/podcastBg.png')] bg-cover bg-center">
        <div className=" text-white pt-9 pb-6  text-center">
          <h1 className="text-4xl lg:text-5xl text-[#7c8067] font-bold">
            EmpowerINFINITY Podcast:
            <span className="text-[#7c8067] lg:text-6xl text-3xl ">
              {" "}
              Healing,
            </span>{" "}
            <br />
            <span className="text-[#7c8067] lg:text-6xl text-3xl ">
              {" "}
              Help &{" "}
            </span>
            <span className="text-[#7c8067] lg:text-6xl text-3xl ">
              {" "}
              Growth
            </span>
          </h1>
          <p className="mt-6 text-lg lg:text-2xl text-[#ECEBEA] ">
            Real Stories • Real Strength • Real Change
          </p>
        </div>

        <div className="max-w-2xl mx-auto p-6 lg:p-10 border border-[#2c3333] shadow-md bg-[#1B2324]">
          {/* Thumbnail */}
          <div className=" flex justify-between flex-col md:flex-row gap-6 ">
            <div>
              <img
                src={`${imgUrl}/${audios[currentTrack]?.thumbnail}`}
                alt="Podcast Cover"
                className="w-40 h-40 rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              {/* Date */}
              <p className="text-[#A6ABAC] text-xs font-semibold">
                {formatDate(audios[currentTrack]?.created_at)}
              </p>

              {/* Title */}
              <h2 className="text-xl lg:text-2xl text-[#E9EBEB] mt-2">
                {audios[currentTrack]?.podcast_title}
              </h2>
              {/* Time Info */}
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(timeLeft)} left</span>
              </div>
              {/* Waveform */}
              <div className="w-full mb-2">
                <div ref={waveformRef} />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button onClick={handlePrev} className="w-8 h-8 text-[#A6ABAC]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.4394 4.10169C11.0963 3.93389 10.6875 3.97617 10.3861 4.21066L1.38606 11.2107C1.14247 11.4001 1 11.6914 1 12C1 12.3086 1.14247 12.5999 1.38606 12.7894L10.3861 19.7894C10.6875 20.0238 11.0963 20.0661 11.4394 19.8983C11.7824 19.7305 12 19.3819 12 19V5.00001C12 4.61807 11.7824 4.2695 11.4394 4.10169ZM10 7.04465V16.9554L3.62882 12L10 7.04465Z"
                      fill="#A6ABAC"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.4394 4.10169C22.0963 3.93389 21.6875 3.97617 21.3861 4.21066L12.3861 11.2107C12.1425 11.4001 12 11.6914 12 12C12 12.3086 12.1425 12.5999 12.3861 12.7894L21.3861 19.7894C21.6875 20.0238 22.0963 20.0661 22.4394 19.8983C22.7824 19.7305 23 19.3819 23 19V5.00001C23 4.61807 22.7824 4.2695 22.4394 4.10169ZM21 7.04465V16.9554L14.6288 12L21 7.04465Z"
                      fill="#A6ABAC"
                    />
                  </svg>
                </button>
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-[#263234] rounded-full text-white flex items-center justify-center"
                >
                  {isPlaying ? (
                    <span className="block   ">
                      <CiPause1 size={24} />
                    </span>
                  ) : (
                    <span>
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="44" height="44" rx="22" fill="#263234" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.5208 12.1223C16.8419 11.947 17.233 11.961 17.5408 12.1588L31.5408 21.1588C31.827 21.3428 32 21.6597 32 22C32 22.3403 31.827 22.6572 31.5408 22.8412L17.5408 31.8412C17.233 32.039 16.8419 32.053 16.5208 31.8777C16.1997 31.7024 16 31.3658 16 31V13C16 12.6342 16.1997 12.2976 16.5208 12.1223ZM18 14.8317V29.1683L29.1507 22L18 14.8317Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  )}
                </button>
                <button onClick={handleNext} className="w-8 h-8 text-[#A6ABAC]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.5606 4.10169C12.9037 3.93389 13.3125 3.97617 13.6139 4.21066L22.6139 11.2107C22.8575 11.4001 23 11.6914 23 12C23 12.3086 22.8575 12.5999 22.6139 12.7894L13.6139 19.7894C13.3125 20.0238 12.9037 20.0661 12.5606 19.8983C12.2176 19.7305 12 19.3819 12 19V5.00001C12 4.61807 12.2176 4.2695 12.5606 4.10169ZM14 7.04465V16.9554L20.3712 12L14 7.04465Z"
                      fill="#A6ABAC"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.56065 4.10169C1.90375 3.93389 2.31246 3.97617 2.61394 4.21066L11.6139 11.2107C11.8575 11.4001 12 11.6914 12 12C12 12.3086 11.8575 12.5999 11.6139 12.7894L2.61394 19.7894C2.31246 20.0238 1.90375 20.0661 1.56065 19.8983C1.21755 19.7305 1 19.3819 1 19V5.00001C1 4.61807 1.21755 4.2695 1.56065 4.10169ZM3 7.04465V16.9554L9.37118 12L3 7.04465Z"
                      fill="#A6ABAC"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* date  */}
          <p className="text-sm text-gray-400 mb-1">
            {formatDate(audios[currentTrack]?.created_at)}
          </p>

          {/* podcast title  */}
          {/* podcast title  */}
          <p className="text-sm text-gray-300 mb-1">
            {audios[currentTrack]?.podcast_title}
          </p>
          
          {/* host title */}
          <p className="text-sm text-blue-400">
            {audios[currentTrack]?.host_title}
          </p>
          {/* gust title */}
          <p className="text-sm text-green-400 mb-2">
            {audios[currentTrack]?.guest_title}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            {audios[currentTrack]?.description}
          </p>

          {/* Podcast description  */}
          <span className="text-xl text-white font-semibold mb-3 ">Host & Guest</span>

          <div className="flex items-center gap-16 mb-4 mt-4">
            <div className="text-center">
              <img
                src={`${imgUrl}/${audios[currentTrack]?.host_profile}`}
                className="w-16 h-16 object-cover rounded-full"
                alt="Host"
              />
              <p className="text-[#A6ABAC] font-medium leading-6 text-[16px]">
                {audios[currentTrack]?.host_title}
              </p>
              <span className="text-sm text-[#A6ABAC]">Host</span>
            </div>

            <div className="text-center">
              <img
                src={`${imgUrl}/${audios[currentTrack]?.guest_profile}`}
                className="w-16 h-16 object-cover rounded-full"
                alt="Guest"
              />
              <p className="text-[#A6ABAC] font-medium leading-6 text-[16px]">
                {audios[currentTrack]?.guest_title}
              </p>
              <span className="text-sm text-[#A6ABAC]">Guest</span>
            </div>


          </div>

        </div>

        {/* Episode List */}
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-[#1E2A30] p-4 lg:p-6 h-60 lg:h-[40vh] overflow-y-auto custom-scrollbar">
            {audios.map((audio, index) => (
              <div
                key={index}
                className="flex justify-between py-3 border-b border-gray-700 cursor-pointer "
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(false); // Pause the current audio when switching to another track
                }}
              >
                {/* Episode Details */}
                <div className="flex gap-4">
                  <img
                    src={`${imgUrl}/${audio?.thumbnail}`}
                    className="w-12 h-12 rounded"
                    alt="audio"
                  />
                  <div>
                    <h2 className="text-[#E9EBEB] font-semibold text-sm">
                      {audio?.podcast_title}
                    </h2>
                    <p className="text-[#A6ABAC] text-xs mt-1">
                      {audio.duration}
                    </p>
                  </div>
                </div>
                {/* Date */}
                <p className="text-[#A6ABAC] text-xs">{formatDate(audio?.created_at)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastBanner;
