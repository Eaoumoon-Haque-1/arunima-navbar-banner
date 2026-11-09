import React, { useEffect, useRef, useState } from 'react';
import aboutMain from '../../../assets/aboutMain.JPG';
import birds from '../../../assets/birds.JPG';
import aboutResort from '../../../assets/banner.jpg';



const AboutSection = () => {
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
            ref={sectionRef}
            className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-[#f4f8f1] to-[#e8f3ea] py-20"
        >
            {/* Background Glow */}
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl"></div>
            <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl"></div>

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
                {/* Left Images */}
                <div
                    className={`relative transition-all duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-12 opacity-0'
                    }`}
                >
                    <div className="group relative overflow-hidden rounded-[2rem] border border-emerald-700/10 shadow-2xl">
                        <img
                            src={aboutMain}
                            alt="Arunima Resort Golf Club natural golf landscape"
                            className="h-[520px] w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-emerald-950/10 to-transparent"></div>

                        <div
                            className={`absolute bottom-6 left-6 rounded-2xl border border-white/25 bg-white/20 px-5 py-4 text-white backdrop-blur-md transition-all delay-300 duration-700 ease-out motion-reduce:transition-none ${
                                isVisible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-6 opacity-0'
                            }`}
                        >
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/80">
                                Arunima Experience
                            </p>
                            <h3 className="mt-1 text-2xl font-bold">
                                Golf & Nature Retreat
                            </h3>
                        </div>
                    </div>

                    {/* Side Floating Image */}
                    <div
                        className={`absolute -bottom-10 -right-4 hidden w-56 overflow-hidden rounded-3xl border-8 border-[#f4f8f1] shadow-2xl transition-all delay-500 duration-1500 ease-out sm:block lg:-right-10 motion-reduce:transition-none ${
                            isVisible
                                ? 'translate-x-0 translate-y-0 rotate-0 opacity-100'
                                : 'translate-x-12 translate-y-10 rotate-6 opacity-0'
                        }`}
                    >
                        <img
                            src={birds}
                            alt="Arunima Resort Golf Club birds flying over golf course"
                            className="h-64 w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>

                    {/* Top Floating Image */}
                    <div
                        className={`absolute -top-10 left-6 hidden w-44 overflow-hidden rounded-3xl border-8 border-[#f4f8f1] shadow-2xl transition-all delay-700 duration-1500 ease-out sm:block motion-reduce:transition-none ${
                            isVisible
                                ? 'translate-x-0 translate-y-0 rotate-0 opacity-100'
                                : '-translate-x-10 -translate-y-8 -rotate-6 opacity-0'
                        }`}
                    >
                        <img
                            src={aboutResort}
                            alt="Arunima Resort peaceful resort view"
                            className="h-52 w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div
                    className={`flex min-h-[520px] flex-col justify-center transition-all delay-200 duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-12 opacity-0'
                    }`}
                >
                    <p className="mb-4 w-fit rounded-full border border-emerald-700/10 bg-white/60 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-800 backdrop-blur-md">
                        About Arunima
                    </p>

                    <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-[#102416] sm:text-5xl">
                        A Peaceful Golf Resort Surrounded by Nature
                    </h2>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-[#465a4b]">
                        Arunima Resort Golf Club brings together golf, countryside calm,
                        open landscapes, and refined resort comfort in one relaxing
                        destination.
                    </p>

                    <p className="mt-5 max-w-2xl text-base leading-8 text-[#647266]">
                        Designed for leisure, family outings, nature walks, and quiet
                        escapes, Arunima offers a refreshing break from busy city life.
                    </p>


                </div>
            </div>
        </section>
    );
};

export default AboutSection;