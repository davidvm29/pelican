// script.js
function search() {
    var searchTerm = document.querySelector(".search-input").value;
    var results = "Resultados de búsqueda para: " + searchTerm;
    document.getElementById("results").innerHTML = results;
}

function changeLanguage(language) {
    if (language === 'EN') {
        document.getElementById("results").innerHTML = "Search results for: ";
    } else if (language === 'ES') {
        document.getElementById("results").innerHTML = "Resultados de búsqueda para: ";
    }
}

// Función para mostrar u ocultar el menú desplegable
function toggleDropdown() {
  var dropdown = document.getElementById("mainDropdown");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

  
  // Función para mostrar u ocultar las subopciones
  function toggleSubDropdown(event) {
    var subDropdown = event.nextElementSibling;
    subDropdown.classList.toggle("show");
  }
  
  // Cerrar el menú desplegable si el usuario hace clic fuera de él
  window.onclick = function (event) {
    if (!event.target.matches('.dropdown-icon')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  $(document).ready(function(){
    $('.slider').slick({
      autoplay: true, // Hacer que el slider se reproduzca automáticamente
      autoplaySpeed: 3000, // Cambiar de imagen cada 3 segundos (ajusta según tus preferencias)
      dots: true, // Mostrar los puntos de navegación
      arrows: true // Mostrar las flechas de navegación
      // Puedes ajustar más opciones según tus necesidades
    });
  });
  


$(document).ready(function(){
  // Establece el intervalo de cambio de imágenes en milisegundos (3 segundos = 3000 ms)
  var intervalo = 3000;
  
  // Inicializa el carrusel
  $('#carouselExample').carousel();
  
  // Función para avanzar a la siguiente diapositiva
  function avanzarDiapositiva() {
      $('#carouselExample').carousel('next');
  }
  
  // Establece el intervalo de cambio de imágenes
  setInterval(avanzarDiapositiva, intervalo);
});

(function($) {
  $.fn.menumaker = function(options) {
    var cssmenu = $(this),
      settings = $.extend({
        title: "Menú",
        format: "multitoggle"
      }, options);

    var resizeFix = function() {
      if ($(window).width() > 1200) {
        cssmenu.find('ul').show();
        cssmenu.find('.has-sub > ul').show();
        $('#menu-button').css('display', 'none');
      } else {
        cssmenu.find('ul').css('display', 'block');
        cssmenu.find('.has-sub > ul').css('display', 'none');
        $('#menu-button').css('display', 'block');
      }
    };

    $(window).on('resize', resizeFix);
    resizeFix();

    $(this).find("#menu-button").on('click', function() {
      cssmenu.find('ul').css('display', 'block');
      cssmenu.find('.has-sub > ul').css('display', 'none');
      $(this).toggleClass('menu-opened');
      var mainmenu = $(this).next('ul');
      if (mainmenu.hasClass('open')) {
        mainmenu.removeClass('open').hide();
      } else {
        mainmenu.addClass('open').show();
      }
    });

    cssmenu.find('li ul').parent().addClass('has-sub');

    var multiTg = function() {
      cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
      cssmenu.find('.submenu-button').on('click', function() {
        $(this).toggleClass('submenu-opened');
        if ($(this).siblings('ul').hasClass('open')) {
          $(this).siblings('ul').removeClass('open').hide();
        } else {
          $(this).siblings('ul').addClass('open').show();
        }
      });
    };

    if (settings.format === 'multitoggle') multiTg();
    else cssmenu.addClass('dropdown');
  };
})(jQuery);

$(document).ready(function() {
  if ($('#titulo h1').length) {
    var margen = ($('#titulo h1').height() - $('#titulo h1 span').height()) / 2;
    $('#titulo h1 span').css('margin-top', margen + 'px');
    $(window).resize(function() {
      var margen = ($('#titulo h1').height() - $('#titulo h1 span').height()) / 2;
      $('#titulo h1 span').css('margin-top', margen + 'px');
    });

    if ($("#menu-principal").length) {
      $("#menu-principal").menumaker({
        title: "Menú",
        format: "multitoggle"
      });
    }
  } else {
    cargarMenu();
  }
});

function cargarMenu() {
  if ($("#menu-principal").length) {
    $("#menu-principal").menumaker({
      title: "Menú",
      format: "multitoggle"
    });
  } else {
    setTimeout(function() {
      cargarMenu();
    }, 2000);
  }
}
/* SEARCH */
function buscarYRedirigir(idioma) {
  var searchTerm = document.getElementById('searchInput').value.trim();
  var results = obtenerResultadosDeBusqueda(searchTerm);
  localStorage.setItem('searchResults', JSON.stringify(results));
  // Redireccionar a la página de búsqueda
  window.location.href = idioma === "es" ? SITEURL+"/resultadosbusqueda.html" : SITEURL+"/resultadosbusqueda-en.html";
}

function obtenerResultadosDeBusqueda(searchTerm) {
  // Asegúrate de que idx está definido y listo para usar.
  if (idx && searchTerm) {
    var searchResults = idx.search(searchTerm).map(result => {
      // Encuentra los documentos que coincidan con los títulos referenciados en los resultados de la búsqueda.
      return data.find(doc => doc.title === result.ref);
    });

    return searchResults.map(item => ({
      title: item.title,
      url: item.url
    }));
  } else {
    return [];
  }
}

//Funcion volver arriba

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}