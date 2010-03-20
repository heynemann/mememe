#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls.defaults import *
from django.conf import settings

PLUGINS = {'document_root': settings.PLUGINS_DIRECTORY}
MEDIA = {'document_root': settings.LOCAL_FILE('media')}

urlpatterns = patterns('',
    url(r'^plugins/(?P<path>.*)$', 'django.views.static.serve', PLUGINS,
        name='plugins-url'),
    url(r'^media/(?P<path>.*)', 'django.views.static.serve', MEDIA),
    url(r'', 'engine.views.index', name='index'),
)
