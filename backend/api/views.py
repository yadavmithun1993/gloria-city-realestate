from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction
from .models import Plot
from .serializers import PlotSerializer, BookingSerializer

@api_view(['GET'])
def get_plots(request):
    """
    Returns a list of all plots in the database.
    """
    plots = Plot.objects.all().order_by('plot_number')
    serializer = PlotSerializer(plots, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@transaction.atomic
def submit_booking(request):
    """
    Creates a new booking and updates the plot status to 'on_hold'.
    """
    plot_id = request.data.get('plot_id')
    
    try:
        plot = Plot.objects.select_for_update().get(id=plot_id)
    except Plot.DoesNotExist:
        return Response({'error': 'Plot not found'}, status=status.HTTP_404_NOT_FOUND)

    if plot.status != 'available':
        return Response({'error': 'This plot is no longer available'}, status=status.HTTP_400_BAD_REQUEST)

    # Prepare data for booking serializer
    booking_data = {
        'plot': plot.id,
        'customer_name': request.data.get('customer_name'),
        'phone_number': request.data.get('phone_number'),
        'email': request.data.get('email'),
        'gov_id': request.data.get('gov_id'),
    }

    serializer = BookingSerializer(data=booking_data)
    if serializer.is_valid():
        # Save booking
        serializer.save()
        
        # Update plot status to prevent double bookings
        plot.status = 'on_hold'
        plot.save()
        
        return Response({'message': 'Booking successful, plot put on hold'}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
