'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const accepted = localStorage.getItem('cookie_consent_accepted');
        if (!accepted) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    useGSAP(() => {
        if (isVisible) {
            gsap.fromTo(
                '.cookie-consent',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
        }
    }, [isVisible]);

    const handleAccept = () => {
        gsap.to('.cookie-consent', {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
                localStorage.setItem('cookie_consent_accepted', 'true');
                setIsVisible(false);
            },
        });
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent fixed bottom-0 left-0 w-full z-[100] px-4 pb-4 md:pb-6 pointer-events-none">
            <div className="max-w-7xl mx-auto pointer-events-auto">
                <div className="bg-halo-black/70 backdrop-blur-md border border-neutral-800 p-4 md:p-6 rounded-none shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed tracking-wide">
                            Weboldalunk sütiket használ a jobb felhasználói élmény érdekében.
                            Az oldal használatával elfogadja az adatvédelmi irányelveinket.
                        </p>
                    </div>
                    <button
                        onClick={handleAccept}
                        className="group relative px-6 py-2 bg-transparent overflow-hidden border border-neutral-700 hover:border-halo-red transition-colors duration-300"
                    >
                        <span className="absolute inset-0 w-full h-full bg-halo-red/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                        <span className="relative font-display font-bold text-xs md:text-sm tracking-widest text-white uppercase">
                            Elfogadom
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
