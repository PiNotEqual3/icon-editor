(function( $ ){
    var methods = {
        init : function( options ) {
            var canvas = this;
            var context = canvas.get(0).getContext("2d");
            var settings = $.extend(true, {
                'pen': {
                    'size': 1,
                    'color': '#000000'
                },
                'preview': false,
                'background': '#ffffff',
                'zoom': 10
            }, options, {
                'canvas': canvas,
                'context': context
            });
            
            canvas.data('iconEditor', settings);
            
            //Background
            context.fillStyle = settings.background;
            context.fillRect(0, 0, canvas.height(), canvas.width());
            
            if (settings.preview)
            {
                var preview = $(settings.preview);
                settings.preview_ctx = preview.get(0).getContext("2d");
                settings.preview_ctx.fillStyle = settings.background;
                settings.preview_ctx.fillRect(0, 0, preview.height(), preview.width());
            }
            // set painting color
            canvas.iconEditor('setColor', settings.pen.color);
            
            var mouse_down = false;
            $(document).mouseup(function() {
                mouse_down = false;
            });
            canvas.mousedown(function(e){
                //  click
                if (e.which == 1 || e.which == 3)
                {
                    mouse_down = true;
                    if (e.which == 1)
                    {
                        // left click
                        canvas.iconEditor('setColor', settings.pen.color);
                    }
                    else
                    {
                        // right click
                        canvas.iconEditor('setColor', settings.background);
                    }
                    
                    var x = (e.pageX - this.offsetLeft);
                    var y = (e.pageY - this.offsetTop);
                    x = settings.zoom * Math.floor( x / settings.zoom );
                    y = settings.zoom * Math.floor( y / settings.zoom );
                    canvas.iconEditor('setPixel', x, y);
                }
                
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
            canvas.mousemove(function(e){
                // Left mouse click
                if(mouse_down)
                {
                    var x = (e.pageX - this.offsetLeft);
                    var y = (e.pageY - this.offsetTop);
                    x = settings.zoom * Math.floor( x / settings.zoom );
                    y = settings.zoom * Math.floor( y / settings.zoom );
                    canvas.iconEditor('setPixel', x, y);
                }
            });
            // prevent context menu
            canvas.contextmenu(function(e){
                e.preventDefault();
                return false;
            });
        },
        setColor: function(color)
        {
            var settings = this.data('iconEditor');
            settings.context.fillStyle = color;
            if (settings.preview)
            {
                settings.preview_ctx.fillStyle = color;
            }
        },
        option: function(new_settings)
        {
            var settings = this.data('iconEditor');
            settings = $.extend(true, settings, new_settings);
        },
        setPixel: function (x, y){
            var settings = this.data('iconEditor');
            settings.context.fillRect(x, y, settings.pen.size * settings.zoom, settings.pen.size * settings.zoom);
            if (settings.preview)
            {
                settings.preview_ctx.fillRect(x/settings.zoom, y/settings.zoom, settings.pen.size*1, settings.pen.size*1);
            }
        },
        getImage: function()
        {
            var settings = this.data('iconEditor');
            return $(settings.preview).get(0).toDataURL("image/png");
        },
  	clear: function()
		{
			var settings = this.data('iconEditor');
            // Background
            settings.context.fillStyle = settings.background;
            settings.context.fillRect(0, 0, settings.canvas.height(), settings.canvas.width());
			
			// preview Background
            if (settings.preview)
            {
                var preview = $(settings.preview);
                settings.preview_ctx = preview.get(0).getContext("2d");
                settings.preview_ctx.fillStyle = settings.background;
                settings.preview_ctx.fillRect(0, 0, preview.height(), preview.width());
            }
		}
    };

    $.fn.iconEditor = function( method )
    {
        // Method calling logic
        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.iconEditor' );
        }    
    };
})( jQuery );
