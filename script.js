let indiceSlide = 0;
let slides = document.querySelectorAll(".slide");
let intervaloAutomatico;
let posicaoToqueInicio = 0;
let posicaoToqueFim = 0;

// Criar bolina
let bolinhasContainer = document.getElementById("bolinhas");
slides.forEach((_, index) => {
  let bol = document.createElement("span");
  bol.classList.add("bolinha");
  bol.setAttribute("data-indice", index);
  bolinhasContainer.appendChild(bol);
});

let bolinhas = document.querySelectorAll(".bolinha");

// PRINCIPAL FUNCAO
function mostrarSlides(novoIndice) {
  if (novoIndice >= slides.length) indiceSlide = 0;
  else if (novoIndice < 0) indiceSlide = slides.length - 1;
  else indiceSlide = novoIndice;

  slides.forEach((s) => (s.style.display = "none"));
  bolinhas.forEach((b) => b.classList.remove("ativa"));

  slides[indiceSlide].style.display = "block";
  bolinhas[indiceSlide].classList.add("ativa");
}

// Botões
document.getElementById("botao-avancar").addEventListener("click", () => {
  mostrarSlides(indiceSlide + 1);
  reiniciarAutoSlide();
});

document.getElementById("botao-voltar").addEventListener("click", () => {
  mostrarSlides(indiceSlide - 1);
  reiniciarAutoSlide();
});

// Bolinhas clicáveis
bolinhas.forEach((b) => {
  b.addEventListener("click", () => {
    let indice = Number(b.dataset.indice);
    mostrarSlides(indice);
    reiniciarAutoSlide();
  });
});

// SLIDE PASSA SOZINHO
function iniciarAutoSlide() {
  intervaloAutomatico = setInterval(() => {
    mostrarSlides(indiceSlide + 1);
  }, 4000);
}

function reiniciarAutoSlide() {
  clearInterval(intervaloAutomatico);
  iniciarAutoSlide();
}

// Touch (mobile)
document
  .querySelector(".slider-container")
  .addEventListener("touchstart", (e) => {
    posicaoToqueInicio = e.touches[0].clientX;
  });

document
  .querySelector(".slider-container")
  .addEventListener("touchend", (e) => {
    posicaoToqueFim = e.changedTouches[0].clientX;

    if (posicaoToqueFim < posicaoToqueInicio - 50) {
      mostrarSlides(indiceSlide + 1);
    } else if (posicaoToqueFim > posicaoToqueInicio + 50) {
      mostrarSlides(indiceSlide - 1);
    }

    reiniciarAutoSlide();
  });

// Iniciar
mostrarSlides(indiceSlide);
iniciarAutoSlide();

// Menu mobile
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
