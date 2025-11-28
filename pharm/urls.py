

from posixpath import basename
from django.urls import path
from .views import *
from pharm import views

urlpatterns = [
    path('api/get_all_services/', views.getAllServices),
    path('api/get_all_services_names/', views.getAllServicesNames),
    path('api/get_selected_service/<int:id>', views.getSelectedService),
    path('api/add_service/', views.addService),
    path('api/update_service/<int:id>', views.updateService),
    path('api/delete_service/<int:id>', views.deleteService),

 


    path('api/get_all_grades/', views.getAllGrades),
    path('api/get_all_grades_names/', views.getAllGradesNames),
    path('api/get_selected_grade/<int:id>', views.getSelectedGrade),
    path('api/add_grade/', views.addGrade),
    path('api/update_grade/<int:id>', views.updateGrade),
    path('api/delete_grade/<int:id>', views.deleteGrade),


    path('api/get_all_person/', views.getAllPerson),
    path('api/get_selected_person/<int:id>', views.getSelectedPerson),
    path('api/add_person/', views.addPerson),
    path('api/update_person/<int:id>', views.updatePerson),
    path('api/delete_person/<int:id>', views.deletePerson),

]