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
<<<<<<< Updated upstream
    path('workoutExercises/<int:workout_id>',WorkoutExercises.as_view(),name='exercises-list'),
    path('data/',ExercisesData,name='exercise'),
=======
    path('chart-data/',ChartsData.as_view(),name='chart-data'),
    path('goals/',GoalList.as_view(),name='goals-list'),
    path('goals/<int:pk>/',GoalDetail.as_view(),name='goal-detail'),

    
>>>>>>> Stashed changes


]