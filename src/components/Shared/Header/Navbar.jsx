import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import memberShipCard from "../../../assets/MembershipCard.jpeg";
import facilities from "../../../assets/facilities.png";
import aboutMain from "../../../assets/aboutMain.JPG";
import golfField from "../../../assets/golf_field.JPG";
import banner from "../../../assets/banner.JPG";
const logoUrl =
  "https://arunimaresortgolfclub.com/wp-content/uploads/2024/06/cropped-Arunima-logo-01-copy-color-correction-300x145.png";

const menuDetails = {
  Membership: {
    title: "Membership",
    image: memberShipCard,
    images: [memberShipCard, aboutMain, golfField, banner],
    imageFit: "cover",
    imagePosition: "center",
    description:
      "Choose from Arunima Resort Golf Club membership categories and enjoy golf, resort, nature, and affiliated club privileges.",
    cards: [
      {
        title: "Permanent Membership",
        badge: "Permanent",
        icon: "ph ph-identification-card",
        description:
          "A long-term membership option for regular club access, golf facilities, resort benefits, and member privileges.",
        href: "/membership#permanent-membership",
      },
      {
        title: "Life Membership",
        badge: "Lifetime",
        icon: "ph ph-crown",
        description:
          "A premium membership category for lifetime association with Arunima Resort Golf Club and its member facilities.",
        href: "/membership#life-membership",
      },
      {
        title: "Corporate Membership",
        badge: "Company",
        icon: "ph ph-buildings",
        description:
          "Designed for companies and organizations seeking golf, resort, leisure, and corporate retreat access.",
        href: "/membership#corporate-membership",
      },
      {
        title: "Foreign Membership",
        badge: "Foreign",
        icon: "ph ph-globe-hemisphere-east",
        description:
          "A membership category for foreign guests, expatriates, and international visitors interested in club access.",
        href: "/membership#foreign-membership",
      },
      {
        title: "membership Privileges",
        badge: "Privileges",
        icon: "ph ph-flag-banner",
        description:
          "Members can enjoy golf facilities and affiliated club access according to applicable club rules.",
        href: "/membership#membership-privileges",
      },
      {
        title: "Member List",
        badge: "Directory",
        icon: "ph ph-address-book",
        description: "Browse the Arunima Resort Golf Club members directory.",
        href: "/members",
      },
    ],
  },

  Facilities: {
    title: "Facilities",
    image: facilities,
    imageFit: "cover",
    imagePosition: "center",
    description:
      "Discover resort facilities, nature experiences, accommodation, dining, and club life.",
    cards: [
      {
        title: "Accommodation",
        badge: "Stay",
        icon: "ph ph-house-line",
        description: "Comfortable stays surrounded by greenery and calm.",
        href: "https://arunimaresort.com/accommodation/",
      },
      {
        title: "Food & Beverages",
        badge: "Dining",
        icon: "ph ph-fork-knife",
        description: "Dining and refreshment services for guests and members.",
        href: "https://arunimaresort.com/f-b/",
      },
      {
        title: "Nature Healing",
        badge: "Nature",
        icon: "ph ph-leaf",
        description: "Relax in a peaceful natural environment.",
        href: "https://arunimaresort.com/nature-healing/",
      },
      {
        title: "Sight Seeing",
        badge: "Views",
        icon: "ph ph-binoculars",
        description:
          "Enjoy scenic resort spots, green landscapes, water views, and peaceful surroundings.",
        href: "https://arunimaresort.com/site-seeing/",
      },
      {
        title: "Rural Life",
        badge: "Village",
        icon: "ph ph-tree",
        description:
          "Experience countryside life, local culture, village paths, and the calm rhythm of nature.",
        // href: "/facilities#rural-life",
        href: "https://arunimaresort.com/rural-life/",
      },
    ],
  },

  Events: {
    title: "Events",
    image:
      "https://arunimaresortgolfclub.com/wp-content/uploads/2024/01/IMG_7146-scaled-1-300x200.jpg",
    imageFit: "cover",
    imagePosition: "center",
    description:
      "Find club events, golf tournaments, corporate programs, and resort activities.",
    cards: [
      {
        title: "Upcoming Events",
        badge: "Upcoming",
        icon: "ph ph-calendar-star",
        description:
          "Discover upcoming club events, tournaments, and special programs.",
        href: "/tournaments",
        attention: true,
      },
      {
        title: "Tournaments",
        badge: "Golf",
        icon: "ph ph-trophy",
        description: "Golf tournaments and competitive club programs.",
        href: "/tournaments",
      },
      {
        title: "Gallery",
        badge: "Photos",
        icon: "ph ph-images",
        description: "See resort, golf, events, and nature moments.",
        href: "/gallery",
      },
    ],
  },
};

const directMenuItems = [
  {
    title: "Golf",
    href: "/",
  },
  {
    title: "Game Fees",
    href: "/membership#game-fees",
  }
];


const visibleMenuItems = [
  {
    title: "Affliated Clubs",
    href: "/affliated_clubs",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const MenuPreviewImage = ({ activeMenu }) => {
  const menu = menuDetails[activeMenu];
  const previewImages = menu.images?.length ? menu.images : [menu.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (previewImages.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex(
        (currentIndex) => (currentIndex + 1) % previewImages.length,
      );
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [previewImages.length]);

  return (
    <div
      className={`relative flex h-[250px] w-full items-center justify-center overflow-hidden ${
        menu.imageBg || "bg-slate-100"
      }`}
    >
      {previewImages.map((image, index) => (
        <img
          key={`${menu.title}-${image}`}
          src={image}
          alt={`${menu.title} preview ${index + 1}`}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            menu.imageFit === "contain" ? "object-contain p-3" : "object-cover"
          } ${index === activeImageIndex ? "opacity-100" : "opacity-0"}`}
          style={{
            objectPosition: menu.imagePosition || "center",
          }}
        />
      ))}

      {previewImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {previewImages.map((image, index) => (
            <span
              key={`${menu.title}-dot-${image}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeImageIndex
                  ? "w-6 bg-[#d7a62f]"
                  : "w-1.5 bg-white/70"
              }`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

const GolfFlightAnimation = () => (
  <motion.svg
    aria-hidden="true"
    viewBox="0 0 320 180"
    className="pointer-events-none absolute inset-0 h-full w-full"
  >
    <defs>
      <linearGradient id="golf-flight-path" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#d7a62f" stopOpacity="0" />
        <stop offset="0.45" stopColor="#d7a62f" stopOpacity="0.65" />
        <stop offset="1" stopColor="#0b6b2b" stopOpacity="0.35" />
      </linearGradient>
      <filter id="golf-ball-shadow" x="-100%" y="-100%" width="300%" height="300%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#061b0d" floodOpacity="0.24" />
      </filter>
    </defs>

    <motion.path
      d="M 18 142 Q 150 22 288 132"
      fill="none"
      stroke="url(#golf-flight-path)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="5 6"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1], opacity: [0, 0.55, 0] }}
      transition={{
        duration: 1.6,
        times: [0, 0.72, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />

    <motion.g
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{
        opacity: [0, 0, 0.75, 0.75, 0],
        scale: [0.88, 0.88, 1, 1, 1],
      }}
      transition={{
        duration: 1.6,
        times: [0, 0.28, 0.48, 0.78, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3,
      }}
      style={{ transformOrigin: "288px 134px" }}
    >
      <path d="M 288 132 V 67" stroke="#0b6b2b" strokeWidth="2" />
      <path d="M 288 68 L 257 80 L 288 91 Z" fill="#d7a62f" />
      <ellipse cx="288" cy="134" rx="12" ry="3.5" fill="#061b0d" fillOpacity="0.5" />
    </motion.g>

    <motion.circle
      cx="18"
      cy="142"
      r="5.5"
      fill="#ffffff"
      stroke="#9a6b14"
      strokeWidth="1.5"
      filter="url(#golf-ball-shadow)"
      initial={{ opacity: 0 }}
      animate={{
        cx: [18, 18, 150, 285, 288],
        cy: [142, 142, 35, 127, 134],
        r: [4, 4, 6, 5, 2],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: 1.6,
        times: [0, 0.05, 0.5, 0.9, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />

    <motion.ellipse
      cx="288"
      cy="134"
      rx="12"
      ry="3.5"
      fill="none"
      stroke="#d7a62f"
      strokeWidth="1.5"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0, 0.7, 0], scale: [0.5, 0.5, 1.2, 1.55] }}
      transition={{
        duration: 1.6,
        times: [0, 0.72, 0.86, 1],
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 3,
      }}
      style={{ transformOrigin: "288px 134px" }}
    />
  </motion.svg>
);

const MegaMenuCard = ({ card, closeMegaMenu }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={card.href}
      onClick={closeMegaMenu}
      animate={
        card.attention && !shouldReduceMotion
          ? {
              scale: [0.99, 1.02, 1],
              boxShadow: [
                "0 8px 22px rgba(15,23,42,0.06), 0 0 16px rgba(215,166,47,0.12)",
                "0 10px 28px rgba(15,23,42,0.08), 0 0 24px rgba(215,166,47,0.22)",
                "0 8px 22px rgba(15,23,42,0.06), 0 0 16px rgba(215,166,47,0.12)",
              ],
            }
          : undefined
      }
      transition={
        card.attention
          ? {
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
            }
          : undefined
      }
      className={`group relative overflow-hidden rounded-[22px] border p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${
        card.attention
          ? "border-[#d7a62f]/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,249,235,0.82))] shadow-[0_8px_22px_rgba(15,23,42,0.06),0_0_18px_rgba(215,166,47,0.14)] hover:border-[#d7a62f]/80"
          : "border-white/60 bg-white/75 shadow-sm hover:border-[#0b6b2b]/25"
      }`}
    >
      {card.attention && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d7a62f] to-transparent"
        />
      )}

      {card.attention && !shouldReduceMotion && <GolfFlightAnimation />}

      <div
        className={`absolute -right-10 -top-10 h-24 w-24 rounded-full transition duration-300 ${
          card.attention
            ? "bg-[#d7a62f]/8"
            : "bg-[#0b6b2b]/5 group-hover:bg-[#d7a62f]/10"
        }`}
      ></div>

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div
            className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition ${
              card.attention
                ? "bg-[#d7a62f]/15 text-[#9a6b14]"
                : "bg-[#0b6b2b]/10 text-[#0b6b2b] group-hover:bg-[#0b6b2b] group-hover:text-white"
            }`}
          >
            <i className={`${card.icon || "ph ph-arrow-up-right"} text-xl`}></i>

          </div>

          {card.badge && (
            <span className="rounded-full bg-[#d7a62f]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#9a6b14]">
              {card.badge}
            </span>
          )}
        </div>

        <h4 className="text-lg font-bold text-slate-900">{card.title}</h4>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {card.description}
        </p>
      </div>
    </motion.a>
  );
};

const MobileSubmenuCard = ({ card, closeMobileMenu }) => {
  return (
    <a
      href={card.href}
      onClick={closeMobileMenu}
      className={`block rounded-xl px-4 py-3 transition hover:bg-white ${
        card.attention
          ? "border border-[#d7a62f]/45 bg-amber-50/45 shadow-sm"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="block text-sm font-bold text-slate-900">
          {card.title}
        </span>

        {card.badge && (
          <span className="shrink-0 rounded-full bg-[#d7a62f]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#9a6b14]">
            {card.badge}
          </span>
        )}
      </div>

      <span className="mt-1 block text-xs leading-5 text-slate-600">
        {card.description}
      </span>
    </a>
  );
};

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const menuNames = Object.keys(menuDetails);
  const profileName = user?.full_name || user?.name || user?.email || "Profile";
  const profileInitial = profileName.charAt(0).toUpperCase();

  const toggleMobileSubmenu = (menuName) => {
    setMobileSubmenu(mobileSubmenu === menuName ? null : menuName);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSubmenu(null);
    setProfileMenuOpen(false);
  };

  const closeMegaMenu = () => {
    setActiveMenu(null);
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    closeMegaMenu();
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
        <div className="hidden items-center gap-2 lg:flex">
          {isLoggedIn ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/80 shadow-sm backdrop-blur-xl transition hover:bg-white"
                aria-label="Profile menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b6b2b] text-sm font-bold text-white">
                  {profileInitial}
                </span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                  <div className="px-3 py-2">
                    <p className="text-sm font-bold text-slate-900">
                      {profileName}
                    </p>
                    <p className="text-xs text-slate-500">Member profile</p>
                  </div>

                  <div className="mt-1 space-y-1">
                    <a
                      href="/accounts"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <i className="ph ph-user-circle text-lg text-[#0b6b2b]"></i>
                      Account
                    </a>

                    <a
                      href="/notifications"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <i className="ph ph-bell text-lg text-[#0b6b2b]"></i>
                      Notifications
                    </a>

                    <a
                      href="/members"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <i className="ph ph-bell text-lg text-[#0b6b2b]"></i>
                      Member List
                    </a>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <i className="ph ph-sign-out text-lg"></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="flex h-9 items-center justify-center rounded-full border border-white/60 bg-white/75 px-4 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-xl transition hover:bg-white hover:text-[#0b6b2b]"
            >
              Login
            </a>
          )}

          {!isLoggedIn && (
            <div className="group flex cursor-pointer items-center">
              <a
                href="/membership"
                className="flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-[#0f7a35] to-[#0b6b2b] px-4 text-center text-sm font-medium text-white shadow-lg shadow-emerald-900/20"
              >
                Be a Member
              </a>

              {/* <a
                href="/contact"
                className="relative ms-[-4px] flex h-9 w-9 -rotate-45 items-center justify-center overflow-hidden rounded-full bg-[#d7a62f] text-center text-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#bd8f22]"
                aria-label="Contact"
              >
                <i className="absolute ph ph-user-plus ms-1 translate-x-0 text-white duration-300 group-hover:translate-x-10"></i>
                <i className="absolute ph ph-user-plus ms-1 -translate-x-10 text-white duration-300 group-hover:translate-x-0"></i>
              </a> */}
            </div>
          )}
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
            {/* Left Preview */}
            <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-sm backdrop-blur-xl">
              <MenuPreviewImage key={activeMenu} activeMenu={activeMenu} />

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

            {/* Right Cards */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {menuDetails[activeMenu].cards.map((card) => (
                <MegaMenuCard
                  key={card.title}
                  card={card}
                  closeMegaMenu={closeMegaMenu}
                />
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
                      <MobileSubmenuCard
                        key={card.title}
                        card={card}
                        closeMobileMenu={closeMobileMenu}
                      />
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

            {isLoggedIn ? (
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/75 shadow-sm backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b6b2b] text-sm font-bold text-white">
                      {profileInitial}
                    </span>

                    <div>
                      <p className="text-[15px] font-bold text-slate-900">
                        {profileName}
                      </p>
                      <p className="text-xs text-slate-500">Profile</p>
                    </div>
                  </div>

                  <i
                    className={`ph ph-caret-down text-lg text-[#0b6b2b] transition ${profileMenuOpen ? "rotate-180" : ""}`}
                  ></i>
                </button>

                {profileMenuOpen && (
                  <div className="border-t border-white/50 bg-white/70 p-2">
                    <a
                      href="/accounts"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        closeMobileMenu();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <i className="ph ph-user-circle text-lg text-[#0b6b2b]"></i>
                      Account
                    </a>

                    <a
                      href="/notifications"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        closeMobileMenu();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <i className="ph ph-bell text-lg text-[#0b6b2b]"></i>
                      Notifications
                    </a>

                    <a
                      href="/members"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        closeMobileMenu();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <i className="ph ph-bell text-lg text-[#0b6b2b]"></i>
                      Member List
                    </a>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium text-red-700 transition hover:bg-red-50"
                    >
                      <i className="ph ph-sign-out text-lg"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                onClick={closeMobileMenu}
                className="block rounded-2xl border border-white/60 bg-white/75 px-4 py-4 text-[15px] font-bold text-slate-900 shadow-sm backdrop-blur-xl"
              >
                Login
              </a>
            )}

            {!isLoggedIn && (
              <div className="pt-3">
                <div className="group flex cursor-pointer items-center">
                  <a
                    href="/membership#foreign-membership"
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
                    <i className="absolute ph ph-user-plus ms-1 translate-x-0 text-white duration-300 group-hover:translate-x-10"></i>
                    <i className="absolute ph ph-user-plus ms-1 -translate-x-10 text-white duration-300 group-hover:translate-x-0"></i>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
