const isDev = process.env.NODE_ENV === 'development';
const BASE_API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined'
    ? window.location.hostname === 'localhost'
      ? 'http://localhost:5001/api'
      : '/api'
    : isDev
    ? 'http://localhost:5001/api'
    : 'http://localhost:3000/api')
).replace(/\/$/, '');
console.log('--- API_URL EVALUATED:', BASE_API_URL); export const API_URL = BASE_API_URL.endsWith("/api") ? BASE_API_URL : `${BASE_API_URL}/api`;
export const SERVER_URL = API_URL.replace(/\/api$/, "") || (typeof window !== 'undefined' ? window.location.origin : '');

export const heroApi = {
    getAll: async () => {
        try {
            const response = await fetch(`${API_URL}/hero/all`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching hero slides");
            return [];
        }
    }
};

export const supportedByApi = {
    get: async () => {
        try {
            const response = await fetch(`${API_URL}/supported-by`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching supported-by data");
            return null;
        }
    }
};

export const settingsApi = {
    get: async () => {
        try {
            const response = await fetch(`${API_URL}/settings`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching settings");
            return null;
        }
    }
};

export const glimpseApi = {
    getSettings: async () => {
        try {
            const response = await fetch(`${API_URL}/glimpse/settings`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching glimpse settings");
            return null;
        }
    },
    getYears: async () => {
        try {
            const response = await fetch(`${API_URL}/glimpse/years`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching glimpse years");
            return [];
        }
    },
    getCategories: async () => {
        try {
            const response = await fetch(`${API_URL}/glimpse/categories`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching glimpse categories");
            return [];
        }
    },
    getGallery: async () => {
        try {
            const response = await fetch(`${API_URL}/glimpse/gallery`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching glimpse gallery");
            return [];
        }
    },
    getCounters: async () => {
        try {
            const response = await fetch(`${API_URL}/glimpse/counters`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching glimpse counters");
            return [];
        }
    },
    getVideos: async () => {
        try {
            const response = await fetch(`${API_URL}/glimpse/videos`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching glimpse videos");
            return [];
        }
    }
};

export const globalVoicesApi = {
    getSettings: async () => {
        try {
            const response = await fetch(`${API_URL}/global-voices/settings`, { cache: 'no-store' });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching global voices settings");
            return null;
        }
    },
    getCategories: async () => {
        try {
            const response = await fetch(`${API_URL}/global-voices/categories`, { cache: 'no-store' });
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching global voices categories");
            return [];
        }
    },
    getCounters: async () => {
        try {
            const response = await fetch(`${API_URL}/global-voices/counters`, { cache: 'no-store' });
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching global voices counters");
            return [];
        }
    },
    getSpeakers: async () => {
        try {
            const response = await fetch(`${API_URL}/global-voices/speakers`, { cache: 'no-store' });
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching global voices speakers");
            return [];
        }
    },
    getCarouselSpeakers: async () => {
        try {
            const response = await fetch(`${API_URL}/global-voices/carousel-speakers`, { cache: 'no-store' });
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching carousel speakers");
            return [];
        }
    }
};

export const testimonialsApi = {
    getSettings: async () => {
        try {
            const response = await fetch(`${API_URL}/testimonials/settings`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching testimonials settings");
            return null;
        }
    },
    getTestimonials: async () => {
        try {
            const response = await fetch(`${API_URL}/testimonials/items`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching testimonials");
            return [];
        }
    },
    getCounters: async () => {
        try {
            const response = await fetch(`${API_URL}/testimonials/counters`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching testimonials counters");
            return [];
        }
    },
    getVideoTestimonials: async () => {
        try {
            const response = await fetch(`${API_URL}/testimonials/videos`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching video testimonials");
            return [];
        }
    }
};

export const previousSpeakersApi = {
    getHeading: async () => {
        try {
            const response = await fetch(`${API_URL}/previous-speakers/heading`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching previous speakers heading");
            return null;
        }
    },
    getItems: async () => {
        try {
            const response = await fetch(`${API_URL}/previous-speakers/items`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.warn("Error fetching previous speakers");
            return [];
        }
    }
};

export const socialMediaApi = {
    get: async () => {
        try {
            const response = await fetch(`${API_URL}/social-media`, { cache: 'no-store' });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching social media");
            return null;
        }
    }
};

export const faqApi = {
    get: async () => {
        try {
            const response = await fetch(`${API_URL}/faq`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching FAQ data");
            return null;
        }
    }
};

export const partnersPageApi = {
    get: async () => {
        try {
            const response = await fetch(`${API_URL}/partners-page`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.warn("Error fetching partners page data");
            return null;
        }
    }
};




