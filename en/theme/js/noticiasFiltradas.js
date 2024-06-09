document.addEventListener('DOMContentLoaded', function() {
  // Extraer y parsear los datos de sessionStorage
  const newsData = JSON.parse(sessionStorage.getItem('newsForDate'));
  
  let htmlContent = '';//
  if (newsData && newsData.length) {
    const newsContainer = document.getElementById('newsContainer') || document.createElement('div');
    if (!document.getElementById('newsContainer')) {
      newsContainer.setAttribute('id', 'newsContainer');
      document.body.appendChild(newsContainer);
    }

    // Generar el encabezado basado en el idioma
    if (idioma === "es") {
      htmlContent += '<div class="elementosfiltrados"> Actualidad Universitaria - Elementos filtrados por fecha:  </div>';
    } else {
      htmlContent += '<div class="elementosfiltrados"> University News - Items filtered by date:   </div>';
    }

    // Procesar cada conjunto de 4 elementos como una noticia
    for(let i = 0; i < newsData.length; i += 4) {
      const link = newsData[i];
      const titulo = newsData[i+1];
      const fecha = newsData[i+2];
      const lugar = newsData[i+3];

      // Añadir el contenido HTML para cada noticia
      htmlContent += '<div class="itemContainer">';
      htmlContent += '<span>' + fecha + '</span>';
      if (idioma ==="es"){
        htmlContent += '<h2 class="titulofiltradas"><a href="' + '/pelican/'+link + '">' + titulo + '</a></h2>';
      }
      else{
        htmlContent += '<h2 class="titulofiltradas"><a href="' + '/pelican/'+link + '">' + titulo + '</a></h2>';
      }
      // htmlContent += '<h2 class="titulofiltradas"><a href="' + link + '">' + titulo + '</a></h2>';
      htmlContent += '<div class="genericItemCategory">';
      if (idioma === "es") {
        htmlContent += '<span>Publicado en</span>';
      } else {
        htmlContent += '<span>Published in</span>';//
      }
      htmlContent += '<a id="lugar" href="#">' + lugar + '</a>';
      if (idioma === "es") {
        htmlContent += '<a href="' + '/pelican/'+ link + '">&nbsp;Leer más...</a>';
      } else {
        htmlContent += '<a href="' + '/pelican/'+ link + '">&nbsp;Read more...</a>';
      }
      htmlContent += '</div>';
      htmlContent += '</div>';
    }

    // Establecer el contenido HTML del contenedor de noticias
    newsContainer.innerHTML = htmlContent;
  } else {
    console.log("No hay datos de noticias disponibles");
  }
});

