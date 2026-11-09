import React from 'react';

const generalTerms = [
  'The ARGC Golf Club Committee will be selected by the board of Directors of Shabaz Tourism Ltd. Shabaz Tourism Ltd. is the mother Company of Arunima Resort Golf Club.',
  'The Membership is transferable subjected to a commission of 20% on the valid market rate, payable to the club during the transfer date. The new membership approval will be subjected to scrutiny.',
  'The club management reserves the right to change its rates and tariffs at any time.',
  'Membership facilities would be available to the member and his/her family members only. Children of members are entitled to privileges until the age of 21. However, they may avail individual membership at 50% discount from market price.',
  'The member is not owner of Arunima Resort Golf Club (ARGC) or shareholder of Shabaz Tourism Ltd. Hence, they can never claim ownership to any of the mentioned business organizations.',
  'Foreign members must submit their passport photocopy.',
  'If any member is convicted by the highest court of the country, his membership will automatically be terminated. If any member violates ARGC rules and regulations, disciplinary action will be taken against him/her.',
  'To purchase membership, applicants are requested to transfer money or send a cheque in favor of Account title: Arunima Resort Golf Club, A/C no. 0100270093641, Janata Bank Plc, Bardia Branch, Routing number: 135650138 or Account title: Shabaz Tourism Ltd, A/C no. 1401355404001, Khulna Branch, Routing number: 225471548.',
];

const subscriptionTerms = [
  'Permanent Member either in monthly instalments of BDT 600 or an annual fee of BDT 4800.',
  'Corporate member either in monthly instalments of BDT 400 or an annual fee of BDT 3500.',
  'Honorary members will avail all facilities of General and Life Members except they cannot be members of Club EC committee. Honorary Members do not have to pay Registration or Subscription fees.',
  'All members except Honorary Members shall pay all BGF fees in addition to ARGC fees after getting BGF ID.',
  'Foreign Members have to pay a membership renewal fee after every three years. The renewal fees will be 25% of the published foreign membership purchase rate.',
];

const honoraryPrivileges = [
  {
    description: 'Accommodation in Arunima Resort Golf Club',
    facilities: '35% Discount',
  },
  {
    description: 'Food and Beverage',
    facilities: '5% Discount',
  },
  {
    description: 'Rides within Arunima Resort Golf Club',
    facilities: 'Free',
  },
  {
    description: 'Picnic/Open Air Entertainment for Corporate',
    facilities: '10% Discount',
  },
  {
    description: 'Swimming Pool for one hour per day',
    facilities: 'Free',
  },
  {
    description: 'Gate Ticket free including listed family members',
    facilities: 'Free',
  },
  {
    description: 'Party Hall',
    facilities: '20% Discount',
  },
];

const affiliatedTerms = [
  'As ARGC is an affiliated member of Bangladesh Golf Federation (BGF), members of ARGC shall abide BGF laws while visiting other clubs affiliated with BGF. Membership application may be scrutinized by DGFI.',
  'Club members will be able to use facilities of local and foreign clubs that ARGC is affiliated with or will be affiliated with and must follow their club rules while visiting those clubs. Any misconduct occurring by any member at any affiliated club may render his/her membership terminated.',
];

const PinItem = ({ children }) => {
  return (
    <li className="flex min-w-0 gap-3 rounded-[8px] border border-emerald-900/10 bg-white p-3 text-sm leading-7 text-slate-700 shadow-sm sm:p-4">
      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d7b56d]/20 text-[#a8753b]">
        <i className="ph ph-push-pin-simple text-base"></i>
      </span>
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </li>
  );
};

const MembershipTerms = () => {
  return (
    <section
      id="membership-terms"
      className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="absolute -left-32 top-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl sm:h-72 sm:w-72"></div>
      <div className="absolute -right-32 bottom-16 h-60 w-60 rounded-full bg-[#d7b56d]/15 blur-3xl sm:h-80 sm:w-80"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a8753b] sm:text-sm sm:tracking-[0.28em]">
            Membership Policy
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#102416] sm:text-5xl">
            Terms and Conditions for Membership
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Review the club policies, subscription rules, honorary privileges,
            and affiliated club conditions before applying.
          </p>
        </div>

        <div className="mt-10 grid min-w-0 gap-8 sm:mt-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#102416] sm:text-2xl">
                General Conditions
              </h3>

              <ul className="mt-5 space-y-3">
                {generalTerms.map((term) => (
                  <PinItem key={term}>{term}</PinItem>
                ))}
              </ul>
            </div>
          </div>

          <div className="min-w-0 space-y-8">
            {/* <div className="overflow-hidden rounded-[8px] border border-emerald-900/10 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
              <div className="bg-[#061b0d] px-4 py-5 sm:px-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d7b56d] sm:text-sm sm:tracking-[0.24em]">
                  Honorary Member
                </p>
                <h3 className="mt-2 font-serif text-xl font-bold text-white sm:text-2xl">
                  Entitled Privileges
                </h3>
              </div>

              <div className="divide-y divide-slate-200 sm:hidden">
                {honoraryPrivileges.map((row) => (
                  <div key={row.description} className="p-4">
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {row.description}
                    </p>
                    <p className="mt-2 w-fit rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#0b6b2b]">
                      {row.facilities}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-[#fbfaf6] text-[#102416]">
                      <th className="border border-slate-200 px-4 py-4 font-black">
                        Description
                      </th>
                      <th className="border border-slate-200 px-4 py-4 font-black">
                        Facilities
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {honoraryPrivileges.map((row) => (
                      <tr key={row.description} className="hover:bg-[#d7b56d]/10">
                        <td className="border border-slate-200 px-4 py-4 text-slate-700">
                          {row.description}
                        </td>
                        <td className="border border-slate-200 px-4 py-4 font-semibold text-[#0b6b2b]">
                          {row.facilities}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="border-t border-slate-200 px-4 py-4 text-sm leading-7 text-slate-600 sm:px-6">
                However, the authority reserves the right to change the above
                privileges at any time.
              </p>
            </div> */}

            <div>
              <h3 className="font-serif text-xl font-bold text-[#102416] sm:text-2xl">
                Affiliated Club Conditions
              </h3>

              <ul className="mt-5 space-y-3">
                {affiliatedTerms.map((term) => (
                  <PinItem key={term}>{term}</PinItem>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[8px] border border-[#d7b56d]/35 bg-[#fbfaf6] p-4 sm:p-6">
          <h3 className="font-serif text-xl font-bold text-[#102416] sm:text-2xl">
            Subscription Rules
          </h3>

          <ol className="mt-5 grid gap-3 lg:grid-cols-2">
            {subscriptionTerms.map((term, index) => (
              <li key={term} className="flex min-w-0 gap-3 text-sm leading-7 text-slate-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#061b0d] text-xs font-black text-[#d7b56d]">
                  {index + 1}
                </span>
                <span className="min-w-0 [overflow-wrap:anywhere]">{term}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default MembershipTerms;
