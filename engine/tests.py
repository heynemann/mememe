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

import re
import os
from glob import glob
from engine.models import Plugin
from django import conf
from django.core.urlresolvers import reverse
from django.test import TestCase
from nose.tools import assert_equals
from django.test.client import Client
from django.utils import simplejson

class ModelTests(TestCase):

    def setUp(self):
        self.old_plugin_dir = conf.settings.PLUGINS_DIRECTORY
        conf.settings.PLUGINS_DIRECTORY = 'engine/test-fixtures/plugins'

    def tearDown(self):
        conf.settings.PLUGINS_DIRECTORY = self.old_plugin_dir

    def test_find_plugin_files(self):
        "Can find plugin files in the settings plugin dir"

        plugins = Plugin.fetch_all()
        assert_equals(plugins[0].name, "Test plugin")
        assert_equals(plugins[0].description, "My first test plugin")
        assert_equals(plugins[0].slug, "test")
        assert_equals(plugins[0].js_url,
                      reverse('plugins-url', kwargs={'path': 'test.js'}))
        assert_equals(plugins[0].html_url,
                      reverse('plugins-url', kwargs={'path': 'test.html'}))

    def test_plugin_model_to_dict(self):
        "Plugin().to_dict() gives a nice dictionary"

        plugins = Plugin.fetch_all()
        plugin = plugins[0]

        my_dict = {
            'name': 'Test plugin',
            'description': "My first test plugin",
            'url': 'test'
        }
        assert_equals(plugin.to_dict(), my_dict)

    def test_plugin_model_to_json(self):
        "Plugin().to_json() gives a nice json"

        plugins = Plugin.fetch_all()
        plugin = plugins[0]

        my_json = simplejson.dumps({
            'name': 'Test plugin',
            'description': "My first test plugin",
            'url': 'test'
        })
        assert_equals(plugin.to_json(), my_json)

    def test_can_serve_static_files_properly(self):
        "Plugin files are being served properlu"

        client = Client()
        path_js = os.path.join(
            conf.settings.PLUGINS_DIRECTORY,
            'test.js'
        )
        path_html = os.path.join(
            conf.settings.PLUGINS_DIRECTORY,
            'test.html'
        )

        expected_js = open(path_js).read()
        expected_html = open(path_html).read()

        got_js = client.get(reverse('plugins-url', kwargs={'path': 'test.js'}))
        got_html = client.get(reverse('plugins-url', kwargs={'path': 'test.html'}))

        assert_equals(expected_html, got_html.content)
        assert_equals(expected_js, got_js.content)

class ViewTests(TestCase):
    def test_index_passes_users_ip_to_js_plugin(self):
        "The index passes user's IP to javascript"
        client = Client()

        response = client.get(reverse("index"))
        ip_address = re.search("ip: '(?P<ip>[^']+)'", response.content).group("ip")

        assert_equals(response.context['ip'], '127.0.0.1')
        assert_equals(ip_address, '127.0.0.1')

    def _test_index_passes_plugins_data_to_template(self):
        "The index passes plugins data to template"
        client = Client()

        response = client.get(reverse("index"))
        ip_address = re.search("ip: '(?P<ip>[^']+)'", response.content).group("ip")

        assert_equals(response.context['ip'], '127.0.0.1')
        assert_equals(ip_address, '127.0.0.1')
