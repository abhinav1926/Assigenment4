// List of services
const SERVICES = [
  { name: "Dry Cleaning", price: 200 },
  { name: "Wash & Fold", price: 100 },
  { name: "Ironing", price: 30 },
  { name: "Stain Removal", price: 500 },
  { name: "Leather & Suede Cleaning", price: 999 },
  { name: "Wedding Dress Cleaning", price: 2800 }
];

let cart = {};

// Update Cart
function updateCart(serviceName, action) {
  const count = cart[serviceName] || 0;

  if (action === "add") cart[serviceName] = count + 1;
  if (action === "remove" && count > 0) {
    cart[serviceName] = count - 1;
    if (cart[serviceName] === 0) delete cart[serviceName];
  }

  renderServices();
  renderCart();
}

// Render Services
function renderServices() {
  const container = document.getElementById("services-list");
  container.innerHTML = SERVICES.map(service => {
    const count = cart[service.name] || 0;
    const btnText = count === 0 ? "Add Item" : "Remove";
    const btnClass = count === 0 ? "action-btn" : "action-btn remove";

    return `
      <div class="service-item">
        <div>
          <p class="service-name">${service.name}</p>
          <p class="service-price">₹${service.price.toFixed(2)}</p>
        </div>
        <button class="${btnClass}" onclick="updateCart('${service.name}', '${count === 0 ? 'add' : 'remove'}')">${btnText}</button>
      </div>
    `;
  }).join("");
}

// Render Cart
function renderCart() {
  const cartBody = document.getElementById("cart-items-body");
  const totalAmount = document.getElementById("total-amount");
  let total = 0;
  let rows = "";

  const items = Object.keys(cart);
  if (items.length === 0) {
    rows = `<tr><td colspan="3" style="text-align:center; padding:10px; color:#9ca3af;">Cart is empty</td></tr>`;
  } else {
    items.forEach((name, i) => {
      const count = cart[name];
      const service = SERVICES.find(s => s.name === name);
      const itemTotal = count * service.price;
      total += itemTotal;

      rows += `
        <tr>
          <td>${i + 1}</td>
          <td>${name} ${count > 1 ? `<span style='color:#9ca3af; font-size:12px;'>(${count}x)</span>` : ""}</td>
          <td style="text-align:right;">₹${itemTotal.toFixed(2)}</td>
        </tr>`;
    });
  }

  cartBody.innerHTML = rows;
  totalAmount.textContent = `₹${total.toFixed(2)}`;
}

// Booking Form
document.getElementById("booking-form").addEventListener("submit", e => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const total = document.getElementById("total-amount").textContent;
  const message = document.getElementById("booking-message");

  if (Object.keys(cart).length === 0) {
    message.textContent = "⚠️ Please add at least one item before booking.";
    message.style.color = "red";
    message.style.display = "block";
    return;
  }

  message.innerHTML = `✅ Thank you, ${fullName}! Your booking of <b>${total}</b> has been placed successfully.`;
  message.style.color = "green";
  message.style.display = "block";
});

// Initialize
window.onload = () => {
  renderServices();
  renderCart();
};
