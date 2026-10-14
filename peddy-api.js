// Peddy static API helper (ES module). No database or backend server required.
// Keep this file beside the api/ folder. Use with Live Server or GitHub Pages.
const API_BASE = new URL("./api/peddy/", import.meta.url);

async function request(path) {
  const response = await fetch(new URL(path, API_BASE));
  if (!response.ok) {
    throw new Error(`Peddy API request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getAllPets() {
  const result = await request("pets");
  return result.data?.pets ?? result.pets ?? [];
}

export async function getCategories() {
  const result = await request("categories");
  return result.data?.categories ?? result.categories ?? [];
}

export async function getPetsByCategory(categoryName) {
  const slug = String(categoryName).trim().toLowerCase();
  const allowed = new Set(["dog", "cat", "rabbit", "bird"]);
  if (!allowed.has(slug)) throw new Error(`Unknown pet category: ${categoryName}`);
  const result = await request(`category/${slug}`);
  return result.data?.pets ?? result.pets ?? [];
}

export async function getPetDetails(petId) {
  const result = await request(`pet/${encodeURIComponent(petId)}`);
  return result.data?.petData ?? result.petData ?? result.pet ?? null;
}
