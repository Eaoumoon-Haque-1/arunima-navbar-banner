const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

export const invoiceMonthtlyUnpaidUrl = "invoice/monthly-unpaid";
export const invoiceMonthlyUnpaidUrl = invoiceMonthtlyUnpaidUrl;
export const invoicePayAmount = "invoice/monthly-pay";
export const userNotificationsUrl = "login-user-all-notification";

const post = async (endpoint, payload) => {
  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  let response;

  try {
    response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your internet connection and try again.",
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response. Please try again.",
    );
  }

  if (!response.ok || data.status === false) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
};

const patch = async (endpoint, payload, token) => {
  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  let response;

  try {
    response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your internet connection and try again.",
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response. Please try again.",
    );
  }

  if (response.status === 401) {
    const unauthorizedError = new Error(
      data.message || "Your session has expired. Please log in again.",
    );
    unauthorizedError.status = 401;
    throw unauthorizedError;
  }

  if (!response.ok || data.status === false) {
    throw new Error(data.message || "Unable to process the payment request.");
  }

  return data;
};

const get = async (endpoint, token) => {
  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  let response;

  try {
    response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your internet connection and try again.",
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response. Please try again.",
    );
  }

  if (response.status === 401) {
    const unauthorizedError = new Error(
      data.message || "Your session has expired. Please log in again.",
    );
    unauthorizedError.status = 401;
    throw unauthorizedError;
  }

  if (!response.ok || data.status === false) {
    throw new Error(data.message || "Unable to load the invoice details.");
  }

  return data;
};

export const sendMemberOtp = (mobileNo) =>
  post("send_otp_member", { mobile_no: mobileNo });

export const verifyMemberOtp = (mobileNo, otp) =>
  post("verify_otp_member", { mobile_no: mobileNo, otp });

export const getMonthlyUnpaidInvoices = async ({ token }) =>
  get(invoiceMonthtlyUnpaidUrl, token);

export const payMonthlyInvoices = async ({ token, invoiceIds }) => {
  if (!Array.isArray(invoiceIds) || invoiceIds.length === 0) {
    throw new Error("Please select at least one invoice to pay.");
  }

  return patch(invoicePayAmount, { invoice_ids: invoiceIds }, token);
};

export const getUserNotifications = async ({ token, page = 1 }) => {
  const query = new URLSearchParams({ page: String(page) });
  return get(`${userNotificationsUrl}?${query}`, token);
};

export const getMemberProfiles = async ({ token, page = 1, memberTypeId }) => {
  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const query = new URLSearchParams({ page: String(page) });

  if (memberTypeId) {
    query.set("member_type_id", String(memberTypeId));
  }

  let response;

  try {
    response = await fetch(`${apiBaseUrl}/member/profile?${query}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your internet connection and try again.",
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response. Please try again.",
    );
  }

  if (response.status === 401) {
    const unauthorizedError = new Error(
      data.message || "Your session has expired. Please log in again.",
    );
    unauthorizedError.status = 401;
    throw unauthorizedError;
  }

  if (!response.ok || data.status === false) {
    throw new Error(data.message || "Unable to load the members list.");
  }

  return data;
};
