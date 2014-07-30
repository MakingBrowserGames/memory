(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      //this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Memory Game' );
      this.titleTxt = this.add.text(x, y -50 , 'Memory Game', { font: '40px Roboto' });
      this.titleTxt.fontWeight = 'bold';
      this.titleTxt.anchor.setTo(0.5);
      //this.titleTxt.align = 'center';


      //this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'Click para empezar', 20);
      this.startTxt = this.add.text(x, y, 'Click para empezar' );
      this.startTxt.anchor.setTo(0.5);
      this.startTxt.font = 'Roboto';
      this.startTxt.fontSize = 20;

      this.startTxt.fill = '#000000';
      this.startTxt.align = 'center';
      //this.startTxt.stroke = '#ff0000';
      //this.startTxt.strokeThickness = 2;
      //this.startTxt.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
      //this.titleTxt.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
      this.startTxt.size = 20;

      /*
      var text = this.add.text(this.world.centerX, this.world.centerY, "- phaser -\nrocking with\ngoogle web fonts");
      text.anchor.setTo(0.5);
      text.font = 'Roboto';
      text.fontSize = 60;

      var grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
      grd.addColorStop(0, '#8ED6FF');
      grd.addColorStop(1, '#004CB3');
      text.fill = grd;

      text.align = 'center';
      text.stroke = '#000000';
      text.strokeThickness = 2;
      text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

      text.inputEnabled = true;
      text.input.enableDrag();
      */
      //this.startTxt = text;

      this.stage.backgroundColor = '#fff';

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['memory'] = window['memory'] || {};
  window['memory'].Menu = Menu;

}());
