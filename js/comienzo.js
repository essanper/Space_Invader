var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'escenario'); 

game.state.add("Menu", Menu);
game.state.add("Juego", Juego);
game.state.add("gameOver", gameOver);

game.state.start("Menu");