
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Slider } from "antd"


interface AudioTrack {
    _id: string
    title: string
    artist: string
    duration: number
    audioUrl: string
    coverImage?: string
}

// Demo tracks that will always work
const DEMO_TRACKS: AudioTrack[] = [
    {
        _id: "demo-1",
        title: "Chill Vibes",
        artist: "Relaxing Sounds",
        duration: 180,
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        coverImage: "/placeholder.svg?height=300&width=300",
    },
    {
        _id: "demo-2",
        title: "Upbeat Energy",
        artist: "Electronic Mix",
        duration: 240,
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        coverImage: "/placeholder.svg?height=300&width=300",
    },
    {
        _id: "demo-3",
        title: "Acoustic Dreams",
        artist: "Guitar Solo",
        duration: 200,
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        coverImage: "/placeholder.svg?height=300&width=300",
    },
    {
        _id: "demo-4",
        title: "Jazz Night",
        artist: "Smooth Jazz",
        duration: 220,
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        coverImage: "/placeholder.svg?height=300&width=300",
    },
]

export default function AudioPlayer() {
    const [tracks] = useState < AudioTrack[] > (DEMO_TRACKS)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState([80])

    const audioRef = useRef < HTMLAudioElement > (null)

    const currentTrack = tracks[currentTrackIndex]

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)

        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", updateDuration)
        audio.addEventListener("ended", handleNext)

        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", updateDuration)
            audio.removeEventListener("ended", handleNext)
        }
    }, [currentTrackIndex])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume[0] / 100
        }
    }, [volume])

    const togglePlayPause = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play().catch((error) => {
                console.error("Error playing audio:", error)
                alert("Unable to play audio. This might be due to browser autoplay restrictions.")
            })
        }
        setIsPlaying(!isPlaying)
    }

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
        setIsPlaying(false)
    }

    const handlePrevious = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
        setIsPlaying(false)
    }

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current
        if (!audio) return

        audio.currentTime = value[0]
        setCurrentTime(value[0])
    }

    const handleTrackSelect = (index: number) => {
        setCurrentTrackIndex(index)
        setIsPlaying(false)
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">🎵 Audio Player Demo</h1>
                    <div className="text-white/70 text-sm">Click any track below to start playing!</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Track List - Takes up 2 columns on large screens */}
                    <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-white mb-6">Demo Playlist</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tracks.map((track, index) => (
                                <div
                                    key={track._id}
                                    onClick={() => handleTrackSelect(index)}
                                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${index === currentTrackIndex
                                            ? "bg-white/20 border-2 border-white/30 scale-105"
                                            : "bg-white/5 hover:bg-white/10 hover:scale-102"
                                        }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <img
                                                src={track.coverImage || "/placeholder.svg?height=60&width=60"}
                                                alt={track.title}
                                                className="w-15 h-15 rounded-lg object-cover"
                                            />
                                            {index === currentTrackIndex && isPlaying && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-medium truncate">{track.title}</h3>
                                            <p className="text-white/70 text-sm truncate">{track.artist}</p>
                                            <p className="text-white/50 text-xs">{formatTime(track.duration)}</p>
                                        </div>
                                        <div className="text-white/70">
                                            {index === currentTrackIndex ? (
                                                isPlaying ? (
                                                    <Pause className="w-5 h-5" />
                                                ) : (
                                                    <Play className="w-5 h-5" />
                                                )
                                            ) : (
                                                <Play className="w-5 h-5 opacity-50" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Player - Takes up 1 column */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                        <div className="text-center mb-6">
                            <img
                                src={currentTrack?.coverImage || "/placeholder.svg?height=200&width=200"}
                                alt={currentTrack?.title}
                                className="w-48 h-48 mx-auto rounded-2xl object-cover mb-4 shadow-2xl"
                            />
                            <h2 className="text-xl font-bold text-white mb-1">{currentTrack?.title}</h2>
                            <p className="text-white/70">{currentTrack?.artist}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <Slider
                                value={[currentTime]}
                                max={duration || 100}
                                step={1}
                                onValueChange={handleSeek}
                                className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-110 [&_[role=slider]:focus-visible]:transition-transform"
                            />
                            <div className="flex justify-between text-white/70 text-sm mt-2">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration - currentTime)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <button
                                onClick={handlePrevious}
                                className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
                            >
                                <SkipBack className="w-6 h-6" />
                            </button>

                            <button
                                onClick={togglePlayPause}
                                
                                className="bg-white text-black hover:bg-white/90 w-16 h-16 rounded-full"
                            >
                                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                            </button>

                            <button
                                onClick={handleNext}
                                
                                className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
                            >
                                <SkipForward className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center space-x-3">
                            <Volume2 className="w-5 h-5 text-white" />
                            <Slider
                                value={volume}
                                max={100}
                                step={1}
                                onValueChange={setVolume}
                                className="flex-1 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
                            />
                            <span className="text-white/70 text-sm w-8">{volume[0]}</span>
                        </div>

                        {/* Info */}
                        <div className="mt-6 p-4 bg-white/5 rounded-lg">
                            <p className="text-white/70 text-sm text-center">🎵 Demo Mode - Click any track to play!</p>
                            <p className="text-white/50 text-xs text-center mt-2">
                                Track {currentTrackIndex + 1} of {tracks.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hidden Audio Element */}
                {currentTrack && (
                    <audio
                        ref={audioRef}
                        src={currentTrack.audioUrl}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        crossOrigin="anonymous"
                    />
                )}
            </div>
        </div>
    )
}
