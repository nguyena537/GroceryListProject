from django.urls import path
from .views import ViewItemsInList, ViewItemsContainingPhrase, AddExistingItemToList, ViewItemInfoInList, ViewAllCategories, EditItemInList, RemoveItemFromList,ToggleCrossedOff, ViewAppUserSetting, ToggleShowCrossedOff, ViewAllLists, ViewListInfo, CreateList, RemoveList, EditListName, UserLogin, StartUpAuthentication, UserRegister, UserLogout


urlpatterns = [
    path(r'ViewItemsInList/<listId>', ViewItemsInList),
    path(r'ViewItemsContainingPhrase/<phrase>/<listId>', ViewItemsContainingPhrase),
    path(r'AddExistingItemToList/<listId>/<itemId>', AddExistingItemToList),
    path(r'ViewItemInfoInList/<listId>/<itemId>', ViewItemInfoInList),
    path(r'ViewAllCategories', ViewAllCategories),
    path(r'EditItemInList/<listId>/<itemId>/<elementToChange>/<newInfo>', EditItemInList),
    path(r'RemoveItemFromList/<listId>/<itemId>', RemoveItemFromList),
    path(r'ToggleCrossedOff/<listId>/<itemId>', ToggleCrossedOff),
    path(r'ViewAppUserSetting', ViewAppUserSetting),
    path(r'ToggleShowCrossedOff/<listId>', ToggleShowCrossedOff),
    path(r'ViewAllLists', ViewAllLists),
    path(r'ViewListInfo/<listId>', ViewListInfo),
    path(r'CreateList/<listName>', CreateList),
    path(r'RemoveList/<listId>', RemoveList),
    path(r'EditListName/<listId>/<listName>', EditListName),
    path(r'UserLogin', UserLogin),
    path(r'UserRegister', UserRegister),
    path(r'StartUpAuthentication', StartUpAuthentication),
    path(r'UserLogout', UserLogout)
]
