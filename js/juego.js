	var nave; 
	var tecla;
	var tiempoDisparo = tiempoDisparoEnemigos = 0; 
	var teclaDisparo; 
	var animacion;
	var disparos; 
	var ovnis;
	var disparosEnemigos;
	var disparoEnemigo;
	var numeroDeEnemigos = [];
	var esplosiones;
	var puntuacion = 0;
	var textoPuntos = textoVida = "";
	var vidasNave = vidas = 3;
	var sonidoLaser;
    var sonidoLaserEnemigo;
	var sonidoExplosionNave;
    var sonidoExplosionEnemiga;
    var musicaJuego;
    var asteroides;
    var explosionesAsteroides;
    var sonidoExplosionAsteroide;
    var ganar = false;
	var Juego = {
		
		preload: function preload(){// aquí se cargan todos los recursos del juego
			
			game.load.image("space", "img/space.jpg");
			game.load.image("virgo", "img/signoVirgo.png");
			game.load.image("pj", "img/naveR.png");
			game.load.image("laser", "img/disparo.png");
			game.load.image("enemigo", "img/ovniR.png");
			game.load.image("logotipo", "img/log.png");
			game.load.image("laserR", "img/disparoR.png");
			game.load.image("vida", "img/life.png");
			game.load.spritesheet("explosion", "img/explosionA.png", 128, 128);
			game.load.audio("sonidoLaser","sounds/laser2.mp3");
            game.load.audio("sonidoLaserEnemigo","sounds/laserEnemigo.mp3");
            game.load.audio("explosionEnemiga","sounds/explosion2.mp3");
            game.load.audio("explosionNave","sounds/explosion3.mp3");
            game.load.audio("musicaJuego","sounds/musicaFondo.mp3");
            game.load.image("asteroide", "img/asteroid2.png");
            game.load.spritesheet("explosionAsteroide", "img/explosionAsteroid2.png", 64, 64);
            game.load.audio("sonidoExplosionAsteroide", "sounds/explosionAsteroide.mp3");

		},

		create: function create(){// aquí se agrega a la pantalla
            musicaJuego = game.add.audio("musicaJuego");
            musicaJuego.volume = 0.2;
            musicaJuego.play();
            
			fondoJuego = game.add.tileSprite(0, 0, game.width, game.height, "space");
			// TileSprite (juego, x, y, ancho, alto, clave, marco) -> se le pone el tipo TileSprite porque es una imagen que se va a repetir varias veces

			icono = game.add.sprite(0,0, "virgo");
			//consiste en poner en (x, y, IDimagen) una textura que se representa en el lienzo

			logotipo = game.add.sprite(750, 560, "logotipo");

			nave = game.add.sprite(game.width/2, 550, "pj");
			nave.anchor.setTo(0.5, 0.5);

			game.physics.startSystem(Phaser.Physics.ARCADE); // fisicas de arcade
			game.physics.arcade.enable(nave);
			nave.body.collideWorldBounds = true;
			nave.animations.add("explosion"); // añadimos la animacion de la explosion

			tecla = game.input.keyboard.createCursorKeys();
			teclaDisparo = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            teclaIzquierda = game.input.keyboard.addKey(Phaser.Keyboard.A);
            teclaDerecha = game.input.keyboard.addKey(Phaser.Keyboard.D);
            
            
			// implementar los disparos
			disparos = game.add.group();
			disparos.enableBody = true;
			disparos.physicsBodyType = Phaser.Physics.ARCADE;
			disparos.createMultiple(1, "laser");
			disparos.setAll("anchor.x", 0.5);
			disparos.setAll("anchor.y", 1);
			disparos.setAll("outOfBoundsKill", true); // que al salir del escenario se destruya
			disparos.setAll("checkWorldBounds", true); // que permanesca dentro del escenario

			// implementar los disparos de los enemigos
			disparosEnemigos = game.add.group();
			disparosEnemigos.enableBody = true;
			disparosEnemigos.physicsBodyType = Phaser.Physics.ARCADE;
			disparosEnemigos.createMultiple(2, "laserR");
			disparosEnemigos.setAll("anchor.x", 0.5);
			disparosEnemigos.setAll("anchor.y", 0);
			disparosEnemigos.setAll("outOfBoundsKill", true); // que al salir del escenario se destruya
			disparosEnemigos.setAll("checkWorldBounds", true); // que mermanesca dentro del escenario

			// implementar el conjunto de naves ovnis
			ovnis = game.add.group();
			ovnis.enableBody = true;
			ovnis.physicsBodyType = Phaser.Physics.ARCADE;

			//crear enemigos y mostrarlos en pantalla
			for(var y = 0; y < 4; y++){
				for (var x = 0; x < 6; x++) {
					var ovni = ovnis.create(x*80, y*40, "enemigo");
					ovni.anchor.setTo(0.5);
					ovni.body.moves = false;

				}
			}

		    explosiones = game.add.group();
		    explosiones.createMultiple(10, 'explosion');
		    explosiones.forEach(this.ponerExplosion, this); // se realiza un bucle que recorre todos los ovnis y le implementa la funcion "ponerExplosion"

			ovnis.x = 50; 
			ovnis.y = 30;

			animacion = game.add.tween(ovnis).to( { x: 350 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);		
			// animacion para los ovnis que se muevan lateralmente "x"

			textoPuntos = game.add.text(20, 570,  "Puntuación: " +puntuacion, {font: "21px Arial", fill: "white"});

			//  vidas de la nave
			vidasNave = game.add.group();
		    textoVida = game.add.text(game.world.width/2, 570, "Vidas: ", {font: "21px Arial", fill: "white", align: "center"});

		    for (var i = 0; i < vidas; i++) {
		    	var vida = vidasNave.create(game.world.width/2+75+(i*30), 580, "vida");
                vida.anchor.setTo(0.5, 0.5);	

		    }//crear una imagen por vida que tenga que son 3 al principio
                        
            sonidoLaser = game.add.audio("sonidoLaser");
            sonidoLaser.volume = 0.2;
            
            sonidoLaserEnemigo = game.add.audio("sonidoLaserEnemigo");
            sonidoLaserEnemigo.volume = 1;
            
            sonidoExplosionEnemiga = game.add.audio("explosionEnemiga");
            sonidoExplosionEnemiga.volume = 1;
            
            sonidoExplosionNave = game.add.audio("explosionNave");
            sonidoExplosionNave.volume = 1;
            
            asteroides = game.add.group();
            asteroides.enableBody = true;
            asteroides.physicsBodyType = Phaser.Physics.ARCADE;
            
            for (var x = 1; x < 6; x++) {
				var asteroide = asteroides.create(x*130, y*120, "asteroide");
				asteroide.anchor.setTo(0.5);
				asteroide.body.moves = false;

            }
            
            explosionesAsteroides = game.add.group();
		    explosionesAsteroides.createMultiple(10, 'explosionAsteroide');
            explosionesAsteroides.forEach(this.ponerExplosionAsteriode, this);
            
            sonidoExplosionAsteroide = game.add.audio("sonidoExplosionAsteroide");
            sonidoExplosionAsteroide.volume = 1;
            
		},

		update: function update(){ // aqui animamos el juego
			var disparo;

			fondoJuego.tilePosition.y += 2;

			if(tecla.right.isDown ||teclaDerecha.isDown){
				nave.position.x += 5;
			}

			if(tecla.left.isDown || teclaIzquierda.isDown){
				nave.position.x -= 5;
			}

			if(teclaDisparo.isDown){
				if(game.time.now > tiempoDisparo){
                    disparo = disparos.getFirstExists(false); // de todas las balas coger la primera

                }

				if(disparo){
                    sonidoLaser.play();
					disparo.reset(nave.x, nave.y); // posicion inicial de la bala referido a la nave
					disparo.body.velocity.y = -500;
					tiempoDisparo = game.time.now + 100;
				}
			}

			if(game.time.now > tiempoDisparoEnemigos){
				this.dispararEnemigos();
			}

			var ovniDestruido = game.physics.arcade.overlap(disparos, ovnis, this.colision, null, this);
			var naveDestruida = game.physics.arcade.overlap(disparosEnemigos, nave, this.colisionConPJ, null, this);
            var asteroideDestruido = game.physics.arcade.overlap(disparosEnemigos, asteroides, this.colisionConAsteriode, null, this);
            var asteroideDestruidoPorNave = game.physics.arcade.overlap(disparos, asteroides, this.colisionConAsteriode, null, this);
			// funcion que se encarga de saber si se solapa un elemento con otro

			if(naveDestruida){
                vidas -= 1;
                var vida = vidasNave.getFirstAlive();

                if (vida){
                    vida.kill();
                }
                
                if(vidas == 0){
				    this.state.start("gameOver");
                    musicaJuego.stop();
                }
			}

			if(ovniDestruido){
				puntuacion += 20;
				textoPuntos.text = "Puntuación: " +puntuacion;
                if(puntuacion == 480){
                    this.state.start("gameOver");
                    musicaJuego.stop();
                }
                
			}

		},

		colision: function (disparo, ovni){
			//  y aqui creo la explosion :o
		    var explosion = explosiones.getFirstExists(false);
		    explosion.reset(ovni.body.x, ovni.body.y);
		    explosion.play('explosion', 10, false, true);
            sonidoExplosionEnemiga.play();
            
		    disparo.kill();
			ovni.kill();
            
		},

		colisionConPJ: function (disparoEnemigo, nave){
            
			var explosion = explosiones.getFirstExists(false);
		    explosion.reset(nave.body.x, nave.body.y);
		    explosion.play('explosion', 10, false, true);
            sonidoExplosionNave.play();
		    nave.kill();
		},


		ponerExplosion: function (ovni) {
		    ovni.anchor.x = 0.5;
		    ovni.anchor.y = 0.5;
		    ovni.animations.add('explosion');

		},
        
        colisionConAsteriode: function(disparo, asteroide){
            var explosionAsteroide = explosionesAsteroides.getFirstExists(false);
            explosionAsteroide.reset(asteroide.body.x, asteroide.body.y);
            explosionAsteroide.play("explosionAsteroide", 10, false, true);
            disparo.kill();
            sonidoExplosionAsteroide.play();
            asteroide.kill();
        },

		dispararEnemigos: function() {
		    disparoEnemigo = disparosEnemigos.getFirstExists(false);
		  	numeroDeEnemigos.length = 0;

		  	 ovnis.forEachAlive(function(ovni){ 
                 // aqui pongo en un array todos los ovnis que queden con vida
                 // este for llamará a todos los hijos del grupo ovnis "vivos"
                 
		        numeroDeEnemigos.push(ovni);
		    });

		    if (disparoEnemigo && numeroDeEnemigos.length > 0){
		        var ovniAleatorio = game.rnd.integerInRange(0,numeroDeEnemigos.length-1);
		        // equivale a un numero random entre 6 y numeroDeEnemigos

		        var disparoRandom = numeroDeEnemigos[ovniAleatorio];
		       	
		       	disparoEnemigo.reset(disparoRandom.body.x, disparoRandom.body.y);
		       	disparoEnemigo.body.velocity.y = +600;
		        tiempoDisparoEnemigos = game.time.now + 200;
                sonidoLaserEnemigo.play();

		    }

		},
        
        ponerExplosionAsteriode: function (asteroide) {
		    asteroide.anchor.x = 0.3;
		    asteroide.anchor.y = 0.3;
		    asteroide.animations.add('explosionAsteroide');

		},
};