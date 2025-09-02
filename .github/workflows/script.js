     // Function to greet user
        function greetUser() {
            const name = document.getElementById("username").value;
            const greeting = document.getElementById("greeting");
            if (name.trim() !== "") {
                greeting.textContent = `Hello, ${name}`;
            } else {
                greeting.textContent = "Hello";
            }
        }

        // Select all boxes
        const boxes = document.querySelectorAll(".box");

        // Add click event to each box
        boxes.forEach(box => {
            box.addEventListener("click", function() {
                const color = this.getAttribute("data-color");
                this.style.backgroundColor = color;
                this.style.color = "#fff"; // Make text visible on colored box
            });
        });