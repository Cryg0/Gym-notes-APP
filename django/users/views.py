from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
<<<<<<< Updated upstream
from .serializers import RegisterUserSerializer,ProfileSerializer
=======
from .serializers import ProfileSerializer,UserSerializer
>>>>>>> Stashed changes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from .models import User,Profile
from rest_framework import generics
from .models import Profile
from rest_framework.exceptions import APIException, AuthenticationFailed
from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
from rest_framework.authentication import get_authorization_header



<<<<<<< Updated upstream

class UserCreate(APIView):
=======
class RegisterAPIView(APIView):
>>>>>>> Stashed changes
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
<<<<<<< Updated upstream
            newuser=serializer.save()

            if newuser:
                
                profile=Profile.objects.create(user=newuser)
                profile.save()

                return Response(status=status.HTTP_201_CREATED)
=======
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
>>>>>>> Stashed changes
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        user = User.objects.filter(email=request.data['email']).first()

        if not user:
            raise APIException('Invalid credentials!')

        if not user.check_password(request.data['password']):
            raise APIException('Invalid credentials!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()

        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True,samesite="none",secure=True)
        response.data = {
            'token': access_token
        }

        return response



class UserAPIView(APIView):
    def get(self, request):
      
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()

            return Response(UserSerializer(user).data)

        raise AuthenticationFailed('unauthenticated')


class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })


class LogoutAPIView(APIView):
    def post(self, _):
       
        response = Response()
       
        
        response.delete_cookie("refreshToken")
        

        response.data = {
            'message': 'success'
        }
        return response



class BlackListTokenView(APIView):

    permission_classes=[AllowAny]

    def post(self,request):
        try:
            refresh_token=request.data['refresh_token']
            token= RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):
    permission_classes=[AllowAny]
   
  

    def get(self, request):
        user = request.user

        profile=Profile.objects.get(user=user.pk)
        serializer = ProfileSerializer(profile)


       
        
        return Response(serializer.data)

