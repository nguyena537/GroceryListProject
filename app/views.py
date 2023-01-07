"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
import requests
from rest_framework import generics
from .models import ListItem
from .serializers import ListItemSerializer
import json
import array
import pandas as pd
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache


def StartUpAuthentication():
    loginInfo = {"Username": "andre", "Password": "password"}
    r = requests.post('https://localhost:7016/Authenticate', json=loginInfo, verify=False)
    response = json.loads(str(r.content)[2:-1])
    headers = {"Authorization": "bearer " + response['data']}

    return headers

def ViewItemsInList(request, listId):
    headers = StartUpAuthentication()
    serializer_class = ListItemSerializer

    r = requests.get('https://localhost:7016/api/App/ViewItemsInList/' + listId + '/' + str(request.COOKIES.get('userId')), headers=headers, verify=False)
    if (r.json()["success"] == False):
        return HttpResponse(r)
    elif (len(r.json()["data"]) == 0):
        return HttpResponse(json.dumps({"data": [], "success": True, "message": ""}))

    data = pd.DataFrame.from_dict(r.json()["data"])
    data = data.groupby("category")

    sortedData = []

    for name, group in data:
        for item in group.iterrows():
            newItem = ListItem()
            newItem.itemId = item[1][0]
            newItem.name = item[1][1]
            newItem.unit = item[1][2]
            newItem.photoUrl = item[1][3]
            newItem.category = item[1][4]
            newItem.quantity = item[1][5]
            newItem.crossedOff = item[1][6]
            newItem.note = item[1][7]

            sortedData.append(newItem)
    
    sortedItemsJson = []
    for item in sortedData:
        jsonItem = ListItemSerializer(item).data
        sortedItemsJson.append(jsonItem)
    

    return HttpResponse(json.dumps({"data": sortedItemsJson, "success": True, "message": ""}))


def ViewItemsContainingPhrase(self, phrase, listId):
    headers = StartUpAuthentication()
    r = requests.get('https://localhost:7016/api/App/ViewItemsContainingPhrase/' + phrase + "/" + listId, headers=headers, verify=False)
    return HttpResponse(r)


def AddExistingItemToList(self, listId, itemId):
    headers = StartUpAuthentication()
    r = requests.post('https://localhost:7016/api/App/AddExistingItemToList/' + listId + '-' + itemId, headers=headers, verify=False)
    return HttpResponse(r)


def ViewItemInfoInList(self, listId, itemId):
    headers = StartUpAuthentication()
    r = requests.get('https://localhost:7016/api/App/ViewItemInfoInList/' + listId + '/' + itemId, headers=headers, verify=False)
    return HttpResponse(r)

def ViewAllCategories(request):
    headers = StartUpAuthentication()
    r = requests.get('https://localhost:7016/api/App/ViewAllCategories/' + str(request.COOKIES.get('userId')), headers=headers, verify=False)
    return HttpResponse(r)

def EditItemInList(self, listId, itemId, elementToChange, newInfo):
    headers = StartUpAuthentication()
    r = requests.post('https://localhost:7016/api/App/EditItemInList/' + listId + '/' + itemId + '/' + elementToChange + '/' + newInfo, headers=headers, verify=False)
    return HttpResponse(r)

def RemoveItemFromList(self, listId, itemId):
    headers = StartUpAuthentication()
    r = requests.post('https://localhost:7016/api/App/RemoveItemFromList/' + listId + '/' + itemId, headers=headers, verify=False)
    return HttpResponse(r)

def ToggleCrossedOff(self, listId, itemId):
    headers = StartUpAuthentication()
    r = requests.post('https://localhost:7016/api/App/ToggleCrossedOff/' + listId + '/' + itemId, headers=headers, verify=False)
    return HttpResponse(r)

def ViewAppUserSetting(request):
    headers = StartUpAuthentication()
    r = requests.get('https://localhost:7016/api/App/ViewAppUserSetting/' + str(request.COOKIES.get('userId')), headers=headers, verify=False)
    return HttpResponse(r)

def ToggleShowCrossedOff(self, listId):
    headers = StartUpAuthentication()
    r = requests.post('https://localhost:7016/api/App/ToggleShowCrossedOff/' + listId, headers=headers, verify=False)
    return HttpResponse(r)

def ViewAllLists(request):
    headers = StartUpAuthentication()
    r = requests.get('https://localhost:7016/api/App/ViewAllLists/' + str(request.COOKIES.get('userId')), headers=headers, verify=False)
    return HttpResponse(r)

def ViewListInfo(self, listId):
    headers = StartUpAuthentication()
    r = requests.get('https://localhost:7016/api/App/ViewListInfo/' + listId, headers=headers, verify=False)
    return HttpResponse(r)

def RemoveList(request, listId):
    headers = StartUpAuthentication()
    r = requests.delete('https://localhost:7016/api/App/RemoveList/' + str(request.COOKIES.get('userId')) + '/' + listId, headers=headers, verify=False)
    return HttpResponse(r)

def CreateList(request, listName):
    headers = StartUpAuthentication()
    r = requests.put('https://localhost:7016/api/App/CreateList/' + str(request.COOKIES.get('userId')) + '/' + listName, headers=headers, verify=False)
    return HttpResponse(r)

def EditListName(self, listId, listName):
    headers = StartUpAuthentication()
    r = requests.post('https://localhost:7016/api/App/EditListName/' + listId + '/' + listName, headers=headers, verify=False)
    return HttpResponse(r)

@csrf_exempt
def UserLogin(request):
    headers = StartUpAuthentication()
    strObject = str(request.body)[2:-1]
    loginInfo = json.loads(strObject)
    loginInfo = {"Username": loginInfo["username"], "Password": loginInfo["password"]}

    r = requests.post('https://localhost:7016/UserLogin', json=loginInfo, headers=headers, verify=False)
    print(r)
    loginResponse = json.loads(str(r.content)[2:-1])
    response = HttpResponse(r)
    if (loginResponse['success']):
        response.set_cookie('userId', str(loginResponse['data']))

    return response

@csrf_exempt
def UserRegister(request):
    headers = StartUpAuthentication()
    strObject = str(request.body)[2:-1]
    registerInfo = json.loads(strObject)
    registerInfoObj = {
        "firstName": registerInfo['firstName'].capitalize(), 
        "lastName": registerInfo['lastName'].capitalize(),
        "email": registerInfo['email'],
        "username": registerInfo['username'],
        "password": registerInfo['password']      
    }

    r = requests.post('https://localhost:7016/UserRegister', json=registerInfoObj, headers=headers, verify=False)

    return HttpResponse(r)

def UserLogout(self):
    response = HttpResponseRedirect("/login")
    response.delete_cookie("userId")
    return response
        
    
