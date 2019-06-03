let image = document.getElementById("imgClickAndChange");
let lifeText = document.getElementById("life");
let isEgg = true;

image.addEventListener("click", changeImage);


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

startImage();

function startImage() {
    if (localStorage.getItem("isEgg") === "true") {
        image.src = "../img/egg.jpg";
        image.classList.add('egg');
    } else {
        image.src = "../img/chicken.jpg";
        image.classList.add('chicken');
    }
}

function changeImage() {
    let clicks = localStorage.getItem("clickCount") || 0;
    clicks++;

    if (clicks > 9) {
        sleep(500).then(() => {
            lifeText.innerHTML = "<h2>Get a life!</h2>";
            localStorage.setItem("clickCount", "0");
        });
        image.parentNode.removeChild(image);
    }

    localStorage.setItem("clickCount", clicks);
    if (image.classList.contains("egg")) {
         image.src = "../img/chicken.jpg";
         image.classList.remove('egg');
         image.classList.add('chicken');
         localStorage.setItem("isEgg","false");
    } else {
         image.src = "../img/egg.jpg";
         image.classList.remove('chicken');
         image.classList.add('egg');
         localStorage.setItem("isEgg","true");
    }
}
