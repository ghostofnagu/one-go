"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "../../lib/utils";

const flairBasePath = `${import.meta.env.BASE_URL}flair/`;

const flairImages = [
  `${flairBasePath}vinyl.png`,
  "https://cdn.21st.dev/assets/mirror/7f/7fa03f07d6ecc851e6f9ecfc2fa3d401ee781e1c3ac345d57697b9792a349b32.png",
  `${flairBasePath}cassette.png`,
  "https://cdn.21st.dev/assets/mirror/eb/eb232a2025c87072e321d8b18a63130ebd6c2cf17360721a13152411548b8064.png",
  "https://cdn.21st.dev/assets/mirror/b8/b8d012bb9179f6ddf83cfb8e9f0d536bda7444a4838c5e691427c5f1a9e78d0e.png",
  `${flairBasePath}note.png`,
  "https://cdn.21st.dev/assets/mirror/61/6182e640b5507304132cfa3b61cc62ec45f0b0a85a883ad80a5ff5a397748a5a.png",
  "https://cdn.21st.dev/assets/mirror/b6/b636532c14ec5ec65e1bcb697a4d374f688783477a605ced41bca4606c38b9b0.png",
  "https://cdn.21st.dev/assets/mirror/7f/7f7a80245c0e9bbb97db3b452322f89b7666e27cf41eae1cf235a4c186637d5b.png",
  "https://cdn.21st.dev/assets/mirror/b2/b2d22aafe57a2ab515ef4f48cbc934db635b091d726ad3a946b3d0853bfd249e.png",
  "https://cdn.21st.dev/assets/mirror/bc/bc221d73136c58033b7c56f88f0de1874969299d8132b636e93279a9d1f5f0c3.png",
  "https://cdn.21st.dev/assets/mirror/ee/ee76d11e20654a6f2b0ab123614c71fbf74d82d5c2ac9563de88bcfcf195ee75.png",
];

export interface CursorTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  images?: string[];
  distance?: number;
  duration?: number;
  imageSize?: number;
}

export function CursorTrail({
  className,
  images = flairImages,
  distance = 80,
  duration = 1000,
  imageSize = 76.8,
  ...props
}: CursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const imageElements = Array.from(
      containerRef.current.querySelectorAll(".flair-image"),
    ) as HTMLElement[];
    let currentIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let isInitial = true;

    const spawnImage = (x: number, y: number) => {
      const image = imageElements[currentIndex];
      if (!image) return;
      currentIndex = (currentIndex + 1) % imageElements.length;

      const targetX = x - imageSize / 2;
      const targetY = y - imageSize / 2;

      if (typeof image.getAnimations === "function") {
        image.getAnimations().forEach((animation) => animation.cancel());
      }

      const randomRotation = Math.random() * 40 - 20;
      image.animate(
        [
          { opacity: 0, transform: `translate(${targetX}px, ${targetY}px) scale(0.2) rotate(0deg)` },
          { opacity: 1, transform: `translate(${targetX}px, ${targetY}px) scale(1) rotate(${randomRotation / 2}deg)`, offset: 0.15 },
          { opacity: 0, transform: `translate(${targetX}px, ${targetY + 80}px) scale(0.8) rotate(${randomRotation}deg)` },
        ],
        { duration, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "forwards" },
      );
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;

      if (isInitial) {
        lastX = currentX;
        lastY = currentY;
        isInitial = false;
        return;
      }

      const distanceTravelled = Math.hypot(currentX - lastX, currentY - lastY);
      if (distanceTravelled <= distance) return;

      const count = Math.floor(distanceTravelled / distance);
      for (let index = 1; index <= count; index += 1) {
        const progress = (index * distance) / distanceTravelled;
        spawnImage(lastX + (currentX - lastX) * progress, lastY + (currentY - lastY) * progress);
      }

      const totalProgress = (count * distance) / distanceTravelled;
      lastX += (currentX - lastX) * totalProgress;
      lastY += (currentY - lastY) * totalProgress;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [distance, duration, imageSize]);

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-50 overflow-hidden", className)} {...props}>
      <div ref={containerRef} className="absolute inset-0">
        {images.map((source, index) => (
          <img
            key={index}
            src={source}
            alt=""
            aria-hidden="true"
            className="flair-image pointer-events-none absolute left-0 top-0 origin-center object-cover"
            style={{ width: imageSize, height: imageSize, transform: "translate(-100%, -100%)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default CursorTrail;
