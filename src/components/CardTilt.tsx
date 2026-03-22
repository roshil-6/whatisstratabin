"use client";

import { useRef, useState, useCallback } from "react";

type CardTiltProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
} & (React.AnchorHTMLAttributes<HTMLAnchorElement> | React.HTMLAttributes<HTMLDivElement>);

export default function CardTilt({ children, className = "", maxTilt = 8, style: styleProp, ...rest }: CardTiltProps) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("");
  const isAnchor = "href" in rest;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * maxTilt;
      const rotateX = -y * maxTilt;
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`);
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => setTransform(""), []);

  const baseStyle = { ...styleProp } as React.CSSProperties;
  if (transform) {
    baseStyle.transform = transform;
    baseStyle.transition = "transform 0.12s ease-out";
  } else {
    baseStyle.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  }

  if (isAnchor) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={baseStyle}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={baseStyle}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}
