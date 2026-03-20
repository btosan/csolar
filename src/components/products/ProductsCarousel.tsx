"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTicker } from "./useTicker";
import ProductCard from "@/components/products/ProductCard";

interface Props {
  products: any[];
}

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [data-no-drag="true"]';

export default function ProductsCarousel({ products }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [userStopped, setUserStopped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const itemWidth = 320;
  const gap = 24;
  const baseWidth = products.length * (itemWidth + gap) - gap;

  const isPaused = userStopped || isHovered;

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
      let delta =
        Math.abs(e.deltaX) >= Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey
          ? e.deltaY
          : 0;

      if (delta !== 0) {
        const factor = 1.2;
        addVelocity(delta * factor);

        let off = getOffset() + delta;

        if (off <= -baseWidth) off += baseWidth;
        if (off >= 0) off -= baseWidth;

        setOffset(off);
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [addVelocity, getOffset, setOffset, baseWidth]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;

      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        return;
      }

      const outer = outerRef.current;
      if (!outer) return;

      isDraggingRef.current = true;
      setVelocity(0);

      activePointerId.current = e.pointerId;
      downX.current = e.clientX;
      lastX.current = e.clientX;
      downAt.current = performance.now();
      moved.current = false;

      try {
        outer.setPointerCapture(e.pointerId);
      } catch {}
    },
    [isDraggingRef, setVelocity]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current || activePointerId.current !== e.pointerId) return;

      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;

      if (!moved.current && Math.abs(e.clientX - downX.current) > DRAG_THRESHOLD) {
        moved.current = true;
      }

      let off = getOffset() + dx;

      if (off <= -baseWidth) off += baseWidth;
      if (off >= 0) off -= baseWidth;

      setOffset(off);

      if (moved.current) {
        const velocityFactor = e.pointerType === "touch" ? 6 : 20;
        addVelocity(dx * velocityFactor);
      }
    },
    [getOffset, setOffset, addVelocity, baseWidth]
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

      isDraggingRef.current = false;
      activePointerId.current = null;
    },
    []
  );

  const onPointerCancel = useCallback(() => {
    isDraggingRef.current = false;
    activePointerId.current = null;
  }, [isDraggingRef]);

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
      style={{
        touchAction: "pan-y",
        WebkitOverflowScrolling: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        cursor: "grab",
      }}
    >
      <div
        ref={trackRef}
        className="flex py-6 will-change-transform"
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