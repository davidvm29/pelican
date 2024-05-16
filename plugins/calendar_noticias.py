from pelican import signals
from collections import defaultdict
import os

def generate_calendar_links(generator):
    # Estructura para almacenar los enlaces por fecha
    calendar_links = defaultdict(list)

    for article in generator.articles:
        # Construir la ruta relativa del artículo desde la carpeta de contenido
        article_path = os.path.relpath(article.source_path, generator.settings['PATH'])
        # Verificar si el artículo está en la carpeta 'noticias'
        if article_path.startswith('noticias'):
           
            # Formato de fecha como 'YYYY-MM-DD' para agrupar
            date_str = article.date.strftime('%Y-%m-%d')
            # Agregar el artículo a la lista de esa fecha
            calendar_links[date_str].append(article.url)
            calendar_links[date_str].append(article.enunciado)
            calendar_links[date_str].append(article.fecha)
            calendar_links[date_str].append(article.lugar_publicacion)

    
    # Agregar el diccionario al contexto para que esté disponible en las plantillas
    generator.context['calendar_links'] = dict(calendar_links)

def register():
    signals.article_generator_finalized.connect(generate_calendar_links) 