/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import { random, useVideoConfig } from "remotion";
import { interpolate, useCurrentFrame } from "remotion";

const BASE_STAR_SPEED = 0.004;
const MIN_DISTANCE_FROM_CENTER = 1;
const INITIAL_STAR_COUNT = 100;

interface Star {
  x: number;
  y: number;
  speed: number;
  id: string;
}

const Star: React.FC<{ star: Star }> = ({ star }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const progress = (frame * star.speed) % 1;
  const distance = interpolate(progress, [0, 1], [0, Math.max(width, height)]);

  const angle = Math.atan2(star.y - height / 2, star.x - width / 2);
  const x = width / 2 + Math.cos(angle) * distance;
  const y = height / 2 + Math.sin(angle) * distance;

  const size = interpolate(progress, [0, 1], [0.1, 3]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: "white",
        opacity,
        boxShadow: `0 0 ${size * 2}px ${size}px rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};

export const ShootingStars: React.FC = () => {
  const { width, height } = useVideoConfig();
  const [stars, setStars] = useState<Star[]>([]);

  // Function to generate stars at random positions with varying distances from the center
  const generateStarPosition = () => {
    const angle = random(`angle-${Date.now()}`) * Math.PI * 2;
    const distance = MIN_DISTANCE_FROM_CENTER + random(`distance-${Date.now()}`) * (Math.max(width, height) / 2);

    const x = width / 2 + Math.cos(angle) * distance;
    const y = height / 2 + Math.sin(angle) * distance;

    return { x, y };
  };

  // Initialize stars outside the center with different distances
  useEffect(() => {
    const initialStars = new Array(INITIAL_STAR_COUNT).fill(0).map(() => {
      const { x, y } = generateStarPosition();

      return {
        x,
        y,
        speed: BASE_STAR_SPEED + random(`star-${Date.now()}-speed`) * BASE_STAR_SPEED,
        id: `${Date.now()}-${Math.random()}`,
      };
    });

    setStars(initialStars);
  }, [width, height, generateStarPosition]);

  // Add new stars over time
  useEffect(() => {
    const interval = setInterval(() => {
      const { x, y } = generateStarPosition();
      const newStar: Star = {
        x,
        y,
        speed: BASE_STAR_SPEED + random(`star-${Date.now()}-speed`) * BASE_STAR_SPEED,
        id: `${Date.now()}`,
      };

      setStars((prevStars) => [...prevStars, newStar].slice(-9000));
    }, 20); // Generate new stars every 20ms

    return () => clearInterval(interval);
  }, [width, height, generateStarPosition]);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      {stars.map((star) => (
        <Star key={star.id} star={star} />
      ))}
    </div>
  );
};
