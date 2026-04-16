const CONFIG = {
  // 📱 Tu número de WhatsApp (con código de país, sin + ni espacios)
  whatsappNumber: "5491131450597",
  // 💳 Tu link de Mercado Pago (crealo en mercadopago.com.ar/tools/checkout)
  mercadoPagoLink: "https://link.mercadopago.com.ar/tutienda", // ← CAMBIÁ POR TU LINK

  // 🏪 Nombre de tu tienda
  storeName: "Tienda Online",

  // 💰 Envío gratis desde este monto
  freeShippingMin: 15000,

  // 📦 Costo de envío si no llega al mínimo
  shippingCost: 2500,

  // 💬 Mensaje de bienvenida WhatsApp
  welcomeMsg:
    "¡Hola! 👋 Me interesa comprar en Tienda OnLine. ¿Podrían ayudarme?",
};

// =============================================
// 🛒 ESTADO DE LA APP
// =============================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentDetailProduct = null;
let checkoutMode = ""; // 'mp' or 'wa'
// =============================================
// 📦 CATÁLOGO DE PRODUCTOS
// =============================================
const PRODUCTS = [
  {
    id: 1,
    name: "Auriculares Bluetooth Pro",
    price: 8999,
    oldPrice: 14999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=600",
    rating: 4.5,
    sales: 120,
    installments: "6 cuotas sin interés",
    description: "Auriculares inalámbricos de alta calidad",
    badge: "hot",
    badgeText: "OFERTA"
  },
  {
    id: 2,
    name: "Smartwatch Deportivo",
    price: 15999,
    oldPrice: 21999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=600",
    rating: 4.7,
    sales: 95,
    installments: "9 cuotas sin interés",
    description: "Reloj inteligente con monitoreo de salud",
    badge: "hot",
    badgeText: "TOP"
  },
  {
    id: 3,
    name: "Teclado Mecánico RGB",
    price: 12999,
    oldPrice: 17999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    rating: 4.6,
    sales: 80,
    installments: "6 cuotas sin interés",
    description: "Teclado gamer con luces RGB",
    badge: "",
    badgeText: ""
  },
  {
    id: 4,
    name: "Mouse Gamer Pro",
    price: 6999,
    oldPrice: 9999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    rating: 4.4,
    sales: 150,
    installments: "3 cuotas sin interés",
    description: "Mouse de alta precisión para gaming",
    badge: "hot",
    badgeText: "VENTA"
  },
  {
    id: 5,
    name: "Notebook Ultraliviana",
    price: 499999,
    oldPrice: 599999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    rating: 4.8,
    sales: 40,
    installments: "12 cuotas sin interés",
    description: "Notebook potente y liviana",
    badge: "hot",
    badgeText: "PRO"
  },
  {
    id: 6,
    name: "Cámara Profesional DSLR",
    price: 899999,
    oldPrice: 999999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?w=600",
    rating: 4.9,
    sales: 20,
    installments: "12 cuotas sin interés",
    description: "Cámara de alta calidad para fotografía",
    badge: "",
    badgeText: ""
  },
  {
    id: 7,
    name: "Zapatillas Urbanas",
    price: 24999,
    oldPrice: 34999,
    category: "moda",
    image: "https://images.unsplash.com/photo-1528701800489-20be3c6e5f0c?w=600",
    rating: 4.5,
    sales: 200,
    installments: "6 cuotas sin interés",
    description: "Zapatillas cómodas y modernas",
    badge: "hot",
    badgeText: "TREND"
  },
  {
    id: 8,
    name: "Campera de Invierno",
    price: 45999,
    oldPrice: 59999,
    category: "moda",
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600",
    rating: 4.6,
    sales: 60,
    installments: "9 cuotas sin interés",
    description: "Abrigo térmico para invierno",
    badge: "",
    badgeText: ""
  },
  {
    id: 9,
    name: "Mochila Antirrobo",
    price: 18999,
    oldPrice: 24999,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1514474959185-1472d4c4e0b1?w=600",
    rating: 4.7,
    sales: 110,
    installments: "6 cuotas sin interés",
    description: "Mochila segura con puerto USB",
    badge: "hot",
    badgeText: "SEGURIDAD"
  },
  {
    id: 10,
    name: "Lámpara LED Moderna",
    price: 9999,
    oldPrice: 14999,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600",
    rating: 4.3,
    sales: 75,
    installments: "3 cuotas sin interés",
    description: "Iluminación elegante para tu hogar",
    badge: "",
    badgeText: ""
  },
  {
    id: 11,
    name: "Silla Gamer",
    price: 79999,
    oldPrice: 99999,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600",
    rating: 4.8,
    sales: 55,
    installments: "12 cuotas sin interés",
    description: "Silla ergonómica gamer",
    badge: "hot",
    badgeText: "TOP"
  },
  {
    id: 12,
    name: "Tablet Android",
    price: 119999,
    oldPrice: 149999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600",
    rating: 4.4,
    sales: 65,
    installments: "9 cuotas sin interés",
    description: "Tablet ideal para entretenimiento",
    badge: "",
    badgeText: ""
  },
  {
    id: 13,
    name: "Parlante Bluetooth",
    price: 12999,
    oldPrice: 17999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=600",
    rating: 4.6,
    sales: 140,
    installments: "6 cuotas sin interés",
    description: "Sonido potente portátil",
    badge: "hot",
    badgeText: "BOOM"
  },
  {
    id: 14,
    name: "Poster AliAce",
    price: 5999,
    oldPrice: 8999,
    category: "moda",
    image: "img/aceAli.jpeg",
    rating: 4.2,
    sales: 90,
    installments: "3 cuotas sin interés",
    description: "Estilo urbano",
    badge: "",
    badgeText: ""
  },
  {
    id: 15,
    name: "Bicicleta Urbana",
    price: 199999,
    oldPrice: 249999,
    category: "deportes",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600",
    rating: 4.7,
    sales: 30,
    installments: "12 cuotas sin interés",
    description: "Ideal para ciudad",
    badge: "hot",
    badgeText: "ECO"
  },
  {
    id: 16,
    name: "Botella Térmica",
    price: 7999,
    oldPrice: 11999,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1526401485004-2fa806b7b2e5?w=600",
    rating: 4.5,
    sales: 180,
    installments: "3 cuotas sin interés",
    description: "Mantiene frío/calor por horas",
    badge: "",
    badgeText: ""
  },
  {
    id: 17,
    name: "Monitor 24'' Full HD",
    price: 89999,
    oldPrice: 119999,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
    rating: 4.8,
    sales: 70,
    installments: "12 cuotas sin interés",
    description: "Pantalla de alta definición",
    badge: "hot",
    badgeText: "PRO"
  },
  {
    id: 18,
    name: "Kit Fitness en Casa",
    price: 29999,
    oldPrice: 39999,
    category: "deportes",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    rating: 4.6,
    sales: 85,
    installments: "6 cuotas sin interés",
    description: "Entrená sin salir de casa",
    badge: "",
    badgeText: ""
  },
  {
    id: 19,
    name: "Sofá Minimalista",
    price: 299999,
    oldPrice: 399999,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=600",
    rating: 4.7,
    sales: 25,
    installments: "12 cuotas sin interés",
    description: "Diseño moderno y cómodo",
    badge: "hot",
    badgeText: "NEW"
  },
  {
    id: 20,
    name: "Cafetera Automática",
    price: 159999,
    oldPrice: 199999,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600",
    rating: 4.9,
    sales: 45,
    installments: "12 cuotas sin interés",
    description: "Café perfecto en segundos",
    badge: "hot",
    badgeText: "PREMIUM"
  }
];



// =============================================
// 🎨 RENDER PRODUCTS
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(PRODUCTS);
});

function renderProducts(products, containerId = "productsGrid") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = products.map(product => {
    const price = product.price?.toLocaleString("es-AR") || "0";
    const oldPrice = product.oldPrice?.toLocaleString("es-AR");

    // 🔥 calcular rating real desde reviews
    const reviews = typeof getReviewsByProduct === "function"
      ? getReviewsByProduct(product.id)
      : [];

    const avgRating = reviews.length
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : product.rating || "0";

    const totalReviews = reviews.length || product.sales || 0;

    return `
      <div class="product-card" onclick="openProductDetail(${product.id})">

        ${product.badge ? `<div class="badge">${product.badgeText || "🔥 Oferta"}</div>` : ""}

        <div class="product-img">
          <img 
            src="${product.image}" 
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/100x100?text=Producto'"
          >
        </div>

        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>

          <div class="product-prices">
            <span class="product-price">$${price}</span>
            ${oldPrice ? `<span class="old-price">$${oldPrice}</span>` : ""}
          </div>

          <div class="product-rating">
            ⭐ ${avgRating} | ${totalReviews} opiniones
          </div>

          <div class="product-installments">
            ${product.installments || ""}
          </div>

          <button 
            class="add-cart-btn"
            onclick="event.stopPropagation(); addToCart(${product.id})"
          >
            Agregar al carrito
          </button>
        </div>

      </div>
    `;
  }).join("");
}

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  const text = document.getElementById("toastMsg");

  text.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// =============================================
// 🔍 SEARCH & FILTER
// =============================================

let searchTimeout;

function searchProductsDebounced(query) {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    searchProducts(query);
  }, 300);
}

function searchProducts(query) {
  const grid = document.getElementById("productsGrid");
  const title = document.getElementById("productsTitle");

  const q = (query || "").trim().toLowerCase();

  // 🔥 si está vacío → mostrar todo
  if (!q) {
    title.textContent = "🔥 Productos Destacados";
    renderProducts(PRODUCTS);
    return;
  }

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.description || "").toLowerCase().includes(q)
  );

  title.textContent = `🔍 Resultados: "${query.trim()}"`;

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="fav-empty">
        <p>No se encontraron productos 😢</p>
      </div>
    `;
    return;
  }

  renderProducts(filtered);
}

function filterCategory(category, el) {
  // Update active category
  document
    .querySelectorAll(".category-item")
    .forEach((c) => c.classList.remove("active"));
  if (el) el.classList.add("active");

  let filtered;
  let title;

  switch (category) {
    case "todos":
      filtered = PRODUCTS;
      title = "🔥 Productos Destacados";
      break;
    case "ofertas":
      filtered = PRODUCTS.filter((p) => p.badge === "hot");
      title = "🏷️ Ofertas Especiales";
      break;
    default:
      filtered = PRODUCTS.filter((p) => p.category === category);
      title = `📦 ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }

  document.getElementById("productsTitle").textContent = title;
  renderProducts(filtered);
  showPage("home");

  // Scroll to products
  document
    .getElementById("productsTitle")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

// =============================================
// ❤️ FAVORITES
// =============================================
let FAVORITES = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(FAVORITES));
}

function toggleFavorite(productId, btn) {
  const index = favorites.indexOf(productId);
  if (index > -1) {
    favorites.splice(index, 1);
    btn.classList.remove("liked");
    btn.innerHTML = '<i class="far fa-heart"></i>';
    showToast("Eliminado de favoritos", "error");
  } else {
    favorites.push(productId);
    btn.classList.add("liked");
    btn.innerHTML = '<i class="fas fa-heart"></i>';
    showToast("❤️ Agregado a favoritos");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const favProducts = PRODUCTS.filter((p) => favorites.includes(p.id));
  const emptyEl = document.getElementById("favEmpty");

  if (favProducts.length === 0) {
    emptyEl.style.display = "block";
    document.getElementById("favoritesGrid").innerHTML = "";
  } else {
    emptyEl.style.display = "none";
    renderProducts(favProducts, "favoritesGrid");
  }
}

// =============================================
// 🛒 CART FUNCTIONS
// =============================================

function addToCart(productId, btn) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateCartUI();

  // Button animation
  if (btn) {
    btn.classList.add("added");
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Agregar';
    }, 1500);
  }

  showToast(`🛒 ${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
      return;
    }
  }
  saveCart();
  updateCartUI();
  renderCartItems();
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  updateCartUI();
  renderCartItems();
  showToast("🗑️ Carrito vaciado", "error");
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const count = getCartItemCount();
  const badge = document.getElementById("cartBadge");
  const navBadge = document.getElementById("navBadge");

  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";

  navBadge.textContent = count;
  navBadge.style.display = count > 0 ? "flex" : "none";
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");
  const btns = document.getElementById("checkoutBtns");
  const empty = document.getElementById("cartEmpty");
  const countEl = document.getElementById("cartCount");

  countEl.textContent = getCartItemCount();

  if (cart.length === 0) {
    container.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-bag"></i>
                        <h4>Tu carrito está vacío</h4>
                        <p>Agregá productos para comenzar</p>
                    </div>
                `;
    summary.style.display = "none";
    btns.style.display = "none";
    return;
  }

  let html = "";
  cart.forEach((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    if (!product) return;

    html += `
                    <div class="cart-item">
                     <div class="cart-item-img">
  <img 
    src="${product.image}" 
    alt="${product.name}"
    onerror="this.src='https://via.placeholder.com/100?text=Producto'"
  >
</div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${product.name}</div>
                            <div class="cart-item-price">$${(product.price * item.qty).toLocaleString("es-AR")}</div>
                            <div class="cart-qty">
                                <button class="qty-btn" onclick="updateQty(${product.id}, -1)">−</button>
                                <span class="qty-num">${item.qty}</span>
                                <button class="qty-btn" onclick="updateQty(${product.id}, 1)">+</button>
                            </div>
                        </div>
                        <button class="cart-item-delete" onclick="removeFromCart(${product.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
  });

  container.innerHTML = html;

  const subtotal = getCartTotal();
  const shipping = subtotal >= CONFIG.freeShippingMin ? 0 : CONFIG.shippingCost;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent =
    `$${subtotal.toLocaleString("es-AR")}`;
  document.getElementById("shipping").textContent =
    shipping === 0 ? "¡Gratis! 🎉" : `$${shipping.toLocaleString("es-AR")}`;
  document.getElementById("shipping").style.color =
    shipping === 0 ? "var(--success)" : "var(--dark)";
  document.getElementById("totalPrice").textContent =
    `$${total.toLocaleString("es-AR")}`;

  summary.style.display = "block";
  btns.style.display = "flex";
}

// =============================================
// 🛒 CART MODAL
// =============================================

function toggleCart() {
  const modal = document.getElementById("cartModal");
  const overlay = document.getElementById("cartOverlay");

  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    renderCartItems();
    modal.classList.add("active");
    overlay.classList.add("active");
  }
}

// =============================================
// 📱 PRODUCT DETAIL
// =============================================

function openProductDetail(productId) {

  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  currentDetailProduct = product;

  document.getElementById("detailImg").innerHTML = `
    <img 
      src="${product.image}" 
      alt="${product.name}"
      loading="lazy"
      onerror="this.src='https://via.placeholder.com/400?text=Producto'"
    >
  `;

  document.getElementById("detailCategory").textContent =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  document.getElementById("detailName").textContent = product.name;

  document.getElementById("detailPrice").textContent =
    `$${product.price.toLocaleString("es-AR")}`;

  document.getElementById("detailOldPrice").textContent = product.oldPrice
    ? `$${product.oldPrice.toLocaleString("es-AR")}`
    : "";

  document.getElementById("detailOldPrice").style.display = product.oldPrice
    ? "inline"
    : "none";

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  document.getElementById("detailDiscount").textContent = `-${discount}%`;
  document.getElementById("detailDiscount").style.display =
    discount > 0 ? "inline-block" : "none";

  document.getElementById("detailRating").textContent =
    `${product.rating} (${product.sales} ventas)`;

  document.getElementById("detailDesc").textContent = product.description;

  document.getElementById("detailInstallments").innerHTML =
    `<i class="fas fa-credit-card"></i> ${product.installments}`;

  renderReviews(productId);
  initReviewForm(productId);

  document.getElementById("productModal").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeProductDetail() {
  document.getElementById("productModal").classList.remove("active");
  document.body.style.overflow = "";
}

function addFromDetail() {
  if (!currentDetailProduct) return;
  addToCart(currentDetailProduct.id, document.getElementById("detailAddBtn"));
}

function buyNowFromDetail() {
  if (!currentDetailProduct) return;
  const existing = cart.find((item) => item.id === currentDetailProduct.id);
  if (!existing) {
    cart.push({ id: currentDetailProduct.id, qty: 1 });
    saveCart();
    updateCartUI();
  }
  closeProductDetail();
  setTimeout(() => toggleCart(), 300);
}

function shareProduct() {
  if (!currentDetailProduct) return;
  const text = `¡Mirá esta oferta! ${currentDetailProduct.name} a $${currentDetailProduct.price.toLocaleString("es-AR")} en ${CONFIG.storeName}`;

  if (navigator.share) {
    navigator.share({
      title: currentDetailProduct.name,
      text: text,
      url: window.location.href,
    });
  } else {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  }
}

// ==========================================
// ⭐ REVIEWS ENGINE PRO
// ==========================================


function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let REVIEWS = JSON.parse(localStorage.getItem("reviews")) || [];

function saveReviews() {
  localStorage.setItem("reviews", JSON.stringify(REVIEWS));
}

function addReview(review) {
  review.id = Date.now();
  review.likes = 0;
  REVIEWS.push(review);
  saveReviews();
}
function getReviewsByProduct(productId) {
  return REVIEWS.filter(r => r.productId === productId);
}

function likeReview(id) {
  const liked = JSON.parse(localStorage.getItem("likedReviews")) || [];

  if (liked.includes(id)) return;

  const review = REVIEWS.find(r => r.id === id);
  if (review) {
    review.likes++;
    liked.push(id);

    localStorage.setItem("likedReviews", JSON.stringify(liked));
    saveReviews();
  }
}

function renderReviews(productId) {
  const container = document.getElementById("reviewsContainer");
  const reviews = getReviewsByProduct(productId);

  if (!reviews.length) {
    container.innerHTML = "<p>Sin opiniones aún</p>";
    return;
  }

  function renderReviews(productId) {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  const reviews = getReviewsByProduct(productId)
    .sort((a, b) => b.id - a.id);

  if (!reviews.length) {
    container.innerHTML = `
      <h4>Opiniones</h4>
      <p>Sin opiniones aún</p>
    `;
    return;
  }
}

  // ⭐ promedio
  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  container.innerHTML = `
    <div class="review-summary">
      <h4>⭐ ${avg.toFixed(1)} / 5 (${reviews.length} opiniones)</h4>
    </div>

    <h4>Opiniones</h4>

    ${reviews.map(r => `
      <div class="review-card">
        <strong>${escapeHTML(r.user)}</strong>

        <div>
          ${Array.from({ length: 5 }, (_, i) =>
            i < r.rating ? "⭐" : "☆"
          ).join("")}
        </div>

        <p>${escapeHTML(r.comment)}</p>

        <small>${r.date}</small>

        <button onclick="event.stopPropagation(); likeReview(${r.id}); renderReviews(${productId})">
          👍 ${r.likes}
        </button>
      </div>
    `).join("")}
  `;
}

  
  function initReviewForm(productId) {
    const form = document.getElementById("reviewForm");

    // 🔥 elimina listeners anteriores
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const review = {
        productId,
        user: document.getElementById("user").value.trim(),
        rating: parseInt(document.getElementById("rating").value),
        comment: document.getElementById("comment").value.trim(),
        date: new Date().toISOString().split("T")[0]
      };

      // ✅ validación PRO
      if (!review.user || !review.comment || !review.rating) {
        alert("Completá todos los campos");
        return;
      }

      addReview(review);
      renderReviews(productId);

      newForm.reset();
    });
  }

  // =============================================
  // 💳 CHECKOUT
  // =============================================

  function payWithMercadoPago() {
    checkoutMode = "mp";
    openCheckout();
  }

  function orderByWhatsApp() {
    checkoutMode = "wa";
    openCheckout();
  }

  function openCheckout() {
    toggleCart();
    setTimeout(() => {
      document.getElementById("checkoutModal").classList.add("active");
      document.getElementById("checkoutOverlay").classList.add("active");

      document.getElementById("confirmPayBtn").style.display =
        checkoutMode === "mp" ? "flex" : "none";
      document.getElementById("confirmWABtn").style.display =
        checkoutMode === "wa" ? "flex" : "none";
    }, 400);
  }

  function closeCheckout() {
    document.getElementById("checkoutModal").classList.remove("active");
    document.getElementById("checkoutOverlay").classList.remove("active");
  }

  function confirmPay() {
    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();

    if (!name || !phone) {
      showToast("⚠️ Completá nombre y teléfono", "error");
      return;
    }

    // Build order summary for after payment contact
    const orderText = buildOrderText();

    // Send order details via WhatsApp first
    const waMsg = `🛒 *NUEVO PEDIDO - ${CONFIG.storeName}*\n\n${orderText}\n\n💳 _Pagará con Mercado Pago_`;
    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
    window.open(waUrl, "_blank");

    // Then redirect to MercadoPago
    setTimeout(() => {
      window.open(CONFIG.mercadoPagoLink, "_blank");
    }, 1000);

    closeCheckout();
    clearCart();
    showToast("✅ ¡Pedido enviado! Redirigiendo a Mercado Pago...");
  }

  function confirmWhatsApp() {
    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const notes = document.getElementById("custNotes").value.trim();

    if (!name || !phone) {
      showToast("⚠️ Completá nombre y teléfono", "error");
      return;
    }

    const orderText = buildOrderText();

    let msg = `🛒 *NUEVO PEDIDO - ${CONFIG.storeName}*\n\n`;
    msg += orderText;
    msg += `\n\n👤 *Cliente:* ${name}`;
    msg += `\n📱 *Teléfono:* ${phone}`;
    if (address) msg += `\n📍 *Dirección:* ${address}`;
    if (notes) msg += `\n📝 *Notas:* ${notes}`;
    msg += `\n\n💬 _Esperando confirmación de pago_`;

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    closeCheckout();
    clearCart();
    showToast("✅ ¡Pedido enviado por WhatsApp!");
  }

  function buildOrderText() {
    let text = "";
    const subtotal = getCartTotal();
    const shipping = subtotal >= CONFIG.freeShippingMin ? 0 : CONFIG.shippingCost;

    cart.forEach((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return;
      text += `• ${product.image} ${product.name} x${item.qty} — $${(product.price * item.qty).toLocaleString("es-AR")}\n`;
    });

    text += `\n💰 *Subtotal:* $${subtotal.toLocaleString("es-AR")}`;
    text += `\n🚚 *Envío:* ${shipping === 0 ? "GRATIS 🎉" : "$" + shipping.toLocaleString("es-AR")}`;
    text += `\n\n💵 *TOTAL: $${(subtotal + shipping).toLocaleString("es-AR")}*`;

    return text;
  }

  // =============================================
  // 💬 WHATSAPP
  // =============================================

  function openWhatsApp() {
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.welcomeMsg)}`;
    window.open(url, "_blank");
  }

  // =============================================
  // 🔔 TOAST NOTIFICATION
  // =============================================

  function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const msgEl = document.getElementById("toastMsg");

    toast.className = `toast ${type}`;
    msgEl.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // =============================================
  // 📄 PAGE NAVIGATION
  // =============================================

  function showPage(page, navEl) {
    // Hide all pages
    document
      .querySelectorAll(".page")
      .forEach((p) => p.classList.remove("active"));

    // Show target page
    document.getElementById(`page-${page}`).classList.add("active");

    // Update nav
    if (navEl) {
      document
        .querySelectorAll(".nav-item")
        .forEach((n) => n.classList.remove("active"));
      navEl.classList.add("active");
    }

    // Render favorites if needed
    if (page === "favorites") {
      renderFavorites();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =============================================
  // ⏰ FLASH SALE TIMER
  // =============================================

  function startFlashTimer() {
    let totalSeconds = 5 * 3600 + 32 * 60 + 18;

    setInterval(() => {
      totalSeconds--;
      if (totalSeconds <= 0) totalSeconds = 24 * 3600;

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      document.getElementById("hours").textContent = String(h).padStart(2, "0");
      document.getElementById("minutes").textContent = String(m).padStart(2, "0");
      document.getElementById("seconds").textContent = String(s).padStart(2, "0");
    }, 1000);
  }

  // =============================================
  // 🎠 PROMO SLIDER
  // =============================================

  let currentSlide = 0;
  function startPromoSlider() {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % 3;
      goToSlide(currentSlide);
    }, 4000);
  }

  function goToSlide(index) {
    currentSlide = index;
    document.querySelectorAll(".promo-slide").forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });
    document.querySelectorAll(".promo-dot").forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  // =============================================
  // 🚀 INIT APP
  // =============================================

  function initApp() {
    renderProducts(PRODUCTS);
    updateCartUI();
    startFlashTimer();
    startPromoSlider();
    renderFavorites();

    // Touch gesture for cart modal
    let touchStartY = 0;
    const cartModal = document.getElementById("cartModal");
    cartModal.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
    });
    cartModal.addEventListener("touchmove", (e) => {
      const diff = e.touches[0].clientY - touchStartY;
      if (diff > 100) {
        toggleCart();
      }
    });
  }

  // Start the app
  initApp();
