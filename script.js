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





scene('game', ({score}) => {
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
		'          ###                        ',
		'         ====                        ',
		'                 &                   ',
		'========       ======    =======     ',

]



	const levelCfg = {
		width:45,
		height:45,
		'=': [sprite('orange-block'),solid()],
		'#': [sprite('coin'), 'coin'],
		'&': [sprite('door'), solid()]

	}

	const gameLevel = addLevel(map,levelCfg)

	const scoreLabel = add([
		text(score),
		pos(30,200),
		layer('ui'),
		{
			value: score,
		}
	])

	add([text('level' + 'score', pos(4,6))])


	const player = add([
		sprite('char'),solid(),
		pos(30,0),
		body(),
		origin('bot')
	])

	const MOVE_SPEED = 150
	const JUMP_FORCE = 450
	const DEATH = 600

	player.collides('coin', (c)=>{
	destroy(c)
	scoreLabel.value++
	scoreLabel.text = scoreLabel.value
	})

	player.action(() => {
		camPos(player.pos)
		if(player.pos.y >= DEATH){
			go('lose', {score: scoreLabel.value})
		}
	})
	keyDown('left',()=>{
		player.move(-MOVE_SPEED,0)
	})

	keyDown('right',()=>{
		player.move(MOVE_SPEED,0)
	})

	keyPress('space',()=>{
		if(player.grounded()){
			player.jump(JUMP_FORCE)
		}
	})
})

scene('lose', ({score}) =>{
	add([text(score,32), origin('center'), pos(width()/2, height()/2)])
})

start('game', {score:0})
