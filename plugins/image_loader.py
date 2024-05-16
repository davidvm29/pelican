from pelican import signals
import os

def add_images(generator):
    image_folder = 'theme/static/carousel-images'
    # Obtener lista completa de imágenes
    full_path_images = [os.path.join(image_folder, img) for img in os.listdir(image_folder)]
    # Ordenar las imágenes por fecha de modificación, las más recientes primero
    sorted_images = sorted(full_path_images, key=os.path.getmtime, reverse=True)
    # Seleccionar solo las 9 imágenes más recientes
    recent_images = sorted_images[:9]
    # Extraer solo el nombre del archivo, sin la ruta completa, para pasar al contexto
    recent_images_names = [os.path.basename(img) for img in recent_images]
    generator.context['images'] = recent_images_names

def register():
    signals.article_generator_finalized.connect(add_images)
