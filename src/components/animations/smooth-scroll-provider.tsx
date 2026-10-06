"use client";

import { ReactLenis } from "lenis/react";
import type { PropsWithChildren } from "react";

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
