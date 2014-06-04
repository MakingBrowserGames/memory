(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
        /*
      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.input.onDown.add(this.onInputDown, this);
      */
      this.cards = this.add.group();
      this.cards.createMultiple( 30, 'card');
      this.cards.setAll('inputEnabled',true);
      this.cards.setAll('input.useHandCursor',true);

      //puntuacion
      this.label_score = this.game.add.text(40, 20, "0", { font: "20px Arial", fill: "#2c3e50"});

      this.initCards();      


    },

    update: function () {
      var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;
      /*
      angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      this.player.angle = angle;

      dx = x - cx;
      dy = y - cy;
      scale = Math.sqrt(dx * dx + dy * dy) / 100;

      this.player.scale.x = scale * 0.6;
      this.player.scale.y = scale * 0.6;
      */
    },

    onInputDown: function () {
      this.game.state.start('menu');
    },

    initCards: function(){
      var num= 0;
      //var j = 1;
        // crea una cuadricula de 5x3 cartas 
        for ( var i = 0 ; i < 5; i++){
          for ( var j = 0 ; j < 3; j++){
            //console.log( num );
            this.add_card( i , j, true);
            num++;
          }
        }
    }, 
    add_card:  function(x, y, type) {

      var card = this.cards.getFirstExists(false); // ???
      //selecionar carta al azar
      // ...

      card.anchor.setTo(0.5);
      //card.body.setSize(100,100,0,0); //set size no funciona 
      card.reset( (x+1)*150 , (y+1)*150 );
      card.scale.setTo(0.1);
      card.name = "carta "+(x+1)+" "+(y+1);

      if (type)
        this.game.add.tween(card.scale).delay(x*100+1).to({x:1, y:1}, 400).start();
      else 
        this.game.add.tween(card.scale).delay(400).to({x:1, y:1}, 400).start();

      //card.events.onInputDown.add(cardClick(card), this);
      card.events.onInputDown.add( this.card_click, this);
      console.log(card.name);

    },
    card_click: function(c){
      var c1 , c2 ,c3 ;
      console.log("click " + c.name );
      //console.log(this);
      //this.game.add.tween(c.scale).delay(100).to({x:0},400).start();
      //this.game.add.tween(c.scale).delay(500).to({x:1},400).start();
      

      //c.animations.add('walk');
      //c.animations.play('walk', 50, true);
      


      var girar=this.game.add.tween(c.scale);
      girar.onComplete.add(function(){
        c.frame += 1;
      }, this);

      

      girar.to({ x:0 }, 300 )
        .to({ x:1 }, 200)        
        .start();
    }
  };

  

  window['memory'] = window['memory'] || {};
  window['memory'].Game = Game;

}());
