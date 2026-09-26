const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const menuClose = document.getElementById('menuClose'); // <--- Capturamos la X

// Abre el menú
menuToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
});

// Cierra el menú al hacer clic en la X
menuClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

// Opcional: Cerrar menú al hacer click en cualquier enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const track = document.getElementById("track");
const slides = Array.from(track.children);
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dots = Array.from(document.querySelectorAll(".dot"));
const counter = document.getElementById("counter");

let currentIndex = 0;
const totalSlides = slides.length;

function updateCarousel(index) {
    // Mueve el track horizontalmente usando Flex/transform
    track.style.transform = `translateX(-${index * 100}%)`;

    // Actualiza el texto del contador (ej. 2 / 4)
    if (counter) {
        counter.textContent = `${index + 1} / ${totalSlides}`;
    }

    // Actualiza los puntos indicadores (ancho y color activo)
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    currentIndex = index;
}

// Evento botón siguiente
nextBtn.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(nextIndex);
});

// Evento botón anterior
prevBtn.addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel(prevIndex);
});

// Evento clic en cada punto indicador
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        updateCarousel(index);
    });
});

const track2 = document.getElementById("sliderTrack");
const slides2 = Array.from(track2.children);
const prevBtn2 = document.getElementById("prevBtn2");
const nextBtn2 = document.getElementById("nextBtn2");
const dots2 = Array.from(document.querySelectorAll(".dot2"));

let currentIndex2 = 0;
const totalSlides2 = slides2.length;

function updateSlider(index) {
    // Solo aplicar animación de desplazamiento si estamos en móvil (ancho menor a 768px)
    if (window.innerWidth < 768) {
        // Desplazamos -100% por la tarjeta, MENOS los 20px del gap multiplicados por el índice actual
        track2.style.transform = `translateX(calc(-${index * 100}% - ${index * 20}px))`;
    } else {
        track2.style.transform = "none";
    }

    dots2.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    currentIndex2 = index;
}

nextBtn2.addEventListener("click", () => {
    currentIndex2 = (currentIndex2 + 1) % totalSlides2;
    updateSlider(currentIndex2);
});

prevBtn2.addEventListener("click", () => {
    currentIndex2 = (currentIndex2 - 1 + totalSlides2) % totalSlides2;
    updateSlider(currentIndex2);
});

dots2.forEach((dot2, index2) => {
    dot2.addEventListener("click", () => {
        updateSlider(index2);
    });
});

// Soporte táctil (Swipe) para mobile
let touchStartX = 0;
let touchEndX = 0;

track2.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

track2.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (window.innerWidth < 768) {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            currentIndex2 = (currentIndex2 + 1) % totalSlides2;
            updateSlider(currentIndex2);
        } else if (touchEndX - touchStartX > threshold) {
            currentIndex2 = (currentIndex2 - 1 + totalSlides2) % totalSlides2;
            updateSlider(currentIndex2);
        }
    }
}, { passive: true });

// Ajuste automático al redimensionar la ventana
window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        track2.style.transform = "none";
    } else {
        updateSlider(currentIndex2);
    }
});

// const tarjetas = document.querySelectorAll(".testimoniosItem");

// if (tarjetas.length === 0) console.log("no hay tarjetas");

// const observerOptions = {
//     root: null, 
//     rootMargin: "0px",
//     threshold: 0.1 
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("visible");
//         } else {
//             entry.target.classList.remove("visible");
//         }
//     });
// }, observerOptions);

// tarjetas.forEach(tarjeta => {
//     observer.observe(tarjeta);
// });

const seccion = document.querySelector(".testimonios");
const tarjetas = document.querySelectorAll(".testimoniosItem");

if (!seccion || tarjetas.length === 0) {
    console.log("no hay tarjetas")
}

let currentIndex3 = 0;
let isLocked = false;

// Activa la primera tarjeta por defecto
tarjetas[0].classList.add("active");

function cambiarTarjeta(nuevoIndex) {
    if (nuevoIndex < 0 || nuevoIndex >= tarjetas.length) {
        console.log("no hay indexs")
    }

    tarjetas[currentIndex3].classList.remove("active");
    currentIndex3 = nuevoIndex;
    tarjetas[currentIndex3].classList.add("active");
}

// --- 1. DESKTOP (Rueda del mouse con altura de 100vh) ---
window.addEventListener("wheel", (e) => {
    // Si estamos en mobile, dejamos que la rueda o scroll actúe libremente
    if (window.innerWidth < 768) return;

    const rect = seccion.getBoundingClientRect();
    const estaEnPantalla = rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4;

    if (estaEnPantalla) {
        if ((e.deltaY > 0 && currentIndex3 < tarjetas.length - 1) || 
            (e.deltaY < 0 && currentIndex3 > 0)) {
            
            e.preventDefault(); // Solo bloquea en desktop para hacer el efecto de transición

            if (!isLocked) {
                isLocked = true;
                if (e.deltaY > 0) {
                    cambiarTarjeta(currentIndex3 + 1);
                } else {
                    cambiarTarjeta(currentIndex3 - 1);
                }
                setTimeout(() => { isLocked = false; }, 400);
            }
        }
    }
}, { passive: false });

// --- 2. MOBILE (Gestos táctiles / Swipe fluido sin bloquear la página) ---
let touchStartY = 0;

seccion.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

seccion.addEventListener("touchend", (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;

    const rect = seccion.getBoundingClientRect();
    const estaEnPantalla = rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.6;

    if (estaEnPantalla && Math.abs(diffY) > 30) {
        if (diffY > 0 && currentIndex3 < tarjetas.length - 1) {
            cambiarTarjeta(currentIndex3 + 1);
        } else if (diffY < 0 && currentIndex3 > 0) {
            cambiarTarjeta(currentIndex3 - 1);
        }
    }
}, { passive: true });

const section2 = document.getElementById("faqsSection");
const track3 = document.getElementById("faqsTrack");
const btnVerMas = document.getElementById("btnVerMas");

// Novedad: Función para ajustar la altura de la sección según la cantidad de tarjetas
function ajustarAltura() {
    if (!section2 || !track3) return;
    
    const trackScrollWidth = track3.scrollWidth - window.innerWidth;
    
    if (trackScrollWidth > 0) {
        // Multiplicar por 0.8 acelera el scroll y reduce la altura necesaria.
        // Si lo sientes muy rápido, cámbialo a 1 o 1.2. Si lo quieres más rápido, bájalo a 0.5.
        const alturaExtra = trackScrollWidth * 0.8;
        section2.style.height = `calc(100vh + ${alturaExtra}px)`;
    } else {
        section2.style.height = '100vh';
    }
}

// Inicializar la altura al cargar y al redimensionar la pantalla
window.addEventListener("load", ajustarAltura);
window.addEventListener("resize", ajustarAltura);

function actualizarMovimiento() {
    if (!section2 || !track3) return;

    const rect = section2.getBoundingClientRect();
    const sectionHeight = section2.offsetHeight - window.innerHeight;
    const scrollPosition = -rect.top;

    // Prevenir errores si la sección no requiere scroll horizontal
    if (sectionHeight <= 0) {
        track3.style.transform = `translateX(0px)`;
        return;
    }

    if (scrollPosition >= 0 && scrollPosition <= sectionHeight) {
        const progress = scrollPosition / sectionHeight;
        const trackWidth = track3.scrollWidth - window.innerWidth;
        const moveX = progress * trackWidth;

        track3.style.transform = `translateX(-${moveX}px)`;
    }
}

window.addEventListener("scroll", actualizarMovimiento);

if (btnVerMas) {
    btnVerMas.addEventListener("click", () => {
        const tarjetasOcultas = document.querySelectorAll(".faq-card.faq-hidden");
        
        tarjetasOcultas.forEach(tarjeta => {
            tarjeta.classList.remove("faq-hidden");
        });

        const btnContainer = document.getElementById("btnContainer");
        if (btnContainer) {
            btnContainer.style.display = "none";
        }

        // Recalcular la altura porque ahora la pista es más ancha
        ajustarAltura();
        // Forzar actualización visual inmediata
        actualizarMovimiento();
    });
}