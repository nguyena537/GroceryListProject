"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
import requests
from rest_framework import generics
from .models import ListItem

def ViewItemsInList(self, listId):
    r = requests.get('https://localhost:7016/api/App/ViewItemsInList/' + listId, verify=False)
    return HttpResponse(r)
