// START THE GAME
kaboom ({
	global:true,
	fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [0,2,1,1],
	background: [176, 201, 217]

})

// SPRITES
loadSprite('char', 'img/char.png')
loadSprite('enemy', 'img/enemy.png')
loadSprite('coin', 'img/coin.png')
loadSprite('door', 'img/door.png')
loadSprite('o-block', 'img/orange.png')
loadSprite('y-block', 'img/yellow.png')
loadSprite('g-block', 'img/green.png')
// loadSprite('blue-block', 'img/blue.png')





scene('game', ({level, score}) => {
	layers(['bg','obj','ui'], 'obj')


// GAME MAP
const maps = [
	[

		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'          ###                        ',
		'         ====                        ',
		'                ####          &      ',
		'========       ======   ========     ',

	],
	[

		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                                     ',
		'                       @ ##     &    ',
		'                !!!!!!!!!!!!   !!!   ',
		'       #   !!!                       ',
		'      !!!                            ',
		'  ##      @                          ',
		'!!!!!!!!!!!!!!!!!!      !!!!!!!!     ',

	],
	[
		'                                     ',
		'                                     ',
		'                                     ',
		'                      %%%%           ',
		'                         %           ',
		'                      ###%           ',
		'                     %%%%%           ',
		'           #     @              ',
		'      #   %%%   %%%            &     ',
		'     %%%      @           %%%%%%     ',
		'%%%         %%%%%    %%%             ',

	],

]



	const levelCfg = {
		width:45,
		height:50,
		'=': [sprite('o-block'),solid()],
		'#': [sprite('coin'), 'coin'],
		'&': [sprite('door'), 'door'],
		'!': [sprite('y-block'),solid()],
		'@': [sprite('enemy'),'enemy',solid(), body()],
		'%': [sprite('g-block'),solid()]

	}

	const gameLevel = addLevel(maps[level],levelCfg)

	const scoreLabel = add([
		text(score),
		pos(0,300),
		layer('ui'),
		{
			value: score,
		}
	])

	add([text('level ' + parseInt(level + 1)), pos(20,300)])


	const player = add([
		sprite('char'),solid(),
		pos(30,0),
		body(),
		origin('bot')
	])

	const MOVE_SPEED = 250
	const JUMP_FORCE = 500
	const DEATH = 800

	player.collides('enemy', (e)=> {
		destroy(e)
		go('lose', {score: scoreLabel.value})
	})

	action('enemy', (e)=> {
		e.move(-25,0)
	})
	player.collides('coin', (c)=>{
	destroy(c)
	scoreLabel.value++
	scoreLabel.text = scoreLabel.value
	})
	player.collides('door',() => {
		go('game', {
			level:(level + 1) % maps.length,
			score:scoreLabel.value
		})
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
	
	keyDown(()=>{
		go('game', {level:0, score:0})
	})
})

start('game', {level:0, score:0})
