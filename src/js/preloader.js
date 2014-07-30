(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      this.load.image('tienesDCH', 'assets/logo_tienesDCH.png');
      this.load.image('lamerced', 'assets/logo_migraciones.png');
      this.load.image('cabecera', 'assets/cabecera_juego.png');
      this.load.image('volver', 'assets/vover_instrucciones.png');
      this.load.image('final', 'assets/ImagenFinal_juego.png');
      this.load.image('derechoFinal', 'assets/frasefinal.png');

      this.load.image('facebook', 'assets/facebook.png');
      this.load.image('twitter', 'assets/twitter.png');

      this.load.spritesheet('card', 'assets/cartas.png', 150, 150);

      //cargar fuente roboto en lugar de esta...
      //this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('game');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['memory'] = window['memory'] || {};
  window['memory'].Preloader = Preloader;

}());
