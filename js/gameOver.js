var textoMenu = textoTitulo = "";

var gameOver = {

	preload: function(){
		game.load.image("fondoMenu", "img/space.jpg");
		game.load.image("virgoMenu", "img/signoVirgo.png");
		game.load.image("logotipoMenu", "img/log.png");
        game.load.image("botonRestart", "img/reload.png");
        
	},

	create: function(){
		game.add.sprite(0, 0, "fondoMenu");
		game.add.sprite(0,0, "virgoMenu");
		game.add.sprite(750, 560, "logotipoMenu");

        if(puntuacion != 480){
            textoMenu = game.add.text(game.width/2, game.height/2-130, "Inténtelo de nuevo", {font:"bold 24px sans-serif", fill:"red", align:"center"});
            textoMenu.anchor.setTo(0.5);
            
        }else {
            textoMenu = game.add.text(game.width/2, game.height/2-130, "Has terminado con la invasión espacial", {font:"bold 24px sans-serif", fill:"green", align:"center"});
            textoMenu.anchor.setTo(0.5);
        }

        textoTitulo = game.add.text(game.width/2, game.height/2-180, "Puntuación: "+puntuacion.toString(), {font:"bold 32px sans-serif", fill:"white", align:"center"});
        textoTitulo.anchor.setTo(0.5);
        var boton = this.add.button(game.width/2, game.height/2, "botonRestart", this.reloadJuego, this);
		boton.anchor.setTo(0.5);

	},
    
    reloadJuego: function(){
        puntuacion = 0;
        vidasNave = vidas = 3;
        this.state.start("Juego");
    }
    
};