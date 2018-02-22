var fondoMenu;
var musicaMenu;

var Menu = {

	preload: function(){
		game.stage.backgroundColor = "#FFF";
		game.load.image("botonInicio", "img/play.png");
		game.load.image("fondoMenu", "img/space.jpg");
		game.load.image("virgoMenu", "img/signoVirgo.png");
		game.load.image("logotipoMenu", "img/log.png");
        game.load.audio("musicaFondo","sounds/musicaFondo.mp3");
        game.load.image("explicacionMenu", "img/movimientos.png");
	},

	create: function(){
        musicaMenu = game.add.audio("musicaFondo");
        musicaMenu.volume = 1;
        musicaMenu.play();
        
        fondoMenu = game.add.tileSprite(0, 0, game.width, game.height, "fondoMenu");
		game.add.sprite(0,0, "virgoMenu");
		game.add.sprite(750, 560, "logotipoMenu");
		var boton = this.add.button(game.width/2, game.height/2, "botonInicio", this.iniciarJuego, this);
		boton.anchor.setTo(0.5);

		var textoMenu = game.add.text(game.width/2, game.height/2-130, "Iniciar Juego", {font:"bold 24px sans-serif", fill:"red", align:"center"});
		textoMenu.anchor.setTo(0.5);

		var textoTitulo = game.add.text(game.width/2, game.height/2-180, "Invasores Espaciales", {font:"bold 32px sans-serif", fill:"white", align:"center"});
		textoTitulo.anchor.setTo(0.5);
        
        var explicacion = game.add.sprite(30, 430, "explicacionMenu");
        explicacion.alpha = 0.6;
            

	},
    
    update: function(){
        fondoMenu.tilePosition.y += 2;
        
    },

	iniciarJuego: function(){
		this.state.start("Juego");
        musicaMenu.stop();
	}
};

