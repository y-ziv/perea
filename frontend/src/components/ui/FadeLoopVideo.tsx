"use client";

import { useRef, useState } from "react";

const FADE_DURATION_MS = 600;

export function FadeLoopVideo({
  src,
  className,
  muted = true,
}: {
  src: string;
  className?: string;
  muted?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(1);

  const handleEnded = () => {
    setOpacity(0);
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play();
      }
      setOpacity(1);
    }, FADE_DURATION_MS);
  };

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted={muted}
      playsInline
      onEnded={handleEnded}
      className={className}
      style={{
        opacity,
        transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
      }}
    />
  );
}
