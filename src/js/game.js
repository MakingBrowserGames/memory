(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      /*
      var x = this.game.width / 2
        , y = this.game.height / 2;
        
      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.input.onDown.add(this.onInputDown, this);
      */
      this.cards = this.add.group();
      this.cards.createMultiple( 30, 'card');
      this.cards.setAll('inputEnabled',true);
      this.cards.setAll('input.useHandCursor',true);

      //puntuacion
      this.label_score = this.game.add.text(40, 20, '0', { font: '20px Arial', fill: '#2c3e50'});
      this.score = 0;
      this.barajar();

      this.initCards();      


    },

    update: function () {
      /*
      var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;
      
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
        for ( var i = 0 ; i < 4; i++){
          for ( var j = 0 ; j < 3; j++){
            //console.log( num );
            this.add_card(num, i , j, true);
            num++; 
          }
        }
    }, 
    add_card:  function(carta_numero, x, y, type) {


      var card = this.cards.getFirstExists(false); // ???
      //sacar carta de la baraja
      card.dibujo_carta = this.baraja[carta_numero];

      card.anchor.setTo(0.5);
      //card.body.setSize(100,100,0,0); //set size no funciona 
      //lo separamos 80 de la derecha y queda centrado si el ancho es 920
      card.reset( 80+(x+1)*150 , (y+1)*150 );
      card.scale.setTo(0.1);
      card.name = 'carta '+(x+1)+' '+(y+1);
      card.tapada = true;

      if (type){
        this.game.add.tween(card.scale).delay(x*100+1).to({x:1, y:1}, 400).start();
      }
      else { 
        this.game.add.tween(card.scale).delay(400).to({x:1, y:1}, 400).start();
      }
      //card.events.onInputDown.add(cardClick(card), this);
      card.events.onInputDown.add( this.card_click, this);
      console.log(card.name);

    },
    card_click: function(c){
      /*TODO: 
        evitar que se pueda picar en la carta si se a acertado
        evitar que sepueda picar en la misma carta dos veces 
      */
      console.log('click ' + c.name );
      this.n_cartas_levantadas++;
      if (this.n_cartas_levantadas>2){
        return; // evita levantar mas de dos cartas 
      }
      this.cartas_levantadas.push(c);
      console.log('n cartas levantadas = '+this.n_cartas_levantadas);
      console.log('cartas levantadas = '+this.cartas_levantadas.toString());
      //this.game.add.tween(c.scale).delay(100).to({x:0},400).start();
      //this.game.add.tween(c.scale).delay(500).to({x:1},400).start();
      

      //c.animations.add('walk');
      //c.animations.play('walk', 50, true);
      this.girar_carta(c);
      this.timeCheck = this.time.now;


      if (this.n_cartas_levantadas > 1){
        if ( this.cartas_levantadas[0].dibujo_carta === this.cartas_levantadas[1].dibujo_carta ){
          console.log('acierto');
          while(this.cartas_levantadas.length > 0) { this.cartas_levantadas.pop();}
          this.n_cartas_levantadas = 0;
          console.log('cartas levantadas:'+this.cartas_levantadas);
          this.score += 1;
          this.label_score.text = this.score;
        } else {
          console.log('fallo');
          //virar las cartas boca abajo:
          //demasiado rapido!! 
          // las segunda carta se oculta sin poder verse...
          this.timer = this.game.time.create(this.game);
          this.timer.add(1000, function(){
            console.log(this);
            console.log('cartas levantadas 0 :' + this.cartas_levantadas[0]);
            this.girar_carta(this.cartas_levantadas[0]);
            this.girar_carta(this.cartas_levantadas[1]);
            //console.log(this.timeCheck);  
            //console.log(this.time.now);
            console.log('timeee');
            //vaciar el array 
            while(this.cartas_levantadas.length > 0) { this.cartas_levantadas.pop();}
            this.n_cartas_levantadas = 0;
          }, this);
          this.timer.start();
        }        
      }
    },
    girar_carta: function(c){
      console.log('this :');
      console.log(this);
      var girar = this.game.add.tween(c.scale);
      girar.onComplete.add(function(){
        if (c.tapada === true){
          c.frame = c.dibujo_carta+1; 
          c.tapada = false;
        } else {
          c.frame = 0;
          c.tapada = true;
        }
      }, this);     

      girar.to({ x:0 }, 300 )
        .to({ x:1 }, 200)        
        .start();

    }
  };
  
  Game.prototype.n_cartas_levantadas = 0;
  Game.prototype.cartas_levantadas = [];
  Game.prototype.barajar = function() {
    var n_cartas = 12; //tiene que ser par 
    Game.prototype.baraja = [];
    var baraja = Game.prototype.baraja;
    var barajaInicial = [];

    for ( var i = 0 ; i < n_cartas/2 ; i++){
      barajaInicial.push(i);
    }
    for ( i = 0 ; i < n_cartas/2 ; i++){
      barajaInicial.push(i);
    }
    // ejemplo si fuera una baraja de 6 cartas ahora habría:
    // Game.prototype.baraja = [0,1,2,0,1,2];
    // es decir una baraja con dos cartas de cada tipo

    //ahora es cuando "barajamos" de verdad 
    for (i=0; i < n_cartas; i++){
      var randomPosition = this.rnd.integerInRange(0,barajaInicial.length - 1);
      var thisCarta = barajaInicial[ randomPosition ];
      baraja.push(thisCarta);
      //var a = barajaInicial.indexOf(thisCarta);
      barajaInicial.splice(randomPosition , 1); 
    }
    console.log(baraja.toString());    
  };

  

  window['memory'] = window['memory'] || {};
  window['memory'].Game = Game;

}());
