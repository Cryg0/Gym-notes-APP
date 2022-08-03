from django.contrib import admin

from . import models

@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display=('title','id','status','slug','author')
    prepopulated_fields= {'slug' : ('title',),}
    list_filter=('author',)
    search_fields= ['status']


@admin.register(models.Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display=('id','name','user','status',)
    list_filter=('user',)
    search_fields= ['status']

admin.site.register(models.Category)
admin.site.register(models.Exercise)

admin.site.register(models.Goal)
admin.site.register(models.BaseExercise)