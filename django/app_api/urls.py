from django.urls import URLPattern, path
from .views import PostList, PostDetail,WorkoutDetail,WorkoutList,ExerciseList,WorkoutExercises,ExercisesData,ExerciseDetail

app_name='app.api'

urlpatterns=[
    path('posts/<int:pk>/',PostDetail.as_view(),name='detailcreate'),
    path('posts/',PostList.as_view(),name='listcreate'),
    path('workouts/',WorkoutList.as_view(),name='workout-list'),
    path('workouts/<int:pk>/',WorkoutDetail.as_view(),name='workout-detail'),
    path('exercises/',ExerciseList.as_view(),name='exercise-list'),
    path('exercises/<int:pk>/',ExerciseDetail.as_view(),name='exercise-detail'),
    path('workoutExercises/<int:workout_id>',WorkoutExercises.as_view(),name='exercises-list'),
    path('data/',ExercisesData,name='exercise'),


]