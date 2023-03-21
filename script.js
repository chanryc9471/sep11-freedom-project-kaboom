// start the game
kaboom({
    background: [0, 0, 0]
})

// sprites
loadSprite('cat', 'img/cat.png')
// loadSprite('enemy', 'img/enemy.png')
loadSprite('octo-coin', 'img/coin.png')
loadSprite('orange-block', 'img/orange.png')
loadSprite('yellow-block', 'img/yellow.png')
loadSprite('green-block', 'img/green.png')
loadSprite('blue-block', 'img/blue.png')

scene('game', () =>{
    var player = add([
        sprite('cat'),
        pos(30,40),
        area(),
        body(),
    ])


})

