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
      this.load.image('player', 'assets/player.png');
      //this.load.image('card', 'assets/player.png');
      //this.load.image('card1', 'assets/carta1.png');
      //this.load.image('card2', 'assets/carta2.png');
      //this.load.image('card3', 'assets/carta3.png');

      this.load.spritesheet('card', 'assets/cartas.png', 100, 100);

      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['memory'] = window['memory'] || {};
  window['memory'].Preloader = Preloader;

}());
