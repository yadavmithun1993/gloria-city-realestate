from rest_framework import serializers
from .models import Plot, Booking

class PlotSerializer(serializers.ModelSerializer):
    # Mapping exact field names to what the frontend expects
    plotNumber = serializers.CharField(source='plot_number')
    sizeSqYards = serializers.IntegerField(source='size_sq_yards')
    
    class Meta:
        model = Plot
        fields = ['id', 'plotNumber', 'sizeSqYards', 'price', 'status']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['plot', 'customer_name', 'phone_number', 'email', 'gov_id']
