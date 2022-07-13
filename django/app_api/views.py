from rest_framework import generics
from app.models import *
from .serializers import *
from rest_framework.permissions import  SAFE_METHODS,IsAuthenticated, BasePermission,AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

import math

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

class WorkoutList(APIView):
    permission_classes = permission   
    
    def post(self,request):
        exercises=request.data['exercises']
        data=dict(request.data)
        data.pop('exercises')
       
        
        serializer = WorkoutSerializer(data=request.data)

        if serializer.is_valid():
            workout=serializer.save()

            if workout:
                for exercise in exercises.split(','):
                    Exercise.objects.create(name=exercise,workout=workout)

               
                return Response(status=status.HTTP_201_CREATED)
        return Response (status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        user = request.user
       
        items = user.workout_set.all()
        total=items.count()

        # # Filtering data by querry
        # if 'results' in request.GET:
        #     limit=int(self.request.GET['results'])
        #     items=user.workout_set.all().order_by('-date')[:limit]
        
        if 'sort' in request.GET:
            sort=request.GET['sort']
                
            if sort=='finished':
                items=user.workout_set.all().filter(status='finished')
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
   

 
class WorkoutDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes=permission  
    queryset=Workout.objects.all()
    serializer_class=WorkoutSerializer



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class ExerciseList(APIView):  
    permission_classes=permission
    serializer_class = ExerciseSerializer

    def get(self, request):

        workout_id=request.GET.get('workout_id')

        if workout_id:
            workout=Workout.objects.get(pk=workout_id)
            exercises=Exercise.objects.filter(workout=workout)
            serializer=ExerciseSerializer(exercises,many=True)
           
            return Response(serializer.data)
            
        user = request.user
        workouts = user.workout_set.all().filter(status='finished')

        exercises=[]
    
        for workout in workouts:
            for exercise in workout.exercises.all():
                exercises.append(exercise.name)
        
        unique_exercises=list(set(exercises))   #unique exercises names
    

        return Response({'data':unique_exercises})
    
    
    def post(self,request):
        serializer = ExerciseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()


            return Response(status=status.HTTP_201_CREATED)
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    

class ExerciseDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes=permission
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class ChartsData(APIView):
     def get(self, request):
        user = self.request.user
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