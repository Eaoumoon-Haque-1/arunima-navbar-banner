import React, { useEffect, useState } from 'react';
import banner from '../../assets/banner.jpg';
import scenery from '../../assets/golf_field.jpg';
import player from '../../assets/golf_player.jpg';

const slides = [
    {
        image: banner,
        label: 'Luxury Meets Nature',
        title: 'Curated Golf, Wellness & Luxury Escapes in Nature',
        description:
            'A sanctuary where championship golf, serene landscapes, and refined resort living come together in perfect harmony.',
        subText:
            'Designed for guests and members who seek elegant escapes, active wellness, and unforgettable moments beneath open skies.',
        fit: 'cover',
        position: 'center',
    },
    {
        image: scenery,
        label: 'Nature & Wellness',
        title: 'Play, Relax & Reconnect with Nature',
        description:
            'Breathe in the calm, walk through green landscapes, and enjoy a resort experience shaped by peace, leisure, and natural beauty.',
        subText:
            'A refreshing destination for families, members, and guests who want to slow down and enjoy open-air comfort.',
        fit: 'cover',
        position: 'center',
    },
    {
        image: player,
        label: 'Golf Experience',
        title: 'Where Every Swing Meets Serenity',
        description:
            'Enjoy a refined golfing environment surrounded by calm scenery, premium club comfort, and memorable outdoor moments.',
        subText:
            'Perfect for golf lovers, corporate retreats, weekend escapes, and exclusive member experiences.',
        fit: 'contain',
        position: 'center',
    },
];

const Home = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [typedTitle, setTypedTitle] = useState('');

    const currentSlide = slides[activeSlide];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 9000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTypedTitle('');

        let index = 0;
        const title = slides[activeSlide].title;

        const typingInterval = setInterval(() => {
            setTypedTitle(title.slice(0, index + 1));
            index++;

            if (index >= title.length) {
                clearInterval(typingInterval);
            }
        }, 55);

        return () => clearInterval(typingInterval);
    }, [activeSlide]);

    return (
        <div className="w-full pt-[86px] lg:pt-[96px]">
            <section
                className="relative overflow-hidden"
                style={{
                    width: '100vw',
                    marginLeft: 'calc(50% - 50vw)',
                    marginRight: 'calc(50% - 50vw)',
                }}
            >
                <div className="relative h-[560px] w-full sm:h-[650px] lg:h-[calc(100vh-96px)]">
                    {/* Carousel Images */}
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                activeSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {/* Blurred background for contain images */}
                            {slide.fit === 'contain' && (
                                <img
                                    src={slide.image}
                                    alt=""
                                    className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
                                    style={{ objectPosition: slide.position }}
                                />
                            )}

                            <img
                                src={slide.image}
                                alt={slide.label}
                                className={`absolute inset-0 h-full w-full hero-image-motion ${
                                    slide.fit === 'contain'
                                        ? 'object-contain'
                                        : 'object-cover'
                                }`}
                                style={{ objectPosition: slide.position }}
                            />
                        </div>
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#061b0d]/80 via-[#061b0d]/45 to-black/10"></div>

                    {/* Content */}
                    <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-10 lg:px-20">
                        <div className="max-w-3xl text-white">
                            <p className="hero-soft-motion mb-5 w-fit rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide backdrop-blur-md">
                                {currentSlide.label}
                            </p>

                            <h1 className="hero-soft-motion max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                                <span className="typewriter-text">
                                    {typedTitle}
                                </span>
                            </h1>

                            <p className="hero-soft-motion mt-6 max-w-2xl text-base leading-8 text-slate-200/95 sm:text-lg">
                                {currentSlide.description}
                            </p>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base">
                                {currentSlide.subText}
                            </p>
                        </div>
                    </div>

                    {/* Carousel Dots */}
                    <div className="absolute bottom-8 left-6 z-20 flex gap-3 sm:left-10 lg:left-20">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActiveSlide(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    activeSlide === index
                                        ? 'w-9 bg-white'
                                        : 'w-2.5 bg-white/45 hover:bg-white/80'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="min-h-[900px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 p-6">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                    <div className="grid gap-10 lg:grid-cols-[1.45fr_0.75fr]">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/90">
                                Signature Experience
                            </p>

                            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                                Modern resort living with immersive golf and nature-led wellness.
                            </h2>

                            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300/90 sm:text-lg">
                                Step into a calm escape where every touchpoint is designed to feel contemporary, luxurious, and beautifully balanced with the outdoors.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.20)]">
                            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                                Highlights
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                                    <p className="text-lg font-semibold text-white">
                                        Curated golf retreats
                                    </p>

                                    <p className="mt-3 text-slate-400">
                                        Private courses, elegant club comforts, and experiences tailored for members.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                                    <p className="text-lg font-semibold text-white">
                                        Natural luxury escapes
                                    </p>

                                    <p className="mt-3 text-slate-400">
                                        Relaxing stays, refined dining, and moments grounded in green serenity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .hero-image-motion {
                        animation: heroImageMotion 18s ease-in-out infinite alternate;
                        transform-origin: center;
                    }

                    @keyframes heroImageMotion {
                        0% {
                            transform: scale(1) translateX(0);
                        }

                        100% {
                            transform: scale(1.06) translateX(-12px);
                        }
                    }

                    .hero-soft-motion {
                        animation: softFloat 5.5s ease-in-out infinite;
                    }

                    @keyframes softFloat {
                        0%, 100% {
                            transform: translateY(0);
                        }

                        50% {
                            transform: translateY(-5px);
                        }
                    }

                    .typewriter-text::after {
                        content: '';
                        display: inline-block;
                        width: 3px;
                        height: 0.9em;
                        margin-left: 6px;
                        background: rgba(255, 255, 255, 0.75);
                        animation: blinkCursor 0.75s step-end infinite;
                        vertical-align: -0.08em;
                    }

                    @keyframes blinkCursor {
                        0%, 100% {
                            opacity: 0;
                        }

                        50% {
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Home;