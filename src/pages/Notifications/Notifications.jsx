import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserNotifications } from "../../services/authApi";

const formatNotificationDate = (value) => {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const NotificationCard = ({ item }) => {
  const title =
    item?.title ||
    item?.subject ||
    item?.name ||
    "Notification";

  const message =
    item?.message ||
    item?.content ||
    item?.body ||
    item?.description ||
    item?.details ||
    "You have a new update from Arunima Resort Golf Club.";

  const date =
    item?.created_at ||
    item?.createdAt ||
    item?.sent_at ||
    item?.date;

  const type =
    item?.category ||
    item?.type ||
    item?.notification_type ||
    item?.kind;

  const isUnread =
    item?.is_read === false ||
    item?.is_read === 0 ||
    item?.read === false ||
    item?.read_at === null;

  return (
    <article
      className={`group relative overflow-hidden rounded-[22px] border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-6 ${
        isUnread
          ? "border-emerald-200 shadow-[0_8px_30px_rgba(15,122,53,0.07)]"
          : "border-slate-200"
      }`}
    >
      {isUnread && (
        <span className="absolute bottom-0 left-0 top-0 w-1 bg-[#0f7a35]" />
      )}

      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isUnread
              ? "bg-[#0f7a35] text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <i
            className={`ph ${
              isUnread ? "ph-bell-ringing" : "ph-bell"
            } text-xl`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-[#172b46] sm:text-lg">
                  {title}
                </h2>

                {isUnread && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                    New
                  </span>
                )}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <i className="ph ph-clock" />
                  {formatNotificationDate(date)}
                </span>

                {type && (
                  <>
                    <span>•</span>
                    <span className="font-semibold capitalize text-slate-500">
                      {type}
                    </span>
                  </>
                )}
              </div>
            </div>

            {!isUnread && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <i className="ph ph-check-circle" />
                Read
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
            {message}
          </p>
        </div>
      </div>
    </article>
  );
};

const Notifications = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token, logout } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !token) return;

    let ignore = false;

    const loadNotifications = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getUserNotifications({
          token,
          page,
        });

        if (ignore) return;

        const payload = response?.data ?? response ?? {};

        const source =
          payload?.notifications ??
          payload?.data ??
          payload;

        const items = Array.isArray(source)
          ? source
          : Array.isArray(source?.data)
            ? source.data
            : [];

        const meta =
          payload?.pagination ||
          payload?.meta ||
          source?.pagination ||
          source?.meta ||
          source;

        setNotifications(items);

        setPagination({
          currentPage: Number(
            meta?.current_page ??
              meta?.currentPage ??
              page,
          ),
          lastPage: Number(
            meta?.last_page ??
              meta?.lastPage ??
              meta?.total_pages ??
              1,
          ),
        });
      } catch (requestError) {
        if (ignore) return;

        if (requestError.status === 401) {
          logout();
          navigate("/login", {
            replace: true,
          });
          return;
        }

        setError(
          requestError.message ||
            "Unable to load notifications.",
        );
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadNotifications();

    return () => {
      ignore = true;
    };
  }, [
    isLoggedIn,
    token,
    page,
    logout,
    navigate,
  ]);

  const pageNumbers = useMemo(() => {
    const { currentPage, lastPage } = pagination;

    if (lastPage <= 1) return [];

    const start = Math.max(
      1,
      Math.min(
        currentPage - 2,
        lastPage - 4,
      ),
    );

    const end = Math.min(
      lastPage,
      start + 4,
    );

    return Array.from(
      {
        length: end - start + 1,
      },
      (_, index) => start + index,
    );
  }, [pagination]);

  const changePage = (nextPage) => {
    if (
      nextPage < 1 ||
      nextPage > pagination.lastPage ||
      nextPage === pagination.currentPage
    ) {
      return;
    }

    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f6] px-4 pb-20 pt-[126px] sm:px-6 lg:pt-[145px]">
      <section className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-7 grid grid-cols-[44px_1fr_44px] items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f7a35] text-white shadow-[0_8px_20px_rgba(15,122,53,0.22)] transition hover:bg-[#0b642d]"
            aria-label="Go back"
          >
            <i className="ph ph-arrow-left text-xl" />
          </button>

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0f7a35]">
              Member Updates
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-[#172b46] sm:text-4xl">
              Notifications
            </h1>
          </div>

          <div />
        </header>

        {/* Intro */}
        {!isLoading && notifications.length > 0 && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0f7a35] shadow-sm">
              <i className="ph ph-megaphone text-lg" />
            </span>

            <div>
              <p className="text-sm font-bold text-[#172b46]">
                Latest club updates
              </p>

              <p className="text-xs text-slate-500">
                Important notices and information will appear here.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <i className="ph ph-warning-circle text-xl" />
            {error}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-[24px] border border-slate-200 bg-white">
            <div className="flex flex-col items-center gap-3">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-[#0f7a35]" />

              <p className="text-sm font-semibold text-slate-500">
                Loading notifications...
              </p>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-[24px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-[#0f7a35]">
              <i className="ph ph-bell-simple-slash text-3xl" />
            </span>

            <h2 className="mt-5 text-xl font-black text-[#172b46]">
              You're all caught up
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              There are no notifications right now. New updates will appear here when available.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {notifications.map(
                (item, index) => (
                  <NotificationCard
                    key={
                      item.id ||
                      `${item.title || "notification"}-${index}`
                    }
                    item={item}
                  />
                ),
              )}
            </div>

            {/* Pagination */}
            {pagination.lastPage > 1 && (
              <nav
                className="mt-8 flex flex-wrap items-center justify-center gap-2"
                aria-label="Notification pagination"
              >
                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      pagination.currentPage - 1,
                    )
                  }
                  disabled={
                    pagination.currentPage === 1
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:text-[#0f7a35] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Previous page"
                >
                  <i className="ph ph-caret-left" />
                </button>

                {pageNumbers[0] > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => changePage(1)}
                      className="h-10 min-w-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-600 hover:border-emerald-300 hover:text-[#0f7a35]"
                    >
                      1
                    </button>

                    {pageNumbers[0] > 2 && (
                      <span className="px-1 text-slate-400">
                        ...
                      </span>
                    )}
                  </>
                )}

                {pageNumbers.map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() =>
                        changePage(pageNumber)
                      }
                      className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition ${
                        pageNumber ===
                        pagination.currentPage
                          ? "bg-[#0f7a35] text-white shadow-md"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-[#0f7a35]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}

                {pageNumbers.at(-1) <
                  pagination.lastPage && (
                  <>
                    {pageNumbers.at(-1) <
                      pagination.lastPage - 1 && (
                      <span className="px-1 text-slate-400">
                        ...
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        changePage(
                          pagination.lastPage,
                        )
                      }
                      className="h-10 min-w-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-600 hover:border-emerald-300 hover:text-[#0f7a35]"
                    >
                      {pagination.lastPage}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      pagination.currentPage + 1,
                    )
                  }
                  disabled={
                    pagination.currentPage ===
                    pagination.lastPage
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:text-[#0f7a35] disabled:cursor-not-allowed disabled:opacity-30"
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

export default Notifications;