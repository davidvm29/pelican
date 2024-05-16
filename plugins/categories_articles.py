from pelican import signals

def set_related_posts(generator):
    for article in generator.articles:
        if hasattr(article, 'lugar_publicacion'):
            # Preparamos una lista para almacenar los artículos relacionados.
            related_articles = []
            # Recorremos todos los artículos para encontrar coincidencias de lugar_publicacion.
            for possible_related_article in generator.articles:
                # Nos aseguramos de no comparar el artículo consigo mismo.
                if possible_related_article != article:
                    # Comprobamos si hay lugar_publicacion en común.
                    if hasattr(possible_related_article, 'lugar_publicacion') and not set(article.lugar_publicacion).isdisjoint(possible_related_article.lugar_publicacion):
                        related_articles.append(possible_related_article)
            # Asignamos los artículos relacionados al artículo actual.
            article.related_categories = related_articles

def register():
    signals.article_generator_finalized.connect(set_related_posts)