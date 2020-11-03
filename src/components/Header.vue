<template>
  <header>
    <a @click="this.$router.push('/Home')">
      <h1 id="FB">FB</h1>
    </a>
    <p>PHOTOGRAPHER</p>
    <!-- <p id="tel">+46 72 505 06 12<br />fredrik.burmester@gmail.com</p> -->
  </header>
</template>

<style scoped>
#tel {
  letter-spacing: 4px;
  font-size: 0.8em;
}
h1 {
  font-family: "Open Sans", sans-serif;
  font-size: 100px;
  line-height: 100px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 18px;
  margin-left: 18px;
  margin-bottom: 0;
  color: #131516;
  cursor: pointer;
}
p {
  letter-spacing: 12px;
  text-align: center;
  margin-left: 8px;
}
@media only screen and (max-width: 350px) {
  p {
    font-size: 0.6em;
  }
}
</style>
