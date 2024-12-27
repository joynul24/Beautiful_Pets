const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategory(data.categories);
}


const displayAllPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayAllCards(data.pets);
}



const displayCategoryPets = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json()
    displayAllCards(data.data);
}


const displayAllCards = (datas) => {
    const displayAllPetContainer = document.getElementById('allPetCards');
    displayAllPetContainer.innerText = '';

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
         <button onclick= showSinglePic('${image}') class="btn btn-sm hover:text-white hover:bg-[#0E7A81]"><i class="fa-solid fa-thumbs-up"></i></button>
         <button onclick= showAdopt() class="btn btn-sm hover:bg-[#0E7A81] hover:text-white">Adopt</button>
         <button onclick= cardDetails('${petId}')  class="btn btn-sm hover:bg-[#0E7A81] hover:text-white">Details</button>
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
         
        <button onclick = displayCategoryPets('${category.category}') class="btn category-btn bg-white flex items-center gap-4 rounded-full border px-14 pb-5 w-full">
        <p class="text-xl font-bold h-full">${category.category}</p>
        <img class="w-10" src="${category.category_icon}" alt=""/>
        </button>
        `;
        btnCategoryContainer.append(div)
    });
}






loadCategories();
displayAllPets();