#!/usr/bin/env python

import os
import re
import wsgiref.simple_server

def content_type(filename):
    ext = filename.rsplit('.')[-1]
    return {
            'html': 'text/html',
            'txt': 'text/plain',
            'js': 'text/javascript',
            'css': 'text/css',
            'svg': 'image/svg+xml',
            'png': 'image/png',
            }.get(ext, 'application/%s' % ext)

def get_file(path):
    if '..' in path:
        return
    try:
        with open(path) as f:
            return f.read()
    except IOError:
        return

def serve_file(environ, start_response, path):
    f = get_file(path[0])
    if f:
        start_response('200 OK', [('Content-type', content_type(path[0]))])
        return f
    else:
        start_response('404 Not Found', [])
        return 'File not found'

def json_api(environ, start_response, path):
    start_response('200 OK', [('Content-type', 'application/json')])

    return '''[{
            "startDate": "2013-07-16T05:28Z",
            "duration": "00:00:02",
            "owner": "stefanha",
            "users": ["stefanha"],
            "url": "http://jammr.net/recorded_jams/2",
            "mixUrl": "http://localhost:8000/files/1.m4a",
            "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
    }, {
            "startDate": "2013-07-16T05:28Z",
            "duration": "00:00:02",
            "owner": "stefanha",
            "users": ["stefanha"],
            "url": "http://jammr.net/recorded_jams/2",
            "mixUrl": "http://localhost:8000/files/2.m4a",
            "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
    }, {
            "startDate": "2013-07-16T05:28Z",
            "duration": "00:30:15",
            "owner": "stefanha",
            "users": ["stefanha", "lennard", "andhai"],
            "url": "http://jammr.net/recorded_jams/2",
            "mixUrl": "http://localhost:8000/files/3.m4a",
            "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
    }]
'''

urls = [
        ('/$', json_api),
        ('/(.*)$', serve_file),
        ]

def jammr_test(environ, start_response):
    path = environ['PATH_INFO']
    for url, handler in urls:
        m = re.match(url, path)
        if m:
            return handler(environ, start_response, m.groups())
    start_response('404 Not Found', [])
    return 'Page Not Found'

httpd = wsgiref.simple_server.make_server('', 8000, jammr_test)
print 'Serving on port 8000...'
httpd.serve_forever()
