"""
Django settings for carRent project.

Generated by 'django-admin startproject' using Django 4.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

import os
from pathlib import Path
import dj_database_url
import environ
env = environ.Env()
environ.Env.read_env()  # Reads the .env file

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ze6!@52@3ewv0(3j)$tyimsts))-x*&-u2c0&+kepfsd-_5#l_'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'api'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Ensure this is at the top
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',  # CSRF middleware
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'carRent.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'carRent.wsgi.application'


# Database

import dj_database_url

# Use the DB_PASSWORD environment variable from Railway
DATABASES = {
    'default': dj_database_url.parse(
        f'postgresql://postgres:{os.getenv("DB_PASSWORD")}@junction.proxy.rlwy.net:15603/railway',
        conn_max_age=600,
        ssl_require=True
    )
}


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Africa/Casablanca'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ]
}

# CSRF and Cookie Settings
CSRF_COOKIE_SECURE = True  # Ensures the CSRF cookie is only sent over HTTPS
CSRF_COOKIE_HTTPONLY = False
SESSION_COOKIE_HTTPONLY = False
SESSION_COOKIE_SECURE = True  # Ensures the session cookie is only sent over HTTPS
CSRF_COOKIE_SAMESITE = 'None'  # Allows cross-origin requests
SESSION_COOKIE_SAMESITE = 'None'  # Same setting for session cookies
CSRF_USE_SESSIONS = False     # Store CSRF token in cookie instead of session
CSRF_COOKIE_NAME = 'csrftoken'

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    'https://carrent-react-django.vercel.app',  # Production React App
    # 'http://127.0.0.1:5173',
]

CSRF_TRUSTED_ORIGINS = [
    'https://carrent-react-django.vercel.app',
    'https://carrentreactdjango-production.up.railway.app',  # Add this for the new origin
    # 'http://127.0.0.1:5173',
    # 'https://carrentreactdjango-production.up.railway.app',
]
CORS_ALLOW_CREDENTIALS = True

# Additional CORS settings
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')