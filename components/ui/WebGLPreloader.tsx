'use client';
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.cjs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ParticleField = ({ setFinished }: { setFinished: (val: boolean) => void }) => {
    const ref = useRef<any>(null);
    // @ts-ignore
    const sphere = useMemo(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }), []);

    // Refs for animation control
    const speed = useRef(0.1);
    const scale = useRef(1);

    useGSAP(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.cursor = 'wait';

        const tl = gsap.timeline({
            onComplete: () => {
                setFinished(true); // Triggers unmount
                document.body.style.overflow = '';
                document.body.style.cursor = '';
            }
        });

        // 1. Loading Phase (0-2s)
        // Just let it spin (handled in useFrame)

        // 2. Warp Speed / Explosion (at 2.5s)
        tl.to(speed, {
            current: 5.0, // Significant speed up
            duration: 1.5,
            ease: "power2.in",
            delay: 2.0
        });

        // 3. Fade out / Zoom in
        tl.to(ref.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
            ease: "power4.in"
        });

    }, []);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Rotate the entire field
        ref.current.rotation.x -= delta * speed.current * 0.2;
        ref.current.rotation.y -= delta * speed.current * 0.3;

        // Gentle pulse
        // ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.05);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ff0000" // Halo Red-ish
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export const WebGLPreloader = () => {
    const [finished, setFinished] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (finished) return;

        // Counter Animation
        gsap.to(counterRef.current, {
            innerText: 100,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: "power2.inOut",
            onUpdate: function () {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.round(this.targets()[0].innerText) + "%";
                }
            }
        });
    }, [finished]);

    if (finished) return null;

    return (
        <div className="fixed inset-0 z-[9999999] bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField setFinished={setFinished} />
            </Canvas>

            {/* HTML Overlay for Text/Counter */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span ref={counterRef} className="font-display text-9xl font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                    0%
                </span>

                <div className="absolute bottom-10 text-white/50 font-sans text-xs tracking-[0.5em] uppercase">
                    Initializing Neural Link
                </div>
            </div>
        </div>
    );
};
