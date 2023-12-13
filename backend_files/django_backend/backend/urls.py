"""django_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_mysql, name='test_mysql'),
    path('crimes/', views.crimes, name='crimes'),
    path('crimes_type/', views.search_crime_type, name='search_crime_type'),
    path('crimes/victims-by-district/',
         views.victims_by_district, name='victims_by_district'),
    path('crimes/crime-type-in-hollywood/',
         views.crime_type_in_hollywood, name='crime_type_in_hollywood'),
    path('crimes_eventid/', views.crimes_eventid, name='crimes_eventid'),
    path('crimes_date/', views.crimes_date, name='crimes_date'),
    path('crimes_area/', views.crimes_area, name='crimes_area'),
    path('crimes/report/', views.crimes_report, name='crimes_report'),
    path('crimes/update/', views.crimes_update, name='crimes_update'),
    path('crimes/delete/', views.crimes_delete, name='crimes_delete'),
    path('crimes/statistics/', views.crimes_statistics, name='crimes_statistics'),
    path('crimes/combined_crime_data/<str:district>/<int:age_min>/<int:age_max>/',
         views.combined_crime_data, name='combined_crime_data'),
    path('crimes/crimes_type_description/<int:CrimeType>/',
         views.crimes_type_description, name='crimes_type_description'),
]
