const shop = document.querySelector(".shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div class="item" id=product-id-${id}>
          <img src=${img} alt="" />
        <div class="details">
          <h2 class="title">${name}</h2>
          <p>
              ${desc}
          </p>
          <div class="price--quantity">
            <h3>$${price}</h3>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <span id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</span>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>

`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.querySelector(".cartAmount");
  let totalItem = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartIcon.textContent = totalItem;
};

calculation();
