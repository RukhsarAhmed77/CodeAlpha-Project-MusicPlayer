const image = document.getElementById("cover"),
    title = document.getElementById("music-title"),
    artist = document.getElementById("music-artist"),
    durationEl = document.getElementById("duration"),
    currentTimeEl = document.getElementById("current-time"),
    progress = document.getElementById("progress"),
    playerProgress = document.getElementById("player-progress"),
    previous = document.getElementById("Previous"),
    next = document.getElementById("Next"),
    playButton = document.getElementById("Play"),
    playIcon = document.querySelector("#Play .fa-play"),
    pauseIcon = document.querySelector("#Play .fa-pause"),
    background = document.getElementById("bg-image");

const music = new Audio();
const songs = [
    {
        path: "audio/audio-1.mp3",
        dispayName: "Ya Quluban",
        cover: "cover/music01.jpg",
        artist: "Abdulla AlSinani"
    },
    {
        path: "audio/audio-2.mp3",
        dispayName: "Taweel Al Shawq ",
        cover: "cover/music02.jpg",
        artist: "Ahmed Bukhatir"
    },
    {
        path: "audio/audio-3.mp3",
        dispayName: "Tabalagh Bellqaleel",
        cover: "cover/music03.jpg",
        artist: "Osama Al Safi"
    },
    {
        path: "audio/audio-4.mp3",
        dispayName: "The Way of the Tears",
        cover: "cover/music04.jpg",
        artist: "Muhammad Al Muqit"
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    playButton.setAttribute("title", "Pause");
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    playButton.setAttribute("title", "Play");
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.dispayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgress() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgress(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playButton.addEventListener("click", togglePlay);
previous.addEventListener("click", () => changeMusic(-1));
next.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgress);
playerProgress.addEventListener("click", setProgress);


loadMusic(songs[musicIndex]);
