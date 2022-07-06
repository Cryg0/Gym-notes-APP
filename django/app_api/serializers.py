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

    
    # def create(self, validated_data):
    #     exercises_data = validated_data.pop('exercises')
    #     workout = Workout.objects.create(**validated_data)
    #     for exercise_data in exercises_data:
    #         Exercise.objects.create(workout=workout, **exercise_data)
    #     return workout
    


