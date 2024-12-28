
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategory(data.categories);
}


const displayAllPets = async () => {
    loadSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();

    setTimeout(() => {
        displayAllCards(data.pets);
        loadSpinner(false);
    }, 2000);
}



// loading spinner
const loadSpinner = (show) => {
    const showSpinner = document.getElementById('show-spinner');
    if (show) {
        showSpinner.classList.remove('hidden');
        document.getElementById('allPetCards').innerText = '';
    }
    else {
        showSpinner.classList.add('hidden');
    }
}



const displayCategoryPets = async (category) => {
    // remove active button if exist
    removeActiveClasses()
    // show active button
    activeButtonClasses(category);

    loadSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json()

    setTimeout(() => {
        displayAllCards(data.data);
        loadSpinner(false);
    }, 2000);
}


const displayAllCards = (datas) => {
    const displayAllPetContainer = document.getElementById('allPetCards');
    // displayAllPetContainer.innerText = '';


    if (datas.length == 0) {
        displayAllPetContainer.innerHTML = `
        <div class="flex flex-col items-center text-center col-span-3 bg-[#13131308] lg:p-24 p-5 rounded-2xl">
       <div class="flex justify-center">
       <img class="lg:w-auto w-20" src="./images/error.webp"/>
       </div>
       <h1 class="lg:mt-7 mt-4 lg:mb-4 mb-2 lg:text-3xl font-bold">No Information Available</h1>
       <p class="opacity-70 w-full lg:max-w-3xl">It is a long established fact that a reader will be distracted by the readable content of a page when looking at
       its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>

    `;
        return;
    }

    datas.forEach(data => {
        // console.log(data);
        const { pet_name, petId, breed, category, date_of_birth, price, image, gender, pet_details, vaccinated_status } = data;
        const div = document.createElement('div');
        div.classList = "card p-5 border-2 border-gray-300";
        div.innerHTML = `
        <figure class=" h-52">
         <img
          src="${image}"
      alt="pet"
      class="rounded-xl w-full h-full object-cover" />
      </figure>
     <div class="mt-6">
       <h3 class="text-xl font-bold mb-2">${pet_name}</h3>
       <p class="opacity-70"><i class="fa-solid fa-qrcode mr-2"></i>Breed: ${breed ? breed : 'Not available'}</p>
       <p class="opacity-70"><i class="fa-regular fa-calendar mr-2"></i>Birth: ${date_of_birth ? date_of_birth : "Not available"}</p>
       <p class="opacity-70"><i class="fa-solid fa-mercury mr-2"></i>Gender: ${gender ? gender : "Not available"}</p>
       <p class="opacity-70"><i class="fa-solid fa-dollar-sign mr-2"></i>Price: ${price ? price : "Not found"}$</p>
       <div class="flex justify-between mt-4">
         <button onclick= showSingleImg('${image}') class="btn btn-sm hover:text-white hover:bg-[#0E7A81]"><i class="fa-solid fa-thumbs-up"></i></button>
         <button onclick= adoptModal(this) class="btn btn-sm hover:bg-[#0E7A81] hover:text-white">Adopt</button>
         <button onclick= showPetDetails('${petId}')  class="btn btn-sm hover:bg-[#0E7A81] hover:text-white">Details</button>
       </div>
    </div>
     </div>
    `;

        displayAllPetContainer.append(div);

    });

}


const displayCategory = (categories) => {
    const btnCategoryContainer = document.getElementById('btn-categories')
    categories.forEach(category => {
        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
         
        <button id="btn-${category.category}" onclick = displayCategoryPets('${category.category}') class="btn category-btn bg-white flex items-center gap-4 rounded-full border px-14 pb-5 w-full">
        <p class="text-xl font-bold h-full">${category.category}</p>
        <img class="w-10" src="${category.category_icon}" alt=""/>
        </button>
        `;
        btnCategoryContainer.append(div)
    });
}


const showSingleImg = (img) => {
    const singleImgContainer = document.getElementById('sigle-img-container');
    const div = document.createElement('div');
    div.innerHTML = `
      <img class="rounded-lg h-full w-full" src="${img}" alt="pet"/>
    `;
    singleImgContainer.append(div);
}


const showPetDetails = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const { breed, category, date_of_birth, gender, image, pet_details, pet_name, price, vaccinated_status } = data.petData

    const showModalContainer = document.getElementById('modal-container');
    showModalContainer.innerHTML = `
     
     <dialog id="my_modal_1" class="modal">
    <div class="modal-box">

      <div class="flex justify-center">
       <img class="rounded-lg h-full w-full" src="${image}"/>
      </div>

      <div class="mt-5 flex items-center gap-6">
         <div>
          <h2 class="text-xl lg:text-2xl font-bold">${pet_name}</h2>
          <p class="mt-2 opacity-70"><i class="fa-solid fa-qrcode mr-2"></i>Breed: ${breed ? breed : 'Not available'}</p>
           <p class="mt-2 opacity-70"><i class="fa-solid fa-mercury mr-2"></i>Gender: ${gender ? gender : "Not available"}</p>
           <p class="mt-2 opacity-70"><i class="fa-solid fa-mercury mr-2"></i>vaccinated status: ${vaccinated_status ? vaccinated_status : "Not available"}</p>
         </div>
         <div>
          <p class="opacity-70"><i class="fa-regular fa-calendar mr-2"></i>Birth: ${date_of_birth ? date_of_birth : "Not available"}</p>
           <p class="mt-2 opacity-70"><i class="fa-solid fa-dollar-sign mr-2"></i>Price: ${price ? price : "Not found"}$</p>
         </div>
      </div>

      <h2 class="mt-5 mb-3 font-semibold">Details Information</h2>
      <p class=" opacity-70">${pet_details}</p>

    <div class="modal-action flex flex-col">
      <form method="dialog">
        <button class="btn w-full bg-[#0E7A811A] text-[#0E7A81]">Cancel</button>
      </form>
    </div>
  </div>
</dialog>

 `;

    my_modal_1.showModal();

}


// Remove active button styles
const removeActiveClasses = () => {
    const allButtons = document.querySelectorAll('.category-btn');
    // console.log(allButtons);
    for (btn of allButtons) {
        btn.classList.remove('bg-emerald-100', 'rounded-full', 'border-[#0E7A81]', 'border-2');
    }
}



// Add active classes
const activeButtonClasses = category => {
    const activeButton = document.getElementById(`btn-${category}`);
    activeButton.classList.add('bg-emerald-100', 'rounded-full', 'border-[#0E7A81]', 'border-2');
}



// Adopt Button Functionality
const adoptModal = event => {
    let count = 3;
    const countContainer = document.getElementById('countdown-container');
    countContainer.innerText = count;
    my_modal_2.showModal()
    const interval = setInterval(() => {
        count--;
        if (count !== 0) countContainer.innerText = count;
        if (count < 1) {
            clearInterval(interval)
            my_modal_2.close();
            event.textContent = "Adopted";
            event.disabled = true;
        }
    }, 1000);
}



loadCategories();
displayAllPets();