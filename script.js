// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      targetSection.setAttribute('tabindex', '-1');
      targetSection.focus({ preventScroll: true });
    }
  });
});

// Modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const consultaBtn = document.getElementById('consultaBtn');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');

function openModal(title = 'Consulta', desc = '') {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  consultaBtn.focus();
}
consultaBtn.addEventListener('click', () => 
  openModal('Consulta general', 'Completa el formulario para que podamos contactarte.')
);
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

// Cards
document.querySelectorAll('.card').forEach(card => {
  const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Servicio';
  const desc = card.dataset.desc || card.querySelector('p')?.textContent || '';
  card.addEventListener('click', () => openModal(title, desc));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(title, desc);
    }
  });
});

// Form -> WhatsApp
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const whatsapp = contactForm.whatsapp.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !whatsapp || !message) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Tu número de WhatsApp
  const phoneNumber = "573213420848";

  const text = `Hola, soy ${name}. Mi WhatsApp es ${573213420848}. Quiero hacer la siguiente consulta: ${message}`;
  const url = `https://wa.me/${573213420848}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");

  contactForm.reset();
  closeModal();
});

// Testimonios aleatorios (México)
const testimonios = [
  {
    nombre: "María López - CDMX",
    texto: "El Maestro Juan me ayudó a recuperar a mi pareja cuando ya había perdido la esperanza. Estoy muy agradecida."
  },
  {
    nombre: "José Hernández - Guadalajara",
    texto: "Su trabajo fue sorprendente, en poco tiempo mi relación mejoró y ahora somos más unidos que nunca."
  },
  {
    nombre: "Ana Martínez - Monterrey",
    texto: "Tenía muchas dudas, pero los resultados fueron reales. Hoy mi matrimonio está más fuerte."
  },
  {
    nombre: "Carlos Ramírez - Puebla",
    texto: "Me alejaron a una persona que estaba dañando mi relación. Estoy en paz gracias al Maestro."
  },
  {
    nombre: "Fernanda Gutiérrez - Cancún",
    texto: "Lo recomiendo ampliamente. Con su guía, encontré estabilidad en mi vida amorosa."
  }
];

let indice = 0;
const texto = document.getElementById("testimonio-texto");
const nombre = document.getElementById("testimonio-nombre");
const box = document.getElementById("testimonio-box");

function mostrarTestimonio() {
  const t = testimonios[indice];
  box.style.opacity = 0; // efecto de desvanecer

  setTimeout(() => {
    texto.textContent = `"${t.texto}"`;
    nombre.textContent = `- ${t.nombre}`;
    box.style.opacity = 1;
  }, 500);

  indice = (indice + 1) % testimonios.length;
}

// Mostrar primero y luego cada 6 segundos
document.addEventListener("DOMContentLoaded", () => {
  mostrarTestimonio();
  setInterval(mostrarTestimonio, 6000);
});

// Partículas flotando hacia arriba
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100; // inicia un poco abajo
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.color = "rgba(255, 211, 105, 0.7)"; // dorado
  }
  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + this.size;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 1 + 0.5;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Redimensionar con ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Menú hamburguesa responsive
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

