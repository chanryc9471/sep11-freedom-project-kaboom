// START THE GAME
kaboom ({
	global:true,
	fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [0,1,1,1],

})

// SPRITES
loadSprite('char', 'img/char.png')
// loadSprite('enemy', 'img/enemy.png')
loadSprite('coin', 'img/coin.png')
loadSprite('door', 'img/door.png')
loadSprite('orange-block', 'img/orange.png')
loadSprite('yellow-block', 'img/yellow.png')
loadSprite('green-block', 'img/green.png')
loadSprite('blue-block', 'img/blue.png')





scene('game', () => {
	layers(['bg','obj','ui'], 'obj')


// GAME MAP
const map = [

		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'          ##                         ',
		'         ====                        ',
		'                 &                   ',
		'========      =======    =======     ',

]



	const levelCfg = {
		width:45,
		height:45,
		'=': [sprite('orange-block'),solid()],
		'#': [sprite('coin'),solid()],
		'&': [sprite('door'), solid()]

	}

	const gameLevel = addLevel(map,levelCfg)

	const scoreLabel = add([
		text('test'),
		pos(30,6),
		layer('ui'),
		{
			value: 'test',
		}
	])

	add([text('level' + 'test', pos(4,6))])


	const player = add([
		sprite('char'),solid(),
		pos(30,0),
		body(),
		origin('bot')
	])

	const MOVE_SPEED = 120

	keyDown('left',()=>{
		player.move(-MOVE_SPEED,0)
	})

	keyDown('right',()=>{
		player.move(MOVE_SPEED,0)
	})

	// keyPress('space',()=>{

	// })
})

start('game')
