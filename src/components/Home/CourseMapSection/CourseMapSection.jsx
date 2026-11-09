import React, { useEffect, useRef, useState } from 'react';
import courseMap from '../../../assets/courseMap.jpg';

const courseFacts = [
    {
        value: '9',
        label: 'Holes',
    },
    {
        value: '36',
        label: 'Par',
    },
    {
        value: 'Ponds',
        label: 'Water Features',
    },
];

const CourseMapSection = () => {
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
            className="relative overflow-hidden bg-linear-to-br from-[#f4f8f1] via-emerald-50 to-[#e8f3ea] py-20"
        >
            {/* Background Glow */}
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl"></div>
            <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
                {/* Section Header */}
                <div
                    className={`mx-auto max-w-3xl text-center transition-all duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    }`}
                >
                    <p className="mx-auto mb-4 w-fit rounded-full border border-emerald-700/10 bg-white/60 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-800 backdrop-blur-md">
                        Course Map
                    </p>

                    <h2 className="text-4xl font-extrabold leading-tight text-[#102416] sm:text-5xl">
                        Explore the Arunima Golf Course Layout
                    </h2>

                    <p className="mt-5 text-base leading-8 text-[#647266] sm:text-lg">
                        A scenic 9-hole course surrounded by open greenery, water bodies,
                        and calm countryside views.
                    </p>
                </div>

                {/* Facts Row */}
                <div
                    className={`mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 transition-all delay-200 duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    }`}
                >
                    {courseFacts.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-[1.5rem] border border-emerald-700/10 bg-white/65 p-6 text-center shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <h3 className="text-3xl font-black text-emerald-900">
                                {item.value}
                            </h3>

                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-emerald-800/70">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Map Card */}
                <div
                    className={`mx-auto mt-12 max-w-5xl rounded-[2rem] border border-emerald-700/10 bg-white/75 p-3 shadow-2xl backdrop-blur-md transition-all delay-300 duration-1000 ease-out sm:p-4 md:p-5 lg:p-6 motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-y-0 scale-100 opacity-100'
                            : 'translate-y-12 scale-[0.98] opacity-0'
                    }`}
                >
                    <div className="flex h-[230px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white sm:h-[340px] md:h-[440px] lg:h-[540px] xl:h-[590px]">
                        <img
                            src={courseMap}
                            alt="Arunima Resort Golf Club 9-hole course map"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <p className="mt-4 text-center text-sm leading-6 text-[#647266]">
                        Full 9-hole course layout with ponds, fairways, tee points, and par details.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CourseMapSection;