# -*- coding: utf-8 -*-
#
# Copyright (C) 2010  Lincoln de Sousa <lincoln@comum.org>
# Copyright (C) 2010  Gabriel Falcão <gabriel@nacaolivre.org>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
import os

from glob import glob
from ConfigParser import ConfigParser

from django.conf import settings
from django.core.urlresolvers import reverse
from django.utils import simplejson

class Plugin(object):
    name = None
    description = None
    js_url = None
    html_url = None
    slug = None
    default = False

    def to_dict(self):
        d = {
            'name': self.name,
            'description': self.description,
            'slug': self.slug,
            'js_url': self.js_url,
            'html_url': self.html_url,
            'default': self.default,
        }
        return d

    def to_json(self):
        return simplejson.dumps(self.to_dict())

    @classmethod
    def fetch_all(cls):
        plugins = []
        files = glob(os.path.join(settings.PLUGINS_DIRECTORY, "*.cfg"))
        for i in files:
            fname = os.path.splitext(os.path.basename(i))[0]
            plugin = cls()
            cfg = ConfigParser()
            cfg.read(os.path.abspath(i))
            plugin.name = cfg.get('Default', 'name')
            plugin.slug = fname
            plugin.description = cfg.get('Default', 'description')
            plugin.js_url = reverse('plugins-url',
                                    kwargs={'path': '%s.js' % fname})
            plugin.html_url = reverse('plugins-url',
                                      kwargs={'path': '%s.html' % fname})

            if cfg.has_option('Default', 'default'):
                plugin.default = cfg.getboolean('Default', 'default')
            else:
                plugin.default = False
            plugins.append(plugin)

        return plugins
