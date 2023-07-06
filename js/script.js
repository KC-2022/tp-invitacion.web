let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
document.querySelector('.login-btn').onclick = () =>{
    document.querySelector('.login-form-container').classList.toggle('active');
}
document.querySelector('#close-login-form').onclick = () =>{
    document.querySelector('.login-form-container').classList.remove('active');
}

window.onscroll = () =>{

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active')
    }else{
        document.querySelector('.header').classList.remove('active')
    }

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

window.onload = () =>{

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active')
    }else{
        document.querySelector('.header').classList.remove('active')
    }
}
// efecto parallax foto home
document.querySelector('.home').onmousemove = (e) =>{
  document.querySelectorAll('.home-parallax').forEach(elm =>{
    let speed = elm.getAttribute('data-speed');

    let x = (window.innerWidth - e.pageX * speed)/90;
    let y = (window.innerHeight - e.pageY * speed)/90;

    elm.style.transform = `translateX(${y}px) translateY(${x}px)`;
  });
}

document.querySelector('.home').onmouseleave= () =>{
    document.querySelectorAll('.home-parallax').forEach(elm =>{
  
      elm.style.transform = `translateX(0px) translateY(0px)`;
    });
  }
//galeria
var swiper = new Swiper(".galeria-slider", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

// Musica On - OFF

const sonidoMusicaOff = document.getElementById('sonidoMusicaOff');
const sonidoMusicaOn = document.getElementById('sonidoMusicaOn');
const iconoMusica = document.getElementById('iconoMusica');
const musica = document.getElementById('musica');

musica.play();
sonidoMusicaOff.addEventListener('click', () => {
    sonidoMusicaOff.classList.add('hidden');
    sonidoMusicaOn.classList.remove('hidden');
    iconoMusica.classList.add('hidden');
    musica.play();
});

sonidoMusicaOn.addEventListener('click', () => {
    sonidoMusicaOn.classList.add('hidden');
    sonidoMusicaOff.classList.remove('hidden');
    iconoMusica.classList.remove('hidden');
    musica.pause();
});
musica.play();

function validarFormulario() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();


  // Validar nombre
  if (nombre === "") {
    alert("Por favor, ingrese su nombre");
    return false;
  }
  return true;
}

// Fech evento
var countDownDate = new Date("Oct 20, 2023 21:30:00").getTime();

// actualizar evento cada 1 segundo
var x = setInterval(function() {

  // obtener fecha de hoy
  var now = new Date().getTime();
    
  // distancia entre hoy al evento
  var distance = countDownDate - now;
    
  // Tiempo en dias horas minutos y segundos
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  //
  document.querySelector(".days-count .number").innerHTML = days;
  document.querySelector(".hours-count .number").innerHTML = hours;
  document.querySelector(".mins-count .number").innerHTML = minutes;
  document.querySelector(".secs-count .number").innerHTML = seconds;
    
  // 
  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".countdown").innerHTML = "LLEGO EL DIA";
  }
}, 1000);

// Obtener el modal y el botón de ingreso
const modal = document.getElementById('modal-bienvenida');
const botonIngresar = document.getElementById('boton-ingresar');

// Cuando la página se carga, mostrar el modal
window.addEventListener('load', () => {
  modal.style.display = 'block';
});

// Cuando se presiona el botón de ingreso, ocultar el modal
botonIngresar.addEventListener('click', () => {
  modal.style.display = 'none';
});
const ingresarBtn = document.getElementById('boton-ingresar');

ingresarBtn.addEventListener('click', () => {
  musica.play();
});
