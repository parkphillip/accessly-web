import React, { useRef, useEffect, useCallback } from 'react';
import { Eye, UsersRound, Accessibility } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/use-mobile';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Optimize GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  force3D: true,
});

// Data for the cards
const cardsData = [
  {
    id: 1,
    title: 'Standard Menus',
    description: 'Often unreadable for those with low vision, dyslexia, or other print disabilities.',
    image: '/lovable-uploads/32488343-2d94-4cbe-84d2-527d8d597f56.png',
  },
  {
    id: 2,
    title: 'PDF Menus Online',
    description: 'Inaccessible to screen readers and difficult to navigate on mobile devices.',
    image: '/lovable-uploads/242e912c-bbe6-4cc1-97cd-8851c1cd8a5c.png',
  },
  {
    id: 3,
    title: 'Lack of Braille',
    description: 'Excludes blind patrons from independently choosing their meal.',
    image: '/lovable-uploads/ed66917f-f3b3-40eb-8843-586c39bf526a.png',
  },
];

type CardData = typeof cardsData[0];

const LeftColumn = () => (
    <div className="max-w-lg text-center lg:text-left flex flex-col justify-center h-full px-6 lg:px-0">
        <h2 id="dining-heading" className="text-4xl lg:text-6xl font-heading font-bold text-dark-text mb-4 leading-tight tracking-tight">
            Dining Through a Different Lens
        </h2>
        <p className="text-xl text-medium-text mt-4 mb-8">
            Menus should be simple. For many with vision loss, they aren't.
        </p>
        <p className="text-lg text-neutral-600 mb-10">
            Most are still print-only, leaving millions of blind diners without access.
        </p>
        <div className="flex flex-col items-center sm:flex-row sm:justify-center lg:justify-start space-y-8 sm:space-y-0 sm:space-x-8">
            <div className="flex flex-col items-center gap-2 sm:flex-col sm:gap-0">
                <Eye className="w-8 h-8 sm:w-6 sm:h-6 sm:mx-auto sm:mb-2 text-brand-navy" />
                <div className="text-center">
                    <p className="text-3xl font-bold text-brand-navy">2.2B</p>
                    <p className="text-sm text-medium-text">people with vision impairments</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-col sm:gap-0">
                <UsersRound className="w-8 h-8 sm:w-6 sm:h-6 sm:mx-auto sm:mb-2 text-brand-navy" />
                <div className="text-center">
                    <p className="text-3xl font-bold text-brand-navy">90%</p>
                    <p className="text-sm text-medium-text">need menu assistance</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-col sm:gap-0">
                <Accessibility className="w-8 h-8 sm:w-6 sm:h-6 sm:mx-auto sm:mb-2 text-brand-navy" />
                <div className="text-center">
                    <p className="text-3xl font-bold text-brand-navy">10%</p>
                    <p className="text-sm text-medium-text">dine independently</p>
                </div>
            </div>
        </div>
    </div>
);

const MobileCard = ({ card }: { card: CardData }) => (
    <div className="bg-off-white p-8 rounded-2xl shadow-strong border border-light-gray/50 w-full max-w-xl mx-auto">
        <img src={card.image} alt={card.title} className="w-full h-72 object-cover rounded-lg mb-6 bg-subtle-gray" />
        <h3 className="font-heading font-bold text-2xl text-dark-text">{card.title}</h3>
        <p className="text-medium-text mt-2">{card.description}</p>
    </div>
);

const CARD_WIDTH = '420px';
const CARD_HEIGHT = '520px';
const IMAGE_HEIGHT = '320px';
const CARD_PADDING = '2.5rem';
const STACK_OFFSET = 8;

const DiningLens = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const isMobile = useIsMobile();
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const setupAnimations = useCallback(() => {
        if (!sectionRef.current || !cardsContainerRef.current) return;

        // On mobile, we don't want any GSAP animations
        if (isMobile) {
            // Set all cards to their final positions immediately
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.set(card, {
                        y: 0,
                        rotate: 0,
                        opacity: 1,
                    });
                }
            });
            return;
        }

        // Desktop animations
        cardsRef.current.forEach((card, index) => {
            if (card) {
                if (index === 0) {
                    // First card starts in its final position
                    gsap.set(card, {
                        y: 0,
                        rotate: '-4deg',
                        opacity: 1,
                    });
                } else {
                    // Other cards start from bottom of screen
                    gsap.set(card, {
                        y: '100vh',
                        rotate: index % 2 === 0 ? '-4deg' : '4deg',
                        opacity: 1,
                    });
                }
            }
        });

        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // GSAP timeline for scroll-linked animation (desktop only)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${cardsData.length * 50}%`,
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                onEnter: () => {
                    // Optimize performance when entering the section
                    cardsRef.current.forEach(card => {
                        if (card) {
                            card.style.willChange = 'transform';
                        }
                    });
                },
                onLeaveBack: () => {
                    // Reset will-change when leaving the section
                    cardsRef.current.forEach(card => {
                        if (card) {
                            card.style.willChange = 'auto';
                        }
                    });
                }
            },
        });

        // Animate only the cards that need to move (skip first card)
        cardsRef.current.forEach((card, index) => {
            if (!card || index === 0) return; // Skip first card
            
            // Cards stack upward with tighter spacing
            const finalY = -index * STACK_OFFSET;
            const finalRotate = index === cardsData.length - 1 ? '0deg' : (index % 2 === 0 ? '-4deg' : '4deg');
            
            tl.to(card, {
                y: finalY,
                rotate: finalRotate,
                duration: 0.5,
            }, index * 0.3);
        });

        timelineRef.current = tl;
    }, [isMobile]);

    useEffect(() => {
        setupAnimations();

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [setupAnimations]);

    return (
        <section id="impact" ref={sectionRef} className="relative bg-slate-50 py-20 lg:py-0">
            <div className="flex items-center justify-center overflow-hidden lg:h-screen">
                <div className="max-w-6xl w-full mx-auto px-5 lg:px-7 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <LeftColumn />

                    <div className="lg:hidden flex flex-col gap-8 mt-8">
                        {cardsData.map(card => <MobileCard key={card.id} card={card} />)}
                    </div>

                    <div ref={cardsContainerRef} className="hidden lg:flex items-center justify-center relative w-full h-full">
                        {cardsData.map((card, index) => (
                            <div
                                key={card.id}
                                ref={el => cardsRef.current[index] = el}
                                className="absolute flex items-center justify-center"
                                style={{
                                    zIndex: index + 1,
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
                                    pointerEvents: 'auto',
                                    touchAction: 'none',
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                    willChange: 'transform',
                                    transform: 'translateZ(0)',
                                }}
                            >
                                <div
                                    className="bg-off-white rounded-2xl border border-light-gray/50 flex flex-col items-center"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        padding: CARD_PADDING,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="rounded-xl mb-6 object-cover"
                                        style={{ width: '100%', height: IMAGE_HEIGHT, background: '#f5f5f5' }}
                                    />
                                    <h3 className="font-heading font-bold text-2xl text-dark-text text-center mb-2">{card.title}</h3>
                                    <p className="text-medium-text text-base text-center">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiningLens;
