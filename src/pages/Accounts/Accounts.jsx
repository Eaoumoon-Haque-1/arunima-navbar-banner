import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getMonthlyUnpaidInvoices,
  payMonthlyInvoices,
} from "../../services/authApi";

const moneyFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatMembershipDate = (date) => {
  if (!date) return "-";

  const [year, month, day] = date.split("-");
  return year && month && day ? `${day}-${month}-${year}` : date;
};

const getBillingCycleLabel = (value) => {
  if (value === 1) return "Yearly";
  if (value === 2) return "Monthly";
  if (value === 3) return "Quarterly";
  return value || "-";
};

const Accounts = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token, logout } = useAuth();

  const [membership, setMembership] = useState(null);
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const [paidInvoices, setPaidInvoices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [screen, setScreen] = useState("list");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !token) return;

    let ignore = false;

    const loadAccounts = async () => {
      setIsLoading(true);
      setError("");
      setSuccessMessage("");

      try {
        const response = await getMonthlyUnpaidInvoices({ token });

        if (ignore) return;

        const data = response?.data || {};
        setMembership(data.membership || null);
        setUnpaidInvoices(
          Array.isArray(data.unpaid_invoices) ? data.unpaid_invoices : [],
        );
        setPaidInvoices(
          Array.isArray(data.paid_invoices) ? data.paid_invoices : [],
        );
      } catch (requestError) {
        if (ignore) return;

        if (requestError.status === 401) {
          logout();
          navigate("/login", { replace: true });
          return;
        }

        setError(requestError.message);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadAccounts();

    return () => {
      ignore = true;
    };
  }, [isLoggedIn, token, logout, navigate]);

  const selectedInvoices = useMemo(
    () => unpaidInvoices.filter((invoice) => selectedIds.includes(invoice.id)),
    [selectedIds, unpaidInvoices],
  );

  const totalSelectedAmount = selectedInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0,
  );

  const totalOutstanding = unpaidInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0,
  );

  const toggleInvoice = (invoiceId) => {
    setSelectedIds((current) =>
      current.includes(invoiceId)
        ? current.filter((id) => id !== invoiceId)
        : [...current, invoiceId],
    );
  };

  const handleMakePayment = () => {
    if (!selectedIds.length) {
      setError("Please select at least one unpaid invoice to pay.");
      return;
    }

    setError("");
    setIsReviewOpen(true);
  };

  const confirmReview = () => {
    setIsReviewOpen(false);
    setScreen("method");
  };

  const handleMethodSubmit = () => {
    if (!paymentMethod) {
      setError("Please select a payment method first.");
      return;
    }

    setError("");
    setScreen("confirm");
  };

  const handleFinalSubmit = async () => {
    if (!selectedIds.length) {
      setError("Please select at least one invoice to continue.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await payMonthlyInvoices({
        token,
        invoiceIds: selectedIds,
      });

      const message = response?.message || "Payment submitted successfully.";
      setSuccessMessage(message);
      setScreen("list");
      setPaymentMethod("");
      setSelectedIds([]);
      setIsReviewOpen(false);

      const refreshed = await getMonthlyUnpaidInvoices({ token });
      const data = refreshed?.data || {};
      setMembership(data.membership || membership);
      setUnpaidInvoices(
        Array.isArray(data.unpaid_invoices) ? data.unpaid_invoices : [],
      );
      setPaidInvoices(
        Array.isArray(data.paid_invoices) ? data.paid_invoices : [],
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-screen bg-[#f5f7f6] px-4 pb-20 pt-[126px] sm:px-6 lg:pt-[145px]">
      <section className="mx-auto max-w-5xl">
        <header className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-[#0f7a35] text-2xl text-white shadow-[0_8px_20px_rgba(15,122,53,0.2)] transition hover:bg-[#0b6b2b]"
            aria-label="Go back"
          >
            <i className="ph ph-arrow-left" />
          </button>

          <h1 className="flex-1 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Accounts
          </h1>

          <div className="w-11" />
        </header>

        {successMessage && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">
            {successMessage}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-60 items-center justify-center rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex flex-col items-center gap-3 text-emerald-700">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />
              <span className="text-sm font-semibold">
                Loading account details...
              </span>
            </div>
          </div>
        ) : screen === "method" ? (
          <div className="rounded-[28px] border border-slate-200 bg-[#f1f3f2] p-5 shadow-[0_8px_18px_rgba(15,23,42,0.04)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-[2.2rem]">
              Selected Payment Method
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Choose the payment method for your selected invoices.
            </p>

            <div className="mt-6 space-y-4">
              {[
                { value: "bkash", label: "Bkash", icon: "ph ph-wallet" },
                { value: "rocket", label: "Rocket", icon: "ph ph-credit-card" },
                { value: "card", label: "Cards", icon: "ph ph-bank" },
              ].map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                    paymentMethod === method.value
                      ? "border-[#0f7a35] bg-gradient-to-r from-[#0f7a35] to-[#1d8d4b]  shadow-[0_10px_24px_rgba(15,122,53,0.22)] "
                      : "border-slate-300 bg-[#f7f8f8] text-slate-800 hover:border-slate-400 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ring-1 ${
                        paymentMethod === method.value
                          ? "bg-white text-[#0f7a35] ring-white shadow-inner"
                          : "bg-white text-slate-700 ring-slate-200"
                      }`}
                    >
                      <i className={method.icon} />
                    </span>
                    <span
                      className={`text-xl font-semibold ${
                        paymentMethod === method.value
                          ? "text-white"
                          : "text-slate-800"
                      }`}
                    >
                      {method.label}
                    </span>
                  </div>

                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      paymentMethod === method.value
                        ? "border-white bg-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {paymentMethod === method.value && (
                      <span className="h-2 w-2 rounded-full bg-[#0f7a35]" />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setScreen("list");
                  setPaymentMethod("");
                }}
                className="h-12 rounded-full border border-slate-300 bg-white px-6 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleMethodSubmit}
                className="h-12 rounded-full bg-[#0f7a35] px-6 text-base font-bold text-white  ring-4 ring-[#0f7a35]/30 transition bg-[#0b6b2b] cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        ) : screen === "confirm" ? (
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Your Payable Amount
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Payment method:{" "}
              <span className="font-semibold capitalize">{paymentMethod}</span>
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center justify-between gap-3 text-base font-medium text-slate-700">
                <span>Total amount</span>
                <span className="text-2xl font-bold text-slate-900">
                  {moneyFormatter.format(totalSelectedAmount)}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setScreen("list");
                  setPaymentMethod("");
                }}
                className="h-12 rounded-full border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="h-12 rounded-full bg-[#0f7a35] px-6 font-semibold text-white transition bg-[#0b6b2b] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {membership && (
              <div className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eafaf1] text-xl text-[#0f7a35] ring-1 ring-[#cfeedd]">
                    <i className="ph ph-user-circle" />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Membership Details
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex gap-3 text-base text-slate-700">
                    <span className="w-44 text-slate-500">
                      Membership Name:
                    </span>
                    <span className="font-semibold text-slate-900">
                      {membership.member_name || "-"}
                    </span>
                  </div>

                  <div className="flex gap-3 text-base text-slate-700">
                    <span className="w-44 text-slate-500">Membership No.:</span>
                    <span className="font-semibold text-slate-900">
                      {membership.membership_no || "-"}
                    </span>
                  </div>

                  <div className="flex gap-3 text-base text-slate-700">
                    <span className="w-44 text-slate-500">
                      Membership Type:
                    </span>
                    <span className="font-semibold text-slate-900">
                      {membership.member_type?.type_name || "-"}
                    </span>
                  </div>

                  <div className="flex gap-3 text-base text-slate-700">
                    <span className="w-44 text-slate-500">
                      Membership Since:
                    </span>
                    <span className="font-semibold text-slate-900">
                      {formatMembershipDate(membership.membership_since)}
                    </span>
                  </div>

                  <div className="flex gap-3 text-base text-slate-700">
                    <span className="w-44 text-slate-500">Membership Fee:</span>
                    <span className="font-semibold text-slate-900">
                      {moneyFormatter.format(
                        Number(membership.membership_fee || 0),
                      )}
                    </span>
                  </div>

                  <div className="flex gap-3 text-base text-slate-700">
                    <span className="w-44 text-slate-500">Billing Cycle:</span>
                    <span className="font-semibold text-slate-900">
                      {getBillingCycleLabel(membership.billing_cycle)}
                    </span>
                  </div>

                  <div className="flex gap-3 text-base text-slate-700 sm:col-span-2">
                    <span className="w-44 text-slate-500">
                      Subscription Fee:
                    </span>
                    <span className="font-semibold text-slate-900">
                      {moneyFormatter.format(
                        Number(membership.subscription_fee || 0),
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-5 rounded-[30px] border border-slate-200 bg-[#e4ebf1] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Total Outstanding Balance
                </h3>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f7a35] text-xl text-white shadow-[0_10px_22px_rgba(15,122,53,0.25)]">
                  <i className="ph ph-wallet" />
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  {moneyFormatter.format(totalOutstanding)}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="mb-4 text-3xl font-bold text-slate-900">
                Unpaid Invoice
              </h3>

              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-100 text-base font-semibold text-slate-700">
                      <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Invoice No</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Particulars</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unpaidInvoices.length ? (
                        unpaidInvoices.map((invoice) => {
                          const isSelected = selectedIds.includes(invoice.id);

                          return (
                            <tr
                              key={invoice.id}
                              className={`border-t border-slate-200 ${
                                isSelected ? "bg-emerald-50/80" : "bg-white"
                              }`}
                            >
                              <td className="px-4 py-4 align-middle">
                                <label className="flex cursor-pointer items-center justify-center">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleInvoice(invoice.id)}
                                    className="h-5 w-5 cursor-pointer rounded border-slate-300 accent-emerald-600 focus:ring-2 focus:ring-emerald-400"
                                    aria-label={`Select invoice ${invoice.invoice_no}`}
                                  />
                                </label>
                              </td>
                              <td className="px-4 py-4 font-medium text-slate-800">
                                {invoice.invoice_no || "-"}
                              </td>
                              <td className="px-4 py-4">
                                {formatDate(invoice.date)}
                              </td>
                              <td className="px-4 py-4">
                                {invoice.particulars || "-"}
                              </td>
                              <td className="px-4 py-4 text-right font-semibold text-slate-800">
                                {moneyFormatter.format(
                                  Number(invoice.amount || 0),
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-10 text-center text-slate-500"
                          >
                            No unpaid invoice found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {unpaidInvoices.length > 0 && (
                  <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-800">
                    <span>Total Outstanding Balance:</span>
                    <span className="text-emerald-700">
                      {moneyFormatter.format(totalOutstanding)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleMakePayment}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-[22px] bg-gradient-to-r from-[#0f7a35] to-[#1a8f48] text-2xl font-bold text-white shadow-[0_16px_32px_rgba(15,122,53,0.18)] transition hover:scale-[1.01] hover:shadow-[0_18px_38px_rgba(15,122,53,0.22)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <i className="ph ph-credit-card text-2xl text-white" />
              </span>
              <span>Make Payment</span>
            </button>

            {error && screen === "list" && (
              <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
                {error}
              </div>
            )}

            {isReviewOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Selected Invoices
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Review the invoices you want to pay.
                  </p>

                  <div className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {selectedInvoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between gap-3 text-sm text-slate-700"
                      >
                        <span>{invoice.invoice_no}</span>
                        <span className="font-semibold text-slate-900">
                          {moneyFormatter.format(Number(invoice.amount || 0))}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
                    <span className="text-base font-semibold text-slate-700">
                      Total
                    </span>
                    <span className="text-xl font-bold text-slate-900">
                      {moneyFormatter.format(totalSelectedAmount)}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setIsReviewOpen(false)}
                      className="h-12 rounded-full border border-slate-200 bg-white px-5 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmReview}
                      className="h-12 rounded-full bg-[#0b6b2b] px-5 font-semibold text-white transition hover:bg-[#085426]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10">
              <h3 className="mb-4 text-3xl font-bold text-slate-900">
                Payment History
              </h3>

              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-100 text-base font-semibold text-slate-700">
                      <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Memo No</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paidInvoices.length ? (
                        paidInvoices.map((invoice, index) => (
                          <tr
                            key={invoice.id || `${invoice.invoice_no}-${index}`}
                            className="border-t border-slate-200"
                          >
                            <td className="px-4 py-4">{index + 1}</td>
                            <td className="px-4 py-4 font-medium text-slate-800">
                              {invoice.invoice_no || invoice.memo_no || "-"}
                            </td>
                            <td className="px-4 py-4">
                              {formatDate(invoice.date)}
                            </td>
                            <td className="px-4 py-4 font-semibold text-slate-800">
                              {moneyFormatter.format(
                                Number(invoice.amount || 0),
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                                Paid
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-10 text-center text-slate-500"
                          >
                            No payment history available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Accounts;
