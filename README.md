jQuery Icon Editor
===========

Creates a bitmap edtior for small raster graphics on an HTML5 canvas.

Supports pixel painting in a zoomed view with a small preview. You can add the controls you need yourself and link them to the plugin.

### Example

    $('#canvas').iconEditor({
        'pen': {
            'size': $('#pen_size').val()
        },
        'zoom': 10,
        'preview': '#preview'
    });

Demo: http://jsfiddle.net/x6sAT/9/embedded/result/
