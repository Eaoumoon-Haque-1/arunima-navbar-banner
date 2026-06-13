import React, { useState } from "react";

const logoUrl =
  "https://arunimaresortgolfclub.com/wp-content/uploads/2024/06/cropped-Arunima-logo-01-copy-color-correction-300x145.png";

const menuDetails = {
  Membership: {
    title: "Membership",
    image:
      "https://arunimaresortgolfclub.com/wp-content/uploads/2024/01/IMG_7146-scaled-1-300x200.jpg",
    description:
      "Explore membership plans, privileges, and benefits for Arunima Resort Golf Club members.",
    cards: [
      {
        title: "Be a Member",
        description:
          "Join Arunima Resort Golf Club and enjoy exclusive member access.",
        href: "/membership",
      },
      {
        title: "Membership Packages",
        description: "View available membership categories and packages.",
        href: "/membership#packages",
      },
      {
        title: "Membership Privileges",
        description: "See facilities, access, and special privileges for members.",
        href: "/membership#privileges",
      },
    ],
  },

  Packages: {
    title: "Packages",
    image:
      "https://arunimaresortgolfclub.com/wp-content/uploads/2024/01/IMG_7148-scaled-1-300x200.jpg",
    description:
      "Choose resort, golf, family, and corporate packages for your perfect stay.",
    cards: [
      {
        title: "Resort Packages",
        description: "Relax and stay in a peaceful resort environment.",
        href: "/packages#resort-packages",
      },
      {
        title: "Golf Packages",
        description: "Special experiences for golf lovers and club guests.",
        href: "/packages#golf-packages",
      },
      {
        title: "Corporate Packages",
        description: "Host retreats, meetings, and team programs in nature.",
        href: "/packages#corporate-packages",
      },
    ],
  },

  Explore: {
    title: "Explore Arunima",
    image:
      "https://arunimaresortgolfclub.com/wp-content/uploads/2024/01/IMG_7153-scaled-1-300x200.jpg",
    description:
      "Discover resort facilities, nature experiences, accommodation, dining, and club life.",
    cards: [
      {
        title: "Facilities",
        description: "Explore the facilities and services available at Arunima.",
        href: "/facilities",
      },
      {
        title: "Accommodation",
        description: "Comfortable stays surrounded by greenery and calm.",
        href: "/facilities#accommodation",
      },
      {
        title: "Food & Beverages",
        description: "Dining and refreshment services for guests and members.",
        href: "/facilities#food-beverages",
      },
      {
        title: "Nature Healing",
        description: "Relax in a peaceful natural environment.",
        href: "/facilities#nature-healing",
      },
      {
        title: "Affiliated Clubs",
        description: "View affiliated clubs and partner club information.",
        href: "/affiliated-clubs",
      },
      {
        title: "Gallery",
        description: "See resort, golf, events, and nature moments.",
        href: "/gallery",
      },
    ],
  },

  Events: {
    title: "Events",
    image:
      "https://arunimaresortgolfclub.com/wp-content/uploads/2024/01/IMG_7146-scaled-1-300x200.jpg",
    description:
      "Find club events, golf tournaments, corporate programs, and resort activities.",
    cards: [
      {
        title: "Events",
        description: "See upcoming and past events at Arunima.",
        href: "/events",
      },
      {
        title: "Tournaments",
        description: "Golf tournaments and competitive club programs.",
        href: "/events#tournaments",
      },
      {
        title: "Corporate Events",
        description: "Host official events, retreats, and group programs.",
        href: "/events#corporate-events",
      },
    ],
  },
};

const directMenuItems = [
  {
    title: "Golf",
    href: "/",
  },
];

const visibleMenuItems = [
  {
    title: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  const menuNames = Object.keys(menuDetails);

  const toggleMobileSubmenu = (menuName) => {
    setMobileSubmenu(mobileSubmenu === menuName ? null : menuName);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  };

  return (
    <header
      id="header-section"
      className="fixed inset-x-0 top-0 z-50 border-b border-emerald-400/20 bg-emerald-900/30 shadow-[0_12px_50px_rgba(16,185,129,0.08)] backdrop-blur-2xl transition-[background-color,backdrop-filter,transform] duration-300 ease-in-out"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <nav
        className="mx-auto flex h-[86px] max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:h-[96px] lg:px-10"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex min-w-fit items-center">
          <a href="/" className="flex items-center">
            <img
              loading="lazy"
              className="h-[58px] w-auto object-contain sm:h-[64px] lg:h-[74px]"
              id="logo"
              src={logoUrl}
              alt="Arunima Resort Golf Club"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center justify-center gap-x-2 rounded-full border border-white/40 bg-white/35 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl lg:flex">
          {directMenuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onMouseEnter={() => setActiveMenu(null)}
              className="rounded-full px-4 py-2 text-[15px] font-semibold text-slate-900 transition hover:bg-[#0b6b2b] hover:text-white xl:px-5"
            >
              {item.title}
            </a>
          ))}

          {menuNames.map((menuName) => (
            <button
              key={menuName}
              type="button"
              onMouseEnter={() => setActiveMenu(menuName)}
              className="group flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold text-slate-900 transition hover:bg-[#0b6b2b] hover:text-white xl:px-5"
            >
              <span>{menuName}</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/60 text-[#0b6b2b] transition group-hover:bg-white/20 group-hover:text-white">
                <i className="ph ph-caret-down text-base"></i>
              </span>
            </button>
          ))}

          {visibleMenuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onMouseEnter={() => setActiveMenu(null)}
              className="rounded-full px-4 py-2 text-[15px] font-semibold text-slate-900 transition hover:bg-[#0b6b2b] hover:text-white xl:px-5"
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <div className="group flex cursor-pointer items-center">
            <a
              href="/membership"
              className="flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-[#0f7a35] to-[#0b6b2b] px-4 text-center text-sm font-medium text-white shadow-lg shadow-emerald-900/20"
            >
              Be a Member
            </a>

            <a
              href="/contact"
              className="relative ms-[-4px] flex h-9 w-9 -rotate-45 items-center justify-center overflow-hidden rounded-full bg-[#d7a62f] text-center text-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#bd8f22]"
              aria-label="Contact"
            >
              <i className="absolute ph ph-paper-plane-right ms-1 translate-x-0 text-white duration-300 group-hover:translate-x-10"></i>
              <i className="absolute ph ph-paper-plane-right ms-1 -translate-x-10 text-white duration-300 group-hover:translate-x-0"></i>
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          id="menu-toggle"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/45 text-[#0b6b2b] shadow-sm backdrop-blur-xl lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={`ph ${mobileOpen ? "ph-x" : "ph-list"} text-2xl`}></i>
        </button>
      </nav>

      {/* Desktop Mega Menu */}
      {activeMenu && (
        <div className="absolute inset-x-0 top-full z-40 border-t border-white/40 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
          <div className="mx-auto grid max-w-[1536px] gap-6 px-6 py-8 lg:grid-cols-[340px_1fr] lg:px-10">
            <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-sm backdrop-blur-xl">
              <img
                src={menuDetails[activeMenu].image}
                alt={menuDetails[activeMenu].title}
                className="h-[220px] w-full object-cover"
              />

              <div className="p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d7a62f]">
                  Arunima
                </p>

                <h3 className="text-2xl font-bold text-slate-900">
                  {menuDetails[activeMenu].title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {menuDetails[activeMenu].description}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {menuDetails[activeMenu].cards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="group rounded-[22px] border border-white/60 bg-white/75 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#0b6b2b]/25 hover:bg-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b6b2b]/10 text-[#0b6b2b] transition group-hover:bg-[#0b6b2b] group-hover:text-white">
                    <i className="ph ph-arrow-up-right text-xl"></i>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900">
                    {card.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-86px)] overflow-y-auto border-t border-white/40 bg-white/90 px-4 pb-6 pt-4 backdrop-blur-2xl lg:hidden">
          <div className="space-y-2">
            {directMenuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={closeMobileMenu}
                className="block rounded-2xl border border-white/60 bg-white/75 px-4 py-4 text-[15px] font-bold text-slate-900 shadow-sm backdrop-blur-xl"
              >
                {item.title}
              </a>
            ))}

            {menuNames.map((menuName) => (
              <div
                key={menuName}
                className="overflow-hidden rounded-2xl border border-white/60 bg-white/75 shadow-sm backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu(menuName)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left text-[15px] font-bold text-slate-900"
                >
                  <span>{menuName}</span>

                  <i
                    className={`ph ph-caret-down text-lg text-[#0b6b2b] transition ${
                      mobileSubmenu === menuName ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {mobileSubmenu === menuName && (
                  <div className="border-t border-white/50 bg-white/65 p-2">
                    {menuDetails[menuName].cards.map((card) => (
                      <a
                        key={card.title}
                        href={card.href}
                        onClick={closeMobileMenu}
                        className="block rounded-xl px-4 py-3 transition hover:bg-white"
                      >
                        <span className="block text-sm font-bold text-slate-900">
                          {card.title}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-slate-600">
                          {card.description}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {visibleMenuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={closeMobileMenu}
                className="block rounded-2xl border border-white/60 bg-white/75 px-4 py-4 text-[15px] font-bold text-slate-900 shadow-sm backdrop-blur-xl"
              >
                {item.title}
              </a>
            ))}

            <div className="pt-3">
              <div className="group flex cursor-pointer items-center">
                <a
                  href="/membership"
                  onClick={closeMobileMenu}
                  className="flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-[#0f7a35] to-[#0b6b2b] px-4 text-center text-sm font-medium text-white"
                >
                  Be a Member
                </a>

                <a
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="relative ms-[-4px] flex h-9 w-9 -rotate-45 items-center justify-center overflow-hidden rounded-full bg-[#d7a62f] text-center text-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#bd8f22]"
                  aria-label="Contact"
                >
                  <i className="absolute ph ph-paper-plane-right ms-1 translate-x-0 text-white duration-300 group-hover:translate-x-10"></i>
                  <i className="absolute ph ph-paper-plane-right ms-1 -translate-x-10 text-white duration-300 group-hover:translate-x-0"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;