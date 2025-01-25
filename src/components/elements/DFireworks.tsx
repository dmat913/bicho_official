"use client";

import { useEffect, useRef, useState } from "react";
import { Fireworks } from "fireworks-js";

interface DFireworksProps {
  timeoutCount: number;
}

const DFireworks = ({ timeoutCount }: DFireworksProps) => {
  const containerRef = useRef(null);
  const [fireworksState, setFireworksState] = useState<Fireworks | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const fireworks = new Fireworks(containerRef.current, {
        // オプション設定
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 0.5,
        particles: 300,
        traceLength: 3,
        traceSpeed: 50,
        explosion: 5,
        boundaries: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      });
      setFireworksState(fireworks);
      fireworks.start();
      setTimeout(() => {
        fireworks.stop();
      }, timeoutCount);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        overflow: "hidden",
      }}
    />
  );
};
export default DFireworks;
