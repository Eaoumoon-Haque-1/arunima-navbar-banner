import React, { useEffect, useMemo, useState } from "react";
import {
  getSliderItems,
  fallbackHeroSlides,
} from "../../../services/sliderApi";
import "./heroCarousel.css";

const SLIDE_INTERVAL = 9000;
const TYPE_SPEED = 55;

const HeroCarousel = () => {
  const [slides, setSlides] = useState(fallbackHeroSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSlides = async () => {
      const sliderData = await getSliderItems();
      
      if (!isMounted) {
        return;
      }

      setSlides(sliderData);
      setIsLoading(false);
      setActiveSlide(0);
    };

    loadSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentSlide = useMemo(
    () => slides[activeSlide] || slides[0] || fallbackHeroSlides[0],
    [slides, activeSlide],
  );

  useEffect(() => {
    if (!slides.length) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  useEffect(() => {
    if (!currentSlide?.title) {
      setTypedTitle("");
      setIsTyping(false);
      return undefined;
    }

    const title = currentSlide.title;
    let characterIndex = 0;

    setTypedTitle("");
    setIsTyping(true);

    const typingIntervalId = setInterval(() => {
      characterIndex += 1;
      setTypedTitle(title.slice(0, characterIndex));

      if (characterIndex >= title.length) {
        setIsTyping(false);
        clearInterval(typingIntervalId);
      }
    }, TYPE_SPEED);

    return () => clearInterval(typingIntervalId);
  }, [currentSlide?.title]);

  if (isLoading && !slides.length) {
    return null;
  }

  return (
    <section className="hero-carousel">
      <div className="hero-carousel__wrapper">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;

          return (
            <div
              key={slide.id}
              className={`hero-carousel__slide ${
                isActive ? "hero-carousel__slide--active" : ""
              }`}
            >
              {slide.fit === "contain" && (
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  className="hero-carousel__blur-bg"
                  style={{ objectPosition: slide.position }}
                />
              )}

              <img
                src={slide.image}
                alt={slide.label}
                className={`hero-carousel__image ${
                  isActive ? "hero-image-motion" : ""
                } ${
                  slide.fit === "contain" ? "object-contain" : "object-cover"
                }`}
                style={{ objectPosition: slide.position }}
              />
            </div>
          );
        })}

        <div className="hero-carousel__overlay" />

        <div className="hero-carousel__content">
          <div className="hero-carousel__text">
            <p className="hero-carousel__label hero-soft-motion">
              {currentSlide.label}
            </p>

            <h1 className="hero-carousel__title hero-soft-motion">
              <span
                className={`typewriter-text ${
                  isTyping ? "typewriter-text--typing" : ""
                }`}
              >
                {typedTitle}
              </span>
            </h1>

            <p className="hero-carousel__description hero-soft-motion">
              {currentSlide.description}
            </p>
          </div>
        </div>

        <div className="hero-carousel__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`hero-carousel__dot ${
                activeSlide === index ? "hero-carousel__dot--active" : ""
              }`}
              aria-label={`Go to ${slide.label} slide`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
