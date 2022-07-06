from django.contrib import admin

from . import models

@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display=('title','id','status','slug','author')
    prepopulated_fields= {'slug' : ('title',),}
    list_filter=('author',)
    search_fields= ['status']

    # fieldsets= ('General',{'fields':('title',)}),
    # ('Availability',{'Fields':{'slug'}})

admin.site.register(models.Category)
admin.site.register(models.Exercise)
admin.site.register(models.Workout)