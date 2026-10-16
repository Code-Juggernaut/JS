const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Phone", price: 800 },
    { id: 3, name: "Headphones", price: 200 }
];

let cart = [];

const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const cartList = document.getElementById('cartList');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const emptyCartBtn = document.getElementById('emptyCartBtn');
const themeToggle = document.getElementById('themeToggle');

function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';

    if (productsToRender.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Products not found';
        productsContainer.appendChild(p);
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const title = document.createElement('h3');
        title.textContent = product.name; 

        const price = document.createElement('p');
        price.textContent = `${product.price} $`;

        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.textContent = 'Add to cart';
        button.setAttribute('data-product-id', product.id); 

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(button);
        productsContainer.appendChild(card);
    });
}

function renderCart() {
    cartList.innerHTML = '';

    if (cart.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'cart is empty';
        cartList.appendChild(li);
        emptyCartBtn.style.display = 'none';
    } else {
        emptyCartBtn.style.display = 'block';
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';

        const textSpan = document.createElement('span');
        textSpan.textContent = `${item.name} (${item.price} $) x ${item.quantity}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.textContent = 'remove';
        removeBtn.setAttribute('data-product-id', item.id);

        li.appendChild(textSpan);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalCount;
    cartTotal.textContent = totalPrice;
}

function addToCart(productId) {
    const product = products.find(p => p.id === Number(productId));
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === Number(productId));
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    renderCart();
}

function emptyCart() {
    cart = [];
    renderCart();
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
});

productsContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-product-id]');
    if (button) {
        const productId = button.getAttribute('data-product-id');
        addToCart(productId);
    }
});

cartList.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-product-id]');
    if (button) {
        const productId = button.getAttribute('data-product-id');
        removeFromCart(productId);
    }
});


emptyCartBtn.addEventListener('click', emptyCart);

themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light mode';
    } else {
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Dark mode';
    }
});

renderProducts(products);
renderCart();