# Peddy Static JSON API (Database ছাড়াই)

এটি Peddy Assignment 6-এর Programming Hero API বন্ধ/অপ্রাপ্য হলে data load করার জন্য তৈরি **sample static JSON API pack**। কোনো database বা backend server নেই। এটি আসল Programming Hero dataset-এর কপি নয়—README-তে থাকা field ও endpoint-এর কাজ ধরে demo data তৈরি করা হয়েছে।

## Endpoints

ফাইলগুলো GitHub Pages-এ deploy করলে নিচের path-গুলো পাওয়া যাবে (তোমার repository base path-এর পরে যোগ হবে):

| কাজ | Path | JSON file |
|---|---|---|
| সব pet | `api/peddy/pets` | `api/peddy/pets.json` |
| সব category | `api/peddy/categories` | `api/peddy/categories.json` |
| category অনুযায়ী | `api/peddy/category/dog` | `api/peddy/category/dog.json` |
| category অনুযায়ী | `api/peddy/category/cat` | `api/peddy/category/cat.json` |
| category অনুযায়ী | `api/peddy/category/rabbit` | `api/peddy/category/rabbit.json` |
| category অনুযায়ী | `api/peddy/category/bird` | `api/peddy/category/bird.json` |
| ID অনুযায়ী details | `api/peddy/pet/1` | `api/peddy/pet/1.json` |

Pet details IDs `1`–`16` included. Extensionless paths are included to resemble the old endpoint format; `.json` copies are provided too.

## Setup

1. Unzip this pack.
2. Copy the `api` folder and `peddy-api.js` into your assignment project's root folder (beside `index.html`).
3. Copy `.nojekyll` into your GitHub Pages repository root if one isn't already present.
4. Open the project with VS Code Live Server for local testing. `file://` দিয়ে HTML খুলে `fetch()` test কোরো না।
5. Push to GitHub and enable GitHub Pages as you normally do. Then your static JSON files will be served along with the project.

## JavaScript ব্যবহার

```js
import {
  getAllPets,
  getCategories,
  getPetsByCategory,
  getPetDetails,
} from "./peddy-api.js";

const pets = await getAllPets();
const categories = await getCategories();
const dogs = await getPetsByCategory("dog");
const petDetails = await getPetDetails(1);

console.log(pets, categories, dogs, petDetails);
```

Use the module with `<script type="module" src="./your-script.js"></script>` or import these functions from your existing JS module. If your project does not use ES modules, you can instead call the endpoint paths directly with `fetch()`.

## Direct fetch example

```js
const response = await fetch("./api/peddy/pets");
const result = await response.json();
const pets = result.data.pets;
```

## Response shape

- all pets / category pets: `result.data.pets`
- categories: `result.data.categories`
- pet details: `result.data.petData`

Some top-level aliases (`pets`, `categories`, `petData`, `pet`) are also included to make adaptation easier.

## Important

- Demo data includes 16 pets across Dog, Cat, Rabbit, Bird.
- Some fields are intentionally `null` so the assignment's missing-value handling can be tested.
- Like/adopt state is frontend behavior; it is not saved because there is no database.
- Static JSON files are read-only. You cannot create/update/delete records through these endpoints.
