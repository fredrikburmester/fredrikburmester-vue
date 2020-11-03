<template>
  <router-view />
</template>

<style>
@font-face {
  font-family: "Playfair Display", serif;
  src: url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap");
}
body,
html {
  scroll-behavior: smooth;
  padding: 0;
  margin: 0;
  font-size: 16px;
  overflow: visible;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #131516;
  z-index: 1;
  overflow: visible;
  scroll-behavior: smooth;
}
.sticky {
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  margin-bottom: 10rem;
}
.left {
  position: sticky;
  top: 25vh;
  height: 40vh;
  font-size: 20px;
  grid-column-start: 1;
  grid-column-end: 2;
  left: 0;
  z-index: 1;
  padding: 4rem;
  margin-left: 0rem;
}
.right {
  padding: 4rem 0;
  height: auto;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-auto-flow: dense;
  margin-right: 6rem;
  /* justify-self: flex-end; */
}
.grid h1 {
  font-size: 3rem;
  margin: 0;
  padding: 1rem;
  color: #131516;
}

@media only screen and (max-width: 1000px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 0;
  }
  .left {
    padding: 2rem 1rem 4rem 1rem;
    top: 0;
    height: auto;
    margin: 0;
    position: relative;
    justify-self: center;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .right {
    top: 0;
    height: auto;
    margin: 0;
    padding: 0;
    position: relative;
    justify-self: center;
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
@media only screen and (max-width: 350px) {
  .left {
    padding: 0;
  }
  .grid {
    padding: 0;
  }
}
</style>
