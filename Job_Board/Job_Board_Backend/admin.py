from django.contrib import admin
from .models import Job, Applicant, Employer

# Register your models here.
admin.site.register( Job )
admin.site.register( Applicant )
admin.site.register( Employer )
