const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "https://argc.space/api"
).replace(/\/$/, "");

export const fallbackHeroSlides = [
  {
    id: "luxury-nature",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1600&q=80",
    label: "Luxury Meets Nature",
    title: "Curated Golf, Wellness & Luxury Escapes in Nature",
    description:
      "A sanctuary where championship golf, serene landscapes, and refined resort living come together in perfect harmony.",
    fit: "cover",
    position: "center",
  },
  {
    id: "nature-wellness",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    label: "Nature & Wellness",
    title: "Play, Relax & Reconnect with Nature",
    description:
      "Breathe in the calm, walk through green landscapes, and enjoy a resort experience shaped by peace, leisure, and natural beauty.",
    fit: "cover",
    position: "center",
  },
  {
    id: "countryside-escape",
    image:
      "https://arunimaresort.com/wp-content/uploads/2023/05/Arunima-Countryside.jpg",
    label: "Countryside Escape",
    title: "Experience Rural Life, Nature & Peaceful Resort Living",
    description:
      "Discover the calm beauty of Arunima’s countryside, where open landscapes, village charm, fresh air, and natural surroundings create a refreshing escape from busy city life.",
    fit: "cover",
    position: "center",
  },
];

const normalizeSliderItem = (item, index) => {
  if (!item || !item.image) {
    return null;
  }

  return {
    id: item.id ?? `slider-${index}`,
    image: item.image,
    label: item.sub_title || "Featured",
    title: item.title || "Featured Collection",
    description: item.paragraph || "",
    fit: "cover",
    position: "center",
  };
};

export const getSliderItems = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/slider/web`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return fallbackHeroSlides;
    }

    const payload = await response.json();
    const sliderItems = Array.isArray(payload?.data) ? payload.data : [];

    const normalizedItems = sliderItems
      .map((item, index) => normalizeSliderItem(item, index))
      .filter(Boolean)
      .sort((a, b) => Number(a.id || 0) - Number(b.id || 0));

    return normalizedItems.length ? normalizedItems : fallbackHeroSlides;
  } catch {
    return fallbackHeroSlides;
  }
};
