// category button active
// global pets data 

let activePetsData = [];

function toggelCategory(activeBtn, inactiveBtn1, inactiveBtn2, inactiveBtn3) {
  activeBtn.classList.add("bg-[#e7f2f2]", "rounded-full");

  inactiveBtn1.classList.remove("bg-[#e7f2f2]", "rounded-full");
  inactiveBtn2.classList.remove("bg-[#e7f2f2]", "rounded-full");
  inactiveBtn3.classList.remove("bg-[#e7f2f2]", "rounded-full");
}
let dogCategory = document.getElementById("dog-category");
let catCategory = document.getElementById("cat-category");
let rabbitCategory = document.getElementById("rabbit-category");
let birdCategory = document.getElementById("bird-category");

// Dog category item fetch
function allCategory(categoryName) {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block"; // Spinner on
  setTimeout(async function () {
    try {
      const response = await fetch(`./api/peddy/category/${categoryName}.json`);
      const result = await response.json();
      activePetsData = result.data.pets;
      spinner.style.display = "none"; // Spinner off

      if (result.data.pets && result.data.pets.length > 0) {
        displayAllPets(result.data.pets);
        
      } else {
        showNotFoundMessage(); // Data na thakle
      }
    } catch (error) {
      spinner.style.display = "none";
      console.log("Error fetching Categories data:", error);
    }
  }, 2000);
}

dogCategory.addEventListener("click", function () {
  toggelCategory(dogCategory, catCategory, rabbitCategory, birdCategory);
  allCategory("dog");
});
catCategory.addEventListener("click", function () {
  toggelCategory(catCategory, dogCategory, rabbitCategory, birdCategory);
  allCategory("cat");
});
rabbitCategory.addEventListener("click", function () {
  toggelCategory(rabbitCategory, dogCategory, catCategory, birdCategory);
  allCategory("rabbit");
});
birdCategory.addEventListener("click", function () {
  toggelCategory(birdCategory, dogCategory, catCategory, rabbitCategory);
  allCategory("bird");
});

//Category data Not found message
function showNotFoundMessage() {
  const petContainer = document.getElementById("right-div"); // Tomar main pet container-er id
  petContainer.innerHTML = `
        <div class="col-span-3 text-center py-10 bg-gray-100 rounded-xl flex flex-col items-center">
            <img src = "/images/error.webp">
            <h2 class="text-2xl font-bold text-black">No Information Available</h2>
            <p class="text-gray-500 mt-2 px-10">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
    `;
}

// data loaded

async function loadAllPets(status) {
  const response = await fetch("./api/peddy/pets.json");
  const result = await response.json();
  activePetsData = result.data.pets ;
  if (status) {
    displayAllPets(result.data.pets);
  }
}

const displayAllPets = (pets) => {
  const rightDiv = document.getElementById("right-div");
  const leftDive = document.getElementById("left-div");
  rightDiv.innerHTML = "";
  pets.forEach((pet) => {
    const { pet_name, breed, date_of_birth, gender, price, image, petId } = pet;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-base-100 rounded-xl shadow-xl px-5 py-4">
        <figure class="">
          <img src="${image}" alt="Phone" class="rounded-xl w-72 h-52" />
        </figure>
        <div class="card-body flex flex-col mb-2">
          <h2 class="card-title text-2xl font-bold mt-2">${pet_name}</h2>
          <span class="text-sm text-gray-500 ">Breed:${breed}</span> 
          <span class="text-sm text-gray-500 ">Birth:${date_of_birth}</span>
          <span class="text-sm text-gray-500 ">Gender:${gender}</span>
          <span class="text-sm text-gray-500 ">$ Price:${price}</span>
        </div>
    <hr>
      <div class="mt-2 flex justify-between "> 
        <button><img class="like-btn w-11 rounded-md border px-3 py-2 " src="./images/like.png"></button>

        <button class="adopt-btn border px-3 py-1 rounded-md disabled:bg-gray-300 disabled:text-gray-500 transition-colors text-[#0e7a81] font-bold hover:bg-[#0e7a81] hover:text-white hover:transition-colors ease-in-out duration-300">Adopt</button>

        <button onclick = "petDetails('${petId}')" class="details-btn border px-3  py-1 rounded-md text-[#0e7a81] font-bold hover:bg-[#0e7a81] hover:text-white hover:transition-colors ease-in-out duration-300">Details</button>
        </div>

      </div>
    `;
    
    rightDiv.appendChild(div);
    // like button functionalty added
    const likeButton = div.querySelector(".like-btn");
    likeButton.addEventListener("click", function () {
      const imgDiv = document.createElement("div");
      imgDiv.innerHTML = `
   <div> <img class="w-56 h-32 rounded-md" src = "${image}">  </div>
  `;
      leftDive.appendChild(imgDiv);
    });

    // adopted button functionality
    const adoptBtn = div.querySelector(".adopt-btn");
    adoptBtn.addEventListener("click", function () {
      adoptBtn.disabled = true;
      adoptBtn.textContent = "Adopted";

      const adoptModal = document.getElementById("adoptModal");
      adoptModal.classList.remove("hidden");

      // 1. Modal open koro
      const modal = document.getElementById("my_modal_1");
      modal.showModal();

      // 2. Countdown-er element-ke dhoro ebong start value 3 dao
      let count = 3;
      const countdownNum = document.getElementById("countdown-num");
      countdownNum.innerText = count;

      // 3. setInterval diye prot second-e count komao
      const timer = setInterval(function () {
        count--;

        if (count > 0) {
          countdownNum.innerText = count;
        } else {
          countdownNum.innerText = 0;
          clearInterval(timer); // Timer thamiye dao
          modal.close(); // 3 second por modal aponaponi bondho hobe
        }
      }, 1000);
    });

  });
};

// details button functionality
const petDetails = async (id) => {
  const response = await fetch(`./api/peddy/pet/${id}.json`);
  const result = await response.json();
  // console.log(result.pet.petId)
  const {
    pet_name,
    breed,
    gender,
    date_of_birth,
    price,
    image,
    vaccinated_status,
    pet_details,
  } = result.pet;
  const detailModal = document.getElementById("details-modal");
  detailModal.innerHTML = `
<dialog id="my_modal_2" class="modal flex flex-col">
     <div class="card bg-base-100 rounded-xl shadow-xl px-5 py-4 w-11/12 max-w-2xl">
        <figure class="">
          <img src="${image}" alt="Phone" class="rounded-xl border w-full h-72 object-cover" />
        </figure>

        <div class=" grid grid-cols-2 gap-2 mb-3 items-center ">

          <div class= "flex flex-col gap-2">
          <h2 class="card-title text-2xl font-bold mt-2"> ${pet_name}</h2>
          <span class="text-sm text-gray-500 ">Breed: ${breed}</span> 
          <span class="text-sm text-gray-500 ">Gender: ${gender}</span>
          <span class="text-sm text-gray-500 "> Vaccined Status: ${vaccinated_status}</span>
          </div>
          
          <div class= "flex flex-col gap-2 mt-2">
          <span class="text-sm text-gray-500 ">Birth: ${date_of_birth}</span>
         <span class="text-sm text-gray-500 ">$ Price: ${price}$</span>
         </div>
          
        </div>
    <hr>
    <h2 class="card-title font-bold mt-2">Details Information</h2>
    <p class= "text-gray-600"> ${pet_details}</p>
    <div class="modal-action">
          <form method="dialog" class= "w-full">
            <button class="btn w-full bg-[#E6F0F1] text-[#0e7a81] hover:bg-[#d0e4e6] border-none">Cancel</button>
          </form>
        </div>
      </div>
</dialog>

  `;
  // 1. Modal open koro
  const modal = document.getElementById("my_modal_2");
  modal.showModal();
};

window.addEventListener("load", function () {
  const spinner = document.getElementById("spinner");

  // Spinner-ke visible kora (jodi age theke hide thake)
  spinner.style.display = "block";

  // 2 second (2000 milliseconds) por spinner hide korar jonno
  setTimeout(function () {
    spinner.style.display = "none";
    loadAllPets(true);
  }, 2000); // 2000ms = 2s
});

// Sort by price button add decending order

const SortByPrice = document.getElementById("sortBy-btn");
SortByPrice.addEventListener("click",function(){
  const sortArray = [...activePetsData].sort((a,b) => b.price - a.price);
  displayAllPets(sortArray);
  console.log("Sort by price button clicked");
});