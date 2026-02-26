const GAS_API_URL = process.env.NEXT_PUBLIC_GAS_API_URL;

/**
 * Fetch all approved works from GAS Web App
 * Falls back to mock data if GAS URL is not configured
 */
export async function fetchWorks() {
    if (!GAS_API_URL) {
        // Fallback to mock data during development
        const { mockWorks } = await import("./mockData");
        return mockWorks;
    }

    try {
        const res = await fetch(GAS_API_URL, {
            next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch works from GAS:", error);
        // Fallback to mock data on error
        const { mockWorks } = await import("./mockData");
        return mockWorks;
    }
}

/**
 * Fetch works sorted by newest
 */
export async function fetchWorksByNewest() {
    const works = await fetchWorks();
    return [...works].sort(
        (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    );
}

/**
 * Fetch works sorted by popularity
 */
export async function fetchWorksByPopular() {
    const works = await fetchWorks();
    return [...works].sort((a, b) => b.viewCount - a.viewCount);
}

/**
 * Fetch featured works
 */
export async function fetchFeaturedWorks() {
    const popular = await fetchWorksByPopular();
    return popular.slice(0, 3);
}

/**
 * Fetch a single work by ID
 */
export async function fetchWorkById(id) {
    const works = await fetchWorks();
    return works.find((w) => w.id === String(id)) || null;
}

/**
 * Fetch works by category
 */
export async function fetchWorksByCategory(category) {
    const works = await fetchWorks();
    return works.filter((w) => w.category === category);
}

/**
 * Fetch works by category, sorted by popularity
 */
export async function fetchWorksByCategoryPopular(category) {
    const works = await fetchWorksByCategory(category);
    return [...works].sort((a, b) => b.viewCount - a.viewCount);
}
