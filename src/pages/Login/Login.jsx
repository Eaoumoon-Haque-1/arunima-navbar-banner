import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { sendMemberOtp, verifyMemberOtp } from "../../services/authApi";
import golfField from "../../assets/golf_field.JPG";
import logo from "../../assets/arunima_logo.png";

const mobileNumberPattern = /^01\d{9}$/;

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const clearFeedback = () => {
    setMessage("");
    setError("");
  };

  const handleMobileChange = (event) => {
    setMobileNo(event.target.value.replace(/\D/g, "").slice(0, 11));
    clearFeedback();
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value.replace(/\D/g, ""));
    clearFeedback();
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    clearFeedback();

    if (!mobileNumberPattern.test(mobileNo)) {
      setError("Enter a valid 11-digit mobile number starting with 01.");
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await sendMemberOtp(mobileNo);
      setOtpSent(true);
      setMessage(response.message || "OTP sent successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    clearFeedback();

    if (!otp.trim()) {
      setError("Enter the OTP sent to your mobile number.");
      return;
    }

    setIsVerifyingOtp(true);

    try {
      const response = await verifyMemberOtp(mobileNo, otp);

      if (!response.status || !response.token || !response.user) {
        throw new Error(response.message || "OTP verification failed.");
      }

      login(response.token, response.user);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleChangeNumber = () => {
    setOtpSent(false);
    setOtp("");
    clearFeedback();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f8f2] px-4 pb-16 pt-[126px] sm:px-6 lg:pb-20 lg:pt-[144px]">
      <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#064e3b_1px,transparent_1px)] [background-size:22px_22px]" />

      <section className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_30px_90px_rgba(6,78,59,0.18)] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden min-h-[610px] overflow-hidden lg:block">
          <img
            src={golfField}
            alt="Arunima Resort Golf Club course"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-emerald-950/50 to-emerald-950/95" />
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[32px] border-white/10" />

          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div className="flex h-16 w-28 items-center justify-center rounded-2xl border border-white/30 bg-white/90 px-3 shadow-lg backdrop-blur-xl">
              <img
                src={logo}
                alt="Arunima Resort Golf Club"
                className="max-h-12 w-auto object-contain"
              />
            </div>

            <div className="pt-10">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                <i className="ph ph-flag-banner text-amber-300" />
                Members Club
              </span>
              <h2 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                Your club experience starts here.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                Sign in securely to access the exclusive world of Arunima Resort Golf Club.
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-white/20 pt-6 text-sm text-white/70">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-lg text-emerald-950">
                  <i className="ph ph-shield-check" />
                </span>
                Secure, password-free member access
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[610px] items-center px-6 py-10 sm:px-12 lg:px-14">
          <div className="w-full">
        {/* <div className="mb-8 lg:hidden">
          <img src={logo} alt="Arunima Resort Golf Club" className="h-14 w-auto object-contain" />
        </div> */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-2xl text-emerald-800 shadow-sm ring-1 ring-emerald-200">
            <i className={otpSent ? "ph ph-device-mobile" : "ph ph-user-circle"} aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b08116]">Member portal</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {otpSent ? "Verify your OTP" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {otpSent
              ? `We sent a one-time password to ${mobileNo}.`
              : "Enter your registered mobile number to securely continue."}
          </p>
        </div>

        {error && (
          <div
            className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
            role="alert"
          >
            <i className="ph ph-warning-circle text-lg" /> {error}
          </div>
        )}

        {message && (
          <div
            className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm text-emerald-700"
            role="status"
          >
            <i className="ph ph-check-circle text-lg" /> {message}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label
                htmlFor="mobile-no"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Mobile number
              </label>
              <div className="flex h-14 items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100">
                <span className="flex h-full items-center border-r border-slate-200 px-4 text-emerald-700">
                  <i className="ph ph-phone text-xl" />
                </span>
                <input
                  id="mobile-no"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={mobileNo}
                  onChange={handleMobileChange}
                  placeholder="01XXXXXXXXX"
                  className="h-full min-w-0 flex-1 bg-transparent px-4 font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSendingOtp}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#087333] to-[#075d2b] px-5 font-semibold text-white shadow-[0_12px_30px_rgba(8,115,51,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(8,115,51,0.34)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isSendingOtp ? "Sending OTP..." : "Send secure OTP"}
              {!isSendingOtp && <i className="ph ph-arrow-right" />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label
                htmlFor="member-otp"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                One-time password
              </label>
              <input
                id="member-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                autoFocus
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-center text-xl font-bold tracking-[0.45em] text-slate-900 outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifyingOtp}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#087333] to-[#075d2b] px-5 font-semibold text-white shadow-[0_12px_30px_rgba(8,115,51,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isVerifyingOtp ? "Verifying OTP..." : "Verify and login"}
              {!isVerifyingOtp && <i className="ph ph-check-circle text-lg" />}
            </button>

            <div className="flex items-center justify-between gap-4 text-sm">
              <button
                type="button"
                onClick={handleChangeNumber}
                disabled={isVerifyingOtp}
                className="font-semibold text-slate-600 transition hover:text-emerald-700 disabled:opacity-50"
              >
                Change number
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || isVerifyingOtp}
                className="font-semibold text-emerald-700 transition hover:text-emerald-900 disabled:opacity-50"
              >
                {isSendingOtp ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <i className="ph ph-lock-key" />
          Your login is protected with one-time verification
        </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
