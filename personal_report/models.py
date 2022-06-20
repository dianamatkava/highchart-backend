from django.db import models

# Create your models here.

class UserData (models.Model):
    name = models.CharField(null=False, max_length=125)
    values = models.IntegerField()
    

    def __str__(self):
        return self.name
