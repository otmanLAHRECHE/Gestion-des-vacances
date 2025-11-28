from email.headerregistry import Address
from tkinter import CASCADE
from django.db import models

# Create your models here.



class Service(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    


class Grade(models.Model):
    id = models.AutoField(primary_key=True)
    grade_name = models.CharField(max_length=100)

    def __str__(self):
        return self.grade_name
    



class Personnel(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=100)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)
    




class vacance(models.Model):
    id = models.AutoField(primary_key=True)
    person = models.ForeignKey(Personnel, on_delete=models.CASCADE)
    date_start = models.DateField()
    date_ends = models.DateField()
    days_taken = models.IntegerField()
    days_remains = models.IntegerField()
    date_restart = models.DateField()
    vacance_type = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)


