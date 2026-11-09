import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMemberProfiles } from "../../services/authApi";

const formatMembershipDate = (date) => {
  if (!date) return null;

  const [year, month, day] = date.split("-");
  return year && month && day ? `${day}-${month}-${year}` : date;
};

const getInitials = (name = "Member") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const MemberCard = ({ member }) => {
  const memberType = member.member_type;
  const membershipDate = formatMembershipDate(member.membership_since);

  return (
    <article className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(6,78,59,0.13)] sm:p-6">
      <div className="flex items-start gap-4 sm:gap-5">
        {member.profile_image ? (
          <img
            src={member.profile_image}
            alt={member.full_name || "Club member"}
            className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-1 ring-slate-100 sm:h-28 sm:w-28"
            loading="lazy"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-2xl font-bold text-emerald-800 ring-1 ring-emerald-200 sm:h-28 sm:w-28">
            {getInitials(member.full_name)}
          </div>
        )}

        <div className="min-w-0 flex-1 pt-1">
          <h2 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
            {member.full_name || "Club Member"}
          </h2>
          {member.designation && (
            <p className="mt-2 text-sm font-medium text-slate-700 sm:text-base">
              {member.designation}
            </p>
          )}
          {member.company_name && (
            <p className="mt-1 text-sm leading-5 text-slate-600 sm:text-base">
              {member.company_name}
            </p>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="mt-1 block break-all text-sm text-emerald-700 transition hover:text-emerald-900 sm:text-base"
            >
              {member.email}
            </a>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-700 sm:text-base">
        {member.membership_no && (
          <div className="flex items-center gap-3">
            <i className="ph ph-identification-card text-xl text-emerald-600" />
            <span>
              <span className="font-semibold">Membership No:</span>{" "}
              {member.membership_no}
            </span>
          </div>
        )}

        {membershipDate && (
          <div className="flex items-center gap-3">
            <i className="ph ph-calendar-dots text-xl text-emerald-600" />
            <span>
              <span className="font-semibold">Member Since:</span>{" "}
              {membershipDate}
            </span>
          </div>
        )}

        {memberType && (
          <div className="flex items-center gap-3">
            <i className="ph ph-medal text-xl text-emerald-600" />
            <span>
              <span className="font-semibold">Member Type:</span>{" "}
              {memberType.type_name}
              {memberType.type_code ? ` (${memberType.type_code})` : ""}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

const Members = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token, logout } = useAuth();
  const [members, setMembers] = useState([]);
  const [memberTypes, setMemberTypes] = useState([]);
  const [selectedMemberType, setSelectedMemberType] = useState("");
  const [pagination, setPagination] = useState(null);
  const [isMember, setIsMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !token) return;

    let ignore = false;

    const loadMembers = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getMemberProfiles({
          token,
          page: pagination?.current_page || 1,
          memberTypeId: selectedMemberType,
        });

        if (ignore) return;

        const directory = response.data || {};
        setMembers(Array.isArray(directory.members) ? directory.members : []);
        setMemberTypes(
          Array.isArray(directory.member_types) ? directory.member_types : [],
        );
        setPagination(directory.pagination || null);
        setIsMember(directory.is_member === true);
      } catch (requestError) {
        if (ignore) return;

        if (requestError.status === 401) {
          logout();
          navigate("/login", { replace: true });
          return;
        }

        setError(requestError.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    loadMembers();
    return () => {
      ignore = true;
    };
  }, [
    isLoggedIn,
    token,
    selectedMemberType,
    pagination?.current_page,
    logout,
    navigate,
  ]);

  const changePage = (page) => {
    setPagination((current) => ({ ...current, current_page: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMemberTypeChange = (event) => {
    setSelectedMemberType(event.target.value);
    setPagination((current) =>
      current ? { ...current, current_page: 1 } : { current_page: 1 },
    );
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-[70vh] bg-[#f5f7f6] px-4 pb-20 pt-[140px] sm:px-6 lg:pt-[160px]">
        <section className="mx-auto max-w-xl rounded-[28px] border border-slate-100 bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.09)] sm:px-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
            <i className="ph ph-lock-key" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Members Directory
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
            Please log in to view the members directory.
          </p>
          <a
            href="/login"
            className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-7 font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800"
          >
            Login to continue
            <i className="ph ph-arrow-right" />
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f6] px-4 pb-20 pt-[126px] sm:px-6 lg:pt-[145px]">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Arunima Resort Golf Club
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Members Directory
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Connect with the distinguished members of our club community.
          </p>
        </header>

        {isLoading && isMember === null ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-emerald-700">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />
              <span className="text-sm font-semibold">
                Loading directory...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-red-700">
            {error}
          </div>
        ) : isMember === false ? (
          <div className="mx-auto max-w-xl rounded-[28px] border border-amber-200 bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl text-amber-700">
              <i className="ph ph-users-three" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Member access required
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Become a member to view the members list.
            </p>
          </div>
        ) : (
          <>
            <div className="relative mx-auto mb-8 max-w-xl">
              <i className="ph ph-funnel absolute left-5 top-1/2 z-10 -translate-y-1/2 text-xl text-emerald-700" />
              <select
                value={selectedMemberType}
                onChange={handleMemberTypeChange}
                disabled={isLoading}
                className="h-15 w-full appearance-none rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-12 font-medium text-slate-700 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                aria-label="Filter by member type"
              >
                <option value="">All member types</option>
                {memberTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type_name} ({type.type_code})
                  </option>
                ))}
              </select>
              <i className="ph ph-caret-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>

            {isLoading && (
              <div className="mb-5 text-center text-sm font-medium text-emerald-700">
                Updating members...
              </div>
            )}

            {members.length ? (
              <div
                className={`grid gap-5 lg:grid-cols-2 ${isLoading ? "opacity-60" : ""}`}
              >
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white px-6 py-12 text-center text-slate-500 shadow-sm">
                No members found for this member type.
              </div>
            )}

            {pagination?.last_page > 1 && (
              <nav
                className="mt-10 flex items-center justify-center gap-3"
                aria-label="Member directory pagination"
              >
                <button
                  type="button"
                  onClick={() => changePage(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1 || isLoading}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <i className="ph ph-caret-left" />
                </button>

                <span className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>

                <button
                  type="button"
                  onClick={() => changePage(pagination.current_page + 1)}
                  disabled={
                    pagination.current_page === pagination.last_page ||
                    isLoading
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <i className="ph ph-caret-right" />
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Members;
