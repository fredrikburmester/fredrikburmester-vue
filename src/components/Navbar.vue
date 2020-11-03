<template>
  <div class="navbar sticky" id="navbar"></div>
  <div @click="scrollToTop" class="arrow" id="arrow">
    <div id="line4" class="line"></div>
    <div id="line5" class="line"></div>
  </div>
  <div class="scroll-to-top" id="scroll-to-top"><p>Scroll to top!</p></div>
  <div class="social-icons">
    <a href="https://www.instagram.com/fredrikburmester/"
      ><img id="" src="@/assets/logo/ig.png" alt="ig"
    /></a>
    <a href="https://www.facebook.com/alltidifokus/"
      ><img id="" src="@/assets/logo/fb.png" alt="fb"
    /></a>
  </div>
  <div @click="toggleMenu" class="hamburger" id="hamburger">
    <div id="line1" class="line"></div>
    <div id="line2" class="line"></div>
    <div id="line3" class="line"></div>
  </div>
  <div
    class="fullscreen fullscreen-off"
    id="fullscreen"
    @click="toggleMenu"
  ></div>
  <div class="menu" id="menu">
    <ul class="menu-links">
      <li v-for="item in MenuLinks" :class="item.category" v-bind:key="item.id">
        <hr v-if="item.name == 'break'" />
        <a
          v-if="item.name != 'break'"
          @click="
            this.$router.push(`/${item.link}`);
            toggleMenu();
            scrollToTop();
          "
          :id="item.link"
          >{{ item.name }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
let menuActive = false;

function finishHamburgerAnimation() {
  let line1 = document.getElementById("line1");
  let line2 = document.getElementById("line2");
  let line3 = document.getElementById("line3");
  if (!menuActive) {
    line1.removeEventListener("transitionend", finishHamburgerAnimation);
    line1.style.transform += "translateY(-8px)";
    line3.style.transform += "translateY(8px)";
    line2.style.opacity = "1";
  } else {
    line1.removeEventListener("transitionend", finishHamburgerAnimation);
    line1.style.transform += "rotate(45deg)";
    line3.style.transform += "rotate(-45deg)";
  }
}

import MenuLinks from "@/json/menuLinks.json";

export default {
  data() {
    return {
      MenuLinks
    };
  },
  name: "Navbar",
  props: ["album"],
  methods: {
    scrollToTop() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 150);
    },
    toggleMenu() {
      let menu = document.getElementById("menu");
      let line1 = document.getElementById("line1");
      let line2 = document.getElementById("line2");
      let line3 = document.getElementById("line3");
      let fullscreen = document.getElementById("fullscreen");
      if (!menuActive) {
        menuActive = true;
        menu.classList.add("active");
        document
          .getElementById("line1")
          .addEventListener("transitionend", finishHamburgerAnimation);
        line1.style.transform = "translateY(8px)";
        line3.style.transform = "translateY(-8px)";
        line2.style.opacity = "0";
        fullscreen.style.visibility = "visible";
        fullscreen.style.opacity = "0.8";
      } else {
        menuActive = false;
        fullscreen.style.visibility = "hidden";
        fullscreen.style.opacity = "0";
        document
          .getElementById("line1")
          .addEventListener("transitionend", finishHamburgerAnimation);
        line1.style.transform += "rotate(-45deg)";
        line3.style.transform += "rotate(45deg)";
        menu.classList.remove("active");
      }
      this.checkActiveLink(this.album);
    },
    checkActiveLink(album) {
      let active = document.getElementsByClassName("active-link");
      active.forEach(element => {
        element.classList.remove("active-link");
      });
      let link = document.getElementById(album);
      if (link != null) {
        link.classList.add("active-link");
      }
    }
  }
};

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (currentScrollPos >= 300) {
    //element = document.getElementById("navbar");
    document.getElementById("navbar").classList.add("navbar-shadow");
    document.getElementById("scroll-to-top").classList.add("show");
    document.getElementById("arrow").style.display = "inherit";
  } else {
    //element = document.getElementById("navbar");
    document.getElementById("navbar").classList.remove("navbar-shadow");
    document.getElementById("scroll-to-top").classList.remove("show");
    document.getElementById("arrow").style.display = "none";
  }
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 25px;
  right: 100px;
  opacity: 0;
  transition: 500ms linear;
}
.show {
  animation-name: blink;
  animation-duration: 4s;
}
.fullscreen {
  position: fixed;
  visibility: hidden;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: black;
  opacity: 0.8;
  transition: linear;
  -webkit-transition: 200ms linear;
  -moz-transition: 200ms linear;
  -o-transition: 200ms linear;
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.navbar {
  background-color: white;
  height: 90px;
  z-index: 98;
  transition: 600ms linear;
  -webkit-transition: 600ms linear;
  -moz-transition: 600ms linear;
  -o-transition: 600ms linear;
}
.navbar-shadow {
  -webkit-box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.4);
}
.line {
  background-color: #131516;
  width: 25px;
  height: 3px;
  margin-bottom: 5px;
  transition: 170ms linear;
  -webkit-transition: 170ms linear;
  -moz-transition: 170ms linear;
  -o-transition: 170ms linear;
}
.arrow {
  display: none;
  position: fixed;
  bottom: 25px;
  right: 30px;
  width: 30px;
  height: 30px;
  padding: 10px;
  border-radius: 5rem;
  transition: 600ms linear;
  -webkit-transition: 600ms linear;
  -moz-transition: 600ms linear;
  -o-transition: 600ms linear;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.6);
}
.arrow:hover {
  background-color: lightgray;
  transition: 200ms linear;
  -webkit-transition: 200ms linear;
  -moz-transition: 200ms linear;
  -o-transition: 200ms linear;
}
#line4 {
  transform: translateX(-1px) translateY(12px) rotate(-45deg);
  width: 20px;
}
#line5 {
  transform: translateX(11px) translateY(4px) rotate(45deg);
  width: 20px;
}
.hamburger {
  z-index: 100;
  position: fixed;
  top: 23px;
  margin-left: 30px;
  padding: 10px;
  cursor: pointer;
  width: 30px;
}
hr {
  color: transparent;
  background-color: black;
  opacity: 0.2;
  width: 150px;
  margin: 10px 0;
}
.social-icons {
  position: fixed;
  right: 30px;
  top: 33px;
  z-index: 99;
}
.social-icons img {
  width: 20px;
  height: 20px;
  margin: 0 1em;
}
.menu {
  position: fixed;
  top: 0;
  left: -450px;
  z-index: 99;
  background-color: white;
  width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  /* transition: 300ms left cubic-bezier(0.77, 0, 0.175, 1); */
  transition: 320ms left ease-out;
  /* -moz-transition-timing-function: 300ms left cubic-bezier(0.77, 0, 0.175, 1);
  -webkit-transition-timing-function: 300ms left cubic-bezier(0.77, 0, 0.175, 1); 
  -o-transition-timing-function: 300ms left cubic-bezier(0.77, 0, 0.175, 1); 
  -webkit-box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.4); */
  -moz-box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.4);
  /* transition-timing-function: linear; */
  box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.4);
}
.menu-links {
  display: grid;
  margin-bottom: 100px;
  text-align: left;
  margin-top: 10vh;
  margin-left: 2vw;
}
ul {
  list-style-type: none;
}
.big {
  padding: 1.1vh 0;
  font-size: 1.8em;
}
.small {
  font-size: 1.2em;
  padding: 1.1vh 0;
}
a {
  font-weight: bold;
  color: #131516;
  text-decoration: none;
  cursor: pointer;
  transition: 200ms linear;
  -webkit-transition: 200ms linear;
  -moz-transition: 200ms linear;
  -o-transition: 200ms linear;
}
a:hover {
  color: lightgray;
  transition: 200ms linear;
  -webkit-transition: 200ms linear;
  -moz-transition: 200ms linear;
  -o-transition: 200ms linear;
}
.active {
  left: 0;
}
.active-link {
  text-decoration: lightgray !important;
  text-underline-offset: 5px !important;
  text-decoration-thickness: 4px !important;
  text-decoration-line: underline !important;
}
@media only screen and (max-height: 550px) {
  a {
    font-size: 0.8em;
  }
  li {
    padding: 0;
    margin: 0;
  }
  .big {
    padding: 0.1em;
  }
  .small {
    padding: 0.1em;
  }
}
@media only screen and (max-width: 1000px) {
  .social-icons {
    position: fixed;
    right: 1rem;
    top: 29px;
    z-index: 99;
  }
  .active {
    left: 0;
  }
  .navbar {
    height: 80px;
  }
  .hamburger {
    margin-left: 2rem;
    top: 20px;
  }
  .menu-links {
    margin-top: 70px;
  }
  .menu a {
    padding: 0.3em 0;
  }
}
@media only screen and (max-width: 600px) {
  .menu {
    left: -300px;
    width: 300px;
  }
  .active {
    left: 0;
  }
}
</style>
