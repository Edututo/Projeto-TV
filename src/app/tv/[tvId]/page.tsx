"use client";

import React, { useEffect, useState } from "react";

interface Slide {
  type: "image" | "video";
  url: string;
}

interface TVContent {
  slides: Slide[];
}

export default function TVContentPage({ params }: { params: { tvId: string } }) {
  const { tvId } = params;
  const [content, setContent] = useState<TVContent | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch content for the TV from API (to be implemented)
    // For now, simulate with dummy data
    const dummyContent: TVContent = {
      slides: [
        { type: "image", url: "/slides/slide1.jpg" },
        { type: "video", url: "/slides/video1.mp4" },
        { type: "image", url: "/slides/slide2.jpg" },
      ],
    };
    setContent(dummyContent);
  }, [tvId]);

  useEffect(() => {
    if (!content || content.slides.length === 0) return;

    const slideDuration = 5000; // 5 seconds per slide
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.slides.length);
    }, slideDuration);

    return () => clearTimeout(timer);
  }, [content, currentIndex]);

  if (!content || content.slides.length === 0) {
    return <div>Carregando conteúdo para a TV {tvId}...</div>;
  }

  const currentSlide = content.slides[currentIndex];

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      {currentSlide.type === "image" ? (
        <img
          src={currentSlide.url}
          alt={`Slide ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <video
          src={currentSlide.url}
          autoPlay
          muted
          loop
          className="max-w-full max-h-full object-contain"
        />
      )}
    </div>
  );
}
