from django.apps import AppConfig



class AppApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_api'

    def ready(self):
         from .signals import create_exercises
