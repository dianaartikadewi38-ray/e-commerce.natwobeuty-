// DATA DATA PRODUK (Berisi 8 Produk dari Gambar Unggahan Anda)
let products = [
    { id: 1, name: "Natwo Classic Matte Lipstick", category: "Lipstik", price: 89000, img: "images/IMG WEBP_9768..WEBP", stock: 15, desc: "Lipstik batangan klasik dengan sentuhan warna soft rose yang mewah, matte namun tetap lembab di bibir." },
    { id: 2, name: "Rose Petal Smooth Blusher", category: "Face", price: 125000, img: "images/IMG_9769.AVIF", stock: 12, desc: "Blush on berbentuk mawar yang memberikan rona alami nan segar pada pipi Anda sepanjang hari." },
    { id: 3, name: "Longlasting Matte Lip Cream", category: "Lipstik", price: 79000, img: "images/IMG_9770.WEBP", stock: 20, desc: "Lip cream cair dengan pigmentasi tinggi berwarna bold pinkish red, cepat kering, dan tahan lama." },
    { id: 4, name: "12-Color Aesthetic Eyeshadow Palette", category: "Eyeshadow", price: 185000, img: "images/IMG_9771.WEBP", stock: 8, desc: "Palet eyeshadow dengan 12 kombinasi warna bumi, shimmer, dan matte pinkish rose gold yang menawan." },
    { id: 5, name: "Sage Green Premium Brush Set", category: "Tools", price: 145000, img: "images/IMG_9772.JPG", stock: 10, desc: "Satu set kuas makeup premium isi 11 pcs berwarna sage green yang lembut dan tidak rontok di kulit." },
    { id: 6, name: "Ultra Fine Liquid Eyeliner Gold Edition", category: "Eyeshadow", price: 69000, img: "images/IMG_9773.AVIF", stock: 25, desc: "Eyeliner cair berujung presisi tinggi untuk menghasilkan garis mata hitam pekat yang simetris sempurna." },
    { id: 7, name: "Clinique Moisture Press Powder", category: "Face", price: 210000, img: "images/IMG_9774.JPG", stock: 5, desc: "Bedak padat eksklusif dengan formula mengontrol minyak wajah sekaligus melembabkan kulit." },
    { id: 8, name: "Rare Beauty True Foundation Pack", category: "Face", price: 240000, img: "images/IMG_9775.JPG", stock: 7, desc: "Foundation cair dengan berbagai shade kulit Asia, coverage medium to full dengan hasil flawless." }
];

// INITIAL LOAD SINKRONISASI LOCALSTORAGE (VERSI AMAN & SELALU UPDATE)
localStorage.removeItem('natwo_products'); 
localStorage.setItem('natwo_products', JSON.stringify(products));

let cart = JSON.parse(localStorage.getItem('natwo_cart')) || [];
let activeDiscount = 0;

// RENDER KATALOG PRODUK
function renderProducts(filteredProducts = products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#666;">Produk tidak ditemukan.</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/250x250.png?text=${product.name}'" onclick="openProductDetail(${product.id})">
                <h3>${product.name}</h3>
                <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <p style="font-size:12px; color:#999; margin-bottom:10px;">Stok: ${product.stock}</p>
                <button class="btn-primary" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 'Habis' : 'Tambah Ke Keranjang'}
                </button>
            </div>
        `;
    });
}

// FITUR FILTER & SEARCH
document.getElementById('search-input').addEventListener('input', applyFilters);
document.getElementById('category-filter').addEventListener('change', applyFilters);
document.getElementById('price-filter').addEventListener('change', applyFilters);

function applyFilters() {
    const searchVal = document.getElementById('search-input').value.toLowerCase();
    const categoryVal = document.getElementById('category-filter').value;
    const priceVal = document.getElementById('price-filter').value;

    let result = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal);
        const matchesCategory = categoryVal === 'all' || p.category === categoryVal;
        
        let matchesPrice = true;
        if (priceVal === 'low') matchesPrice = p.price < 100000;
        if (priceVal === 'high') matchesPrice = p.price >= 100000;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts(result);
}

function filterCategory(cat) {
    document.getElementById('category-filter').value = cat;
    applyFilters();
    document.getElementById('shop').scrollIntoView();
}

// FITUR KERANJANG BELANJA (CART)
const cartSidebar = document.getElementById('cart-sidebar');
document.getElementById('cart-toggle').addEventListener('click', () => cartSidebar.classList.add('open'));
document.getElementById('cart-close').addEventListener('click', () => cartSidebar.classList.remove('open'));

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product.stock <= 0) return alert("Maaf, stok habis!");

    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        if(cartItem.qty < product.stock) {
            cartItem.qty++;
        } else {
            alert("Tidak bisa melebihi batas stok tersedia.");
            return;
        }
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
    cartSidebar.classList.add('open');
}

function updateCart() {
    localStorage.setItem('natwo_cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.qty, 0);

    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.qty;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" onerror="this.src='https://via.placeholder.com/60'">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                    <input type="number" min="1" max="${item.stock}" value="${item.qty}" onchange="changeQty(${item.id}, this.value)">
                </div>
                <i class="fa-solid fa-trash-can cart-item-remove" onclick="removeFromCart(${item.id})"></i>
            </div>
        `;
    });

    let discountPrice = subtotal * activeDiscount;
    let finalTotal = subtotal - discountPrice;

    document.getElementById('discount-amount').innerText = `Rp ${discountPrice.toLocaleString('id-ID')}`;
    document.getElementById('cart-total-price').innerText = `Rp ${finalTotal.toLocaleString('id-ID')}`;
    document.getElementById('checkout-total-pay').innerText = `Rp ${finalTotal.toLocaleString('id-ID')}`;
}

function changeQty(id, val) {
    const item = cart.find(i => i.id === id);
    const prod = products.find(p => p.id === id);
    if (item && val > 0) {
        if (val <= prod.stock) {
            item.qty = parseInt(val);
        } else {
            alert(`Stok tidak mencukupi, stok maksimal saat ini adalah ${prod.stock}`);
            item.qty = prod.stock;
        }
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// KODE KUPON DISKON
function applyCoupon() {
    const code = document.getElementById('coupon-input').value.toUpperCase();
    if (code === 'NATWO10') {
        activeDiscount = 0.1; // Diskon 10%
        alert("Selamat! Diskon 10% berhasil dipasang.");
    } else {
        activeDiscount = 0;
        alert("Kode diskon tidak valid.");
    }
    updateCart();
}

// MODAL CONTROLLER
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

// DETAIL PRODUK
function openProductDetail(id) {
    const p = products.find(prod => prod.id === id);
    const body = document.getElementById('modal-product-body');
    body.innerHTML = `
        <img src="${p.img}" onerror="this.src='https://via.placeholder.com/300'">
        <div>
            <h2>${p.name}</h2>
            <p class="product-price" style="font-size:22px; margin: 10px 0;">Rp ${p.price.toLocaleString('id-ID')}</p>
            <p style="color:#666; font-size:14px; margin-bottom:20px;">${p.desc}</p>
            <p style="margin-bottom:20px; font-weight:500;">Stok Tersedia: ${p.stock}</p>
            <button class="btn-primary" onclick="addToCart(${p.id}); closeModal('product-modal');">Masuk Keranjang</button>
        </div>
    `;
    document.getElementById('product-modal').classList.add('open');
}

// CHECKOUT SIMULASI
function openCheckoutModal() {
    if (cart.length === 0) return alert("Keranjang belanja Anda masih kosong.");
    document.getElementById('checkout-modal').classList.add('open');
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Transaksi Anda Berhasil Diproses Simulasikan via Midtrans Sandbox!\nTerima kasih telah berbelanja di Natwo Beauty.");
    
    // Potong stok nyata produk setelah checkout berhasil
    cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) prod.stock -= item.qty;
    });

    localStorage.setItem('natwo_products', JSON.stringify(products));
    cart = [];
    localStorage.removeItem('natwo_cart');
    
    updateCart();
    renderProducts();
    closeModal('checkout-modal');
    closeModal('cart-sidebar');
});

// OWNER PANEL CONTROLLER (PASSWORD: 123natwo)
document.getElementById('owner-panel-btn').addEventListener('click', () => {
    document.getElementById('owner-modal').classList.add('open');
});

function authenticateOwner() {
    const pass = document.getElementById('owner-password').value;
    if (pass === '123natwo') {
        document.getElementById('owner-auth-box').style.display = 'none';
        document.getElementById('owner-dashboard').style.display = 'block';
        renderOwnerStock();
    } else {
        document.getElementById('auth-error').style.display = 'block';
    }
}

function renderOwnerStock() {
    const tbody = document.getElementById('stock-table-body');
    tbody.innerHTML = '';
    products.forEach((p, idx) => {
        tbody.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>
                    <input type="number" id="owner-stock-${p.id}" value="${p.stock}">
                </td>
                <td>
                    <button class="btn-secondary" onclick="updateStockByOwner(${p.id})">Simpan</button>
                </td>
            </tr>
        `;
    });
}

function updateStockByOwner(id) {
    const newStock = document.getElementById(`owner-stock-${id}`).value;
    if (newStock >= 0) {
        const prod = products.find(p => p.id === id);
        prod.stock = parseInt(newStock);
        localStorage.setItem('natwo_products', JSON.stringify(products));
        alert("Stok produk berhasil diperbarui oleh owner!");
        renderProducts();
        renderOwnerStock();
    } else {
        alert("Stok tidak boleh bernilai negatif!");
    }
}

// FITUR ULASAN PEMBELI (REVIEW)
let defaultReviews = [
    { name: "Siti Rahma", text: "Gila sih lipstick matte-nya beneran lembut dan warnanya girly abis! Pas buat kuliah sehari-hari." },
    { name: "Clara Amelia", text: "Brush set sage green-nya halus parah! Gak rontok pas dipakai blend foundation. Recommended brand!" }
];

function renderReviews() {
    const container = document.getElementById('reviews-container');
    container.innerHTML = '';
    defaultReviews.forEach(r => {
        container.innerHTML += `
            <div class="review-card">
                <h4>${r.name}</h4>
                <p style="font-size:14px; color:#555; margin-top:5px;">"${r.text}"</p>
            </div>
        `;
    });
}

document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('rev-name').value;
    const text = document.getElementById('rev-text').value;

    defaultReviews.unshift({ name, text });
    renderReviews();

    document.getElementById('rev-name').value = '';
    document.getElementById('rev-text').value = '';
    alert("Terima kasih atas ulasan manis Anda!");
});

// INITIAL RUN ON LOAD
window.onload = function() {
    renderProducts();
    updateCart();
    renderReviews();
};
