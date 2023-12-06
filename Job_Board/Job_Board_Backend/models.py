from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

class Job( models.Model ):
    title = models.CharField( max_length = 150 )
    company = models.CharField( max_length = 150 )
    description = models.TextField()
    location = models.CharField( max_length = 150 )
    listing_date = models.DateTimeField( default = timezone.now )
    application_deadline = models.DateTimeField( )
    min_salary = models.DecimalField( max_digits = 8 , decimal_places = 1, null = True, blank = True )
    max_salary = models.DecimalField( max_digits = 8 , decimal_places = 1, null = True, blank = True )
    def __str__( self ):
        return self.title

class Applicant( models.Model ):
    first_name = models.CharField( max_length = 150 )
    last_name = models.CharField( max_length = 150 )
    email = models.EmailField( unique = True )
    phone_number = models.CharField( max_length = 10 )
    address = models.TextField()
    city = models.CharField( max_length = 15 )
    state = models.CharField( max_length = 15 )
    country = models.CharField( max_length = 15 )
    skills = models.TextField()
    education = models.TextField()
    experience = models.TextField()
    created_at = models.DateTimeField( default = timezone.now )
    def __str__( self ):
        return f"{self.first_name} {self.last_name}"

class Employer( models.Model ):
    company_name = models.CharField( max_length = 100 )
    email = models.EmailField( unique = True )
    phone_number = models.CharField( max_length = 15 )
    industry = models.CharField( max_length = 100 )
    company_description = models.TextField()
    created_at = models.DateTimeField( default = timezone.now )
    def __str__( self ):
        return self.company_name

class UserAbstract(AbstractUser):
    is_applicant = models.BooleanField(default=False)
    is_employer = models.BooleanField(default=False)

    class Meta:
        db_table = 'custom_user'
        verbose_name = _('user')
        verbose_name_plural = _('users')

    # Provide unique related_name values to avoid clashes
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to.'),
        related_name='custom_user_groups'  # Add a related_name to resolve the clash
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='custom_user_permissions'  # Add a related_name to resolve the clash
    )
