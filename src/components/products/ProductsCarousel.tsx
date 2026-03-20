"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTicker } from "./useTicker";
import ProductCard from "@/components/products/ProductCard";

interface Props {
  products: any[];
}

function wrapOffset(value: number, width: number) {
  if (width <= 0) return value;

  let next = value;
  while (next <= -width) next += width;
  while (next > 0) next -= width;
  return next;
}

export default function ProductsCarousel({ products }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [userStopped, setUserStopped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const itemWidth = 320;
  const gap = 24;
  const baseWidth = products.length * (itemWidth + gap) - gap;

  const isPaused = userStopped || isHovered || isPointerDown || isDragging;

  const {
    getOffset,
    setOffset,
    addVelocity,
    setVelocity,
    start,
    stop,
    isDraggingRef,
  } = useTicker({
    autoSpeed: -50,
    inertiaDecay: 0.965,
    loopWidth: baseWidth,
    paused: isPaused,
  });

  const activePointerId = useRef<number | null>(null);
  const downX = useRef(0);
  const lastX = useRef(0);
  const moved = useRef(false);
  const downAt = useRef(0);
  const suppressClickRef = useRef(false);

  const DRAG_THRESHOLD = 6;
  const TAP_MAX_MS = 260;

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${getOffset()}px, 0, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [getOffset]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const dominantHorizontal =
        Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;

      if (dominantHorizontal === 0) return;

      setUserStopped(true);
      setVelocity(0);

      const next = wrapOffset(getOffset() - dominantHorizontal, baseWidth);
      setOffset(next);
      addVelocity(-dominantHorizontal * 8);

      e.preventDefault();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [addVelocity, getOffset, setOffset, setVelocity, baseWidth]);

  const endInteraction = useCallback(() => {
    isDraggingRef.current = false;
    activePointerId.current = null;
    setIsPointerDown(false);
    setIsDragging(false);
  }, [isDraggingRef]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;

      activePointerId.current = e.pointerId;
      downX.current = e.clientX;
      lastX.current = e.clientX;
      downAt.current = performance.now();
      moved.current = false;
      suppressClickRef.current = false;

      setIsPointerDown(true);
      setUserStopped(true);
      setVelocity(0);
    },
    [setVelocity]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activePointerId.current !== e.pointerId) return;

      const totalDx = e.clientX - downX.current;
      const stepDx = e.clientX - lastX.current;
      lastX.current = e.clientX;

      if (!moved.current && Math.abs(totalDx) > DRAG_THRESHOLD) {
        moved.current = true;
        suppressClickRef.current = true;
        isDraggingRef.current = true;
        setIsDragging(true);

        const outer = outerRef.current;
        if (outer) {
          try {
            outer.setPointerCapture(e.pointerId);
          } catch {}
        }
      }

      if (!moved.current) return;

      const next = wrapOffset(getOffset() + stepDx, baseWidth);
      setOffset(next);

      const velocityFactor = e.pointerType === "touch" ? 10 : 18;
      addVelocity(stepDx * velocityFactor);
    },
    [addVelocity, getOffset, setOffset, baseWidth, isDraggingRef]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (activePointerId.current !== e.pointerId) return;

      const outer = outerRef.current;
      if (outer) {
        try {
          outer.releasePointerCapture(e.pointerId);
        } catch {}
      }

      const elapsed = performance.now() - downAt.current;
      const isTap = !moved.current && elapsed <= TAP_MAX_MS;

      if (isTap) {
        setUserStopped(true);
      }

      endInteraction();
    },
    [endInteraction]
  );

  const onPointerCancel = useCallback(() => {
    endInteraction();
  }, [endInteraction]);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (!suppressClickRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }, []);

  const displayed = [...products, ...products, ...products];

  return (
    <div
      ref={outerRef}
      className="overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
      style={{
        touchAction: "pan-y",
        WebkitOverflowScrolling: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div
        ref={trackRef}
        className="flex items-start py-6 will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {displayed.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="shrink-0"
            style={{ width: `${itemWidth}px` }}
          >
            <ProductCard data={product} />
          </div>
        ))}
      </div>
    </div>
  );
}