const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "https://argc.space/api"
).replace(/\/$/, "");

export const fallbackContacts = [
  {
    id: "fallback-contact",
    address_type: "Dhaka Office",
    address: "Dhaka-1220, Bangladesh",
    email: "arunimaresortgolfclub@gmail.com",
    mobile_no: "+88 01958-339133",
    mobile_no_2: "+88 01922233311",
    fb_link: "https://www.facebook.com/",
    x_link: "https://www.x.com/",
    youtube_link: "https://www.youtube.com/",
    insta_link: "https://www.instagram.com/",
  },
];

const normalizeValue = (value) =>
  typeof value === "string" && value.trim() ? value.trim() : null;

const normalizeContact = (contact, index) => {
  if (!contact || typeof contact !== "object") {
    return null;
  }

  const normalizedContact = {
    id: contact.id ?? `contact-${index}`,
    address_type: normalizeValue(contact.address_type) || "Office",
    address: normalizeValue(contact.address),
    email: normalizeValue(contact.email),
    mobile_no: normalizeValue(contact.mobile_no),
    mobile_no_2: normalizeValue(contact.mobile_no_2),
    fb_link: normalizeValue(contact.fb_link),
    x_link: normalizeValue(contact.x_link),
    youtube_link: normalizeValue(contact.youtube_link),
    insta_link: normalizeValue(contact.insta_link),
  };

  const hasContactDetails = [
    normalizedContact.address,
    normalizedContact.email,
    normalizedContact.mobile_no,
    normalizedContact.mobile_no_2,
  ].some(Boolean);

  return hasContactDetails ? normalizedContact : null;
};

export const getContactInfo = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/contact`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return fallbackContacts;
    }

    const payload = await response.json();
    const contacts = Array.isArray(payload?.data)
      ? payload.data.map(normalizeContact).filter(Boolean)
      : [];

    return contacts.length ? contacts : fallbackContacts;
  } catch {
    return fallbackContacts;
  }
};