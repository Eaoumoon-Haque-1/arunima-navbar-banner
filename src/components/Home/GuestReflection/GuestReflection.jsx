import React, { useEffect, useRef, useState } from 'react';

const guestReviews = [
    {
        id: 'muhammad-ali-akbar',
        title: 'অতি আকর্ষণীয় ও দৃষ্টিনন্দন রিসোর্ট',
        rating: 5,
        review:
            'তারিখে অরুণিমা রিসোর্টে বেড়াতে আসলাম। এটি একটি অতি আকর্ষণীয় ও দৃষ্টিনন্দন রিসোর্ট। প্রকৃতি প্রেমীদের এখানে বেড়াতে আসলে ভালো লাগবে। এখানকার কর্মকর্তা কর্মচারীদের আন্তরিকতা ও আতিথেয়তা আমাকে মুগ্ধ করেছে। বিশেষ করে টি এম ডি ইরফান আহমেদের আন্তরিকতার কথা আমার মনে থাকবে। ভবিষ্যতে এটি আরো উন্নত হবে এই কামনা করি।',
        name: 'ডঃ মুহাম্মদ আলী আকবর',
        designation: 'মুখ্য সচিব',
        organization: 'পরিচালক (বাণিজ্যিক)',
        location: 'বাংলাদেশ পর্যটন কর্পোরেশন, ঢাকা',
    },
    {
        id: 'amirul-islam',
        title: 'এখানে এসে মনটা ভরে গেল',
        rating: 5,
        review:
            'অরুণিমা রিসোর্টে এসে এত ভালো লেগেছে যে সেটা হয়তো ভাষায় প্রকাশ করতে পারবো না। তবে এটুকু বলতেই হবে যে এখানে এসে মনটা ভরে গেল। প্রাকৃতিক সৌন্দর্য খুবই উপভোগ করার মতো। সবচেয়ে বেশি আনন্দ দিয়েছে আমাদের সবাইকে দেশীয় বিদেশী পাখিদের উপস্থিতি। আকাশে উড়া এবং তাদের কলাকাকলিতে মুখরিত অরুণিমার পুরো এলাকায় আমাদের জীবনে এত পাখি উপস্থিতি আগে কোথাও দেখতে পাইনি। এখানে আছে সুইমিং পুল, নৌকা ভ্রমণের ব্যবস্থা, কটেজে থাকার সুন্দর ব্যবস্থা, সবকিছুই উপভোগ করার মতো। এখানে সবার আন্তরিকতা ও আতিথেয়তা মনে রাখার মতো। নড়াইলকে পরিচিত করার জন্য এটা একটা অনন্য উদ্যোগ।',
        name: 'এ এফ এম আমিরুল ইসলাম',
        designation: 'কমিশনার',
        organization: 'দুর্নীতি দমন কমিশন, বাংলাদেশ',
        location: '',
    },
];

const GuestReflections = () => {
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
            className="relative overflow-hidden bg-linear-to-br from-[#0d2b1d] via-[#103723] to-[#071c12] py-24"
        >
            {/* Background Glow */}
            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"></div>
            <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#d7b56d]/10 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
                {/* Header */}
                <div
                    className={`mx-auto max-w-4xl text-center transition-all duration-1000 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    }`}
                >
                    <p className="mx-auto mb-4 w-fit text-sm font-semibold uppercase tracking-[0.25em] text-[#d7b56d]">
                        Guest Reflections
                    </p>

                    <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                        Words That Capture the Arunima Experience
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50/70 sm:text-lg">
                        Real impressions from respected guests who experienced the
                        beauty, hospitality, and peaceful nature of Arunima Resort Golf Club.
                    </p>
                </div>

                {/* Review Cards */}
                <div className="mt-16 grid gap-8 lg:grid-cols-2">
                    {guestReviews.map((review, index) => (
                        <article
                            key={review.id}
                            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-8 shadow-2xl transition-all duration-1000 ease-out hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10 motion-reduce:transition-none ${
                                isVisible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-12 opacity-0'
                            }`}
                            style={{
                                transitionDelay: `${index * 180 + 200}ms`,
                            }}
                        >
                            {/* Quote Mark */}
                            <div className="absolute right-8 top-6 text-8xl font-black leading-none text-emerald-900/5">
                                “
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6 flex items-center gap-1 text-[#d7b56d]">
                                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                                        <span key={starIndex} className="text-xl">
                                            ★
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-3xl font-extrabold leading-snug text-[#102416] sm:text-4xl">
                                    {review.title}
                                </h3>

                                <p className="mt-6 text-[16px] leading-9 text-[#3f4f43]">
                                    {review.review}
                                </p>

                                <div className="mt-8 h-px w-full bg-linear-to-r from-emerald-700/20 via-[#d7b56d]/40 to-transparent"></div>

                                <div className="mt-7">
                                    <h4 className="text-2xl font-extrabold text-[#102416]">
                                        {review.name}
                                    </h4>

                                    <div className="mt-3 space-y-1 text-base font-semibold text-emerald-700">
                                        <p>{review.designation}</p>
                                        <p>{review.organization}</p>
                                        {review.location && <p>{review.location}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Hover Accent */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#d7b56d] transition-all duration-500 group-hover:w-full"></div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GuestReflections;