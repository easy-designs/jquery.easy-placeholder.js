/*! Easy Placeholder (c) Aaron Gustafson (@AaronGustafson). MIT License. http://github.com/easy-designs/jquery.easy-placeholder.js */

/* Easy Placeholder API
 * 
 * Use the placeholder attribute. We’ll do the rest.
 * 
 **/

(function( $ ){
	
	var FALSE = false,
		TRUE = true,
		PLACEHOLDER = 'placeholder',
		EMPTY = '',
		BLUR = 'blur',
		$note = $('<em class="placeholder"/>'),
		// Placeholder support?
		html5_placeholder = (function( props ){

			if ( ! ( 'placeholder' in document.createElement('input') ) )
			{
				return FALSE;
			}
			else
			{
				return TRUE;
			}
		}());
	
	function focus( e )
	{
		var $input = $(this);
		
		if ( $input.val() == $input.attr( PLACEHOLDER ) )
		{
			$input.val( EMPTY );
		}
	}
	
	function blur( e )
	{
		var $input = $(this);
		
		if ( $input.val() == EMPTY )
		{
			$input.val( $input.attr( PLACEHOLDER ) );
		}
	}
	
	function submitHandler(e) {

		var $form = $(this);

		$form.find('input[placeholder]').each(function(){
			var $input = $(this);

			if ($input.val() == $input.attr( PLACEHOLDER ) ) {
				$input.val(EMPTY);
			}
		});
		
	}
	// Plugin
	$.fn.enable_placeholder = function(){
		
		if ( ! html5_placeholder )
		{
			$(this)
				// no radio or checkbox; passwords handled separately
				.filter(':not([type=radio],[type=checkbox],[type=password])')
					.on( 'focus', focus )
					.on( BLUR, blur )
					.trigger( BLUR )
					.end()
				// IE won’t let you change type, so we’ll just make a note
				.filter('[type=password]')
					.each(function(){
						
						var $input = $(this);
						
						$note.clone()
							.text( $input.attr( PLACEHOLDER ) )
							.appendTo( $input.parent() );
						
				});

				$(this).closest('form').on('submit', submitHandler);
		}

		return this;
	};
	
	// auto-run
	$('input[placeholder]')
		.enable_placeholder();
	
	
})( jQuery, document, window, navigator.userAgent.toLowerCase() );