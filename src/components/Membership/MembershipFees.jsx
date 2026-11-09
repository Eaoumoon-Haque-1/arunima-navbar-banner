import React from 'react';

const feeRows = [
  {
    sl: '1.',
    type: 'Permanent Membership',
    purchaseFee: '300,000',
    monthly: '600',
    // annually: '4,800',
    // biennial: '',
  },
  {
    sl: '2.',
    type: 'Life Membership',
    purchaseFee: '10,00,000',
    monthly: 'N/A',
    // annually: '',
    // biennial: 'N/A',
  },
  {
    sl: '3.',
    type: 'Corporate Member',
    note: 'Maximum 10 members per company.',
    purchaseFee: 'BDT 500,000 + BDT 50,000 per candidate',
    monthly: '400',
    // annually: '3,500 per candidate',
    // biennial: '',
  },
  {
    sl: '4.',
    type: 'Foreign Membership',
    purchaseFee: 'BDT 100,000',
    monthly: 'BDT 25,000 for renewal after every 3 years till visa is valid.',
    // annually: '',
    // biennial: '',
  },
];

const MembershipFees = () => {
  return (
    <section
      id="membership-fees"
      className="relative overflow-hidden bg-white px-6 py-20 lg:px-10"
    >
      <div className="absolute left-0 top-0 h-full w-full opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061b0d_1px,transparent_1px),linear-gradient(#061b0d_1px,transparent_1px)] bg-size-[42px_42px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#a8753b]">
              Membership Cost
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#102416] sm:text-5xl">
              Fees of Membership
            </h2>
        </div>

        <div className="mt-10">
          <div className="space-y-4">
            <div className="hidden rounded-[8px] bg-[#061b0d] px-5 py-4 text-sm font-black uppercase tracking-wide text-white lg:grid lg:grid-cols-[0.18fr_1fr_1fr_1.35fr]">
              <span>SL</span>
              <span>Type of Membership</span>
              <span>Purchase Fee</span>
              <span>Subscription Fee</span>
            </div>

            {feeRows.map((row) => (
              <article
                key={row.sl}
                className="rounded-[8px] border border-emerald-900/10 bg-[#fbfaf6] p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#d7b56d]/50"
              >
                <div className="grid gap-5 lg:grid-cols-[0.18fr_1fr_1fr_1.35fr]">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#a8753b] lg:hidden">
                      SL No.
                    </p>
                    <p className="mt-1 font-semibold text-slate-700 lg:mt-0">
                      {row.sl}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#a8753b] lg:hidden">
                      Type of Membership
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-[#102416] lg:mt-0">
                      {row.type}
                    </h3>
                    {row.note && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {row.note}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#a8753b] lg:hidden">
                      Purchase Fee
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-700 lg:mt-0">
                      {row.purchaseFee}
                    </p>
                  </div>

                  <div className="w-full">
                    <div className="rounded-[6px] bg-white p-3">
                      <p className="text-[11px] font-black uppercase tracking-wide text-[#a8753b]">
                        Monthly
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                        {row.monthly || '-'}
                      </p>
                    </div>

                    {/* <div className="rounded-[6px] bg-white p-3">
                      <p className="text-[11px] font-black uppercase tracking-wide text-[#a8753b]">
                        Annually
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                        {row.annually || '-'}
                      </p>
                    </div>

                    <div className="rounded-[6px] bg-white p-3">
                      <p className="text-[11px] font-black uppercase tracking-wide text-[#a8753b]">
                        Biennial
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                        {row.biennial || '-'}
                      </p>
                    </div> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-[8px] border border-[#d7b56d]/35 bg-[#fbfaf6] p-5">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d7b56d] text-[#061b0d]">
                  <i className="ph ph-info text-xl"></i>
                </span>
                <p className="text-sm leading-7 text-slate-700">
                  Authority reserves the right to change membership rates at
                  any time.
                </p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipFees;
