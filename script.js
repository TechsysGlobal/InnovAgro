const productTemplate = (product, options = {}) => `
  <article class="product-card">
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <span class="product-badge ${product.badge.toLowerCase().includes('seller') ? '' : product.badge.toLowerCase().includes('arrival') ? 'secondary' : 'success'}">${product.badge}</span>
    </div>
    <div class="product-info">
      <p class="product-brand">${product.category}</p>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-specs">${product.unit}</p>
      <div class="product-rating">
        <span class="stars">★★★★★</span>
        <span>(${Math.floor(Math.random() * 500) + 50})</span>
      </div>
      <div class="product-footer">
        <span class="product-price">${product.price}</span>
        <button class="product-add-btn" data-product-id="${product.id}">Add</button>
      </div>
    </div>
  </article>
`;

const showLoading = (container) => {
  if (container) {
    container.innerHTML = '<p style="padding: 40px; text-align: center; color: var(--muted);">Loading products...</p>';
  }
};

const showError = (container) => {
  if (container) {
    container.innerHTML =
      '<p style="padding: 40px; text-align: center; color: var(--danger);">Product data could not be loaded. Please open this website through a local server.</p>';
  }
};

async function loadProducts() {
  const response = await fetch("products.json");

  if (!response.ok) {
    throw new Error("Unable to load products.json");
  }

  return response.json();
}

function renderFeaturedProducts(products) {
  const container = document.querySelector("[data-featured-products]");

  if (!container) {
    return;
  }

  const featured = products.filter((product) => product.featured).slice(0, 6);
  container.innerHTML = featured.map((product) => productTemplate(product)).join("");
}

function renderProductList(products) {
  const grid = document.querySelector("[data-products]");

  if (!grid) {
    return;
  }

  let selectedBrand = "all";
  const brands = ["all", ...new Set(products.map((product) => product.category))];

  const paintProducts = () => {
    const visibleProducts =
      selectedBrand === "all"
        ? products
        : products.filter((product) => product.category === selectedBrand);

    grid.innerHTML = visibleProducts
      .map((product) => productTemplate(product))
      .join("");

    attachProductListeners();
    revealOnScroll();
  };

  // Brand pill filters
  const brandPills = document.querySelectorAll(".brand-pill");
  if (brandPills.length > 0) {
    brandPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        brandPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        selectedBrand = pill.dataset.brand;
        paintProducts();
      });
    });
  }

  // Clear filters
  const clearBtn = document.querySelector(".clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document.querySelectorAll("input[type='checkbox']").forEach((cb) => (cb.checked = false));
      document.querySelectorAll("input[type='number']").forEach((input) => (input.value = ""));
      brandPills.forEach((p) => p.classList.remove("active"));
      brandPills[0].classList.add("active");
      selectedBrand = "all";
      paintProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.querySelector(".sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const sorted = [...visibleProducts];
      if (e.target.value.includes("Low to High")) {
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (e.target.value.includes("High to Low")) {
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      } else if (e.target.value.includes("Newest")) {
        sorted.reverse();
      }
      grid.innerHTML = sorted.map((product) => productTemplate(product)).join("");
      attachProductListeners();
    });
  }

  // Grid toggle buttons
  const gridToggles = document.querySelectorAll(".grid-toggle-btn");
  if (gridToggles.length > 0) {
    gridToggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        gridToggles.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cols = btn.dataset.cols;
        grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${Math.floor(100 / parseInt(cols))}%, 1fr))`;
      });
    });
  }

  paintProducts();
}

function attachProductListeners() {
  const addBtns = document.querySelectorAll(".product-add-btn");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const originalText = btn.textContent;
      btn.textContent = "Added! ✓";
      btn.style.background = "var(--success)";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
      }, 1500);
    });
  });
}

function revealOnScroll() {
  const productCards = document.querySelectorAll(".product-card");

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slideUp 500ms ease both";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 50}ms`;
    observer.observe(card);
  });
}

async function init() {
  const productContainers = [
    document.querySelector("[data-featured-products]"),
    document.querySelector("[data-products]"),
  ];

  productContainers.forEach(showLoading);
  revealOnScroll();

  try {
    const products = await loadProducts();
    renderFeaturedProducts(products);
    renderProductList(products);
  } catch (error) {
    productContainers.forEach(showError);
    console.error(error);
  }
}

init();
