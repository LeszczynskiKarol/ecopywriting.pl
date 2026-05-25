function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Don't touch root or URIs that look like files (contain a dot in last segment)
    if (uri === '/' ) {
        return request;
    }

    var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
    var hasExtension = lastSegment.indexOf('.') !== -1;

    // If path doesn't end in slash AND last segment has no extension → 301 to /path/
    if (!uri.endsWith('/') && !hasExtension) {
        var qs = request.querystring;
        var qsString = '';
        if (qs && Object.keys(qs).length > 0) {
            var parts = [];
            for (var k in qs) {
                if (qs[k].multiValue) {
                    for (var i = 0; i < qs[k].multiValue.length; i++) {
                        parts.push(k + '=' + qs[k].multiValue[i].value);
                    }
                } else {
                    parts.push(k + '=' + qs[k].value);
                }
            }
            qsString = '?' + parts.join('&');
        }
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: uri + '/' + qsString },
                'cache-control': { value: 'public, max-age=3600' }
            }
        };
    }

    return request;
}
