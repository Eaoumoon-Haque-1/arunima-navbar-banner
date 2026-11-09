import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import golfField from "../../assets/golf_field.JPG";

const API_BASE_URL = "https://argc.space/api";

const normalizeClub = (club) => ({
  name: club.club_name || club.name || "Club Name Unavailable",
  location: club.club_address || club.location || "Address not available",
  phone: club.mobile_no || club.phone || "",
  email: club.email ?? club.email_address ?? null,
  clubType: club.club_type || "",
});

const getClubGroup = (clubType) => {
  const normalizedType = String(clubType || "").trim().toLowerCase();

  if (normalizedType === "bgf") return "BGF";
  if (normalizedType === "others") return "Others";

  return "Others";
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const cleanPhone = (phone) => phone?.replace(/[^\d+]/g, "");

const ClubCard = ({ club, index, compact = false }) => {
  const phoneHref = cleanPhone(club.phone);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[8px] border border-emerald-900/10 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-colors duration-300 hover:border-[#d7b56d]/70 ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#d7b56d]/15 transition duration-300 group-hover:scale-125 group-hover:bg-[#0b6b2b]/10"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#061b0d] text-[#d7b56d] shadow-lg shadow-emerald-950/15 transition duration-300 group-hover:bg-[#d7b56d] group-hover:text-[#061b0d]">
            <i
              className={`${compact ? "ph ph-buildings" : "ph ph-flag-banner"} text-2xl`}
            ></i>
          </div>

          <span className="rounded-full border border-emerald-900/10 bg-[#fbfaf6] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#a8753b]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={`mt-5 font-serif font-bold leading-tight text-[#102416] ${compact ? "text-xl" : "text-2xl"}`}
        >
          {club.name}
        </h3>

        <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
          <p className="flex items-start gap-3">
            <i className="ph ph-map-pin mt-1 text-base text-[#a8753b]"></i>
            <span>{club.location}</span>
          </p>

          {club.phone && (
            <a
              href={phoneHref ? `tel:${phoneHref}` : undefined}
              className="flex items-start gap-3 transition hover:text-[#0b6b2b]"
            >
              <i className="ph ph-phone mt-1 text-base text-[#a8753b]"></i>
              <span>{club.phone}</span>
            </a>
          )}

          {club.email && (
            <a
              href={`mailto:${club.email}`}
              className="flex items-start gap-3 break-all transition hover:text-[#0b6b2b]"
            >
              <i className="ph ph-envelope-simple mt-1 text-base text-[#a8753b]"></i>
              <span>{club.email}</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const AffliatedClubs = () => {
  const [bgfClubs, setBgfClubs] = useState([]);
  const [otherClubs, setOtherClubs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [totalClubs, setTotalClubs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchAffiliatedClubs = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_BASE_URL}/clubs?page=${currentPage}`,
        );

        if (!response.ok) {
          throw new Error("Unable to fetch clubs.");
        }

        const payload = await response.json();
        const responseData = payload?.data ?? payload;
        const apiClubs = Array.isArray(responseData?.data)
          ? responseData.data
          : [];

        const groupedClubs = { BGF: [], Others: [] };

        apiClubs.forEach((club) => {
          const normalizedClub = normalizeClub(club);
          const group = getClubGroup(normalizedClub.clubType);
          groupedClubs[group].push(normalizedClub);
        });

        if (!ignore) {
          setBgfClubs(groupedClubs.BGF);
          setOtherClubs(groupedClubs.Others);
          setTotalPages(Number(responseData?.last_page ?? 1));
          // setTotalClubs(Number(responseData?.total ?? apiClubs.length));
        }
      } catch (error) {
        if (!ignore) {
          setBgfClubs([]);
          setOtherClubs([]);
          setTotalPages(1);
          // setTotalClubs(0);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchAffiliatedClubs();

    return () => {
      ignore = true;
    };
  }, [currentPage]);

  // const stats = useMemo(
  //   () => [
  //     {
  //       value: String(bgfClubs.length),
  //       label: "BGF clubs",
  //     },
  //     { value: String(otherClubs.length), label: "Other clubs" },
  //     {
  //       value: String(totalClubs || bgfClubs.length + otherClubs.length),
  //       label: "Total clubs",
  //     },
  //   ],
  //   [bgfClubs.length, otherClubs.length, totalClubs],
  // );

  return (
    <main className="w-full pt-[86px] lg:pt-[96px]">
      <section className="relative w-screen overflow-hidden bg-[#061b0d] text-white [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]">
        <div className="relative min-h-[560px]">
          <img
            src={golfField}
            alt="Arunima Resort Golf Club green course"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#061b0d]/95 via-[#061b0d]/78 to-[#061b0d]/20"></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#061b0d]/70 via-transparent to-black/25"></div>

          <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="mb-5 w-fit text-sm font-bold uppercase tracking-[0.32em] text-[#d7b56d]">
                Partner Network
              </p>

              <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                Affiliated Clubs
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-50/85 sm:text-lg">
                Explore Arunima Resort Golf Club affiliated golf and social
                clubs across Bangladesh with quick access to location, phone,
                and email details.
              </p>

              {/* <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#golf-clubs"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[4px] bg-[#d7b56d] px-6 text-sm font-black uppercase tracking-wide text-[#061b0d] transition hover:bg-white"
                >
                  <span>View Clubs</span>
                  <i className="ph ph-arrow-right"></i>
                </a>
                <a
                  href="#other-clubs"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[4px] border border-white/35 bg-white/10 px-6 text-sm font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-[#061b0d]"
                >
                  <span>Other Clubs</span>
                </a>
              </div> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
            >
              {/* {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[8px] border border-white/15 bg-white/10 p-5 text-center shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur-xl"
                >
                  <p className="font-serif text-4xl font-bold text-[#d7b56d]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-50/80">
                    {item.label}
                  </p>
                </div>
              ))} */}
            </motion.div>
          </div>
        </div>
      </section>

      {bgfClubs.length > 0 && (
        <section
          id="golf-clubs"
          className="relative overflow-hidden bg-[#fbfaf6] px-6 py-20 lg:px-10"
        >
          <div className="absolute inset-y-0 left-0 w-28 bg-linear-to-r from-[#f1eadc] to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-28 bg-linear-to-l from-[#f1eadc] to-transparent"></div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#a8753b]">
                Golf Club Access
              </p>

              <h2 className="mt-3 font-serif text-xl font-bold leading-tight text-[#102416] sm:text-xl">
                BANGLADESH GOLF FEDERATION (BGF) AFFILIATED CLUBS
              </h2>
            </motion.div>

            {loading && (
              <div className="mt-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-[#a8753b]">
                Loading clubs...
              </div>
            )}

            {!loading && (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.12 }}
                  className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                >
                  {bgfClubs.map((club, index) => (
                    <ClubCard
                      key={`${club.name}-${index}`}
                      club={club}
                      index={index}
                    />
                  ))}
                </motion.div>

                {totalPages > 1 && (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
                      disabled={currentPage === 1}
                      className="inline-flex min-h-11 items-center justify-center rounded-[4px] border border-[#0b6b2b]/20 bg-white px-5 text-xs font-black uppercase tracking-[0.2em] text-[#0b6b2b] transition hover:bg-[#0b6b2b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Prev
                    </button>

                    <div className="rounded-[4px] border border-[#d7b56d]/40 bg-[#f9f3e7] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#a8753b]">
                      Page {currentPage} of {totalPages}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="inline-flex min-h-11 items-center justify-center rounded-[4px] border border-[#0b6b2b]/20 bg-white px-5 text-xs font-black uppercase tracking-[0.2em] text-[#0b6b2b] transition hover:bg-[#0b6b2b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {otherClubs.length > 0 && (
        <section id="other-clubs" className="bg-white px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex flex-col gap-5 border-b border-[#d7b56d]/45 pb-8 lg:flex-row lg:items-end lg:justify-between"
            >
              <div>
                <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#a8753b]">
                  <span className="h-px w-8 bg-[#d7b56d]"></span>
                  Partner Directory
                </p>

                <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#102416] sm:text-5xl">
                  Other Clubs
                </h2>
              </div>

              <p className="max-w-xl text-base leading-7 text-slate-600">
                Additional partner club contacts are presented in the same compact
                format for easy access.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              className="mt-10 grid gap-5 md:grid-cols-2"
            >
              {otherClubs.map((club, index) => (
                <ClubCard key={club.name} club={club} index={index} compact />
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
};

export default AffliatedClubs;
