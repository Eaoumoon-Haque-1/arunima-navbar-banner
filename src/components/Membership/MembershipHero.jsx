import React from 'react';
import golfField from '../../assets/golf_field.JPG';

const MembershipHero = () => {
  return (
    <section className="relative w-screen overflow-hidden bg-[#061b0d] text-white [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]">
      <div className="relative min-h-[620px] lg:min-h-[calc(100vh-96px)]">
        <img
          src={golfField}
          alt="Arunima Resort Golf Club course"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#061b0d]/95 via-[#061b0d]/70 to-[#061b0d]/15"></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#061b0d]/55 via-transparent to-black/25"></div>

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6  lg:min-h-[calc(100vh-96px)] lg:px-10 ">
          <div className="max-w-2xl">
            <p className="mb-5 w-fit text-sm font-bold uppercase tracking-[0.32em] text-[#d7b56d]">
              Arunima Membership
            </p>

            <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Membership
            </h1>

            <p className="mt-4 font-serif text-2xl italic leading-9 text-[#d7b56d] sm:text-3xl">
              Experience Golf Like Never Before
            </p>

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-24 bg-[#d7b56d]"></span>
              <span className="h-2 w-2 rotate-45 border border-[#d7b56d]"></span>
              <span className="h-px w-24 bg-[#d7b56d]"></span>
            </div>

            <p className="mt-8 max-w-xl text-base leading-8 text-emerald-50/85">
              Become a member of Arunima Resort Golf Club and enjoy premium golf
              access, resort facilities, countryside leisure, and a community
              built around refined outdoor experiences.
            </p>

            
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-16 right-6 hidden h-44 w-44 items-center justify-center rounded-full border border-[#d7b56d]/30 text-[#d7b56d]/80 lg:flex">
          <div className="absolute inset-4 rounded-full border border-[#d7b56d]/20"></div>
          <div className="text-center">
            <i className="ph ph-flag-banner text-4xl"></i>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.32em]">
              Golf Club
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipHero;
