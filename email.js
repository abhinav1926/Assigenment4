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

  message.innerHTML = `✅ Thank you For
Booking the Service We will get back to you soon! ${fullName}! Your booking of <b>${total}</b> has been placed successfully.`;
  message.style.color = "green";
  message.style.display = "block";
});
