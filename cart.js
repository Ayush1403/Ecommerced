// Load cart items and display them in the cart table
function loadCart() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartTableBody.innerHTML = ''; // Clear previous content

    cart.forEach((product, index) => {
        const row = document.createElement('tr');

        // Create product details
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="images/product1.jpg" alt="Product Image" class="img-thumbnail" style="width: 100px;">
                    <div class="ms-3">
                        <h5>${product.name}</h5>
                        <p class="text-muted">${product.description}</p>
                        <p>Size: ${product.size}</p>
                    </div>
                </div>
            </td>
            <td>${product.price}</td>
            <td><input type="number" value="${product.quantity}" class="form-control w-50" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${(parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
        `;

        cartTableBody.appendChild(row);
    });

    updateCartSummary();
}

// Update the quantity of a product in the cart
function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart to update totals
}

// Remove a product from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the product at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart
}

// Update cart summary (subtotal, tax, total)
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cart.forEach(product => {
        subtotal += parseFloat(product.price.replace('$', '')) * product.quantity;
    });

    const tax = subtotal * 0.08; // Example 8% tax
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
}

// Load cart when the page is ready
window.onload = loadCart;
