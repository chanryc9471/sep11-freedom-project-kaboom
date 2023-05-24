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
// loadSprite('blue-block', 'img/blue.png') // for more levelz





scene('game', ({level, score}) => {
	layers(['bg','obj','ui'], 'obj')


// GAME MAP
var maps = [
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
		'                   @     ##     &    ',
		'                !!!!!!!!!!!!   !!!   ',
		'       #   !!!                       ',
		'      !!!                    !       ',
		'  ##      @                 !!       ',
		'!!!!!!!!!!!!!!!!!!    !!!!!!!!!!     ',

	],
	[
		'                                     ',
		'                                     ',
		'                                     ',
		'                      %%%%           ',
		'                         %           ',
		'                      ###%           ',
		'                     %%%%%           ',
		'           #     @                   ',
		'      #   %%%   %%%            &     ',
		'     %%%      @           %%%%%%     ',
		'%%%         %%%%%    %%%             ',

	],

]

	var MOVE_SPEED = 250
	var JUMP_FORCE = 500
	var DEATH = 800
	var ENEMY_SPEED = -60

	var levelCfg = {
		width:45,
		height:50,
		'=': [sprite('o-block'),solid()],
		'#': [sprite('coin'), 'coin'],
		'&': [sprite('door'), 'door'],
		'!': [sprite('y-block'),solid()],
		'@': [sprite('enemy'),'enemy',solid(), body(), {speed: ENEMY_SPEED}],
		'%': [sprite('g-block'),solid()]

	}

	var gameLevel = addLevel(maps[level],levelCfg)
console.log(mousePos('enemy'))
	var scoreLabel = add([
		text(score, 30),
		pos(0,300),
		layer('ui'),
		{
			value: score,
		}
	])

	add([text('level ' + parseInt(level + 1), 30), pos(60,300)])


	var player = add([
		sprite('char'),solid(),
		pos(30,0),
		body(),
		origin('bot')
	])



	player.collides('enemy', (e)=> {
		destroy(e)
		go('lose', {score: scoreLabel.value})
	})

	action('enemy', (e)=> {
		e.move(e.speed,0)

		if (e.pos.x > 500 || e.pos.x < 30){
			e.speed = e.speed * -1
		}
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

	keyDown('up',()=>{
		if(player.grounded()){
			player.jump(JUMP_FORCE)
		}
	})
})

scene('lose', ({score}) =>{
	add([text(score,32), origin('center'), pos(width()/2, height()/2)])

	keyPress('space', ()=>{
		go('game', {level:0, score:0})
	})
})

start('game', {level:0, score:0})
