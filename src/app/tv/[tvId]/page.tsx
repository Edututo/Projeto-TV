"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
  type: "image" | "video";
  url: string;
}

interface TVContent {
  slides: Slide[];
}

interface PageProps {
  params: {
    tvId: string;
  };
}

export default function TVContentPage({ params }: PageProps) {
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
        <Image
          src={currentSlide.url}
          alt={`Slide ${currentIndex + 1}`}
          width={1920}
          height={1080}
          className="max-w-full max-h-full object-contain"
          priority
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
