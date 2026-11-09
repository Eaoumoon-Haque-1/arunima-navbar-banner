const membershipCategories = [
  {
    title: "Life Member",
    icon: "ph ph-crown",
    description:
      "Limited in number. One-time registration fee; no ARGC subscription fee.",
  },
  {
    title: "Permanent Member",
    icon: "ph ph-identification-card",
    description:
      "Subscription fee payable annually or monthly, according to convenience.",
  },
  {
    title: "Foreign Member",
    icon: "ph ph-globe-hemisphere-east",
    description:
      "For citizens of other countries. Not eligible for the Executive Committee. Renewal: 25% of valid market rate every 3 years.",
  },
  {
    title: "Corporate Member",
    icon: "ph ph-buildings",
    description:
      "For organizations. A registration fee applies, followed by a per-candidate fee. Up to 10 persons may be added at one time.",
  },
];

const sharedPrivileges = [
  {
    benefit: "Golf access",
    receive: "Access to all BGF-affiliated golf courses",
    note: "Subject to the respective terms and conditions.",
  },
  {
    benefit: "BGF identity",
    receive:
      "Individual Bangladesh Golf Federation (BGF) ID for members who play golf",
    note: "Issued only to golfing members after successfully completing the required ARGC golf test.",
  },
  {
    benefit: "Family privileges",
    receive: "Benefits extend to spouse, children and parents",
    note: "Eligible family members receive a dependent card.",
  },
  {
    benefit: "Food & Beverage",
    receive: "5% discount",
    note: "Also available at Arunima’s Tipsy Bar, subject to government rules.",
  },
  { benefit: "Leisure", receive: "Rides + Swimming Pool", note: "Free." },
  { benefit: "Club access", receive: "Gate Entry", note: "Free." },
  { benefit: "Events", receive: "Corporate Events", note: "10% discount." },
];

const membershipDifferences = [
  {
    privilege: "Accommodation discount at ARGC",
    life: "50%",
    permanent: "35%",
    foreign: "25%",
  },
  {
    privilege: "Membership transfer fee",
    life: "10%",
    permanent: "20%",
    foreign: "N/A",
  },
  {
    privilege: "Family membership discount",
    life: "40%",
    permanent: "25%",
    foreign: "N/A",
  },
  {
    privilege: "Inheritance",
    life: "Free",
    permanent: "15%",
    foreign: "N/A",
  },
];

const keyConditions = [
  {
    title: "Transfer of membership",
    icon: "ph ph-arrows-left-right",
    description:
      "Life and Permanent Members may transfer or sell their membership. The applicable transfer fee is calculated as a percentage of the club rack rate.",
  },
  {
    title: "Family membership discount",
    icon: "ph ph-users-three",
    description:
      "The family discount applies to the member’s spouse, children and parents, consistent with the family definition above.",
  },
  {
    title: "Inheritance — Life Member",
    icon: "ph ph-crown",
    description:
      "A Life Member may nominate a child or spouse. If applied for, the membership can be transferred posthumously free of cost.",
  },
  {
    title: "Inheritance — Permanent Member",
    icon: "ph ph-identification-card",
    description:
      "A posthumous transfer is subject to 15% of the rack rate.",
  },
  {
    title: "Foreign Membership renewal",
    icon: "ph ph-globe-hemisphere-east",
    description:
      "25% of the valid market rate is payable as a renewal fee every three years.",
  },
];

const corporateMembershipDetails = [
  {
    value: "Up to 10",
    label: "persons at one time",
    icon: "ph ph-users",
  },
  {
    value: "Registration",
    label: "fee applicable for Corporate Membership",
    icon: "ph ph-file-text",
  },
  {
    value: "Per-candidate fee",
    label: "applicable when adding or changing any candidate",
    icon: "ph ph-user-plus",
  },
];

const MembershipPrivileges = () => {
  return (
    <section
      id="membership-privileges"
      className="relative overflow-hidden bg-[#fbfaf6] px-6 py-20 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#061b0d_1px,transparent_1px)] bg-size-[34px_34px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#a8753b]">
            Membership Guide
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#102416] sm:text-5xl">
            Membership Privileges
          </h2>
        </div>

        <div className="mt-14">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a8753b]">
              Membership Categories
            </p>
            <h3 className="mt-3 font-serif text-3xl font-bold text-[#102416]">
              Choose the structure that fits you
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Choose the structure that best fits the member or organization.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {membershipCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-[8px] border border-emerald-900/10 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#061b0d] text-xl text-[#d7b56d]">
                  <i className={category.icon}></i>
                </span>
                <h4 className="mt-5 font-serif text-xl font-bold text-[#102416]">
                  {category.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a8753b]">
              Privileges at a Glance
            </p>
            <h3 className="mt-3 font-serif text-3xl font-bold text-[#102416]">
              Shared everyday benefits
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Most day-to-day benefits are shared across Life, Permanent and
              Foreign Memberships.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[8px] border border-emerald-900/10 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm text-slate-700">
                <thead className="bg-[#061b0d] text-white">
                  <tr>
                    <th className="w-[22%] px-5 py-4 font-black">Benefit</th>
                    <th className="w-[35%] px-5 py-4 font-black">
                      What you receive
                    </th>
                    <th className="px-5 py-4 font-black">Important note</th>
                  </tr>
                </thead>
                <tbody>
                  {sharedPrivileges.map((item) => (
                    <tr
                      key={item.benefit}
                      className="border-t border-slate-200 odd:bg-white even:bg-[#f7f3ec]/45"
                    >
                      <th className="px-5 py-4 align-top font-bold text-[#102416]">
                        {item.benefit}
                      </th>
                      <td className="px-5 py-4 align-top leading-7">
                        {item.receive}
                      </td>
                      <td className="px-5 py-4 align-top leading-7 text-slate-600">
                        {item.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a8753b]">
              Where Membership Types Differ
            </p>
            <h3 className="mt-3 font-serif text-3xl font-bold text-[#102416]">
              Compare category-specific benefits
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              A simpler comparison of the benefits that vary by membership
              category.
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-emerald-900/10 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm text-slate-700">
                <thead className="bg-[#061b0d] text-white">
                  <tr>
                    <th className="px-5 py-4 font-black">Privilege</th>
                    <th className="px-5 py-4 text-center font-black">Life</th>
                    <th className="px-5 py-4 text-center font-black">
                      Permanent
                    </th>
                    <th className="px-5 py-4 text-center font-black">
                      Foreign
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {membershipDifferences.map((item) => (
                    <tr
                      key={item.privilege}
                      className="border-t border-slate-200 odd:bg-white even:bg-[#f7f3ec]/45"
                    >
                      <th className="px-5 py-4 font-bold text-[#102416]">
                        {item.privilege}
                      </th>
                      <td className="px-5 py-4 text-center font-semibold">
                        {item.life}
                      </td>
                      <td className="px-5 py-4 text-center font-semibold">
                        {item.permanent}
                      </td>
                      <td className="px-5 py-4 text-center font-semibold">
                        {item.foreign}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a8753b]">
              Key Conditions
            </p>
            <h3 className="mt-3 font-serif text-3xl font-bold text-[#102416]">
              Important terms to know
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Important membership conditions and eligibility requirements are
              summarized below.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {keyConditions.map((condition) => (
              <article
                key={condition.title}
                className="rounded-[8px] border border-emerald-900/10 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d7b56d]/18 text-xl text-[#7e5725]">
                    <i className={condition.icon}></i>
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#102416]">
                      {condition.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {condition.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mt-20 overflow-hidden rounded-[8px] bg-[#061b0d] px-6 py-10 text-white shadow-[0_24px_65px_rgba(6,27,13,0.2)] sm:px-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d7b56d]/10 blur-3xl"></div>
          <div className="relative">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d7b56d]">
              Corporate Membership
            </p>
            <h3 className="mt-3 font-serif text-3xl font-bold">
              How it works
            </h3>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {corporateMembershipDetails.map((detail) => (
                <div
                  key={detail.value}
                  className="rounded-[8px] border border-white/10 bg-white/5 p-5"
                >
                  <i className={`${detail.icon} text-2xl text-[#d7b56d]`}></i>
                  <p className="mt-4 text-xl font-black text-white">
                    {detail.value}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                    {detail.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPrivileges;