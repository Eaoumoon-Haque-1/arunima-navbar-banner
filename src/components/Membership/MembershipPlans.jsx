import React from 'react';

const membershipPlans = [
  {
    id: 'permanent-membership',
    title: 'Permanent Membership',
    badge: 'Permanent',
    icon: 'ph ph-identification-card',
    description: 'Long-term club access with golf, resort, and member privileges.',
    features: [
      'Regular golf access',
      'Resort facility privileges',
      'Member guest access',
      'Events and activities',
    ],
    featured: false,
  },
  {
    id: 'life-membership',
    title: 'Life Membership',
    badge: 'Lifetime',
    icon: 'ph ph-crown',
    description: 'Lifetime association with Arunima Resort Golf Club.',
    features: [
      'Lifetime club access',
      'Premium member benefits',
      'Priority reservations',
      'Special club privileges',
    ],
    featured: true,
  },
  {
    id: 'corporate-membership',
    title: 'Corporate Membership',
    badge: 'Company',
    icon: 'ph ph-buildings',
    description: 'Built for companies, teams, retreats, and business hosting.',
    features: [
      'Corporate privileges',
      'Multiple member options',
      'Business networking',
      'Event hosting support',
    ],
    featured: false,
  },
  {
    id: 'foreign-membership',
    title: 'Foreign Membership',
    badge: 'Foreign',
    icon: 'ph ph-globe-hemisphere-east',
    description: 'A practical membership option for international visitors.',
    features: [
      'Guest-friendly access',
      'Golf and resort benefits',
      'Visitor support',
      'Club facility access',
    ],
    featured: false,
  },
];

const MembershipPlanCard = ({ plan }) => {
  return (
    <article
      id={plan.id}
      className={`group relative scroll-mt-32 overflow-hidden rounded-[8px] border bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 ${
        plan.featured
          ? 'border-[#d7b56d] ring-2 ring-[#d7b56d]/30'
          : 'border-emerald-900/10'
      }`}
    >
      {plan.featured && (
        <div className="absolute inset-x-0 top-0 bg-[#d7b56d] px-4 py-2 text-center text-[11px] font-black uppercase tracking-[0.22em] text-[#061b0d]">
          Most Popular
        </div>
      )}

      <div className={plan.featured ? 'pt-8' : ''}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d7b56d]/35 bg-[#061b0d] text-[#d7b56d] shadow-lg shadow-emerald-950/20 transition duration-300 group-hover:bg-[#d7b56d] group-hover:text-[#061b0d]">
          <i className={`${plan.icon} text-3xl`}></i>
        </div>

        <div className="mt-5 text-center">
          <span className="text-xs font-black uppercase tracking-[0.24em] text-[#a8753b]">
            {plan.badge}
          </span>

          <h3 className="mt-3 font-serif text-2xl font-bold uppercase leading-tight text-[#102416]">
            {plan.title}
          </h3>

          <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
            {plan.description}
          </p>
        </div>

        <ul className="mt-7 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-900/20 text-[#0b6b2b]">
                <i className="ph ph-check text-xs"></i>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

      </div>
    </article>
  );
};

const MembershipPlans = () => {
  return (
    <section id="membership-plans" className="bg-[#fbfaf6] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#a8753b]">
            Membership Plans
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#102416] sm:text-5xl">
            Find the Perfect Membership for You
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Choose a membership category that matches your golf, resort, and
            lifestyle needs.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {membershipPlans.map((plan) => (
            <MembershipPlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#membership-fees"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[4px] bg-[#061b0d] px-8 text-sm font-black uppercase tracking-wide text-white transition duration-300 hover:bg-[#d7b56d] hover:text-[#061b0d]"
          >
            <span>Learn More</span>
            <i className="ph ph-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
