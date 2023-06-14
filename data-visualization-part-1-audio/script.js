import waveRender from './waveRender.js';
import waveRender2 from './waveRender2.js';
import lineRenderer from './lineRenderer.js'
import starRenderer from './starRender.js'
import nightRenderer from './staryNight.js'

// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Buttons 
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})

// --------------------------------------------------------
// Audio setup

// Defined variables 
let analyser
let frequencyArray
let audio

// Starts playing the audio
function startAudio() {
	// made a new Audio Object
	audio = new Audio()

	// Get a context 
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()
	
	// source sound file 
	audio.src = 'Josh Groban - Vincent (Starry, Starry Night) (Official Audio).mp3'

	// Make a new analyser
	analyser = audioContext.createAnalyser()
	
	// Connect the analyser and the audio
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	analyser.connect(audioContext.destination)

	// Get an array of audio data from the analyser
	// line generates an array of 1024 8 bit values. 
	// That is it's an array of 1024 numbers that all range from 0 to 255.
	// The value of each represents how load the audio is in each of the 1024 frquecy bands.
	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	
	// Start playing the audio
	audio.play()

	requestAnimationFrame(render)
}

// This function renders the audio to the canvas using a renderer
function render() {

  const centerX = ctx.canvas.width / 2
	const centerY = ctx.canvas.height / 2
	analyser.getByteFrequencyData(frequencyArray)

	starRenderer(frequencyArray, ctx, centerX, centerY)

	// Set up the next animation frame
	requestAnimationFrame(render)
}