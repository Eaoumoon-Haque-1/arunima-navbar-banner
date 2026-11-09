import React from 'react';
import golfField from '../../assets/golf_field.JPG';

const OpenChampionshipSection = ({ tournament }) => {
  const prizeImage = tournament?.prize?.image || golfField;

  return (
    <section className="relative overflow-hidden bg-[#003c2f] px-6 py-8 text-white sm:py-10 lg:px-10">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_1px,transparent_1px),linear-gradient(#ffffff_1px,transparent_1px)] bg-size-[38px_38px]"></div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#d7b56d]">
            <span className="h-px w-8 bg-[#d7b56d]"></span>
            {tournament?.eyebrow}
          </p>

          <h2 className="mt-3 max-w-sm font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
            {tournament?.title}
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-50/78">
            {tournament?.description}
          </p>

          <div className="mt-5 space-y-3 text-sm text-emerald-50/88">
            {tournament?.details?.map((detail) => (
              <p key={detail.label} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#d7b56d]">
                  <i className={`${detail.icon} text-base`}></i>
                </span>
                <span>{detail.value}</span>
              </p>
            ))}
          </div>

          {tournament?.cta && (
            <a
              href={tournament.cta.href}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-[4px] bg-[#d7b56d] px-5 text-xs font-black uppercase tracking-wide text-[#061b0d] transition duration-300 hover:bg-white"
            >
              <span>{tournament.cta.label}</span>
              <i className="ph ph-arrow-right"></i>
            </a>
          )}
        </div>

        <article className="overflow-hidden rounded-[8px] border border-[#d7b56d]/70 bg-[#061b0d] shadow-[0_22px_60px_rgba(0,0,0,0.25)]">
          <div className="relative min-h-[295px] p-6 sm:min-h-[330px] sm:p-8 lg:min-h-[360px]">
            <img
              src={prizeImage}
              alt={tournament?.prize?.imageAlt || tournament?.title || 'Tournament prize pool'}
              className="absolute inset-0 h-full w-full object-cover opacity-65"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#061b0d]/96 via-[#061b0d]/64 to-[#061b0d]/10"></div>
            <div className="absolute inset-0 bg-linear-to-t from-[#061b0d]/20 via-transparent to-black/15"></div>

            <div className="relative z-10 max-w-lg">
              <span className="inline-flex rounded-[4px] bg-[#d7b56d] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#061b0d]">
                {tournament?.prize?.label}
              </span>

              <p className="mt-7 font-serif text-5xl font-bold leading-none text-[#d7b56d] sm:text-6xl lg:text-7xl">
                {tournament?.prize?.amount}
              </p>

              <div className="mt-9 grid max-w-md grid-cols-3 gap-4">
                {tournament?.prize?.highlights?.map((highlight) => (
                  <div key={highlight.subtitle} className="text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d7b56d]/38 bg-[#052d1d]/45 text-[#d7b56d]">
                      <i className={`${highlight.icon} text-2xl`}></i>
                    </span>
                    <p className="mt-3 text-sm font-semibold leading-tight text-white">
                      {highlight.title}
                    </p>
                    <p className="text-xs leading-tight text-emerald-50/75">
                      {highlight.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-6 right-6 hidden h-28 w-28 items-center justify-center rounded-full border border-[#d7b56d]/25 text-[#d7b56d]/55 sm:flex">
              <i className="ph ph-trophy text-6xl"></i>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default OpenChampionshipSection;
