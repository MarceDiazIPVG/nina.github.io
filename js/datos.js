/* =========================================================
   NINA — datos editables
   Fotos y textos tomados del Instagram @nina.patisserie1
   Para cargar un precio, pon el número en pesos (ej: 18000).
   Si queda null, la web muestra "Consultar".
   ========================================================= */

const CONFIG = {
  nombre: "NINA",
  handle: "nina.patisserie1",
  instagram: "https://www.instagram.com/nina.patisserie1/",
  instagramDM: "https://ig.me/m/nina.patisserie1",
  /* Déjalo vacío si todavía no hay WhatsApp. Ejemplo: "56912345678" */
  whatsapp: "",
  ciudad: "Entregas en Chiguayante, Centro CCP y UdeC (cobro adicional)",
  horario: "Pedidos con 72 hrs de anticipación · Abono del 50%",
  notaPrecios:
    "En Instagram todavía no hay lista de precios. El valor se confirma al pedir por DM. Se pide un abono del 50%.",
  actualizado: "Noviembre 2026"
};

const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "tortas", nombre: "Tortas" },
  { id: "kuchen", nombre: "Kuchen y queques" },
  { id: "individuales", nombre: "Individuales" }
];

const PRODUCTOS = [
  {
    id: "torta-naranja",
    nombre: "Torta panqueque naranja",
    categoria: "tortas",
    descripcion: "Capas de panqueque, crema de naranja y hojas de chocolate. Pídela por DM.",
    precio: null,
    extra: "Por encargo · 72 hrs · abono 50%",
    imagen: "img/productos/ig-04.jpg",
    destacado: true
  },
  {
    id: "torta-personalizada",
    nombre: "Torta personalizada",
    categoria: "tortas",
    descripcion: "Decoración a medida para baby shower, cumpleaños u ocasión especial.",
    precio: null,
    extra: "Consultar diseño · abono 50%",
    imagen: "img/productos/ig-07.jpg",
    fotos: [
      "img/productos/ig-07.jpg",
      "img/productos/torta-flores.jpg",
      "img/productos/torta-flores-rojas.jpg",
      "img/productos/torta-rosas.jpg",
      "img/productos/torta-comunion.jpg"
    ],
    destacado: false
  },
  {
    id: "torta-flores",
    nombre: "Torta de flores",
    categoria: "tortas",
    descripcion: "Cobertura de crema y flores de mantequilla. Ideal para cumpleaños.",
    precio: null,
    extra: "Por encargo · 72 hrs · abono 50%",
    imagen: "img/productos/torta-flores.jpg",
    destacado: true
  },
  {
    id: "torta-flores-rojas",
    nombre: "Torta de flores rojas",
    categoria: "tortas",
    descripcion: "Cobertura de crema, flores rojas y blancas, y toques de pan de oro.",
    precio: null,
    extra: "Por encargo · 72 hrs · abono 50%",
    imagen: "img/productos/torta-flores-rojas.jpg",
    destacado: false
  },
  {
    id: "torta-rosas",
    nombre: "Torta de rosas",
    categoria: "tortas",
    descripcion: "Torta redonda con rosas de crema y perlas doradas.",
    precio: null,
    extra: "Por encargo · 72 hrs · abono 50%",
    imagen: "img/productos/torta-rosas.jpg",
    destacado: false
  },
  {
    id: "torta-comunion",
    nombre: "Torta de confirmación",
    categoria: "tortas",
    descripcion: "Torta rectangular con cruz y paloma. Para confirmación o primera comunión.",
    precio: null,
    extra: "Consultar diseño · abono 50%",
    imagen: "img/productos/torta-comunion.jpg",
    destacado: false
  },
  {
    id: "kuchen-frambuesa",
    nombre: "Kuchen de frambuesa",
    categoria: "kuchen",
    descripcion: "Masa horneada, relleno de frambuesa y borde de crema. Sin gelatina.",
    precio: null,
    extra: "Por encargo · 72 hrs",
    imagen: "img/productos/ig-09.jpg",
    destacado: false
  },
  {
    id: "kuchen-manzana",
    nombre: "Kuchen de manzana",
    categoria: "kuchen",
    descripcion: "Kuchen casero con manzana caramelizada. Para once o para compartir.",
    precio: null,
    extra: "Por encargo · 72 hrs",
    imagen: "img/productos/kuchen-manzana.jpg",
    destacado: true
  },
  {
    id: "cheesecake-frambuesa",
    nombre: "Cheesecake de frambuesa",
    categoria: "kuchen",
    descripcion: "Base de galleta, relleno cremoso y frambuesas. Pídelo por DM.",
    precio: null,
    extra: "Por encargo · 72 hrs",
    imagen: "img/productos/cheesecake-frambuesa.jpg",
    destacado: false
  },
  {
    id: "queque-naranja",
    nombre: "Queque naranja glaseado",
    categoria: "kuchen",
    descripcion: "Queque de naranja con glaseado. Para once o para compartir.",
    precio: null,
    extra: "Por encargo · 72 hrs",
    imagen: "img/productos/queque-naranja-2.jpg?v=2",
    fotos: ["img/productos/queque-naranja-2.jpg?v=2", "img/productos/queque-naranja.jpg?v=2"],
    video: "img/productos/queque-naranja.mp4",
    destacado: false
  },
  {
    id: "rollitos",
    nombre: "Rollitos de canela",
    categoria: "individuales",
    descripcion: "Recién horneados, con o sin glaseado de queso crema.",
    precio: null,
    extra: "Consultar cantidad",
    imagen: "img/productos/ig-02.jpg",
    destacado: true
  },
  {
    id: "bombones-oreo",
    nombre: "Bombones de Oreo",
    categoria: "individuales",
    descripcion: "Centro de chocolate y galleta, bañados en chocolate blanco.",
    precio: null,
    extra: "Consultar cantidad",
    imagen: "img/productos/ig-08.jpg",
    destacado: false
  },
  {
    id: "brazo-reina",
    nombre: "Brazo de reina plátano",
    categoria: "individuales",
    descripcion: "Brazo de reina de plátano, especial para la once.",
    precio: null,
    extra: "Por encargo · 72 hrs",
    imagen: "img/productos/brazo-reina.jpg?v=2",
    fotos: ["img/productos/brazo-reina.jpg?v=2", "img/productos/brazo-reina-2.jpg?v=2"],
    video: "img/productos/brazo-reina.mp4",
    destacado: false
  },
  {
    id: "cupcakes-snickers",
    nombre: "Cupcakes de Snickers",
    categoria: "individuales",
    descripcion: "Cupcakes con frosting y toque de manjar. Irresistibles.",
    precio: null,
    extra: "Consultar cantidad",
    imagen: "img/productos/cupcakes-snickers.jpg?v=2",
    fotos: ["img/productos/cupcakes-snickers.jpg?v=2", "img/productos/cupcakes-2.jpg?v=2"],
    video: "img/productos/cupcakes-snickers.mp4",
    destacado: false
  }
];
