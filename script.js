const Foods = [
  {
    name: "Burger",
    price: 200,
    image: "https://freepngimg.com/thumb/burger/6-2-burger-png-image-thumb.png",
  },
  {
    name: "Pizza",
    price: 250,
    image:
      "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
  },
  {
    name: "Salad",
    price: 150,
    image:
      "https://img.freepik.com/free-photo/salmon-avocado-salad-isolated-white-background_123827-20214.jpg?w=1060&t=st=1700116207~exp=1700116807~hmac=34f0d7c7ee68a6e84193c4fc2e7eaa9055f2e95ba29a5d6985863cd14406432e",
  },
  {
    name: "Biryani",
    price: 200,
    image:
      "https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png",
  },
  {
    name: "Chicken",
    price: 300,
    image:
      "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png",
  },
  {
    name: "Paneer",
    price: 120,
    image:
      "https://b.zmtcdn.com/data/dish_images/e44c42ff4b60b025225c8691ef9735b11635781903.png",
  },
  {
    name: "Rolls",
    price: 150,
    image:
      "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
  },
  // Add more food items as needed
];

const foodsWrapper = document.getElementById("foods_wrapper");
const orderBtn = document.getElementById("orderBtn");

const displayFood = (data) => {
    const fragment = new DocumentFragment();

    data.forEach((food,index) => {
    let card = document.createElement("div");
    card.classList.add("card", "w-48" ,"h-64", "flex", "flex-col","justify-between","items-center", "bg-base-100", "shadow-xl");

    card.innerHTML = ` <figure class="px-10 pt-4 h-1/2">
                        <img class="h-5/6" src=${food.image} alt=${food.name} class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center h-1/2 pt-1 pb-4">
                        <h2 class="card-title">${food.name}</h2>
                        <p>price ₹<span>${food.price}</span></p>
                        <div class="card-actions">
                            <button id=${index} class="selectBtn btn btn-neutral btn-sm">Select</button>
                        </div>
                    </div>`;
        fragment.appendChild(card);
    });
    foodsWrapper.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", () => {
  displayFood(Foods);
});

let selectedFoods = [];

foodsWrapper.addEventListener("click", selectFoods);

function selectFoods(event) {
  
  if (event.target.classList.contains("selectBtn")) {
    const id = event.target.id;

    // Check if the food item is already selected
    const isSelected = selectedFoods.some(
      (food) => food.name === Foods[id].name
    );
      console.log(selectedFoods);

    if (isSelected) {
      // If selected, remove it from the selectedFoods array
      selectedFoods = selectedFoods.filter(
        (food) => food.name !== Foods[id].name
      );

      // Update the button text to "Select"
      event.target.innerText = "Select";
    } else {
      // If not selected, add it to the selectedFoods array
      selectedFoods.push(Foods[id]);

      // Update the button text to "Remove"
      event.target.innerText = "Remove";
    }

    // Use closest to find the parent card element
    const parentEl = event.target.closest(".card");

    // Toggle the background color
    parentEl.classList.toggle("border");
  }

  if (selectedFoods.length > 0) {
    orderBtn.classList.remove("hidden");
  } else {
    orderBtn.classList.add("hidden");
  }
}

const loadingIndicator = document.getElementById("loadingIndicator");

orderBtn.addEventListener("click", orderFood);

function orderFood() {
  const modal = document.getElementById("my_modal_1");
  const orderIdEl = document.getElementById("orderId");
  const foodListModalEl = document.getElementById("product_list_wrapper");


  const prepareFood = () => {
    loadingIndicator.classList.remove("hidden")
    return new Promise((resolve) => {
      const preparationTime = Math.floor(Math.random() * 5000) + 1000; 
      setTimeout(() => {
        resolve();
      }, preparationTime);
    });
  };


  prepareFood().then(() => {
    loadingIndicator.classList.add("hidden");
    

    const orderId = Math.floor(Math.random() * 100000);
    orderIdEl.innerText = orderId;

    const fragment = new DocumentFragment();
    selectedFoods.forEach((item) => {
      let li = document.createElement("li");
      li.classList.add(
        "w-40",
        "flex",
        "justify-between",
        "items-center",
        "shadow-md"
      );
      li.innerHTML = `<img class="w-6/12" src=${item.image} alt="" srcset="">
                      <p id="foodName">${item.name}</p>`;

      fragment.appendChild(li);
    });

    foodListModalEl.innerHTML = "";
    foodListModalEl.appendChild(fragment);

    modal.showModal();
  });
}


const modal_close_btn = document.getElementById("modal_close_btn");

modal_close_btn.addEventListener("click", () => {
  location.reload();
});
