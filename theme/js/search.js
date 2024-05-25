let data;
let idx;
document.addEventListener('DOMContentLoaded', function() {
    if (idioma === 'es'){
        fetch(SITEURL +'/theme/json/search_es.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            idx = lunr(function () {
                this.ref('title');
                this.field('title');
                this.field('url');
    
                data.forEach(doc => {
                    doc.url = doc.url || '';
                    this.add(doc);
                });
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
    } else {
        fetch(SITEURL+'/theme/json/search_en.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            idx = lunr(function () {
                this.ref('title');
                this.field('title');
                this.field('url');
    
                data.forEach(doc => {
                    doc.url = doc.url || '';
                    this.add(doc);
                });
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error))
    }

    // Añade el listener al campo de texto para el evento input
    document.getElementById('searchInput').addEventListener('input', performSearch);

    // Añade el listener al botón para el evento click
    document.getElementById('searchButton').addEventListener('click', performSearch);
});

function performSearch() {
    var query = document.getElementById('searchInput').value.trim();
    var resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Limpia los resultados anteriores

    if (query) { // Si hay una consulta, realiza la búsqueda
        var results = idx.search(query);

        // Muestra los resultados
        results.forEach(result => {
            var item = data.find(doc => doc.title === result.ref);

            var li = document.createElement('li');
            if (item && item.url) {
                var link = document.createElement('a');
                link.href = SITEURL+item.url;
                link.textContent = item.title;
                li.appendChild(link);
            } else if (item) {
                li.textContent = item.title;
            }

            resultsDiv.appendChild(li);
        });
    }
}