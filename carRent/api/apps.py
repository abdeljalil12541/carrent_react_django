from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Import the signals to ensure they are loaded
        import api.signals  # Assuming signals are in a separate `signals.py` file
