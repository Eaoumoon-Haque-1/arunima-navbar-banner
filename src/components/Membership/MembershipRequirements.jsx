import React from 'react';

const requirements = [
  '06 copies passport size lab print photographs',
  'Filled up and signed Membership Application form',
  'Bio-Data with photograph',
  'Photocopy of National ID',
  'Photocopy of all passports (If dual citizenship)',
  'TIN Certificate and photocopy of last three years Acknowledgement Receipt',
  'Photocopy of Work Permit and Visa (Applicable for foreigners)',
];

const MembershipRequirements = () => {
  return (
    <section
      id="membership-requirements"
      className="relative overflow-hidden bg-[#f7f3ec] px-6 py-20 lg:px-10"
    >
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#d7b56d]/20 blur-3xl"></div>
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-300/35 blur-3xl"></div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#a8753b]">
            Application Checklist
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#102416] sm:text-5xl">
            Requirements for Membership
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
            Keep these documents ready before submitting your membership
            application. Foreign applicants should include the applicable permit
            and visa documents.
          </p>

          <div className="mt-9 rounded-[8px] border border-emerald-900/10 bg-white/75 p-6 shadow-sm backdrop-blur-md">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#061b0d] text-[#d7b56d]">
                <i className="ph ph-file-text text-2xl"></i>
              </span>

              <div>
                <h3 className="text-lg font-black text-[#102416]">
                  Need help applying?
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Contact the membership team for form guidance, document
                  review, and submission support.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-[4px] bg-[#061b0d] px-6 text-sm font-black uppercase tracking-wide text-white transition duration-300 hover:bg-[#d7b56d] hover:text-[#061b0d]"
            >
              <span className='text-xs md:text-sm'>Contact Membership Team</span>
              <i className="ph ph-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {requirements.map((requirement, index) => (
            <article
              key={requirement}
              className="group flex gap-4 rounded-[8px] border border-emerald-900/10 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#d7b56d]/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#061b0d] text-sm font-black text-[#d7b56d] transition duration-300 group-hover:bg-[#d7b56d] group-hover:text-[#061b0d]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-900/5 text-[#0b6b2b]">
                  <i className="ph ph-check text-base"></i>
                </div>

                <p className="text-sm font-semibold leading-6 text-slate-700">
                  {requirement}
                </p>

                {index === 5 && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#a8753b]">
                    Not applicable for foreign members
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipRequirements;
