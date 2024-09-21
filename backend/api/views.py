from . import serializers,models
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
@permission_classes([AllowAny])
def create_user(request):
    user_s = serializers.UserSerializer(data=request.data)

    if (user_s.is_valid()):
        user_s.save()
        return Response(user_s.data)
    
    else:
        return Response(user_s.errors)

@api_view(["POST","GET"])
@permission_classes([IsAuthenticated])
def note_list_create(request):
    if (request.method == "GET"):
        user_notes = request.user.notes.all()
        s = serializers.NoteSerializers(user_notes,many=True)
        return Response(s.data,status=status.HTTP_200_OK)
    elif(request.method == "POST"):
        request.data["author"] = request.user.id
        note_s = serializers.NoteSerializers(data=request.data)
        
        if (note_s.is_valid()):
            note_s.save()
            return Response(note_s.data,status=status.HTTP_201_CREATED)
        else:
            return Response(note_s.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def note_delete(request,pk):
    user_notes = request.user.notes.all()

    note = user_notes.filter(id=pk).first()
    
    if (note != None):
        note.delete()
        return Response({"detail":"Note deleted"})

    return Response({"detail":"Note not found"},status=status.HTTP_404_NOT_FOUND)
