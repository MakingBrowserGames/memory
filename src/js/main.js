window.onload = function () {
  'use strict';

  var game
    , ns = window['memory'];
  var height= 690;
  var width= 915;

  game = new Phaser.Game( width,height, Phaser.AUTO, 'memory-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader );
  game.state.add('menu', ns.Menu );
  game.state.add('game', ns.Game );
  game.state.add('fin', ns.Fin );

  game.state.start('boot');

  window['memory'] = window['memory'] || {};
  window['memory'].main = game;
};


/*
640*400
920*x
x = 400*920/640 = 575
*/
