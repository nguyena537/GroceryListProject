from django.urls import path
from .views import ViewItemsInList


urlpatterns = [
    path(r'ViewItemsInList/<listId>', ViewItemsInList)

]
