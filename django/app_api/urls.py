from django.urls import path
from .views import PostList, PostDetail,WorkoutDetail,WorkoutList,ExerciseList,WorkoutExercises,ExerciseDetail,ChartsData

app_name='app.api'

urlpatterns=[
    path('posts/<int:pk>/',PostDetail.as_view(),name='detail-create'),
    path('posts/',PostList.as_view(),name='list-create'),
    path('workouts/',WorkoutList.as_view(),name='workout-list'),
    path('workouts/<int:pk>/',WorkoutDetail.as_view(),name='workout-detail'),
    path('exercises/',ExerciseList.as_view(),name='exercise-list'),
    path('exercises/<int:pk>/',ExerciseDetail.as_view(),name='exercise-detail'),
    path('workoutExercises/<int:workout_id>',WorkoutExercises.as_view(),name='exercises-list'),
    path('chart-data/',ChartsData.as_view(),name='chart-data')
    


]