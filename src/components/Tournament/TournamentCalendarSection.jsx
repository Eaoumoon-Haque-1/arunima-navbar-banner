import React from 'react';

const TournamentCalendarSection = ({ calendar }) => {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf6] px-6 py-12 lg:px-10">
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#f1eadc] to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#f1eadc] to-transparent"></div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_1.58fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#a8753b]">
            <span className="h-px w-8 bg-[#d7b56d]"></span>
            {calendar?.eyebrow}
          </p>

          <h2 className="mt-3 max-w-xs font-serif text-3xl font-bold leading-tight text-[#102416] sm:text-4xl">
            {calendar?.title}
          </h2>

          {calendar?.cta && (
            <a
              href={calendar.cta.href}
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-[4px] border border-[#d7b56d] bg-white px-5 text-xs font-black uppercase tracking-wide text-[#102416] transition duration-300 hover:bg-[#061b0d] hover:text-white"
            >
              <span>{calendar.cta.label}</span>
              <i className="ph ph-arrow-right"></i>
            </a>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {calendar?.events?.map((event) => (
            <article
              key={`${event.date}-${event.title}`}
              className="group relative min-h-[215px] overflow-hidden rounded-[8px] border border-emerald-900/10 bg-white px-4 pb-5 pt-8 text-center shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#d7b56d]/70"
            >
              <div className="absolute left-1/2 top-0 min-w-14 -translate-x-1/2 rounded-b-[4px] bg-[#003c2f] px-3 py-2 text-white shadow-md">
                <p className="text-sm font-black leading-none">{event.date}</p>
                <p className="mt-1 text-[10px] font-black uppercase leading-none tracking-wide text-[#d7b56d]">
                  {event.month}
                </p>
              </div>

              <i className={`${event.icon} mt-9 block text-5xl text-[#d7b56d] transition duration-300 group-hover:text-[#a8753b]`}></i>

              <h3 className="mt-5 min-h-12 text-sm font-black leading-5 text-[#102416]">
                {event.title}
              </h3>

              <p className="mt-3 text-xs font-medium text-slate-500">
                <i className="ph ph-map-pin mr-1 text-[#a8753b]"></i>
                {event.venue}
              </p>

              {event.cta && (
                <a
                  href={event.cta.href}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#a8753b] transition duration-300 hover:text-[#061b0d]"
                >
                  <span>{event.cta.label}</span>
                  <i className="ph ph-arrow-right"></i>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentCalendarSection;
