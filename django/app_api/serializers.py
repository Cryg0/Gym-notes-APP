from rest_framework import serializers
from app.models import Post,Category,Exercise,Workout,Goal
from users.models import User

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=('id','title','author','content','status','published')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=('part')

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Exercise
        fields=('id','name','category','weight','sets','reps','workout')


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model=Workout
        fields=('id','name','date','user','status')


class GoalSerializer(serializers.ModelSerializer):
    current_percent=serializers.SerializerMethodField()
    def get_current_percent(self,obj):
        exercises=[]
        user=obj.user
        workouts=user.workout_set.all().filter(status='finished')
        for workout in workouts:
            exercises.extend(workout.exercises.all().filter(name=obj.name))

        if exercises:
            current_value=exercises[-1].weight
        else:
            current_value=0
       
       
        return round(current_value*100/obj.value)

    class Meta:
        model=Goal
        fields=('id','name','user','value',"current_percent")

