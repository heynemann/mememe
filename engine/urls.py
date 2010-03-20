from django.conf.urls.defaults import *
from django.conf import settings

MEDIA = {'document_root': settings.PLUGINS_DIRECTORY}

urlpatterns = patterns(
    '',
    url(r'plugins/(?P<path>.*)$', 'django.views.static.serve', MEDIA,
        name='plugins-url'),

)
