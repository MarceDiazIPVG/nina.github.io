(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const state = {
    categoria: "todos",
    busqueda: "",
    vista: "catalogo"
  };

  const tienePrecio = (n) => typeof n === "number" && Number.isFinite(n);

  const dinero = (n) => {
    if (!tienePrecio(n)) return "Consultar";
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }).format(n);
  };

  const pedidoUrl = (producto) => {
    const detalle = tienePrecio(producto.precio)
      ? `${producto.nombre} (${dinero(producto.precio)})`
      : producto.nombre;
    const texto = `Hola NINA, quiero pedir: ${detalle}.`;
    if (CONFIG.whatsapp) {
      return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
    }
    return CONFIG.instagramDM;
  };

  const filtrados = () => {
    const q = state.busqueda.trim().toLowerCase();
    return PRODUCTOS.filter((p) => {
      const catOk = state.categoria === "todos" || p.categoria === state.categoria;
      const qOk =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.extra.toLowerCase().includes(q);
      return catOk && qOk;
    });
  };

  const imgFallback =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
        <rect fill="#efe4d6" width="800" height="800"/>
        <text x="400" y="420" text-anchor="middle" font-family="Georgia" font-size="42" fill="#7A3B3F">Nina</text>
      </svg>`
    );

  function bindImagen(img) {
    img.addEventListener("error", () => {
      img.src = imgFallback;
    });
  }

  function renderMarca() {
    $$("[data-brand]").forEach((el) => (el.textContent = CONFIG.nombre));
    $$("[data-handle]").forEach((el) => (el.textContent = "@" + CONFIG.handle));
    $$("[data-ciudad]").forEach((el) => (el.textContent = CONFIG.ciudad));
    $$("[data-horario]").forEach((el) => (el.textContent = CONFIG.horario));
    $$("[data-nota]").forEach((el) => (el.textContent = CONFIG.notaPrecios));
    $$("[data-actualizado]").forEach((el) => (el.textContent = CONFIG.actualizado));
    $$("a[data-ig]").forEach((a) => {
      a.href = CONFIG.instagram;
    });
    $$("a[data-pedido]").forEach((a) => {
      a.href = CONFIG.whatsapp
        ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola NINA, quiero hacer un pedido")}`
        : CONFIG.instagramDM;
    });
    const pedidoLabel = CONFIG.whatsapp ? "Pedir por WhatsApp" : "Pedir por Instagram";
    $$("[data-pedido-label]").forEach((el) => (el.textContent = pedidoLabel));
    const conPrecio = PRODUCTOS.map((p) => p.precio).filter(tienePrecio);
    const badge = document.querySelector(".price-badge strong");
    const badgeHint = document.querySelector(".price-badge [data-badge-hint]");
    if (badge) {
      badge.textContent = conPrecio.length ? dinero(Math.min(...conPrecio)) : "50%";
    }
    if (badgeHint) {
      badgeHint.textContent = conPrecio.length ? "productos individuales" : "al confirmar el pedido";
    }
  }

  function renderFiltros() {
    const nav = $("#filtros");
    nav.innerHTML = CATEGORIAS.map(
      (c) => `
      <button type="button" class="chip${c.id === state.categoria ? " is-active" : ""}" data-cat="${c.id}">
        ${c.nombre}
      </button>`
    ).join("");
  }

  function renderDestacados() {
    const wrap = $("#destacados");
    const items = PRODUCTOS.filter((p) => p.destacado).slice(0, 4);
    wrap.innerHTML = items
      .map(
        (p) => `
      <article class="card card--featured" data-id="${p.id}">
        <div class="card__media">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
          <span class="pill">Favorito</span>
        </div>
        <div class="card__body">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <div class="card__meta">
            <strong class="${tienePrecio(p.precio) ? "" : "is-consultar"}">${dinero(p.precio)}</strong>
            <span>${p.extra}</span>
          </div>
        </div>
      </article>`
      )
      .join("");
    $$("img", wrap).forEach(bindImagen);
  }

  function renderCatalogo() {
    const grid = $("#catalogo");
    const vacio = $("#vacio");
    const items = filtrados();

    if (!items.length) {
      grid.innerHTML = "";
      vacio.hidden = false;
      return;
    }

    vacio.hidden = true;
    grid.innerHTML = items
      .map(
        (p) => `
      <article class="card" data-id="${p.id}">
        <div class="card__media">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
        </div>
        <div class="card__body">
          <small class="cat">${categoriaNombre(p.categoria)}</small>
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <div class="card__meta">
            <strong class="${tienePrecio(p.precio) ? "" : "is-consultar"}">${dinero(p.precio)}</strong>
            <span>${p.extra}</span>
          </div>
          <a class="btn btn--ghost" href="${pedidoUrl(p)}" target="_blank" rel="noopener">Pedir</a>
        </div>
      </article>`
      )
      .join("");
    $$("img", grid).forEach(bindImagen);
  }

  function renderLista() {
    const lista = $("#lista");
    const items = filtrados();
    const grupos = {};

    items.forEach((p) => {
      (grupos[p.categoria] ||= []).push(p);
    });

    const orden = CATEGORIAS.filter((c) => c.id !== "todos");
    lista.innerHTML = orden
      .filter((c) => grupos[c.id])
      .map((c) => {
        const rows = grupos[c.id]
          .map(
            (p) => `
          <li class="menu-row" data-id="${p.id}">
            <div>
              <h4>${p.nombre}</h4>
              <p>${p.descripcion}</p>
              <small>${p.extra}</small>
            </div>
            <span class="dots" aria-hidden="true"></span>
            <strong class="${tienePrecio(p.precio) ? "" : "is-consultar"}">${dinero(p.precio)}</strong>
          </li>`
          )
          .join("");
        return `<section class="menu-group"><h3>${c.nombre}</h3><ul>${rows}</ul></section>`;
      })
      .join("");
  }

  function categoriaNombre(id) {
    return CATEGORIAS.find((c) => c.id === id)?.nombre || id;
  }

  function abrirModal(id) {
    const p = PRODUCTOS.find((x) => x.id === id);
    if (!p) return;
    const modal = $("#modal");
    $("#modal-img").src = p.imagen;
    $("#modal-img").alt = p.nombre;
    $("#modal-cat").textContent = categoriaNombre(p.categoria);
    $("#modal-titulo").textContent = p.nombre;
    $("#modal-desc").textContent = p.descripcion;
    $("#modal-extra").textContent = p.extra;
    $("#modal-precio").textContent = dinero(p.precio);
    $("#modal-precio").classList.toggle("is-consultar", !tienePrecio(p.precio));
    const btn = $("#modal-pedir");
    btn.href = pedidoUrl(p);
    btn.textContent = CONFIG.whatsapp ? "Pedir por WhatsApp" : "Pedir por Instagram";
    modal.showModal();
  }

  function setVista(vista) {
    state.vista = vista;
    $$("[data-vista]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.vista === vista);
    });
    $("#vista-catalogo").hidden = vista !== "catalogo";
    $("#vista-lista").hidden = vista !== "lista";
  }

  function bind() {
    $("#filtros").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      state.categoria = btn.dataset.cat;
      renderFiltros();
      renderCatalogo();
      renderLista();
    });

    $("#buscar").addEventListener("input", (e) => {
      state.busqueda = e.target.value;
      renderCatalogo();
      renderLista();
    });

    $$("[data-vista]").forEach((btn) => {
      btn.addEventListener("click", () => setVista(btn.dataset.vista));
    });

    document.addEventListener("click", (e) => {
      const card = e.target.closest("[data-id]");
      if (!card) return;
      if (e.target.closest("a")) return;
      abrirModal(card.dataset.id);
    });

    $("#modal-cerrar").addEventListener("click", () => $("#modal").close());
    $("#modal").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) e.currentTarget.close();
    });

    const year = new Date().getFullYear();
    $("#anio").textContent = year;

    const toggle = $("#nav-toggle");
    const links = $("#nav-links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  renderMarca();
  renderFiltros();
  renderDestacados();
  renderCatalogo();
  renderLista();
  setVista("catalogo");
  bind();
})();
