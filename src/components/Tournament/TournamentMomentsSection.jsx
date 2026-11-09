import React from 'react';

const TournamentMomentsSection = ({ moments }) => {
  return (
    <section className="bg-[#003c2f] px-6 py-10 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#d7b56d]">
              <span className="h-px w-8 bg-[#d7b56d]"></span>
              {moments?.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              {moments?.title}
            </h2>
          </div>

          {moments?.cta && (
            <a
              href={moments.cta.href}
              className="inline-flex min-h-11 items-center justify-center gap-3 rounded-[4px] border border-[#d7b56d]/70 px-5 text-xs font-black uppercase tracking-wide text-white transition duration-300 hover:bg-[#d7b56d] hover:text-[#061b0d]"
            >
              <span>{moments.cta.label}</span>
              <i className="ph ph-arrow-right"></i>
            </a>
          )}
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {moments?.images?.map((image) => (
            <article
              key={image.alt}
              className="group relative h-36 overflow-hidden rounded-[6px] border border-[#d7b56d]/40 bg-[#061b0d] shadow-[0_14px_36px_rgba(0,0,0,0.22)] sm:h-40"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#061b0d]/70 via-transparent to-transparent opacity-70"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentMomentsSection;
