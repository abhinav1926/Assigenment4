let cart = [];
  
  function addItem(name, price) {
    // Prevent duplicates
    let exists = cart.find(item => item.name === name);
    if (!exists) {
      cart.push({name, price});
    }
    renderCart();
  }

  function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function renderCart() {
    let tbody = document.querySelector("#cartTable tbody");
    tbody.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      let row = `<tr>
        <td>${index+1}</td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td><button class="btn remove" onclick="removeItem(${index})">X</button></td>
      </tr>`;
      tbody.innerHTML += row;
    });
    document.getElementById("total").textContent = total;
  }



