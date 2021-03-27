var slider = document.querySelector(".slidContainer");
var nav = document.querySelector(".navBar");

var navY = nav.getBoundingClientRect().top;
if (slider != null) {
    var sliderY = slider.getBoundingClientRect().bottom + 75;
}

const navOrigionalPosition = this.scrollY + nav.getBoundingClientRect().top
const offset = 155


var shapeSplit = document.querySelector(".shapeSplit");

var slideIndex = 1;


if (slider != null) {
    showSlides(slideIndex);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slider");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function onscrolljs() {
    fix();
    fixNav();
    splitSize();
}

function onresizejs() {
    splitSize();
}

function cookieOk() {
    var now = new Date();
    var lifetime = now.getTime();
    var deleteCookie = lifetime + 2592000000;

    now.setTime(deleteCookie);
    var enddate = now.toUTCString();

    document.cookie = "setCookieHinweis = set; path=/; secure; expires=" + enddate;
    document.getElementById("cookie-popup").classList.add("hidden");
}

function fix() {
    var menu = document.querySelector(".menu");
    var slider = document.querySelector(".slidContainer");

    if (slider != null) {
        var menuY = menu.getBoundingClientRect().top;
        var sliderY = slider.getBoundingClientRect().bottom;
    } else {
        var menuY = 0;
        var sliderY = -1;
    }

    if (menuY <= 0) {
        menu.style.position = "fixed";
        menu.style.top = 0;
        if (slider != null) {
            slider.style.marginBottom = 75;
        }
    }
    if (sliderY >= 0) {
        menu.style.position = "unset";
        menu.style.top = sliderY;
        slider.style.marginBottom = 0;
    }
}

function fixNav() {
    
    if (slider != null) {
        if (window.scrollY >= window.innerHeight - navOrigionalPosition - offset) {
            nav.style.marginTop = window.scrollY - (window.innerHeight - navOrigionalPosition - (offset * 2))
        }
    } else {
        if (window.scrollY >= navOrigionalPosition - offset) {
            nav.style.marginTop = (window.scrollY - navOrigionalPosition + offset) + "px"
        } else {
            nav.style.marginTop = "9.109"
        }
    }

}


function splitSize() {
    if (document.getElementById('textImg') != null) {
        var divHeight = document.getElementById('textImg').clientHeight;
        shapeSplit.style.height = divHeight - 300;
    }
}