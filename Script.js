//Elements Variables
let songIndex = 0;
let audioFile = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("mastersongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    {SongName: "Tum Se Hi", filePath: "Songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {SongName: "Chinuku Taake", filePath: "Songs/2.mp3", coverPath: "covers/cover2.jpg"},
    {SongName: "Neeli Meghamulalo", filePath: "Songs/3.mp3", coverPath: "covers/cover3.jpg"},
    {SongName: "Wanna Be Yours", filePath: "Songs/4.mp3", coverPath: "covers/cover4.jpg"},
    {SongName: "Swagatham Krishna", filePath: "Songs/5.mp3", coverPath: "covers/cover5.jpg"},
    {SongName: "Madhura Madhuratara", filePath: "Songs/6.mp3", coverPath: "covers/cover6.jpg"},
    {SongName: "Challa Gaali Thakuthunna", filePath: "Songs/7.mp3", coverPath: "covers/cover7.jpg"}
]
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;
});

//pause/play song
masterPlay.addEventListener('click', ()=>{
    if(audioFile.paused || audioFile.currentTime<=0){
        audioFile.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioFile.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

//Listening Event
audioFile.addEventListener('timeupdate',()=>{
    //update progressBar
    progress = parseInt((audioFile.currentTime/audioFile.duration)*100);
    progressBar.value = progress; 
})

//progressBar cntrl
progressBar.addEventListener('change',()=>{
    audioFile.currentTime = progressBar.value * audioFile.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioFile.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].SongName; 
        audioFile.currentTime = 0;
        audioFile.play();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioFile.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].SongName; 
    audioFile.currentTime = 0;
    audioFile.play();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioFile.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].SongName; 
    audioFile.currentTime = 0;
    audioFile.play();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
})