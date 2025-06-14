const tracks = [
  { name: 'Tyler The Creator - See You Again', path: 'music/Tyler_ The Creator - SEE YOU AGAIN.mp3' },
  { name: 'Kali Uchis - After The Storm', path: 'music/Kali Uchis - After The Storm ft. Tyler_ The Creator_ Bootsy Collins.mp3' },
  { name: 'Kendrick Lamar - luther', path: 'music/Kendrick Lamar - luther.mp3' },
  { name: 'Feel It - From Invincible', path: 'music/Feel It - From _Invincible.mp3' },
  { name: 'Poison', path: 'music/Poison.mp3' },
  { name: 'Gorillaz - Strobelite', path: 'music/Gorillaz - Strobelite.mp3' },
  { name: 'I Wonder', path: 'music/I Wonder.mp3' }
];

let currentTrackIndex = 0;
let audio = new Audio(tracks[currentTrackIndex].path); // Inicializa o áudio com a primeira música
const playPauseButton = document.getElementById('play-pause-button');
const trackName = document.getElementById('track-name');
const currentTimeElement = document.getElementById('current-time');
const trackLengthElement = document.getElementById('track-length');
const seekBar = document.getElementById('seek-bar');

// Atualiza o nome da música
function updateTrackName() {
  trackName.textContent = tracks[currentTrackIndex].name;
}

// Toca ou pausa a música
playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
  } else {
    audio.pause();
    playPauseButton.innerHTML = '<i class="bi bi-play-fill"></i>';
  }
});

// Avança para a próxima música
document.getElementById('play-next').addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Avança para a próxima música ou volta para a primeira
  audio.src = tracks[currentTrackIndex].path;
  updateTrackName();
  audio.play();
  playPauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
});

// Retorna à música anterior
document.getElementById('play-previous').addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Volta para a música anterior ou vai para a última
  audio.src = tracks[currentTrackIndex].path;
  updateTrackName();
  audio.play();
  playPauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
});

// Atualiza o tempo da música
audio.addEventListener('loadedmetadata', () => {
  trackLengthElement.textContent = formatTime(audio.duration);
  seekBar.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
  currentTimeElement.textContent = formatTime(audio.currentTime);
  seekBar.value = audio.currentTime;
});

seekBar.addEventListener('input', () => {
  audio.currentTime = seekBar.value;
});

// Formata o tempo para mostrar no player
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Inicializa o nome da música
updateTrackName();