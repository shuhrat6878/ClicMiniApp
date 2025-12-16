const productlist = document.getElementById("product-list");

function getcart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function savecart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addtocart(product) {
  const cart = getcart();
  const dicrement = cart.find(item => item.id === product.id);

  if (dicrement) {
    dicrement.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  savecart(cart);
  window.dispatchEvent(new Event("cart-updated"));
}

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <button class="add-btn">Add to cart</button>
      `;

      card.querySelector(".add-btn").addEventListener("click", () => {
        addtocart(product);
      });

      productlist.appendChild(card);
    });
  })
  .catch(error => {
    productlist.innerHTML = "<p>Error loading products</p>";
    console.error(error);
  });