const music = [{
        name: 'Tháng năm',
        singer: 'Soobin Hoàng Sơn',
        src: './assets/music/ThangNam.mp3',
        image: './assets/img/soobin.jpg'
    },
    {
        name: 'Vẫn nhớ',
        singer: 'Soobin Hoàng Sơn',
        src: './assets/music/vanNho.mp3',
        image: './assets/img/soobin.jpg'
    },
    {
        name: 'Black Jack',
        singer: 'Soobin Hoàng Sơn',
        src: './assets/music/blackJack.mp3',
        image: './assets/img/soobin.jpg'
    },
    {
        name: 'Anh đã quen với cô đơn',
        singer: 'Soobin Hoàng Sơn',
        src: './assets/music/anhDaQuenVoiCoDon.mp3',
        image: './assets/img/soobin.jpg'
    },
    {
        name: 'Bâng khuâng',
        singer: 'Justa Tee',
        src: './assets/music/bangKhuang.mp3',
        image: './assets/img/justaTee.jpg'
    },
    {
        name: 'Cơn mơ băng giá',
        singer: 'Bằng Kiều',
        src: './assets/music/conMoBangGia.mp3',
        image: './assets/img/bangKieu.jpg'
    },
    {
        name: 'Cũng đành thôi',
        singer: 'Đức Phúc',
        src: './assets/music/cungDanhThoi.mp3',
        image: './assets/img/ducPhuc.jpg'
    },
    {
        name: 'Lạc nhau có phải muôn đời',
        singer: 'Erik',
        src: './assets/music/lacNhauCoPhaiMuonDoi.mp3',
        image: './assets/img/erik.jpg'
    },
    {
        name: '25 minutes',
        singer: 'Michael Learns To Rock',
        src: './assets/music/haiLamPhut.mp3',
        image: './assets/img/mltr.jpg'
    },
    {
        name: 'Nàng thơ',
        singer: 'Hoàng Dũng',
        src: './assets/music/nangTho.mp3',
        image: './assets/img/hoangDung.jpg'
    }
]

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const songName = $('.songinfo__name')
const songSinger = $('.songinfo__singer')
const audio = $('#audio')
const thumb = $('.image-wrapper img')
const pauseBtn = $('.pause')
const playBtn = $('.play')
const prevBtn = $('.prev')
const nextBtn = $('.next')
const randomBtn = $('.random')
const progressArea = $('.progress-area')
const progressBar = $('.progress-bar')
const loopBtn = $('.loop')
const musicList = $('.music-list')
const library = $('.header span')
const musicList1 = $('.list')
const musicList1Header = $('.list-header')
const closeBtn = $('.close')

let musicIndex = Math.floor(Math.random() * music.length)

function start() {
    loadSong(musicIndex)
    renderList()
    playInPc()
    playInList()
}

start()

function loadSong(index) {
    songName.innerText = music[index].name
    songSinger.innerText = music[index].singer
    audio.src = music[index].src
    thumb.src = music[index].image
    editActive(index)
    scrollToActiveSong()
}

function loadRandomSong() {
    let index = Math.floor((Math.random() * music.length) + 1)
    do {
        index = Math.floor((Math.random() * music.length) + 1)
    }
    while (musicIndex == index)
    musicIndex = index
    loadSong(musicIndex)
    scrollToActiveSong()
}

function playSong() {
    if (playBtn.classList = 'play active') {
        playBtn.classList.remove('active')
        pauseBtn.classList.add('active')
    }
    audio.play()
}

function playPrev() {
    musicIndex--
    musicIndex < 1 ? musicIndex = music.length - 1 : musicIndex = musicIndex
    loadSong(musicIndex)
    editActive(musicIndex)
    playSong()
    thumbAnimate.play()
}

function playNext() {
    musicIndex++
    musicIndex > music.length - 1 ? musicIndex = 0 : musicIndex = musicIndex
    loadSong(musicIndex)
    editActive(musicIndex)
    playSong()
    thumbAnimate.play()
}

playBtn.onclick = function() {
    playBtn.classList.remove('active')
    pauseBtn.classList.add('active')
    audio.play()
    thumbAnimate.play()
}

pauseBtn.onclick = function() {
    playBtn.classList.add('active')
    pauseBtn.classList.remove('active')
    audio.pause()
    thumbAnimate.pause()
}

prevBtn.onclick = function() {
    const getClass = randomBtn.classList
    switch (getClass.value) {
        case 'random':
            playPrev()
            break
        case 'random active':
            loadRandomSong()
            playSong()
            break
    }
}

nextBtn.onclick = function() {
    const getClass = randomBtn.classList
    switch (getClass.value) {
        case 'random':
            playNext()
            break
        case 'random active':
            loadRandomSong()
            playSong()
            break
    }
}

randomBtn.onclick = function() {
    const getClass = randomBtn.classList
    switch (getClass.value) {
        case 'random':
            randomBtn.classList.add('active')
            break
        case 'random active':
            randomBtn.classList.remove('active')
            break
    }
}

audio.ontimeupdate = function(e) {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = $('.current')
    let musicDuration = $('.duration')

    audio.onloadeddata = function() {
        let mainDuration = audio.duration
        let totalMin = Math.floor(mainDuration / 60)
        let totalSec = Math.floor(mainDuration % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`
    }

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
}

progressArea.onclick = function(e) {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;

    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playSong();
}

loopBtn.onclick = function() {
    const getText = loopBtn.classList
    switch (getText.value) {
        case 'loop':
            loopBtn.classList.add('active')
            break
        case 'loop active':
            loopBtn.classList.remove('active')
            break
    }
}

audio.addEventListener("ended", () => {
    const getText = loopBtn.classList
    switch (getText.value) {
        case 'loop':
            playNext()
            break
        case 'loop active':
            loopOn()
            break
    }
})

audio.addEventListener("ended", () => {
    const getClass = randomBtn.classList
    switch (getClass.value) {
        case 'random active':
            loadRandomSong()
            playSong()
            break
    }

})

function renderList() {
    for (let index = 0; index < music.length; index++) {
        let htmls = `<li li-index="${index}" class="song ${index == musicIndex ? 'active' : ''}">
                            <div class="info">
                                <h2 class="info-name">${music[index].name}</h2>
                                <p class="info-artist">${music[index].singer}</p>
                            </div>
                            <div class="src">
                                <span class="duration-${index}"></span>
                                <audio class="audio-${index}" src="${music[index].src}"></audio>
                            </div>
                        </li>`
        musicList.insertAdjacentHTML('beforeend', htmls)

        const listDuration = $(`.duration-${index}`)
        const listAudio = $(`.audio-${index}`)

        listAudio.onloadeddata = function() {
            let mainDuration = listAudio.duration
            let totalMin = Math.floor(mainDuration / 60)
            let totalSec = Math.floor(mainDuration % 60)
            if (totalSec < 10) {
                totalSec = `0${totalSec}`;
            }
            listDuration.innerText = `${totalMin}:${totalSec}`
        }
    }
}

function editActive(index) {
    const allLiTag = $$('.song')

    for (let j = 0; j < allLiTag.length; j++) {
        if (allLiTag[j].classList.contains('active')) {
            allLiTag[j].classList.remove('active')
        }

        if (allLiTag[j].getAttribute('li-index') == index) {
            allLiTag[j].classList.add('active')
        }
    }
}

function playInPc() {
    const allLiTag = $$('.song')

    for (let i = 0; i < allLiTag.length; i++) {
        allLiTag[i].onclick = function() {
            allLiTag[i].classList.add('active')
            loadSong(i)
            editActive(i)
            playSong()
            thumbAnimate.play()
        }
    }
}


const thumbAnimate = thumb.animate([{
    transform: 'rotate(360deg)'
}], {
    duration: 20000,
    iterations: Infinity
})
thumbAnimate.pause()

function scrollToActiveSong() {
    setTimeout(() => {
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }, 500)
}

function loopOn() {
    audio.currentTime = 0
    loadSong(musicIndex)
    playSong()
}

library.onclick = function() {
    musicList1.style.width = `100%`
    closeBtn.style.display = 'flex'
}

closeBtn.onclick = function() {
    musicList1.style.width = 0
    closeBtn.style.display = 'none'
}

function playInMobile() {
    const allLiTag = $$('.song')

    for (let i = 0; i < allLiTag.length; i++) {
        allLiTag[i].onclick = function() {
            allLiTag[i].classList.add('active')
            loadSong(i)
            editActive(i)
            playSong()
            musicList1.style.width = 0
            closeBtn.style.display = 'none'
            thumbAnimate.play()
        }
    }
}

function playInList() {
    const width = window.innerWidth
    if (width < 740) {
        playInMobile()
    }
}