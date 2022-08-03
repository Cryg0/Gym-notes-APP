from rest_framework import generics
from app.models import *
from .serializers import *
from rest_framework.permissions import  SAFE_METHODS,IsAuthenticated, BasePermission,AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.middleware.UserMiddleware import UserMiddleware
from django.utils.decorators import method_decorator
import math
from .signals import exerciseGet


permission=[AllowAny]   #[AllowAny]

class UserWritePermission(BasePermission):
    message='Editing object is restricted to the author only'
    
    def  has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        
        return obj.user == request.user

class PostList(generics.ListCreateAPIView):

    permission_classes=permission
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView,UserWritePermission):

    permission_classes=permission
    queryset=Post.objects.all()
    serializer_class=PostSerializer


@method_decorator(UserMiddleware, name='dispatch')
class WorkoutList(APIView):
    permission_classes = permission   
    
    def post(self,request,user):
        serializer = WorkoutSerializer(data=request.data)
        exercises=request.data['exercises']
        
        if serializer.is_valid() and exercises !='':
            workout=serializer.save()

            if workout:
                exerciseGet.send(sender=Workout,items=exercises,workout=workout) #sending signal to create exercises
                
                return Response(status=status.HTTP_201_CREATED)
        return Response (status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request,user):
        items = user.workout_set.all()
        total=items.count()
        
        if 'sort' in request.GET:
            sort=request.GET['sort']
                
            if sort=='finished':
                items=user.workout_set.all().filter(status='finished').order_by('-date')
                total=items.count()
            elif sort=='active':
                items=user.workout_set.all().filter(status='active')
                total=items.count()
                    
        if 'page' in request.GET:
            page=int(request.GET.get('page',1))
            per_page=5
            start=(page-1)*per_page
            end=page*per_page
            serializer = WorkoutSerializer(items[start:end], many=True) 
            return Response({
        'data':serializer.data,'total':total,
        'page':page,'last_page':math.ceil(total/per_page)})
        

        serializer = WorkoutSerializer(items, many=True)     
        
        return Response({'data':serializer.data})
   
class WorkoutDetail(APIView):
    permission_classes=permission  
    
    def get(self,request,pk):
        workout=Workout.objects.get(pk=pk)
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)
       

    def put(self,request,pk,format=None):
        workout=Workout.objects.get(pk=pk)
        print(workout)
        serializer = WorkoutSerializer(workout, data=request.data,partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk, format=None):
        workout = Workout.objects.get(pk=pk)
        workout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@method_decorator(UserMiddleware, name='dispatch')
class LatestWorkout(APIView):
    def get(self,request,user):
        workout_latest=Workout.objects.filter(status='active',user=user).first()
        workout_started=Workout.objects.filter(status='started').first()

        if not workout_started:
            serializer=WorkoutSerializer(workout_latest)
        else:
            serializer=WorkoutSerializer(workout_started)
        return Response(serializer.data)

@method_decorator(UserMiddleware, name='dispatch')
class ExerciseList(APIView):  
    permission_classes=permission
    serializer_class = ExerciseSerializer

    def get(self, request,user):
        workout_id=request.GET.get('workout_id')
        if workout_id:
            workout=Workout.objects.get(pk=workout_id)
            exercises=Exercise.objects.filter(workout=workout)
            serializer=ExerciseSerializer(exercises,many=True)
           
            return Response(serializer.data)
            
        workouts = user.workout_set.all().filter(status='finished')

        exercises=[]
    
        for workout in workouts:
            for exercise in workout.exercises.all():
                exercises.append(exercise.name)
        
        unique_exercises=list(set(exercises))   #unique exercises names
    
        return Response({'data':unique_exercises})
    
    
    def post(self,request,user):
        serializer = ExerciseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()


            return Response(status=status.HTTP_201_CREATED)
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ExerciseDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes=permission
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


@method_decorator(UserMiddleware, name='dispatch')
class ChartsData(APIView):
    def get(self, request,user):

        workouts=user.workout_set.all().filter(status='finished')
        exercises=[]
        name=request.GET.get('exercise')
        for workout in workouts:
            exercises.extend(workout.exercises.all().filter(name=name))
            
        date=[]
        weight=[]

        for exercise in exercises:
            date.append(exercise.workout.date.strftime("%d/%B/%Y"))
            weight.append(exercise.weight)

        data={
        'options': {
            'chart': {
            'id': "basic-bar",
            'height':'auto'
            
            },
            'xaxis': {
            'type':"category",
            'categories': date,
            'labels':{
                'show':True
            }
            }
        },
        'series': [
            {
            'name': "Weight",
            'data': weight
            }
        ]

        }


        return Response(data)


@method_decorator(UserMiddleware, name='dispatch')
class GoalList(APIView):
    def get(self, request,user):
        goals=Goal.objects.filter(user=user)
        serializer=GoalSerializer(goals,many=True)
       
        return Response({'data':serializer.data})
     
    def post(self,request,user):
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response (status=status.HTTP_400_BAD_REQUEST)

class GoalDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes=permission  
    queryset=Goal.objects.all()
    serializer_class=GoalSerializer


class BaseExerciseList(generics.ListAPIView):
    permission_classes=permission  
    queryset=BaseExercise.objects.all()
    serializer_class=BaseExerciseSerializer
