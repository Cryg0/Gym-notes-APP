
from rest_framework import generics
from app.models import *
from .serializers import *
from rest_framework.permissions import  SAFE_METHODS,IsAuthenticated,IsAuthenticatedOrReadOnly,DjangoModelPermissions, BasePermission,AllowAny
from rest_framework import status
from app.models import Exercise
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
<<<<<<< Updated upstream
=======
from users.models import User
from users.authentication import decode_access_token
from rest_framework.authentication import get_authorization_header


import math
>>>>>>> Stashed changes

class PostUserWritePermission(BasePermission):
    message='Editing posts is restricted to the author only'
    
    def  has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        
        return obj.user == request.user

class PostList(generics.ListCreateAPIView):

    permission_classes=[AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView,PostUserWritePermission):

    permission_classes=[PostUserWritePermission]
    queryset=Post.objects.all()
    serializer_class=PostSerializer

class WorkoutList(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        serializer = WorkoutSerializer(data=request.data)
        if serializer.is_valid():
            workout=serializer.save()

            if workout:
               
                return Response(status=status.HTTP_201_CREATED,data=workout.id)
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
<<<<<<< Updated upstream
        user = request.user

        items = user.workout_set.all()
        serializer = WorkoutSerializer(items, many=True)
=======
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)
        



        user = User.objects.get(pk=id)
       

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
        
>>>>>>> Stashed changes

        # Filtering data by querry
        if 'results' in request.GET:
            limit=int(self.request.GET['results'])
            items=Workout.objects.all().order_by('-date')[:limit]
            serializer = WorkoutSerializer(items, many=True)
            return Response(serializer.data)
        
        return Response(serializer.data)
   

    def get_queryset(self):
        qs=super().get_queryset()
        if 'results' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=Workout.objects.all().order_by('-date')[:limit]
        return qs


# class WorkoutList(generics.ListCreateAPIView):

#     permission_classes=[AllowAny]
#     queryset = Workout.objects.all()
#     serializer_class = WorkoutSerializer



class WorkoutDetail(generics.RetrieveUpdateDestroyAPIView,PostUserWritePermission):

    permission_classes=[IsAuthenticated]   #[PostUserWritePermission]
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



class ExerciseList(generics.ListCreateAPIView):

    permission_classes=[AllowAny]
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class ExerciseDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes=[AllowAny]
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class WorkoutExercises(generics.ListCreateAPIView):

    permission_classes=[AllowAny]
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        
        workout_id=self.kwargs['workout_id']
        workout=Workout.objects.get(pk=workout_id)
       
        return Exercise.objects.filter(workout=workout)


class ExercisesList(generics.ListCreateAPIView):
    permission_classes=[AllowAny]
    serializer_class = ExerciseSerializer


@api_view(['GET', 'POST'])
def ExercisesData(request):
    pk=request.data['pk']
    workout=Workout.objects.get(pk=pk)
    
    for data in request.data['data'].split(','):
        obj=Exercise.objects.create(name=data,workout=workout)
        obj.save()

    if request.method == 'GET':
          print(request.data)
    return Response(request.data)


