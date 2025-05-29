import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const PodcastPlayer = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const audios = [
    {
      title: "Season 2 Episode 6 - The London",
      date: "21 February, 2025",
      file: "audio/podcast-1.mp3",
      thumbnail: "/podcast-thumbnail1.png",
    },
    {
      title: "Season 2 Episode 7 - The Return",
      date: "1 March, 2025",
      file: "audio/podcast-2.mp3",
      thumbnail: "/podcast-thumbnail2.png",
    },
    {
      title: "Season 2 Episode 8 - The Future",
      date: "10 March, 2025",
      file: "audio/podcast-3.mp3",
      thumbnail: "/podcast-thumbnail3.png",
    },
    {
      title: "Season 2 Episode 9 - The Finale",
      date: "20 March, 2025",
      file: "audio/podcast-4.mp3",
      thumbnail: "/podcast-thumbnail3.png",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    if (!waveformRef.current) return;

    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    // Create a new instance of WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4b5563", // gray-600
      progressColor: "#3b82f6", // blue-500
      height: 100, // Increased height for the waveform
      barWidth: 2,
      responsive: true,
      normalize: true,
    });

    // Load the selected audio file
    wavesurfer.current.load(audios[currentTrack].file);

    wavesurfer.current.on("ready", () => {
      const duration = wavesurfer.current.getDuration();
      setTotalDuration(duration);
      setCurrentTime(0);

      if (isPlaying) {
        wavesurfer.current.play();
      }
    });

    wavesurfer.current.on("audioprocess", () => {
      const time = wavesurfer.current.getCurrentTime();
      setCurrentTime(time);
    });

    wavesurfer.current.on("finish", () => {
      handleNext(); // Automatically move to next track
    });

    return () => wavesurfer.current.destroy();
  }, [currentTrack, isPlaying]); // Depend on both currentTrack and isPlaying to handle state updates

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = () => {
    if (wavesurfer.current) {
      if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.pause();
        setIsPlaying(false);
      } else {
        wavesurfer.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + audios.length) % audios.length);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % audios.length);
  };

  const timeLeft = totalDuration - currentTime;

  return (
    <div className="container mx-auto p-6">
      {/* Audio Data Section */}
      <div className="audio-list bg-gray-800 p-6 rounded-xl mb-8">
        <h3 className="text-xl text-white mb-4">Podcast Episodes</h3>
        {audios.map((audio, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 mb-2 bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => {
              setCurrentTrack(index);
              setIsPlaying(false); // Pause the current audio when switching to another track
            }}
          >
            <div className="flex items-center">
              <img
                src={audio.thumbnail}
                alt={audio.title}
                className="w-12 h-12 rounded-lg mr-4"
              />
              <div>
                <h4 className="text-white">{audio.title}</h4>
                <p className="text-gray-400 text-sm">{audio.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Player Section */}
      <div className="bg-gray-900 text-white p-6 rounded-xl max-w-2xl mx-auto flex flex-col md:flex-row gap-6 items-center mt-10 shadow-lg">
        {/* Thumbnail */}
        <img
          src={audios[currentTrack].thumbnail}
          alt="Podcast Cover"
          className="w-32 h-32 rounded-lg object-cover"
        />

        {/* Content */}
        <div className="flex-1 w-full">
          {/* Date */}
          <p className="text-sm text-gray-400 mb-1">
            {audios[currentTrack].date}
          </p>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">
            {audios[currentTrack].title}
          </h2>

          {/* Waveform */}
          <div className="w-full mb-2">
            <div ref={waveformRef} />
          </div>

          {/* Time Info */}
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(timeLeft)} left</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              className="text-2xl hover:text-blue-400"
            >
              ⏪
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              {isPlaying ? "⏸" : "▶️"}
            </button>
            <button
              onClick={handleNext}
              className="text-2xl hover:text-blue-400"
            >
              ⏩
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
