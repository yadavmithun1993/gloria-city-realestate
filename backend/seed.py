import os
import sys
import django

sys.path.append('E:\\AntiGravity\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@gloriacity.com', 'admin')

from api.models import Plot

plots_data = [
    (1, 149.69, 5000), (2, 200, 5000), (3, 200, 5000), (4, 266.66, 5000), (5, 266.66, 5000), (6, 200, 5000), (7, 266.78, 5000),
    (8, 242.49, 4000), (9, 166.66, 4000), (10, 222.22, 4000), (11, 222.22, 4000), (12, 166.66, 4000), (13, 166.66, 4000),
    (14, 93.45, 4000), (15, 198.27, 4000), (16, 150, 4000), (17, 200, 4000), (18, 200, 4000), (19, 150, 4000), (20, 150, 4000),
    (21, 103.20, 4000), (22, 126.51, 4000), (23, 150, 4000), (24, 150, 4000), (25, 200, 4000), (26, 200, 4000), (27, 150, 4000),
    (28, 178.66, 4000), (29, 146.54, 4000), (30, 150, 4000), (31, 200, 4000), (32, 200, 4000), (33, 150, 4000), (34, 150, 4000),
    (35, 154.91, 4000), (36, 105.51, 3500), (37, 150, 3500), (38, 150, 3500), (39, 150, 3500), (40, 150, 3500), (41, 150, 3500),
    (42, 150, 3500), (43, 150, 3500), (44, 150, 3500), (45, 150, 3500), (46, 150, 3500)
]

for p in plots_data:
    Plot.objects.update_or_create(
        id=f'p-{p[0]}',
        defaults={
            'plot_number': str(p[0]),
            'size_sq_yards': p[1],
            'price': p[1] * p[2]
        }
    )

print('Admin created and plots seeded!')
