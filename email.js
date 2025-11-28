function sendBookingEmail(cart) {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const total = document.getElementById("total-amount").textContent.replace("₹", "");
  const message = document.getElementById("booking-message");

  if (Object.keys(cart).length === 0) {
    message.textContent = "⚠️ Please add at least one item before booking.";
    message.style.color = "red";
    return;
  }

  const ordersArray = Object.keys(cart).map(name => {
    const count = cart[name];
    const service = SERVICES.find(s => s.name === name);
    return {
      name: name,
      units: count,
      price: (service.price * count).toFixed(2)
    };
  });

  // 🔹 EmailJS Send
  emailjs.send(
    "service_3z213q9",
    "template_sx0fq4s",
    {
      user_name: fullName,
      email: email,
      booking_amount: total,
      cost:{
        shipping: "0.00", tax: "0.00", total: total
      },
      orders: ordersArray 
    },
    "oSKlNatDw2tPn7qGP"
  )
  .then(() => {
    message.innerHTML = `
      ✅ Thank you, <b>${fullName}</b>!<br>
      Your booking has been placed successfully.<br>
      📧 A confirmation email has been sent to <b>${email}</b>.
    `;
    message.style.color = "green";
    message.style.display = "block";

    setTimeout(() => window.location.reload(), 5000);
  })
  .catch(error => {
    message.textContent = "❌ Failed to send confirmation email. Try again.";
    message.style.color = "red";
    console.error("Email Error:", error);
  });
}

window.sendBookingEmail = sendBookingEmail;
