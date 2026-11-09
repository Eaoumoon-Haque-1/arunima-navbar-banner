import React from 'react';

const gameFeeRows = [
  {
    sl: 1,
    category: 'Member',
    green9: '300',
    green18: '500',
    caddie9: '300',
    caddie18: '500',
    ballBoy9: '200',
    ballBoy18: '300',
    drivingRange: '50',
  },
  {
    sl: 2,
    category: 'Non Member',
    green9: '1000',
    green18: '1500',
    caddie9: '300',
    caddie18: '500',
    ballBoy9: '200',
    ballBoy18: '300',
    drivingRange: '250',
  },
  {
    sl: 3,
    category: 'Other affiliated club member',
    green9: '700',
    green18: '1000',
    caddie9: '300',
    caddie18: '500',
    ballBoy9: '200',
    ballBoy18: '300',
    drivingRange: '150',
  },
  {
    sl: 4,
    category: 'Govt Official',
    green9: '500',
    green18: '800',
    caddie9: '300',
    caddie18: '500',
    ballBoy9: '200',
    ballBoy18: '300',
    drivingRange: '100',
  },
  {
    sl: 5,
    category: 'Cart fee',
    green9: '300',
    green18: '300',
    caddie9: '300',
    caddie18: '300',
    ballBoy9: '300',
    ballBoy18: '300',
    drivingRange: '300',
  },
];

const GameFees = () => {
  return (
    <section id="game-fees" className="bg-[#fbfaf6] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#a8753b]">
            Golf Charges
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#102416] sm:text-5xl">
            Game Fees
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-[8px] border border-emerald-900/10 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm text-slate-700">
              <thead>
                <tr className="bg-[#061b0d] text-white">
                  <th rowSpan="2" className="border border-emerald-900/20 px-4 py-4 font-black">
                    Sl
                  </th>
                  <th rowSpan="2" className="min-w-[240px] border border-emerald-900/20 px-4 py-4 font-black">
                    Category
                  </th>
                  <th colSpan="2" className="border border-emerald-900/20 px-4 py-4 text-center font-black">
                    Green Fee
                  </th>
                  <th colSpan="2" className="border border-emerald-900/20 px-4 py-4 text-center font-black">
                    Caddie Fee
                  </th>
                  <th colSpan="2" className="border border-emerald-900/20 px-4 py-4 text-center font-black">
                    Ball Boy Fee
                  </th>
                  <th className="border border-emerald-900/20 px-4 py-4 text-center font-black">
                    Driving Range
                  </th>
                </tr>

                <tr className="bg-[#fbfaf6] text-[#102416]">
                  <th className="border border-slate-200 px-4 py-3 font-semibold">9 hole</th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">18 hole</th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">9 hole</th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">18 hole</th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">9 hole</th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">18 hole</th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">50 balls</th>
                </tr>
              </thead>

              <tbody>
                {gameFeeRows.map((row) => (
                  <tr
                    key={row.sl}
                    className="transition duration-200 odd:bg-white even:bg-[#f7f3ec]/45 hover:bg-[#d7b56d]/10"
                  >
                    <td className="border border-slate-200 px-4 py-4 font-medium">
                      {row.sl}
                    </td>
                    <td className="border border-slate-200 px-4 py-4 font-semibold text-slate-800">
                      {row.category}
                    </td>
                    <td className="border border-slate-200 px-4 py-4">{row.green9}</td>
                    <td className="border border-slate-200 px-4 py-4">{row.green18}</td>
                    <td className="border border-slate-200 px-4 py-4">{row.caddie9}</td>
                    <td className="border border-slate-200 px-4 py-4">{row.caddie18}</td>
                    <td className="border border-slate-200 px-4 py-4">{row.ballBoy9}</td>
                    <td className="border border-slate-200 px-4 py-4">{row.ballBoy18}</td>
                    <td className="border border-slate-200 px-4 py-4">{row.drivingRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameFees;
