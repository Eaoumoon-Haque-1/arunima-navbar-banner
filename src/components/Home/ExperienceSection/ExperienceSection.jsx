import React, { useEffect, useRef, useState } from 'react';

import golfImage from '../../../assets/golfPlayer.jpg';
import resortImage from '../../../assets/resort.JPG';
import diningImage from '../../../assets/food.JPG';

const experiences = [
    {
        id: 'golf-experience',
        image: golfImage,
        icon: 'ph ph-golf',
        title: 'Golf Experience',
        description:
            'Enjoy a scenic 9-hole, par 36 golf course surrounded by ponds, greenery, and countryside calm.',
    },
    {
        id: 'resort-living',
        image: resortImage,
        icon: 'ph ph-house-line',
        title: 'Resort Living',
        description:
            'Relax in a peaceful resort setting designed for family outings, nature stays, and quiet escapes.',
    },
    {
        id: 'dining-leisure',
        image: diningImage,
        icon: 'ph ph-fork-knife',
        title: 'Dining & Leisure',
        description:
            'Spend your day with resort dining, open landscapes, fresh air, and relaxing outdoor moments.',
    },
];

const ExperienceSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#0d2b1d] py-24"
        >
            {/* Background Glow */}
            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"></div>
            <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-lime-300/10 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
                {/* Section Header */}
                <div
                    className={`mx-auto max-w-4xl text-center transition-all duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    }`}
                >
                    <p className="mx-auto mb-4 w-fit text-sm font-semibold uppercase tracking-[0.25em] text-[#d7b56d]">
                        Experience Arunima
                    </p>

                    <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                        Discover Your Perfect Resort Experience
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50/70 sm:text-lg">
                        From golf and nature to resort leisure and dining, Arunima offers
                        a calm countryside escape for every visitor.
                    </p>
                </div>

                {/* Experience Cards */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {experiences.map((item, index) => (
                        <div
                            key={item.id}
                            className={`group relative h-[430px] overflow-hidden rounded-[1.75rem] shadow-2xl transition-all duration-1000 ease-out motion-reduce:transition-none ${
                                isVisible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-12 opacity-0'
                            }`}
                            style={{
                                transitionDelay: `${index * 150 + 200}ms`,
                            }}
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
                            <div className="absolute inset-0 bg-emerald-950/10 transition duration-500 group-hover:bg-emerald-950/0"></div>

                            {/* Card Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d7b56d]/30 bg-black/20 text-3xl text-[#d7b56d] backdrop-blur-md">
                                    <i className={item.icon}></i>
                                </div>

                                <h3 className="text-3xl font-extrabold text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-base leading-7 text-white/80">
                                    {item.description}
                                </p>
                            </div>

                            {/* Hover Border */}
                            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-white/10 transition duration-500 group-hover:border-[#d7b56d]/50"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;