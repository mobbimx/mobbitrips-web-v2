'use client';

/**
 * AmbientCanvas — capa de fondo viva para todo el Home.
 *
 * Tres capas de comportamiento:
 *  1. Drift (outer div): wandering autónomo — el blob elige destinos aleatorios
 *     y flota entre ellos sin parar, como lava en una lámpara.
 *  2. Deflexión de dirección: cuando el cursor entra en la zona del blob,
 *     se interrumpe el drift actual y se lanza uno nuevo en dirección contraria
 *     al cursor. El blob sigue flotando desde ahí — cambia de camino, no vuelve.
 *  3. Ripple sutil (inner div): pequeño cedido visual cuando el cursor está cerca,
 *     para reforzar la sensación líquida. Se suma al drift sin conflicto.
 */

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type BlobConfig = {
  size: number;
  color: string;
  opacity: number;
  blur: number;
  initial: { xPct: number; yPct: number };
  drift: { range: number; duration: number };
  influence: number;
  push: number;
};

const BLOBS: BlobConfig[] = [
  // Grandes — lentos y envolventes
  {
    size: 820,
    color: '237, 104, 100',
    opacity: 0.38,
    blur: 60,
    initial: { xPct: -8, yPct: -5 },
    drift: { range: 700, duration: 9 },
    influence: 360,
    push: 65,
  },
  {
    size: 720,
    color: '244, 160, 158',
    opacity: 0.44,
    blur: 55,
    initial: { xPct: 80, yPct: 18 },
    drift: { range: 650, duration: 11 },
    influence: 340,
    push: 60,
  },
  {
    size: 680,
    color: '237, 104, 100',
    opacity: 0.32,
    blur: 70,
    initial: { xPct: 35, yPct: 72 },
    drift: { range: 600, duration: 13 },
    influence: 320,
    push: 55,
  },

  // Medianos — ritmo intermedio
  {
    size: 440,
    color: '244, 160, 158',
    opacity: 0.46,
    blur: 45,
    initial: { xPct: 10, yPct: 58 },
    drift: { range: 550, duration: 8 },
    influence: 300,
    push: 75,
  },
  {
    size: 420,
    color: '232, 181, 71',
    opacity: 0.3,
    blur: 50,
    initial: { xPct: 64, yPct: 50 },
    drift: { range: 520, duration: 9 },
    influence: 300,
    push: 75,
  },
  {
    size: 380,
    color: '232, 181, 71',
    opacity: 0.28,
    blur: 50,
    initial: { xPct: 86, yPct: 78 },
    drift: { range: 480, duration: 10 },
    influence: 280,
    push: 70,
  },
  {
    size: 340,
    color: '237, 104, 100',
    opacity: 0.38,
    blur: 40,
    initial: { xPct: 22, yPct: 28 },
    drift: { range: 460, duration: 7 },
    influence: 280,
    push: 70,
  },

  // Pequeños — más rápidos, reaccionan bien al cursor
  {
    size: 220,
    color: '244, 160, 158',
    opacity: 0.5,
    blur: 30,
    initial: { xPct: 50, yPct: 12 },
    drift: { range: 420, duration: 6 },
    influence: 260,
    push: 90,
  },
  {
    size: 200,
    color: '232, 181, 71',
    opacity: 0.36,
    blur: 32,
    initial: { xPct: 14, yPct: 82 },
    drift: { range: 400, duration: 5 },
    influence: 240,
    push: 85,
  },
  {
    size: 180,
    color: '237, 104, 100',
    opacity: 0.48,
    blur: 28,
    initial: { xPct: 74, yPct: 32 },
    drift: { range: 440, duration: 5 },
    influence: 240,
    push: 95,
  },
];

export function AmbientCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const driftRefs = useRef<Array<HTMLDivElement | null>>([]);
  const forceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduce) return;

    const quickX: Array<(v: number) => void> = [];
    const quickY: Array<(v: number) => void> = [];
    // Store each blob's wander fn so deflection tweens can resume it on complete
    const wanderFns: Array<() => void> = [];
    // Timestamp until which each blob ignores new deflections (prevents jitter)
    const cooldowns: number[] = Array.from({ length: BLOBS.length }, () => 0);

    // Capture ref snapshots — refs can change by the time cleanup runs
    const driftEls = driftRefs.current.slice();

    const ctx = gsap.context(() => {
      BLOBS.forEach((cfg, i) => {
        const driftEl = driftRefs.current[i];
        const forceEl = forceRefs.current[i];
        if (!driftEl || !forceEl) return;

        // Autonomous wandering: each completion picks a new random destination.
        function wander() {
          gsap.to(driftEl!, {
            x: (Math.random() - 0.5) * cfg.drift.range,
            y: (Math.random() - 0.5) * cfg.drift.range,
            duration: cfg.drift.duration * (0.7 + Math.random() * 0.6),
            ease: 'sine.inOut',
            onComplete: wander,
          });
        }

        wanderFns[i] = wander;

        // Scatter immediately so blobs start dispersed, not all at origin.
        gsap.set(driftEl, {
          x: (Math.random() - 0.5) * cfg.drift.range,
          y: (Math.random() - 0.5) * cfg.drift.range,
        });
        gsap.delayedCall(i * 0.3, wander);

        // Subtle ripple on inner div (slow, low intensity — just a soft yield)
        quickX[i] = gsap.quickTo(forceEl, 'x', { duration: 1.6, ease: 'power1.out' });
        quickY[i] = gsap.quickTo(forceEl, 'y', { duration: 1.6, ease: 'power1.out' });
      });
    }, containerRef);

    let mouseX = -9999;
    let mouseY = -9999;
    let tickId = 0;
    let loopId = 0;

    const tick = () => {
      tickId = 0;
      const now = performance.now();

      BLOBS.forEach((cfg, i) => {
        const drift = driftRefs.current[i];
        if (!drift) return;

        const rect = drift.getBoundingClientRect();
        const blobCx = rect.left + rect.width / 2;
        const blobCy = rect.top + rect.height / 2;
        const ddx = blobCx - mouseX;
        const ddy = blobCy - mouseY;
        const dist = Math.hypot(ddx, ddy);
        const inRange = dist < cfg.influence && dist > 0.001;

        if (inRange) {
          const ux = ddx / dist;
          const uy = ddy / dist;

          // Direction deflection: redirect drift path away from cursor.
          // Cooldown prevents re-triggering while cursor stays in zone.
          if (now > (cooldowns[i] ?? 0)) {
            cooldowns[i] = now + 1500;

            const curX = gsap.getProperty(drift, 'x') as number;
            const curY = gsap.getProperty(drift, 'y') as number;
            const half = cfg.drift.range / 2;
            const newX = Math.max(-half, Math.min(half, curX + ux * cfg.push));
            const newY = Math.max(-half, Math.min(half, curY + uy * cfg.push));
            const resumeFn = wanderFns[i];

            gsap.killTweensOf(drift);
            gsap.to(drift, {
              x: newX,
              y: newY,
              duration: cfg.drift.duration * 0.35,
              ease: 'power2.out',
              onComplete: resumeFn,
            });
          }

          // Subtle ripple on inner div (20% of push value)
          const ripple = (1 - dist / cfg.influence) * cfg.push * 0.2;
          quickX[i]?.(ux * ripple);
          quickY[i]?.(uy * ripple);
        } else {
          quickX[i]?.(0);
          quickY[i]?.(0);
        }
      });
    };

    const scheduleTick = () => {
      if (!tickId) tickId = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      scheduleTick();
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      scheduleTick();
    };
    const loop = () => {
      scheduleTick();
      loopId = requestAnimationFrame(loop);
    };
    loopId = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    return () => {
      ctx.revert();
      // Kill deflection tweens launched outside context scope
      driftEls.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (tickId) cancelAnimationFrame(tickId);
      if (loopId) cancelAnimationFrame(loopId);
    };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#FAF8F5',
      }}
    >
      {BLOBS.map((cfg, i) => (
        // Outer: drift + deflection (GSAP native x/y transform)
        <div
          key={i}
          ref={(el) => {
            driftRefs.current[i] = el;
          }}
          style={{
            position: 'absolute',
            left: `${cfg.initial.xPct}%`,
            top: `${cfg.initial.yPct}%`,
            width: `${cfg.size}px`,
            height: `${cfg.size}px`,
            marginLeft: `-${cfg.size / 2}px`,
            marginTop: `-${cfg.size / 2}px`,
            willChange: 'transform',
          }}
        >
          {/* Inner: subtle ripple (x/y sums with outer drift) */}
          <div
            ref={(el) => {
              forceRefs.current[i] = el;
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${cfg.color}, ${cfg.opacity}) 0%, rgba(${cfg.color}, 0) 70%)`,
              filter: `blur(${cfg.blur}px)`,
              willChange: 'transform',
            }}
          />
        </div>
      ))}
    </div>
  );
}
