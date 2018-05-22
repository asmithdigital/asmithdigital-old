	
// Fix the header 

function fixHeader(){
	var $header = $('header');
	var headHeight = $header.position().top + $header.outerHeight(true);
    var height = $(window).scrollTop();
    if((height > headHeight) && ($(window).width() > 767)) {
		$header.addClass('fixed-header').css({
            'display': 'none'
        }).fadeIn(300);
	} else {
		$header.removeClass('fixed-header');
	}
}


$(window).scroll(function() {
	fixHeader();
});

$( window ).resize(function() {
	var $header = $('header');
  	if($(window).width() > 767) {
		$header.removeClass('fixed-header');
	} else {
		fixHeader();
	}
});


$(function() {

	// Process contact form

	$('#send').click(function(){
		$(this).val('Sending ...');
		$('#success p').remove();
		$.post('contact/contact.php', $('#planner-form').serialize(), function(response) {
			$('#success').html(response);
			//$('#success').hide('slow');
			$('#send').val('Contact me');
		});
		return false;
	});


  // Smooth scroll 

    function smoothScroll() {

        $('a[href*=#]:not([href=#])').click(function () {

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {

                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 500);

                    return false;

                }

            }

        });

    }

    smoothScroll();



	// Custom imagelightbox setup

	// ACTIVITY INDICATOR

	var activityIndicatorOn = function()
		{
			$( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
		},
		activityIndicatorOff = function()
		{
			$( '#imagelightbox-loading' ).remove();
		},


		// OVERLAY

		overlayOn = function()
		{
			$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
		},
		overlayOff = function()
		{
			$( '#imagelightbox-overlay' ).remove();
		},


		// CLOSE BUTTON

		closeButtonOn = function (instance) {
            $('<a href="#" id="imagelightbox-close" class="imagelightbox-navigation"><i class="icon icon-close"></i></a>').appendTo('body').on('click', function () {
                $(this).remove();
                instance.quitImageLightbox();
                return false;
            });
        },
		closeButtonOff = function()
		{
			$( '#imagelightbox-close' ).remove();
		},


		// CAPTION

		captionOn = function()
		{
			var description = $( 'a[data-imagelightbox]' ).attr( 'title' );
			if( description.length > 0 )
				$( '<div id="imagelightbox-caption"><p>' + description + '</p></div>' ).appendTo( 'body' );
		},
		captionOff = function()
		{
			$( '#imagelightbox-caption' ).remove();
		},


		// NAVIGATION

		navigationOn = function( instance, selector )
		{
			var images = $( selector );
			if( images.length )
			{
				var nav = $( '<div id="imagelightbox-nav"></div>' );
				for( var i = 0; i < images.length; i++ )
					nav.append( '<button type="button"></button>' );

				nav.appendTo( 'body' );
				nav.on( 'click touchend', function(){ return false; });

				var navItems = nav.find( 'button' );
				navItems.on( 'click touchend', function()
				{
					var $this = $( this );
					if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
						instance.switchImageLightbox( $this.index() );

					navItems.removeClass( 'active' );
					navItems.eq( $this.index() ).addClass( 'active' );

					return false;
				})
				.on( 'touchend', function(){ return false; });
			}
		},
		navigationUpdate = function( selector )
		{
			var items = $( '#imagelightbox-nav button' );
			items.removeClass( 'active' );
			items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
		},
		navigationOff = function()
		{
			$( '#imagelightbox-nav' ).remove();
		},


		// ARROWS

		arrowsOn = function( instance, selector )
		{
			var $arrows = $( '<a href="#" class="imagelightbox-navigation imagelightbox-arrow imagelightbox-arrow-left"><i class="icon icon-arrow-left"></i></a><a href="#" class="imagelightbox-navigation imagelightbox-arrow imagelightbox-arrow-right"><i class="icon icon-arrow-right"></i></a>' );

			$arrows.appendTo( 'body' );

			$arrows.on( 'click touchend', function( e )
			{
				e.preventDefault();

				var $this	= $( this ),
					$target	= $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
					index	= $target.index( selector );

				if( $this.hasClass( 'imagelightbox-arrow-left' ) )
				{
					index = index - 1;
					if( !$( selector ).eq( index ).length )
						index = $( selector ).length;
				}
				else
				{
					index = index + 1;
					if( !$( selector ).eq( index ).length )
						index = 0;
				}

				instance.switchImageLightbox( index );
				return false;
			});
		},
		arrowsOff = function()
		{
			$( '.imagelightbox-arrow' ).remove();
		};



	var selectorF = 'a[data-imagelightbox="smithy"]';
	var instanceF = $( selectorF ).imageLightbox(
	{
		onStart:		function() { overlayOn(); closeButtonOn( instanceF ); arrowsOn( instanceF, selectorF ); },
		onEnd:			function() { overlayOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
		onLoadStart: 	function() { activityIndicatorOn(); },
		onLoadEnd:	 	function() { activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
	});



	// $( 'a[data-imagelightbox="a"]' ).imageLightbox(
	// {
	// 	onLoadStart:	function() { activityIndicatorOn(); },
	// 	onLoadEnd:		function() { activityIndicatorOff(); },
	// 	onEnd:	 		function() { activityIndicatorOff(); }
	// });


	//	WITH OVERLAY & ACTIVITY INDICATION

	// $( 'a[data-imagelightbox="b"]' ).imageLightbox(
	// {
	// 	onStart: 	 function() { overlayOn(); },
	// 	onEnd:	 	 function() { overlayOff(); activityIndicatorOff(); },
	// 	onLoadStart: function() { activityIndicatorOn(); },
	// 	onLoadEnd:	 function() { activityIndicatorOff(); }
	// });


	//	WITH "CLOSE" BUTTON & ACTIVITY INDICATION

	// var instanceC = $( 'a[data-imagelightbox="c"]' ).imageLightbox(
	// {
	// 	quitOnDocClick:	false,
	// 	onStart:		function() { closeButtonOn( instanceC ); },
	// 	onEnd:			function() { closeButtonOff(); activityIndicatorOff(); },
	// 	onLoadStart: 	function() { activityIndicatorOn(); },
	// 	onLoadEnd:	 	function() { activityIndicatorOff(); }
	// });


	//	WITH CAPTION & ACTIVITY INDICATION

	// $( 'a[data-imagelightbox="d"]' ).imageLightbox(
	// {
	// 	onLoadStart: function() { captionOff(); activityIndicatorOn(); },
	// 	onLoadEnd:	 function() { captionOn(); activityIndicatorOff(); },
	// 	onEnd:		 function() { captionOff(); activityIndicatorOff(); }
	// });


	//	WITH ARROWS & ACTIVITY INDICATION

	// var selectorG = 'a[data-imagelightbox="g"]';
	// var instanceG = $( selectorG ).imageLightbox(
	// {
	// 	onStart:		function(){ arrowsOn( instanceG, selectorG ); },
	// 	onEnd:			function(){ arrowsOff(); activityIndicatorOff(); },
	// 	onLoadStart: 	function(){ activityIndicatorOn(); },
	// 	onLoadEnd:	 	function(){ $( '.imagelightbox-arrow' ).css( 'display', 'block' ); activityIndicatorOff(); }
	// });


	//	WITH NAVIGATION & ACTIVITY INDICATION

	// var selectorE = 'a[data-imagelightbox="e"]';
	// var instanceE = $( selectorE ).imageLightbox(
	// {
	// 	onStart:	 function() { navigationOn( instanceE, selectorE ); },
	// 	onEnd:		 function() { navigationOff(); activityIndicatorOff(); },
	// 	onLoadStart: function() { activityIndicatorOn(); },
	// 	onLoadEnd:	 function() { navigationUpdate( selectorE ); activityIndicatorOff(); }
	// });


	//	ALL COMBINED

	// var selectorF = 'a[data-imagelightbox="f"]';
	// var instanceF = $( selectorF ).imageLightbox(
	// {
	// 	onStart:		function() { overlayOn(); closeButtonOn( instanceF ); arrowsOn( instanceF, selectorF ); },
	// 	onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
	// 	onLoadStart: 	function() { captionOff(); activityIndicatorOn(); },
	// 	onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
	// });





});
