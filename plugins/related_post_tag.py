from pelican import signals

def set_related_posts(generator):
    for article in generator.articles:
        if hasattr(article, 'tags'):
            # Preparamos una lista para almacenar los artículos relacionados.
            related_articles = []
            # Recorremos todos los artículos para encontrar coincidencias de tags.
            for possible_related_article in generator.articles:
                # Nos aseguramos de no comparar el artículo consigo mismo.
                if possible_related_article != article:
                    # Comprobamos si hay tags en común.
                    if hasattr(possible_related_article, 'tags') and not set(article.tags).isdisjoint(possible_related_article.tags):
                        related_articles.append(possible_related_article)
            # Asignamos los artículos relacionados al artículo actual.
            article.related_posts_by_tag = related_articles

def register():
    signals.article_generator_finalized.connect(set_related_posts)



