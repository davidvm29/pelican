AUTHOR = 'David Villen Moreno'
SITENAME = 'ucoPelican'
SITEURL = ""

PATH = "content"

TIMEZONE = 'Europe/Madrid'

DEFAULT_LANG = 'es'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
# Ruta de los templates
# Especifica la ubicación de las plantillas

THEME = "theme"
STATIC_PATHS = [
    'static', 'images', 'carousel-images', 'js', 'json'
]


INDEX_SAVE_AS = '' # Para que no genere automaticamente el index.html pelican


PLUGIN_PATHS = ['plugins']
PLUGINS = ['i18n_subsites','image_loader','noticias_index','related_post_tag','categories_articles','share_noticias', 'calendar_noticias',] #plugins utilizados


JINJA_ENVIRONMENT = {
    'extensions': ['jinja2.ext.i18n'],
}

I18N_SUBSITES = {
    'en': {
        'SITENAME': 'My site',
    },
    'es': {
        'SITENAME': 'Mi Sitio',
    },
}


DEBUG = True

# Blogroll
LINKS = (
    ("Pelican", "https://getpelican.com/"),
    ("Python.org", "https://www.python.org/"),
    ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    ("You can add links in your config file", "#"),
    ("Another social link", "#"),
)

import logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'detailed': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'detailed'
        },
    },
    'loggers': {
        'pelican': {
            'handlers': ['console'],
            'propagate': False,
            'level': 'DEBUG',
        },
    }
}

LOGGING['loggers']['pelican.plugins'] = {'level': 'DEBUG', 'handlers': ['console'], 'propagate': False}




# Uncomment following line if you want document-relative URLs when developing
