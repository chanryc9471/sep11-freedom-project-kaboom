// START THE GAME
kaboom({
	global:true,
	fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [0,1,1,1],

})

// SPRITES
loadSprite('cat', 'img/cat.png')
// loadSprite('enemy', 'img/enemy.png')
loadSprite('octo-coin', 'img/coin.png')
loadSprite('orange-block', 'img/orange.png')
loadSprite('yellow-block', 'img/yellow.png')
loadSprite('green-block', 'img/green.png')
loadSprite('blue-block', 'img/blue.png')





// // LOAD SPRITES
// const player = add([
//         sprite('cat'),
//         pos(30,400),
//         area(),
//         body(),
//     ])

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
		'                                     ',
		'                                     ',
		'                                     ',
		'= = = = = = = =       = = = =        ',

]


	// define each object as a componenet

	// // LOAD SPRITES
	// const player = add([
	// 	sprite('cat'),
	// 	pos(30,400),
	// 	area(),
	// 	body(),
	// ])

	const levelCfg = {
		width:30,
		height:30,
		'=': [sprite('orange-block'),solid()]

	}

const gameLevel = addLevel(map,levelCfg)

	const player = add([
		sprite('cat'),solid(),
		pos(30,0),
		body(),
		origin('bot')
	])
})

start('game')