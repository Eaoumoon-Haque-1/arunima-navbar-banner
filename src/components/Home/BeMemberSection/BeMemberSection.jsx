import React, { useEffect, useRef, useState } from 'react';
import appPreview from '../../../assets/arunimaApp.jpeg';

const memberHighlights = [
    'Golf Access',
    'Resort Privileges',
    'Nature Club Experience',
];

const BeMemberSection = () => {
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
                threshold: 0.25,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="membership"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f7f3ec] py-24"
        >
            {/* Soft curved top */}
            <div className="absolute -top-28 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-b-[50%] bg-white"></div>

            {/* Background glow */}
            <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#d7b56d]/20 blur-3xl"></div>
            <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-300/50 blur-3xl"></div>

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_0.85fr] lg:px-10">
                {/* Left Content */}
                <div
                    className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-10 opacity-0'
                    }`}
                >
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-900/10 bg-white/70 shadow-sm backdrop-blur-md">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-8 w-8 text-emerald-900"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.5 3.5C14.5 4 8.5 6.8 5.8 11.4C3.9 14.6 4.5 18.2 7.5 20C10.8 17.5 14.4 13.7 17.3 8.2"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 20C7.8 15.7 12.3 12.4 18.5 10"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <p className="mb-5 w-fit text-sm font-semibold uppercase tracking-[0.35em] text-[#a8753b]">
                        Join Arunima
                    </p>

                    <h2 className="font-serif text-5xl font-bold uppercase tracking-[0.15em] text-[#4b2635] sm:text-6xl">
                        Be a Member
                    </h2>

                    <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-9 text-[#a8753b]">
                        Where golf, nature, and quiet leisure become part of your lifestyle.
                    </p>

                    <div className="mt-9 h-[2px] w-36 bg-[#4b2635]"></div>

                    <p className="mt-10 max-w-2xl text-base leading-8 text-[#3f3f3f] sm:text-lg">
                        Become a member of Arunima Resort Golf Club and enjoy a refined
                        golf experience surrounded by countryside beauty, peaceful water
                        bodies, seasonal birdlife, and relaxing resort facilities.
                    </p>

                    {/* Highlight Pills */}
                    <div className="mt-9 flex flex-wrap gap-4">
                        {memberHighlights.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-emerald-900/10 bg-white/70 px-5 py-3 text-sm font-bold uppercase tracking-wide text-emerald-900 shadow-sm backdrop-blur-md"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="mt-12">
                        <a
                            href="/membership"
                            className="group inline-flex items-center justify-center overflow-hidden border border-[#4b2635] px-10 py-5 text-sm font-bold uppercase tracking-[0.25em] text-[#4b2635] transition duration-300 hover:bg-[#4b2635] hover:text-white"
                        >
                            <span>Become a Member</span>
                            <span className="ml-3 transition duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </a>
                    </div>
                </div>

                {/* Right App Preview */}
                <div
                    className={`relative transition-all delay-200 duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-10 opacity-0'
                    }`}
                >
                    <div className="relative mx-auto max-w-[360px] rounded-[2.5rem] border border-emerald-900/10 bg-white/70 p-5 shadow-2xl backdrop-blur-md">
                        <div className="absolute -left-8 top-14 hidden rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-md sm:block">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8753b]">
                                Member
                            </p>
                            <p className="mt-1 text-sm font-bold text-emerald-900">
                                Digital Access
                            </p>
                        </div>

                        <div className="absolute -right-8 bottom-20 hidden rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-md sm:block">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8753b]">
                                Resort
                            </p>
                            <p className="mt-1 text-sm font-bold text-emerald-900">
                                App Preview
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-[2rem] bg-[#edf5e8]">
                            <img
                                src={appPreview}
                                alt="Arunima Resort Golf Club app preview"
                                className="h-[520px] w-full object-contain sm:h-[620px]"
                            />
                        </div>
                    </div>

                    <div className="mx-auto mt-8 max-w-md text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#a8753b]">
                            Digital Experience
                        </p>

                        <h3 className="mt-3 text-3xl font-extrabold text-[#102416]">
                            Explore the Arunima App
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-[#647266]">
                            A modern member-focused experience for login, updates,
                            resort access, and future digital services.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeMemberSection;