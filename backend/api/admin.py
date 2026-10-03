from django.contrib import admin
from .models import Plot, Booking

@admin.register(Plot)
class PlotAdmin(admin.ModelAdmin):
    list_display = ('plot_number', 'size_sq_yards', 'price', 'status', 'updated_at')
    list_filter = ('status',)
    search_fields = ('plot_number',)
    list_editable = ('status',)
    ordering = ('plot_number',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('plot', 'customer_name', 'phone_number', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer_name', 'phone_number', 'email', 'plot__plot_number')
    list_editable = ('status',)
    readonly_fields = ('created_at',)
