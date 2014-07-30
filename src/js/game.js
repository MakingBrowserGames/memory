(function () {
  'use strict';

  function Game() {
    this.player = null;
    this.volver = null;
  }

  Game.prototype = {

    create: function () {
      /*
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.player.anchor.setTo(0.5, 0.5);
      this.player = this.add.sprite(x, y, 'player');
      this.input.onDown.add(this.onInputDown, this);
      */
      this.stage.backgroundColor = '#fff';

      this.cards = this.add.group();
      this.cards.createMultiple( 30, 'card');
      this.cards.setAll('inputEnabled',true);
      this.cards.setAll('input.useHandCursor',true);

      this.cabecera = this.game.add.sprite( 0, 30, 'cabecera');
      this.tienesDCH = this.game.add.sprite( 20+548, 30, 'tienesDCH');

      this.volver = this.game.add.sprite( 20+548+91, 30, 'volver');


      this.lamerced = this.game.add.sprite( 13, this.game.height - 20, 'lamerced');
      this.lamerced.anchor.setTo(0,1);
      this.lamerced.inputEnabled = true;
      this.lamerced.input.useHandCursor = true;
      this.lamerced.events.onInputDown.add( function(){
        window.open( 'http://www.lamercedmigraciones.org/' ,'_window');
      } , this);

      //puntuacion this.world.centerX, this.world.centerY
      this.score = 0;

      this.labelScore = this.game.add.text( 20+230 , this.game.height - 47-10, 'MOVIMIENTOS: '+ this.score , { font: '23px Roboto ', fill: '#79232E'});
      /*
      this.label_title = this.game.add.text( 20 , 30 + 20 , '¡DESCUBRE TUS DERECHOS!' , { font: '39px Roboto', fill: '#000'});
        // no puedo cambiar el letter-space :?
      this.label_title.fontWeight = 'bold';
      */

      this.label1 = this.game.add.text( 20 , 30+68+45+10 , '¡Empieza \na jugar!' , { font: '24px Roboto', fill: '#000'});
      //this.label1.fontWeight = 'bold';

      this.label2 = this.game.add.text( 20 , 30+68+45+10+90 , 'Haz clic para \ndar la vuelta \na las casillas.' , { font: '24px Roboto', fill: '#D6871A'});
      //this.label2.fontWeight = '500';

      this.label3 = this.game.add.text( 20 , 30+68+45+10+250 , 'Debes \nencontar dos \ndibujos iguales \nen el menor número \nde pasos posibles' , { font: '20px Roboto', fill: '#79232E'});
      //this.label3.fontWeight = '300';
      //this.label_title.letterSpacing = '20px';
      //letter-spacing

      this.volver.inputEnabled = true;
      this.volver.input.useHandCursor = true;
      //this.volver.events.onInputDown.add( this.siguienteFase , this);
      this.volver.events.onInputDown.add( function(){
        window.location = 'http://www.tienesderecho.info/' ;
      } , this);

      this.barajar();

      this.initCards();

      //debug functions


      //Game.tienesDCH.inputEnable = true;
      //this.initVolver();

    },
    initVolver: function(){
        this.volver.name = 'volver';
/*
        console.log(this.volver.input);
        console.log(this.tienesDCH.input);
        console.log(this.volver);
        console.log(this.tienesDCH);
        console.log('card');
        console.log(this.cards.getFirstExists(true));
        */
    },

    update: function () {

    },

    onInputDown: function () {
      this.game.state.start('menu');
    },

    initCards: function(){
      var num= 0;
      //var j = 1;
        // crea una cuadricula de 4x3 cartas
        for ( var i = 0 ; i < 4; i++){
          for ( var j = 0 ; j < 3; j++){
            //console.log( num );
            this.addCard(num, i , j, true);
            num++;
          }
        }
    },
    addCard:  function(cartaNumero, x, y, type) {


      var card = this.cards.getFirstExists(false); // ???
      //sacar carta de la baraja
      card.dibujoCarta = this.baraja[cartaNumero];

      card.anchor.setTo(0.5);
      //card.body.setSize(100,100,0,0); //set size no funciona
      //lo separamos 80 de la derecha y queda centrado si el ancho es 920
      //card.reset( 80+(x+1)*150 , (y+1)*150 );
      //card.scale.setTo(0.1);
      var separadorx, separadory;
      if (x>0){ separadorx = 1; } else { separadorx = 0; }
      if (y>0){ separadory = 1; } else { separadory = 0; }
      card.reset( 20+230+(x*150)+(15*x)+75,30+68+45+ (y*150) + 15*y + 75);

      card.name = 'carta '+(x+1)+' '+(y+1);
      card.tapada = true;

      //anverso de la carta
      card.dibujoBocaAbajo = cartaNumero%2 ; // asi sera o el uno o el 0 segun sea par o impar
      card.frame = card.dibujoBocaAbajo;

      /*
      console.log(card.name);
      console.log(card.x);
      console.log(card.y);
      */

      if (type){
        this.game.add.tween(card.scale).delay(x*100+1).to({x:1, y:1}, 400).start();
      }
      else {
        this.game.add.tween(card.scale).delay(400).to({x:1, y:1}, 400).start();
      }
      //card.events.onInputDown.add(cardClick(card), this);
      card.events.onInputDown.add( this.cardClick, this);
      //console.log(card.name);

    },
    cardClick: function(c){
      /*TODO:
        evitar que se pueda picar en la carta si se a acertado
        evitar que sepueda picar en la misma carta dos veces
      */
      //console.log('click ' + c.name );

      this.nCartasLevantadas++;
      if (this.nCartasLevantadas>2){
        return; // evita levantar mas de dos cartas
      }
      this.cartasLevantadas.push(c);
      //console.log('n cartas levantadas = '+this.nCartasLevantadas);
      //console.log('cartas levantadas = '+this.cartasLevantadas.toString());


      //c.animations.add('walk');
      //c.animations.play('walk', 50, true);
      this.girarCarta(c);
      this.timeCheck = this.time.now;


      if (this.nCartasLevantadas > 1){
        if ( this.cartasLevantadas[0].dibujoCarta === this.cartasLevantadas[1].dibujoCarta ){
          this.aciertos++;
          //console.log('acierto' + this.aciertos);

          this.label2.text = this.textos[c.dibujoCarta][1];
          this.label3.text = this.textos[c.dibujoCarta][2];

          while(this.cartasLevantadas.length > 0) { this.cartasLevantadas.pop();}
          this.nCartasLevantadas = 0;
          //console.log('cartas levantadas:'+this.cartasLevantadas);
          //se evita volver a picar en las cartas levantadas:
          this.cartasLevantadas[0].inputEnabled = false;
          this.cartasLevantadas[1].inputEnabled = false;
          this.cartasLevantadas[0].input.useHandCursor = false;
          this.cartasLevantadas[1].input.useHandCursor = false;
        } else {
          //console.log('fallo');

          this.label2.text = '¡Ay!, has \nfallado';
          this.label3.text = 'Vamos, ¡sigue jugando!\n';

          //virar las cartas boca abajo:
          //demasiado rapido!!
          // las segunda carta se oculta sin poder verse si no pongo el timer
          this.timer = this.game.time.create(this.game);
          this.timer.add(1000, function(){
            //console.log(this);
            //console.log('cartas levantadas 0 :' + this.cartasLevantadas[0]);

            //volver a la normalidad
            ///c.anchor.set(0);
            //this.cartasLevantadas[0].reset( this.cartasLevantadas[0].x-75, this.cartasLevantadas[0].y-75);
            //this.cartasLevantadas[1].reset( this.cartasLevantadas[1].x-75, this.cartasLevantadas[1].y-75);

            this.girarCarta(this.cartasLevantadas[0]);
            this.girarCarta(this.cartasLevantadas[1]);

            //vuelve a activar las cartas
            this.cartasLevantadas[0].inputEnabled = true;
            this.cartasLevantadas[1].inputEnabled = true;
            this.cartasLevantadas[0].input.useHandCursor = true;
            this.cartasLevantadas[1].input.useHandCursor = true;
            //console.log(this.timeCheck);
            //console.log(this.time.now);
            //console.log('timeee');
            //vaciar el array
            while(this.cartasLevantadas.length > 0) { this.cartasLevantadas.pop();}
            this.nCartasLevantadas = 0;
          }, this);
          this.timer.start();
        }
        //cuando se levanta una pareja de cartas contar un movimiento más
        this.score += 1;
        this.labelScore.text = 'MOVIMIENTOS: '+ this.score;
      } else {
          // evitar que se pueda picar esta carta dos veces
          c.inputEnabled = false;
          c.input.useHandCursor = false;
          // cuando se levanta la primera carta cambiamos el texto
          this.label1.text = this.textos[c.dibujoCarta][0];
          this.label2.text = '';
          this.label3.text = '';
      }
    },
    girarCarta: function(c){
      //console.log('this :');
      //console.log(this);

      var girar = this.game.add.tween(c.scale);
      girar.onComplete.add(function(){
        if (c.tapada === true){
          c.frame = c.dibujoCarta+2;
          c.tapada = false;
          // compruebo si se han destapado todas la cartas cuando termina la animación!
          if (this.aciertos === 6){
            //console.log('completo');
            this.timer2 = this.game.time.create( this.game );
            this.timer2.add( 2000, function(){
              this.siguienteFase();
            }, this);
            this.timer2.start();
          }
        } else {
          c.frame = c.dibujoBocaAbajo;
          c.tapada = true;
        }
      }, this);
      /*
      girar.onStart.add(function(){
        console.log("c.anchor.x: "+c.anchor.x+ " " + c.name);
        if (c.anchor.x == 0){
          c.anchor.set(0.5); //para que gire desde el centro
          c.reset( c.x+75, c.y+75);  // para que no se mueva de sitio apesar del cambio de anchor
        }
      }, this);
      girar.onLoop.add(function(){
        cosole.log("loop");
      }, this);
      */
      girar.to({ x:0 }, 300 )
        .to({ x:1 }, 200 )
        .start();
    },
    fase2: function(){
        //console.log('Fase 2 -----------------------------------------------------');
        this.fase = 1 ;
        this.aciertos = 0;

        //poner todas las cartas boca abajo :

          this.cards.forEachAlive(function(c){
            this.girarCarta(c);
          },this);

        //esperar un poco para que se pueda leer el ultimo texto..
        this.timer2 = this.game.time.create( this.game );
        this.timer2.add( 1000, function(){
          this.label1.text='¡Sigue jugando!\n               ';
          this.label2.text='Da la vuelta a estas \núltimas 12 casillas.';
          this.label3.text='Completa esta pantalla \ny termina de conocer \ntus derechos \nfundamentales.';

          //borar todas las cartas :
          this.borrarCartas();

          // barajar de nuevo
          this.barajar();
          this.initCards();

        }, this );
       this.timer2.start();

    },
    borrarCartas: function(){
      var cartasVivas = [];
      this.cards.forEachAlive(function(card){
        cartasVivas.push(card);
      }, this);
      for(var card in cartasVivas ){
        cartasVivas[card].destroy();
      }
    },
    siguienteFase: function(){
      if (this.fase === 0){
        this.fase2();
      } else if (this.fase === 1){
        //console.log( 'HAS COMPLETADO EL JUEGO');
        this.borrarCartas();
        //this.state.start('fin');

        this.game.add.sprite( 20+230 , 30+68+45 , 'final');
        this.game.add.sprite( 20+230 , 30+68+45 +378 , 'derechoFinal');
        this.labelScore.text = this.score + ' MOVIMIENTOS';
        this.labelScore.x = 20;
        this.labelScore.y = 30+68+45+45 + 70;

        this.label2.text='¡Enhorabuena!';
        this.label2.x = 20;
        this.label2.y = 30+68+45;


        this.label1.text='Has termiando con \néxito el juego en\n';
        this.label1.x = 20;
        this.label1.y = 30+68+45+45;

        //botones de redes sociales
        this.label3.text='Comparte en redes \nsociales tu resultado';
        this.label3.x = 20;
        this.label3.y = 30+68+240;
        this.fbIcon = this.game.add.sprite( 20 , 30+68+240 + 30*2 , 'facebook');
        this.fbIcon.inputEnabled = true;
        this.fbIcon.input.useHandCursor = true;
        this.fbIcon.events.onInputDown.add( this.fbScore , this);


        this.twIcon = this.game.add.sprite( 20 + 38+10 , 30+68+240 + 30*2 , 'twitter');
        this.twIcon.inputEnabled = true;
        this.twIcon.input.useHandCursor = true;
        this.twIcon.events.onInputDown.add( this.tweetScore , this);


      }
    },
    tweetScore: function (){
        //share score on twitter
        var tweetbegin = 'http://twitter.com/home?status=';
        var url = 'www.tienesderecho.info'; //window.location.href
        var tweettxt = 'He conseguido completar el juego de ' + url + ' en '+this.score+' movimientos! ¿Puedes superarme?';
        var finaltweet = tweetbegin +encodeURIComponent(tweettxt);
        window.open(finaltweet,'_blank');
    },
    fbScore: function (){

        /* ver esto  :
         http://stackoverflow.com/questions/20956229/has-facebook-sharer-php-changed-to-no-longer-accept-detailed-parameters
        */

        //var begin = 'http://www.facebook.com/sharer.php?s=100&amp;p[title]=';
        var begin = 'http://www.facebook.com/sharer.php?s=100';
        var title = 'He conseguido completar el juego de Tienes Derecho en '+this.score+' movimientos! ';
        var url = 'http://www.tienesderecho.info';
        //var image = 'http://www.lamercedmigraciones.org/wp-content/uploads/2014/03/sliderhome_logoDCH.png';
        //var txt = 'Intenta superarme! ';
        var final = begin + '&p[url]=' + encodeURIComponent(url) ;
        //var final = 'http://www.facebook.com/sharer.php?s=100&p[title]='+encodeURIComponent('this is a title') + '&p[summary]=' + encodeURIComponent('description here') + '&p[url]=' + encodeURIComponent('http://www.nufc.com') + '&p[images][0]=' + encodeURIComponent('http://www.somedomain.com/image.jpg')

        window.open( final ,'_window');
    }
  };

  Game.prototype.aciertos = 0;
  Game.prototype.fase = 0;

  Game.prototype.nCartasLevantadas = 0;
  Game.prototype.cartasLevantadas = [];
  Game.prototype.barajar = function() {
    var nCartas = 12; //tiene que ser par
    Game.prototype.baraja = [];
    var baraja = Game.prototype.baraja;
    var barajaInicial = [];

    var conta = 0;
    if ( this.fase === 1 ){ conta = 6; }//en la fase dos la segunda parte de la baraja se muestra
    for ( var i = conta ; i < conta + nCartas/2 ; i++){
        barajaInicial.push(i);
    }
    for ( i = conta ; i < conta + nCartas/2 ; i++){
      barajaInicial.push(i);
    }
    // ejemplo si fuera una baraja de 6 cartas ahora habría:
    // Game.prototype.baraja = [0,1,2,0,1,2];
    // es decir una baraja con dos cartas de cada tipo

    //ahora es cuando "barajamos" de verdad
    for (i=0; i < nCartas; i++){
      var randomPosition = this.rnd.integerInRange(0,barajaInicial.length - 1);
      var thisCarta = barajaInicial[ randomPosition ];
      baraja.push(thisCarta);
      //var a = barajaInicial.indexOf(thisCarta);
      barajaInicial.splice(randomPosition , 1);
    }
    //console.log(baraja.toString());
  };

Game.prototype.textos = [];
for ( var i = 0 ; i < 12 ; i++){
    Game.prototype.textos[i] = [];
}

Game.prototype.textos[0][0] = 'Tienes derecho \na una justicia...\n';
Game.prototype.textos[0][1] = 'accesible';
Game.prototype.textos[0][2] = 'La justicia debe \nadaptarse a ti y sin \nningún tipo de \ndiscriminación.\n';

Game.prototype.textos[1][0] = 'Tienes derecho \na que se te trate \ncon...';
Game.prototype.textos[1][1] = 'dignidad, libertad \ne igualdad. \n';
Game.prototype.textos[1][2] = 'Desde el cuidado, \nigualitariamente y \nrespetando tu situación, \ntu bienestar \ny tu integridad.\n';

Game.prototype.textos[2][0] = 'Tienes derecho \na divertirte y...  \n';
Game.prototype.textos[2][1] = 'a jugar. \n';
Game.prototype.textos[2][2] = 'Y también a descansar, \nal recreo y a participar \nen las actividades \nartísticas y culturales de \ntu barrio o de tu pueblo.\n';

Game.prototype.textos[3][0] = 'Tienes derecho \na no sufrir...  \n';
Game.prototype.textos[3][1] = 'discriminación. \n';
Game.prototype.textos[3][2] = 'Ya sea por tu origen, \nreligión, color, raza, sexo, \nedad o posición \neconómica.\n';

Game.prototype.textos[4][0] = 'Tienes derecho \na una protección...  \n';
Game.prototype.textos[4][1] = 'internacional. ';
Game.prototype.textos[4][2] = 'Si huyes de tu país de \norigen por la guerra, \nla pobreza, \nla persecución o \nla discriminación.\n';

Game.prototype.textos[5][0] = 'Tienes derecho \na una educación....  \n';
Game.prototype.textos[5][1] = 'completa. \n';
Game.prototype.textos[5][2] = 'Con valores como el \nrespeto a tu familia, \na los derechos humanos, \na tu identidad cultural \ny al medio ambiente.\n';

Game.prototype.textos[6][0] = 'Tienes derecho \na una sanidad... \n';
Game.prototype.textos[6][1] = 'gratuita y universal. \n';
Game.prototype.textos[6][2] = 'Ningún niño o niña debe \nser privado de los \nservicios públicos de \nsalud.\n';

Game.prototype.textos[7][0] = 'Tienes derecho \na una comida....\n';
Game.prototype.textos[7][1] = 'sana. \n';
Game.prototype.textos[7][2] = 'Tanto en casa como en \nel colegio debes poder \ncomer alimentos sanos \ny variados.\n';

Game.prototype.textos[8][0] = 'Tienes derecho \na una vivienda...\n';
Game.prototype.textos[8][1] = 'digna. \n';
Game.prototype.textos[8][2] = 'Una casa en buenas \ncondiciones es \nfundamental para \ntu desarrollo.\n';

Game.prototype.textos[9][0] = 'Tienes derecho \na la comprensión \ny el amor....\n';
Game.prototype.textos[9][1] = 'de toda tu familia y \nde la sociedad. \n';
Game.prototype.textos[9][2] = 'No pueden separarte de \ntu familia, a no ser que \nsea necesario para ti.\n';

Game.prototype.textos[10][0] = 'Tienes derecho \na que se te proteja \ndel...\n';
Game.prototype.textos[10][1] = 'abandono y \nla explotación. ';
Game.prototype.textos[10][2] = 'Cuentas con protección \ncontra todas las \nformas de  abuso.\n';

Game.prototype.textos[11][0] = 'Tienes derecho \na que se te \nescuche...\n';
Game.prototype.textos[11][1] = 'y a participar. \n';
Game.prototype.textos[11][2] = '¡No te cortes! \nParticipa plenamente en \nla vida de tu comunidad.\n';



  window['memory'] = window['memory'] || {};
  window['memory'].Game = Game;

}());
