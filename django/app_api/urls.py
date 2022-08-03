from django.urls import path
from .views import (PostList, PostDetail,WorkoutDetail,WorkoutList,
                    ExerciseList,ExerciseDetail,ChartsData,GoalList,
                    GoalDetail,BaseExerciseList,LatestWorkout)


app_name='app.api'

urlpatterns=[
    path('posts/<int:pk>/',PostDetail.as_view(),name='detail-create'),
    path('posts/',PostList.as_view(),name='list-create'),
    path('workouts/',WorkoutList.as_view(),name='workout-list'),
    path('workouts/<int:pk>/',WorkoutDetail.as_view(),name='workout-detail'),
    path('exercises/',ExerciseList.as_view(),name='exercise-list'),
    path('exercises/<int:pk>/',ExerciseDetail.as_view(),name='exercise-detail'),
    path('workouts/latest/',LatestWorkout.as_view(),name='workout-latest'),

    path('exercises/<int:workout_id',ExerciseList.as_view(),name='exercises-list'),
    path('chart-data/',ChartsData.as_view(),name='chart-data'),
    path('goals/',GoalList.as_view(),name='goals-list'),
    path('goals/<int:pk>/',GoalDetail.as_view(),name='goal-detail'),
    path('base-exercises/',BaseExerciseList.as_view(),name='baseEx-list'),


]