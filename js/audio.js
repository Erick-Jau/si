const audio = document.querySelector('audio');
const container = document.querySelector('.audio-container');
const audioDuration = document.querySelector('.duration');
const playButton = document.querySelector('.play-button');
let isPlaying = false;

const toggleAudio = (event) => {
	if (isPlaying) {
		audio.pause()
		isPlaying = false
		playButton.classList.remove('playing')
	} else {
		audio.play()
		isPlaying = true
		playButton.classList.add('playing')
	}
}

audio.onloadedmetadata = () => {
	let minutes = Math.floor(audio.duration / 60)
	let seconds = Math.floor(audio.duration - minutes * 60)
	audioDuration.innerHTML = `${minutes}:${seconds}`
}