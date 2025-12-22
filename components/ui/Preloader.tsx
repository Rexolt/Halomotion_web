'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Preloader = () => {
    const container = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [complete, setComplete] = useState(false);

    useGSAP(() => {
        // Lock scroll instantly
        document.body.style.overflow = 'hidden';
        document.body.style.cursor = 'wait';

        const tl = gsap.timeline({
            onComplete: () => {
                setComplete(true);
                document.body.style.overflow = '';
                document.body.style.cursor = '';
            }
        });

        // 1. Counter Animation (0 to 100)
        tl.to(counterRef.current, {
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

        // 2. Cinematic Text Flashes (Parallel with counter)
        const words = ["VISION", "MOTION", "EMOTION", "HALOMOTION"];
        const wordTimeline = gsap.timeline();

        words.forEach((word, index) => {
            // Don't animate the last word (HALOMOTION) in the flash sequence, 
            // we will reveal it differently or just end with the logo reveal if preferred.
            // For now, let's just flash standard terms
            if (index === words.length - 1) return;

            // wordTimeline.set ... logic could be complex purely in code, 
            // let's use a simpler approach: multiple elements or changing text.
            // Simpler: Changing text of a separate element
        });

        // Alternative: Just simple timeline steps
        tl.to(".loader-text", { opacity: 1, duration: 0.1 }, 0.5)
            .to(".loader-text", { text: "VISION", duration: 0 }, 0.5)
            .to(".loader-text", { opacity: 0, duration: 0.2, delay: 0.4 })

            .to(".loader-text", { opacity: 1, duration: 0.1, text: "MOTION" })
            .to(".loader-text", { opacity: 0, duration: 0.2, delay: 0.4 })

            .to(".loader-text", { opacity: 1, duration: 0.1, text: "EMOTION" })
            .to(".loader-text", { opacity: 0, duration: 0.2, delay: 0.4 });

        // 3. Exit Animation (Curtain Up)
        tl.to(".loader-bar", {
            height: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: "power4.inOut",
            delay: 0.2
        });

        // Scale out the counter/logo container
        tl.to(container.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        }, "<+=0.2");

    }, { scope: container });

    if (complete) return null;

    return (
        <div ref={container} className="fixed inset-0 z-[9999999] bg-transparent flex flex-col justify-between pointer-events-auto">

            {/* BACKGROUND BARS (Curtain effect) */}
            <div className="absolute inset-0 flex z-0 pointer-events-none">
                <div className="loader-bar w-1/5 h-full bg-[#050505] border-r border-white/5"></div>
                <div className="loader-bar w-1/5 h-full bg-[#050505] border-r border-white/5"></div>
                <div className="loader-bar w-1/5 h-full bg-[#050505] border-r border-white/5"></div>
                <div className="loader-bar w-1/5 h-full bg-[#050505] border-r border-white/5"></div>
                <div className="loader-bar w-1/5 h-full bg-[#050505]"></div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white">

                {/* Dynamic Flashing Text */}
                <h2 className="loader-text font-display text-4xl md:text-8xl font-bold tracking-widest absolute opacity-0 select-none">
                    INITIALIZING
                </h2>

                {/* Counter */}
                <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 overflow-hidden">
                    <span ref={counterRef} className="font-display text-6xl md:text-9xl font-bold text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                        0%
                    </span>
                </div>

                {/* Loading Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                    <div className="w-full h-full bg-halo-red origin-left scale-x-0 animate-[load_2.5s_ease-in-out_forwards]"></div>
                </div>

            </div>
        </div>
    );
};
