import React, { useRef, useState, useEffect } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { FaPlay } from "react-icons/fa"; // Ek simple play icon ke liye

const VideoPlayer = ({ media }) => {
  const videoTag = useRef();
  const [mute, setMute] = useState(false);
  const [isPlaying, setIsplaying] = useState(true);

  const handleClick = async () => {
    if (isPlaying) {
      videoTag.current.pause();
      setIsplaying(false);
    } else {
      videoTag.current.play();
      setIsplaying(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoTag.current;
        if (entry.isIntersecting) {
          video.play();
          setIsplaying(true);
        } else {
          video.pause();
          setIsplaying(false);
        }
      },
      { threshold: 0.6 }
    );
    if (videoTag.current) {
      observer.observe(videoTag.current);
    }

    return () => {
      if (videoTag.current) {
        observer.unobserve(videoTag.current);
      }
    };
  }, []);

  return (
    <div className="relative group w-full h-full cursor-pointer overflow-hidden rounded-[24px] bg-black shadow-lg">
      {/* Main Video */}
      <video
        ref={videoTag}
        src={media}
        autoPlay
        loop
        muted={mute}
        playsInline
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onClick={handleClick}
      />

      {/* Play/Pause Center Indicator */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all"
          onClick={handleClick}
        >
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-pulse">
            <FaPlay className="text-white w-5 h-5 ml-1" />
          </div>
        </div>
      )}

      <div 
        className="absolute bottom-4 right-4 z-20 p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 transition-all active:scale-90"
        onClick={(e) => {
          e.stopPropagation();
          setMute(prev => !prev);
        }}
      >
        {!mute ? (
          <FiVolume2 className="h-5 w-5 text-white" />
        ) : (
          <FiVolumeX className="h-5 w-5 text-white/70" />
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoPlayer;