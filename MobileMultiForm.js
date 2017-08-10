/*!
MobileMultForm - 1.5
Copyright © 2016 HE
https://github.com/HigherEducation/wordpress-plugins/tree/master/jQuery%20scripts/MultiForms
*/

(function($) {

  'use strict';


  var mobileMultiForm = {

   /**
    *
    * Defaults
    *
    */
    excludeList: ':input[type=button], :input[type=submit], :input[type=reset], :button, :input[type=hidden]',
    get $inputs()
    {
      return $(':input').not( this.excludeList );
    },
    get mobile()
    {
      return this.isMobile();
    },


   /**
    *
    * Detect if Mobile Browser
    *
    */
    isMobile: function()
    {

      return ( /iPhone|iPad|iPod/i.test( navigator.userAgent ) );

    },


   /**
    *
    * Returns active inputs based from the selected input
    *
    */
    inputsActive: function( $element )
    {

      var $parentForm   = $element.parents('form');
      var $inputsActive = ( $parentForm.length ? $parentForm.find( this.$inputs ) : $element );

      return $inputsActive;

    },


   /**
    *
    * Any part of form or input is in Viewport
    *
    */
    isInView: function( $element )
    {

      var docViewTop    = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop       = $( $element ).offset().top;
      var elemBottom    = elemTop + $( $element ).height();

      return ( ( elemTop <= docViewBottom ) && ( elemBottom  >= docViewTop ) );

    },


   /**
    *
    * Enable all disabled form inputs (Especially EDUWIDGET)
    *
    */
    removeDisabledInputs: function()
    {

      this.$inputs.removeAttr( 'disabled' );

    },


   /**
    *
    * Resets Inputs
    *
    */
    resetInputs: function()
    {

      this.$inputs.filter('[tabindex=-2]').removeAttr( 'tabindex disabled' );

    },


   /**
    *
    * Closes Native Keyboard
    *
    */
    closeInputKeyboard: function( $element )
    {

      if( $element.is('form') )
      {
        $element.find( this.$inputs ).blur();
      }
      else
      {
        $element.blur();
      }

    },


   /**
    *
    * Go to Previous Input
    *
    */
    goPrevInput: function( $element )
    {

      var $inputsActive  = mobileMultiForm.inputsActive( $element );
      var $inputPrevious = $inputsActive.eq( $inputsActive.index( $element ) - 1 );

      $( $inputPrevious ).triggerHandler( 'mousedown' );

    },


   /**
    *
    * If Input(selected) is Empty
    *
    */
    ifInputEmpty: function( $element )
    {

      var $options = $element.find('option');

      if( $element.is('select') && ( $options.length == 0 || ( $options.length == 1 && $options.filter(':first-child').val() == 0 ) ) )
      {
        return true;
      }

      return false;

    },


   /**
    *
    * Listener - Window Scroll
    *
    */
    scrollListener: function( $element )
    {

      var $parForm     = $element.parents('form');
      var $elContainer = ( $parForm.length ? $parForm : $element );

      $(document).on( 'scroll', function( event )
      {

        if( ! mobileMultiForm.isInView( $elContainer ) )
        {
          mobileMultiForm.closeInputKeyboard( $element );
          $(this).unbind( event );
        }

      });

    },


   /**
    *
    * Listener - Input Focus
    *
    */
    focusListener: function()
    {

      mobileMultiForm.$inputs.on( 'focus', function( event )
      {

        mobileMultiForm.scrollListener( $(this) );

      });

    },


   /**
    *
    * Listener - Focus Out Input Timer(500ms Reset)
    *
    */
    focusOutListener: function()
    {

      mobileMultiForm.$inputs.on( 'focusout', function()
      {

        setTimeout( function()
        {

          if( ! mobileMultiForm.$inputs.is( ':focus' ) )
          {
            mobileMultiForm.resetInputs();
          }

        }, 500);

      });

    },


   /**
    *
    * Listener - Select Input (Prefocus)
    *
    */
    mouseDownListener: function()
    {

      this.$inputs.on( 'mousedown', function( event ) {

        event.preventDefault();

        var $inputsActive   = mobileMultiForm.inputsActive( $(this) );
        var $allOtherInputs = mobileMultiForm.$inputs.not( $inputsActive, '[tabindex="-1"]' );

        $inputsActive.not( '[tabindex="-1"]' ).removeAttr( 'tabindex disabled' );
        $allOtherInputs.attr( 'tabindex', '-2' ).attr( 'disabled', 'disabled' );

        if( mobileMultiForm.ifInputEmpty( $(this) ) )
        {
          mobileMultiForm.goPrevInput( $(this) );
        }
        else
        {
          $(this).focus();
        }

      });

    },


   /**
    *
    * Init - Mobile Only
    *
    */
    init: function()
    {
      if( this.mobile )
      {
        $(window).load( function() {
          mobileMultiForm.focusListener();
          mobileMultiForm.focusOutListener();
          mobileMultiForm.removeDisabledInputs();
          mobileMultiForm.mouseDownListener();
        });
      }
    }
  };

  mobileMultiForm.init();

})(jQuery);