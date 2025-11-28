import datetime
from os import stat
from wsgiref.util import request_uri
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from calendar import monthrange
from dateutil.relativedelta import relativedelta

# Create your views here.


@api_view(['GET'])
def getAllServices(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Service.objects.all()

        source_serial = ServiceSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def getAllServicesNames(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Service.objects.all()

        source_serial = ServiceListSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)     

@api_view(['GET'])
def getSelectedService(request, id):
    if request.method == 'GET' and request.user.is_authenticated:

        queryset = Service.objects.get(id=id)

        source_serial = ServiceSerialize(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['POST'])
def addService(request):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop("name")

        service = Service.objects.create(name=name)

        if service.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "service created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateService(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop("name")

        article_to_update = Service.objects.get(id=id)
        if not article_to_update.name == name:
            article_to_update.name = name
        
        article_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"service updated"})


@api_view(['DELETE'])
def deleteService(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Service.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Service deleted"})
    












@api_view(['GET'])
def getAllGrades(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Grade.objects.all()

        source_serial = GradeSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def getAllGradesNames(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Grade.objects.all()

        source_serial = GradeListSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)     

@api_view(['GET'])
def getSelectedGrade(request, id):
    if request.method == 'GET' and request.user.is_authenticated:

        queryset = Grade.objects.get(id=id)

        source_serial = GradeSerialize(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['POST'])
def addGrade(request):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop("grade_name")

        service = Grade.objects.create(grade_name=name)

        if service.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "grade created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateGrade(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop("grade_name")

        article_to_update = Grade.objects.get(id=id)
        if not article_to_update.grade_name == name:
            article_to_update.grade_name = name
        
        article_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"grade updated"})


@api_view(['DELETE'])
def deleteGrade(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Grade.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"grade deleted"})
    







@api_view(['GET'])
def getAllPerson(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Personnel.objects.all()

        source_serial = PersonnelSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)
   

@api_view(['GET'])
def getSelectedPerson(request, id):
    if request.method == 'GET' and request.user.is_authenticated:

        queryset = Personnel.objects.get(id=id)

        source_serial = PersonnelSerialize(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['POST'])
def addPerson(request):
    if request.method == 'POST' and request.user.is_authenticated:
        full_name = request.data.pop("full_name")
        service_id = request.data.pop("service_id")
        grade_id = request.data.pop("grade_id")

        service = Service.objects.get(id = service_id)
        grade = Grade.objects.get(id = grade_id)


        personel = Personnel.objects.create(full_name=full_name, grade = grade, service = service)

        if personel.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Personnel created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updatePerson(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        
        full_name = request.data.pop("full_name")
        service_id = request.data.pop("service_id")
        grade_id = request.data.pop("grade_id")

        service = Service.objects.get(id = service_id)
        grade = Grade.objects.get(id = grade_id)

        article_to_update = Personnel.objects.get(id=id)
        if not article_to_update.full_name == full_name:
            article_to_update.full_name = full_name
        if not article_to_update.service == service:
            article_to_update.service = service
        if not article_to_update.grade == grade:
            article_to_update.grade = grade
        
        article_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"Person updated"})


@api_view(['DELETE'])
def deletePerson(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Personnel.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Person deleted"})
    



