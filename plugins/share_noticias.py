from pelican import signals

def add_custom_metadata(content_object):
    if hasattr(content_object, 'metadata') and 'enunciado' in content_object.metadata:
        content_object.enunciado = content_object.metadata['enunciado']

def add_share_links(generator):
    for article in generator.articles:
        if hasattr(article, 'enunciado'):
            subject = article.enunciado
        else:
            subject = article.title

        url = generator.settings['SITEURL'] + '/' + article.url
        article.share_links = {
            "email": f"mailto:?subject={subject}&body=Echale un vistazo a la siguiente noticia: {url}",
            "facebook": f"https://www.facebook.com/sharer/sharer.php?u={url}",
            "twitter": f"https://twitter.com/intent/tweet?url={url}&text={subject}",
            "linkedin": f"https://www.linkedin.com/shareArticle?mini=true&url={url}&title={subject}&summary={article.summary}&source={generator.settings['SITENAME']}",
        }

def register():
    signals.article_generator_finalized.connect(add_share_links)
    signals.content_object_init.connect(add_custom_metadata)
