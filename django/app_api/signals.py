from django.dispatch import Signal
from app.models import Exercise

exerciseGet=Signal()

def create_exercises(sender,items,workout,**kwargs): 
    for exercise in items.split(','):
        Exercise.objects.create(name=exercise,workout=workout)

exerciseGet.connect(create_exercises)
