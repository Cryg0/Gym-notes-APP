from rest_framework import serializers
from app.models import Post,Category,Exercise,Workout

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
    # exercises=serializers.SlugRelatedField( many=True,slug_field='name',
    #                                           queryset=Exercise.objects.filter(workout=1))
    # exercises=ExerciseSerializer(many=True)

    class Meta:
        model=Workout
        fields=('id','name','date','user','status')

<<<<<<< Updated upstream
    
    # def create(self, validated_data):
    #     exercises_data = validated_data.pop('exercises')
    #     workout = Workout.objects.create(**validated_data)
    #     for exercise_data in exercises_data:
    #         Exercise.objects.create(workout=workout, **exercise_data)
    #     return workout
    
=======

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
>>>>>>> Stashed changes


