let cats = [
"https://cataas.com/cat?1",
"https://cataas.com/cat?2",
"https://cataas.com/cat?3",
"https://cataas.com/cat?4",
"https://cataas.com/cat?5",
"https://cataas.com/cat?6",
"https://cataas.com/cat?7",
"https://cataas.com/cat?8",
"https://cataas.com/cat?9",
"https://cataas.com/cat?10"
];

let preloadedCats = [];

let loadedCount = 0;

cats.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        loadedCount++;
        document.querySelector("#loading-screen p").innerText = `Loading cats... (${loadedCount}/${cats.length})`;

        if (loadedCount === cats.length) {
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("app-wrapper").classList.remove("hidden");
            showCat();
        }
    };
    preloadedCats.push(img);
});

let current = 0;
let likedCats = [];
let isLoading = false;

function showCat() {
    if(current < cats.length) {
        let img = document.getElementById("cat-image");
        isLoading = true;

        img.src = preloadedCats[current].src;

        img.onload = function(){
            isLoading = false;
        };

        document.getElementById("progress").innerText =
            "Cat " + (current + 1) + " of " + cats.length;

    } else {
        showResults();
    }
}

function like(){
	if(isLoading) return; 
    isLoading = true;
	
	let heart = document.getElementById("like-icon");
    heart.classList.remove("show");
    void heart.offsetWidth; 
    heart.classList.add("show");
	
    let img = document.getElementById("cat-image");
    img.classList.add("swipe-right");

    setTimeout(()=>{
        likedCats.push(cats[current]);
        img.classList.remove("swipe-right");
        current++;
        showCat();
    },300);
}

function dislike(){
	if(isLoading) return;
    isLoading = true;
	
	let sad = document.getElementById("dislike-icon");
    sad.classList.remove("show");
    void sad.offsetWidth;
    sad.classList.add("show");
	
    let img = document.getElementById("cat-image");
    img.classList.add("swipe-left");

    setTimeout(()=>{
        img.classList.remove("swipe-left");
        current++;
        showCat();
    },300);
}

function showResults(){
    const header = document.getElementById("result-header");

    document.getElementById("card-container").style.display="none";
    document.querySelector(".buttons").style.display="none";

    let result = document.getElementById("result");
    result.classList.remove("hidden");

    document.getElementById("like-count").innerText =
        "You liked " + likedCats.length + " cats!";

    let likedContainer = document.getElementById("liked-cats");

	likedCats.forEach(cat => {

    let img = document.createElement("img");
    img.src = cat;

    img.style.cursor = "pointer";

    img.onclick = function(){
        openViewer(cat);
    };

    likedContainer.appendChild(img);
	likedContainer.classList.add("fade-in");

});
	
	if(likedCats.length === 0){
	header.style.display = "none";
    let meme = document.getElementById("meme");
    meme.classList.remove("hidden");
	meme.classList.add("fade-in");

    meme.innerHTML = `
        <img src="https://s13.gifyu.com/images/bm9nX.jpg"
        alt="BRO SERIOUSLY YOU DON'T LIKE CATS AT ALL"
        style="width:320px; max-width:90%; border-radius:10px; margin-top:10px;">
    `;
}

if(likedCats.length === 10){
    let lovememe = document.getElementById("lovememe");
    lovememe.classList.remove("hidden");
    lovememe.classList.add("fade-in");
    lovememe.innerHTML = `
        <p>You are a purrrfect cat lover! 😘</p>
        <img src="https://s13.gifyu.com/images/bm9ud.gif"
        alt="LOVE YOU"
        style="width:320px; max-width:90%; border-radius:10px; margin-top:10px;">
    `;
}
}

function openViewer(src){

    let viewer = document.getElementById("image-viewer");
    let viewerImg = document.getElementById("viewer-img");

    viewerImg.src = src;

    viewer.style.display = "flex";
}

document.getElementById("close-viewer").onclick = function(){
    document.getElementById("image-viewer").style.display = "none";
};

function restart(){
    current = 0;
    likedCats = [];

    let btn = document.getElementById("restart-btn");
    if(cats.length == 10){
        btn.innerText = "Try Again";
    } else {
        btn.innerText = "Restart";
    }
    location.reload();
}

let startX = 0;

document.getElementById("cat-image").addEventListener("touchstart", function(e){
    startX = e.touches[0].clientX;
});

document.getElementById("cat-image").addEventListener("touchend", function(e){
    let endX = e.changedTouches[0].clientX;

    if(endX - startX > 50){
        like();
    }
    else if(startX - endX > 50){
        dislike();
    }
});

const modal = document.getElementById("restart-modal");
const closeModal = document.getElementById("close-modal");
const confirmBtn = document.getElementById("confirm-restart");
const cancelBtn = document.getElementById("cancel-restart");

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("restart-modal");
    const closeModal = document.getElementById("close-modal");
    const confirmBtn = document.getElementById("confirm-restart");
    const cancelBtn = document.getElementById("cancel-restart");

    window.openRestartModal = function() {
        modal.classList.remove("hidden");
    }

    closeModal.onclick = function() {
        modal.classList.add("hidden");
    }

    cancelBtn.onclick = function() {
        modal.classList.add("hidden");
    }

    confirmBtn.onclick = function() {
        modal.classList.add("hidden");
        restart();
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    }
});

showCat();