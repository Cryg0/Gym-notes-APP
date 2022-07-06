from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from app.models import Post,Category
from django.contrib.auth.models import User
from rest_framework.test import APIClient



class PostTests(APITestCase):
    def test_view_posts(self):

        url = reverse('app_api:listcreate')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)


    def create_post(self):
        self.test_category = Category.objects.create(name='Django')

        self.testUser1 = User.objects.create_user(username='test',password='test123')


        data={"title":"new","author":1,"content":"new","status":"published"}
        url=reverse('app_api:listcreate')
        response=self.client.post(url,data,format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def test_create_post(self):

        self.test_category = Category.objects.create(name='django')
        self.testUser1= User.objects.create_superuser(username='test_user1',password='123456789')

        self.client.login(username=self.testUser1.username,password='123456789')

        data={"title":"new","author":1,"content":"new"}
        url=reverse('app_api:listcreate')
        response=self.client.post(url,data,format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

        root= reverse(('app_api:detailcreate'),kwargs={'pk':1})
        response = self.client.get(url,format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)


    def test_post_update(self):
        
        client = APIClient()

        self.test_category = Category.objects.create(name='Django')
        self.testUser1 = User.objects.create_user(username='test',password='test123')
        self.testUser2 = User.objects.create_user(username='test2',password='test1234')

        post1= Post.objects.create(category_id=1,title='Django',content='Django is great',\
            slug='post-title',author_id=1,status='published')

        client.login(username=self.testUser1.username,password='test123')

        url = reverse(('app_api:detailcreate'),kwargs={'pk':1})
        response= client.put(url,{
            "id":1,
            "title":"test",
            "author":1,
            "content":"New",
            "status":'published'
        },format='json')
        print(response.data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)