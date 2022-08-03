from django.db import models
from users.models import User
from django.utils import timezone

class Post(models.Model):
    
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options= ( 
        ('draft','Draft'),
        ('published','Published')
    )

    title=models.TextField()
    content=models.TextField()
    slug= models.SlugField(max_length=250,unique_for_date='published')
    published=models.DateTimeField(default=timezone.now)
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name='app_posts')
    status=models.CharField(max_length=10,choices=options,default='published')
    objects=models.Manager()
    postObjects=PostObjects()

    class Meta:
        ordering=('-published',)

    def __str__(self) -> str:
        return self.title

#Main models

class Category(models.Model):
    part=models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.part

class Exercise(models.Model):
    name=models.CharField(max_length=100,null=False,blank=False)
    category=models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
    weight=models.IntegerField(default=0)
    sets=models.IntegerField(default=0)
    reps=models.IntegerField(default=0)
    workout=models.ForeignKey('Workout',on_delete=models.CASCADE,related_name='exercises')
    
    def __str__(self) -> str:
        return self.name

class Workout(models.Model):
    
    options= ( 
        ('finished','Finished'),
        ('active','Active'),
        ('started','Started'))

    name=models.CharField(max_length=100,blank=False,null=False)
    date=models.DateTimeField(default=timezone.now)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    status=models.CharField(max_length=10,choices=options,default='Active')
    

    class Meta:
        ordering = ["date"]
    def __str__(self) -> str:
        return self.name

        

class Goal(models.Model):
    name=models.CharField(max_length=100,blank=False,null=False)
    value=models.IntegerField(default=1)
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='goals')

    def __str__(self) -> str:
        return self.name


class BaseExercise(models.Model):
    name=models.CharField(max_length=50)
    category=models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)

    def __str__(self) -> str:
        return self.name