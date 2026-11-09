import React from 'react';

const benefits = [
  {
    title: 'Golf Course',
    description: 'Enjoy one of the finest golf experiences in a quiet countryside setting.',
    icon: 'ph ph-flag-banner',
  },
  {
    title: 'World-Class Facilities',
    description: 'Access resort areas, practice spaces, lounges, and member facilities.',
    icon: 'ph ph-buildings',
  },
  {
    title: 'Exclusive Events',
    description: 'Join member tournaments, social programs, celebrations, and club events.',
    icon: 'ph ph-calendar-star',
  },
  {
    title: 'Dining & Hospitality',
    description: 'Enjoy dining, refreshments, guest hosting, and special member rates.',
    icon: 'ph ph-fork-knife',
  },
  {
    title: 'Guest Privileges',
    description: 'Bring guests and share the Arunima golf and resort experience.',
    icon: 'ph ph-users-three',
  },
  {
    title: 'Priority Reservations',
    description: 'Get preferred access for tee times, facilities, visits, and events.',
    icon: 'ph ph-clock',
  },
];

const MembershipBenefits = () => {
  return (
    <section
      id="membership-benefits"
      className="relative w-screen overflow-hidden bg-[#052d1d] px-6 py-20 text-white [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)] lg:px-10"
    >
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ffffff_1px,transparent_1px)] bg-size-[34px_34px]"></div>
      </div>

      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#d7b56d]/10 blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d7b56d]">
            Membership Benefits
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
            More Than Just Golf
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/75">
            Members enjoy a premium lifestyle with access to golf, resort
            hospitality, nature, events, and guest-friendly privileges.
          </p>

          <a
            href="#membership-costs"
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-[4px] bg-[#d7b56d] px-6 text-sm font-black uppercase tracking-wide text-[#061b0d] transition duration-300 hover:bg-white"
          >
            <span>View All Benefits</span>
            <i className="ph ph-arrow-right"></i>
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d7b56d]/45 text-[#d7b56d]">
                <i className={`${benefit.icon} text-3xl`}></i>
              </div>

              <h3 className="mt-5 text-base font-black text-white">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
