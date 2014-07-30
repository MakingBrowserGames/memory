/*
//  The Google WebFont Loader will look for this object, so create it before loading the script.
    WebFontConfig = {
      //  'active' means all requested fonts have finished loading
      //  We set a 1 second delay before calling 'createText'.
      //  For some reason if we don't the browser cannot render the text the first time it's created.
      active: function() { this.time.events.add(Phaser.Timer.SECOND, createText, this); },

      //  The Google Fonts we want to load (specify as many as you like in the array)
      google: {
        families: [ 'Roboto:400,300,500,700,700italic,500italic,400italic,300italic:latin' ]
      }
  };
*/
var  WebFontConfig = {
    active: function() { this.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: { families: [ 'Roboto:400,300,500,700,700italic,500italic,400italic,300italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {

    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      this.game.input.maxPointers = 1;
      // this.game.stage.disableVisibilityChange = true;


      if (this.game.device.desktop) {
        this.game.stage.scale.pageAlignHorizontally = true;
      } else {
        //no se ve bien en el movil con nada de esto activado! yey! :P
        //this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        /*
        this.game.stage.scale.minWidth =  480;
        this.game.stage.scale.minHeight = 300;
        this.game.stage.scale.maxWidth = 915;
        this.game.stage.scale.maxHeight = 690;
        this.game.stage.scale.forceLandscape = true;
        this.game.stage.scale.pageAlignHorizontally = true;
        */
        //this.game.stage.scale.setScreenSize(true);

      }

      this.game.state.start('preloader');
    }
  };


  window['memory'] = window['memory'] || {};
  window['memory'].Boot = Boot;

}());

