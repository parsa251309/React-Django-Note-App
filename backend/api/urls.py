from django.urls import path
from . import views

urlpatterns = [
    path("notes/",views.note_list_create,name="note-list"),
    path("notes/delete/<int:pk>/",views.note_delete,name="note-delete")
]
