document.addEventListener('DOMContentLoaded', function() {
    // Recuperar los resultados de la búsqueda almacenados en la caché del navegador
    var cachedResults = localStorage.getItem('searchResults');

    if (cachedResults) {
        // Convertir los resultados de cadena JSON a objeto JavaScript
        var results = JSON.parse(cachedResults);
        // Obtener el contenedor de resultados
        var resultsContainer = document.getElementById('results-container');

        if (results.length === 0) {
            // Si no hay resultados, mostrar un mensaje
            if (idioma === 'es'){
                resultsContainer.innerHTML = '<p>No hay resultados para esta búsqueda.</p>';
            }
            else {
                resultsContainer.innerHTML = '<p>There are no results for this search.</p>';
            }
        } else {
            // Si hay resultados, mostrar cada resultado en una lista
            results.forEach(function(result) {
                var listItem = document.createElement('li');
                listItem.textContent = result.title;
                // Enlazar el resultado a su URL correspondiente
                var link = document.createElement('a');
                if (idioma === "en"){
                    link.href = SITEURL + result.url.replace();
                } else {
                    link.href = SITEURL + result.url;
                }
                link.appendChild(listItem);
                resultsContainer.appendChild(link);
            });
        }
    }
});