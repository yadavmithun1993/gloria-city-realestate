from django.db import models
from django.core.validators import MinValueValidator

class Plot(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('on_hold', 'On Hold'),
        ('sold', 'Sold'),
    ]

    id = models.CharField(max_length=50, primary_key=True)  # e.g., p-1
    plot_number = models.CharField(max_length=20, unique=True) # e.g., A-1
    size_sq_yards = models.IntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Plot {self.plot_number} - {self.get_status_display()}"


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    plot = models.ForeignKey(Plot, on_delete=models.CASCADE, related_name='bookings')
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    gov_id = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} for {self.plot.plot_number} by {self.customer_name}"
