// category button active 
function toggelCategory (activeBtn , inactiveBtn1,inactiveBtn2 ,inactiveBtn3) {
  activeBtn.classList.add ("bg-[#e7f2f2]", "rounded-full");
  
  inactiveBtn1.classList.remove("bg-[#e7f2f2]", "rounded-full");
  inactiveBtn2.classList.remove("bg-[#e7f2f2]", "rounded-full");
  inactiveBtn3.classList.remove("bg-[#e7f2f2]", "rounded-full");
}
const dogCategory = document.getElementById("dog-category");
const catCategory = document.getElementById("cat-category");
const rabbitCategory = document.getElementById("rabbit-category");
const birdCategory = document.getElementById("bird-category");

dogCategory.addEventListener("click",function(){
  toggelCategory(dogCategory,catCategory,rabbitCategory,birdCategory);
})
catCategory.addEventListener("click",function(){
  toggelCategory(catCategory,dogCategory,rabbitCategory,birdCategory);
})
rabbitCategory.addEventListener("click",function(){
  toggelCategory(rabbitCategory,dogCategory,catCategory,birdCategory);
})
birdCategory.addEventListener("click",function(){
  toggelCategory(birdCategory,dogCategory,catCategory,rabbitCategory);
})

// data loade  

async function loadAllPets(status) {

  const response = await fetch("./api/peddy/pets.json");
  const result = await response.json();
  console.log(result.data.pets)
  if(status){
    displayAllPets(result.data.pets);
  }
 
}

const displayAllPets = (pets) => {
  const rightDiv = document.getElementById('right-div');
  const leftDive = document.getElementById('left-div');

  pets.forEach(pet => {
    const {pet_name,breed,date_of_birth,gender,price,image} = pet;
     const div = document.createElement('div');
    div.innerHTML = `
      <div class="card bg-base-100 rounded-xl shadow-xl px-5 py-4">
        <figure class="">
          <img src="${image}" alt="Phone" class="rounded-xl w-72 h-52" />
        </figure>
        <div class="card-body flex flex-col mb-2">
          <h2 class="card-title font-bold mt-2">${pet_name}</h2>
          <span class="text-sm text-gray-400 ">Breed:${breed}</span> 
          <span class="text-sm text-gray-400 ">Birth:${date_of_birth}</span>
          <span class="text-sm text-gray-400 ">Gender:${gender}</span>
          <span class="text-sm text-gray-400 ">$ Price:${price}</span>
        </div>
    <hr>
      <div class="mt-2 flex justify-between "> 
        <button><img class="like-btn w-11 rounded-md border px-3 py-2 " src= "/images/like.png"></button>

        <button id="addopt-btn"  class="border px-3 py-1 rounded-md text-[#0e7a81] font-bold hover:bg-[#0e7a81] hover:text-white hover:transition-colors ease-in-out duration-300">Addopt</button>
        <button id="details-btn" class="border px-3  py-1 rounded-md text-[#0e7a81] font-bold hover:bg-[#0e7a81] hover:text-white hover:transition-colors ease-in-out duration-300">Details</button>
        </div>

      </div>
    `;

    // like button functionalty added 
const likeButton = div.querySelector('.like-btn');
likeButton.addEventListener('click',function(){
  const imgDiv = document.createElement('div')
  imgDiv.innerHTML= `
   <div> <img class="w-56 h-32 rounded-md" src = "${image}">  </div>
  `
leftDive.prepend(imgDiv);
})

    rightDiv.appendChild(div);
})}


window.addEventListener('load', function() {
    const spinner = document.getElementById('spinner');
    
    // Spinner-ke visible kora (jodi age theke hide thake)
    spinner.style.display = 'block';

    // 2 second (2000 milliseconds) por spinner hide korar jonno
    setTimeout(function() {
        spinner.style.display = 'none';
        loadAllPets(true);
    }, 2000); // 2000ms = 2s
});

// loadAllPets(true)

