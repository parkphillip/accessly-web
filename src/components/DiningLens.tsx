import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Eye, UsersRound, Accessibility } from 'lucide-react';

// Data for the cards
const cardsData = [
  {
    id: 1,
    title: 'Standard Menus',
    description: 'Often unreadable for those with low vision, dyslexia, or other print disabilities.',
    image: '/lovable-uploads/041e69a8-3fb1-4f07-b069-24be3b2c258d.png',
  },
  {
    id: 2,
    title: 'PDF Menus Online',
    description: 'Inaccessible to screen readers and difficult to navigate on mobile devices.',
    image: '/lovable-uploads/8515ac8d-89f4-4740-a0f3-df3263c478ff.png',
  },
  {
    id: 3,
    title: 'Lack of Braille',
    description: 'Excludes blind patrons from independently choosing their meal.',
    image: '/lovable-uploads/64dcd833-4083-4f83-8da1-a47b50b1568b.png',
  },
];

type CardData = typeof cardsData[0];

const LeftColumn = () => (
    <div className="max-w-lg text-center lg:text-left">
        <h2 className="text-5xl lg:text-6xl font-heading font-bold text-dark-text mb-4 leading-tight tracking-tight">
            Dining Through a Different Lens
        </h2>
        <p className="text-xl text-medium-text mt-4 mb-8">
            Every dining experience should be inclusive and independent.
        </p>
        <p className="text-lg text-neutral-600 mb-10">
            Dining out presents hidden barriers for millions with vision impairments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-8 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center sm:flex-col gap-4 sm:gap-0">
                <Eye className="w-8 h-8 sm:w-6 sm:h-6 sm:mx-auto sm:mb-2 text-brand-navy" />
                <div className="text-left sm:text-center">
                    <p className="text-3xl font-bold text-brand-navy">2.2B</p>
                    <p className="text-sm text-medium-text">people with vision impairments</p>
                </div>
            </div>
            <div className="flex items-center sm:flex-col gap-4 sm:gap-0">
                <UsersRound className="w-8 h-8 sm:w-6 sm:h-6 sm:mx-auto sm:mb-2 text-brand-navy" />
                <div className="text-left sm:text-center">
                    <p className="text-3xl font-bold text-brand-navy">90%</p>
                    <p className="text-sm text-medium-text">need menu assistance</p>
                </div>
            </div>
            <div className="flex items-center sm:flex-col gap-4 sm:gap-0">
                <Accessibility className="w-8 h-8 sm:w-6 sm:h-6 sm:mx-auto sm:mb-2 text-brand-navy" />
                <div className="text-left sm:text-center">
                    <p className="text-3xl font-bold text-brand-navy">10%</p>
                    <p className="text-sm text-medium-text">dine independently</p>
                </div>
            </div>
        </div>
    </div>
);

const AnimatedCard = ({ card, i, scrollYProgress }: { card: CardData, i: number, scrollYProgress: MotionValue<number> }) => {
    const totalCards = cardsData.length;

    // Card 0 is the base card and is always visible.
    if (i === 0) {
        return (
            <motion.div
                style={{ zIndex: 0 }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
                <div className="bg-off-white p-4 pb-6 rounded-lg shadow-strong w-full max-w-md">
                    <img src={card.image} alt={card.title} className="w-full h-56 object-cover rounded-md mb-4 bg-subtle-gray" />
                    <h3 className="font-heading font-bold text-xl text-dark-text">{card.title}</h3>
                    <p className="text-medium-text text-base mt-1">{card.description}</p>
                </div>
            </motion.div>
        );
    }
    
    // For subsequent cards (i > 0), they animate in.
    const startProgress = (i - 1) / (totalCards - 1);
    const endProgress = i / (totalCards - 1);
    
    // Animate `y` from below the viewport to its final stacked position.
    // Using '60vh' ensures the card starts off-screen.
    const y = useTransform(scrollYProgress, [startProgress, endProgress], ['60vh', `${-i * 40}px`]);
    
    // Add a slight tilt to the cards as they enter, which straightens out.
    const rotate = useTransform(scrollYProgress, [startProgress, endProgress], [i % 2 === 0 ? 4 : -4, 0]);
    
    return (
        <motion.div
            style={{ y, rotate, zIndex: i }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
            <div className="bg-off-white p-4 pb-6 rounded-lg shadow-strong w-full max-w-md">
                <img src={card.image} alt={card.title} className="w-full h-56 object-cover rounded-md mb-4 bg-subtle-gray" />
                <h3 className="font-heading font-bold text-xl text-dark-text">{card.title}</h3>
                <p className="text-medium-text text-base mt-1">{card.description}</p>
            </div>
        </motion.div>
    );
};

const MobileCard = ({ card }: { card: CardData }) => (
    <div className="bg-off-white p-6 rounded-xl shadow-strong border border-light-gray/50 w-full max-w-md mx-auto">
        <img src={card.image} alt={card.title} className="w-full h-56 object-cover rounded-lg mb-4 bg-subtle-gray" />
        <h3 className="font-heading font-bold text-2xl text-dark-text">{card.title}</h3>
        <p className="text-medium-text mt-2">{card.description}</p>
    </div>
);

const DiningLens = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section id="impact" ref={targetRef} className="relative h-auto lg:h-[300vh] bg-slate-50">
            <div className="sticky top-0 h-auto lg:h-screen flex items-center justify-center overflow-hidden">
                <div className="max-w-7xl w-full mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20 lg:py-0">
                    <LeftColumn />
                    {/* Right Column: responsive handling */}
                    <div className="lg:hidden flex flex-col gap-8 mt-8">
                        {cardsData.map(card => <MobileCard key={card.id} card={card} />)}
                    </div>
                    <div className="hidden lg:block relative h-[700px] w-full">
                        {cardsData.map((card, i) => (
                            <AnimatedCard key={card.id} card={card} i={i} scrollYProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiningLens;
