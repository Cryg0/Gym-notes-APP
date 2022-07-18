from rest_framework.authentication import get_authorization_header
from users.models import User
from users.authentication import decode_access_token




class UserMiddleware:
  def __init__(self, get_response):
    self.get_response = get_response
    # One-time configuration and initialization.

  def __call__(self, request):
    # Code to be executed for each request before
    # the view (and later middleware) are called.
    auth = get_authorization_header(request).split()
    user = None
    if auth and len(auth) == 2:
      token = auth[1].decode('utf-8')
      id = decode_access_token(token)
      user = User.objects.get(pk=id)
    response = self.get_response(request, user)

    # Code to be executed for each request/response after
    # the view is called.

    return response
