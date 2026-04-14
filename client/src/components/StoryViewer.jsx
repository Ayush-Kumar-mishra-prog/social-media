import { BadgeCheck, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    let timer, progressInterval;
    if (viewStory) {
      setProgress(0);
      if (viewStory.media_type === "video") {
        // For videos, progress is handled by onTimeUpdate
      } else {
        // For text and images, use timer
        const duration = 10000; // 10 seconds
        const intervalTime = 100; // Update every 100ms
        let elapsed = 0;
        progressInterval = setInterval(() => {
          elapsed += intervalTime;
          setProgress((elapsed / duration) * 100);
        }, intervalTime);

        timer = setTimeout(() => {
          setViewStory(null);
        }, duration);
      }
    }
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) return null;
  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt=""
            className="max-w-full max-h-screen object-contain"
          />
        );
      case "video":
        return (
          <video
            ref={videoRef}
            controls
            autoPlay
            onEnded={() => setViewStory(null)}
            onTimeUpdate={handleVideoTimeUpdate}
            src={viewStory.media_url}
            alt=""
            className="max-h-screen"
          />
        );

      case "text":
        return (
          <div
            className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center"
            style={{ backgroundColor: viewStory.background_color }}
          >
            {viewStory.content}
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div
      className="fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.background_color
            : "#000000",
      }}
    >
      {/* progress bar */}

      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* User info */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
        <img
          src={viewStory.user?.profile_picture}
          alt=""
          className="sm:size-8 size-7 rounded-full object-cover border border-white"
        />
        <div className="">
          <span className="flex items-center gap-1 text-white font-semibold text-sm sm:text-base">
            {viewStory.user?.full_name} <BadgeCheck color="blue" size={18} />
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none cursor-pointer"
      >
        <X size={24} />
      </button>

      {/* Story content */}
      <div className="flex items-center justify-center max-h-[90vh] max-w-[90vw]">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;
