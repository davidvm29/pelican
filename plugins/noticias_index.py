from pelican import signals, contents #Para interactuar con el contenido estatico y las señales
from collections import defaultdict

#Esta función se ejecuta para cada objeto de contenido estático en el sitio. Primero, verifica si el objeto es de tipo Static.
#Extrae el idioma (lang) del contenido desde su metadata, utilizando 'es' como valor predeterminado si no se especifica.
#Establece un mapeo de directorios basado en el idioma y selecciona el directorio objetivo adecuado según el idioma del contenido.
#Modifica la ruta de guardado (save_as) y la URL del contenido para reflejar el directorio objetivo. Esto organiza los contenidos estáticos en carpetas según su idioma, facilitando su gestión y acceso.
def modify_content_paths(instance):
    if isinstance(instance, contents.Static):
        lang = instance.metadata.get('lang', 'es')  # 'es' como predeterminado
        directory_mapping = {'es': 'content/noticias/es/', 'en': 'content/noticias/en/'}
        target_directory = directory_mapping.get(lang, 'content/noticias/en/')
        instance.save_as = instance.save_as.replace('content/noticias/', target_directory)
        instance.url = instance.url.replace('content/noticias/', target_directory)

#Crea un diccionario que agrupa artículos por su idioma, utilizando defaultdict para manejar idiomas que aún no tienen artículos asignados.
#Itera sobre todos los artículos, clasificándolos por idioma basado en su metadata.
#Ordena las noticias dentro de cada grupo de idioma por su fecha de creación, de más reciente a más antiguo.
#Añade este diccionario al contexto global del generador, haciéndolo accesible a las plantillas del sitio.
def process_noticias(generator):
    noticias_por_lang = defaultdict(list)
    
    # Trabajar con los artículos del generador
    for article in generator.articles:
        lang = article.metadata.get('lang', 'en')  # 'en' como predeterminado
        noticias_por_lang[lang].append(article)

    # Ordenar noticias por fecha de creación dentro de cada lang
    for lang, noticias in noticias_por_lang.items():
        noticias.sort(key=lambda x: x.metadata.get('fecha_creacion', '1900-01-01'), reverse=True)

    # Hacer las noticias ordenadas accesibles globalmente en el contexto del generador
    generator.context['noticias_por_lang'] = noticias_por_lang

#Conectar las señales para poder aplicarse correctamente el plugin en la generación del sitio
def register():
    signals.content_object_init.connect(modify_content_paths)
    signals.article_generator_finalized.connect(process_noticias)
