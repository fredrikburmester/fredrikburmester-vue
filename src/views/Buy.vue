<template>
  <Lightbox
    :album="album"
    :id="id"
    v-if="lightbox == 1"
    :key="lightbox"
    @toggle-lightbox="toggleLightbox"
  />
  <Navbar :album="album" />
  <div class="grid">
    <div class="left">
      <h1 id="title">Buy This Photo</h1>
      <h3>{{ photos[id].title }}</h3>
    </div>
    <div class="right">
      <img
        v-bind:src="
          require(`@/assets/img/${photos[id].album}/thumbs/${photos[id].filename}`)
        "
        v-bind:alt="photos[id].description"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Lightbox from "@/components/Lightbox.vue";
import photos from "@/json/photos.json";

export default {
  data() {
    return {
      photos,
      currentPhoto: "",
      album: "Buy",
      lightbox: 0
    };
  },
  components: {
    Lightbox,
    Navbar
  },
  mounted: function() {
    console.log(photos[this.id].album, photos[this.id].id);
  },
  props: {
    id: String
  }
};
</script>

<style scoped>
.left h3 {
  font-style: italic;
}
.gallery {
  margin-bottom: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  grid-gap: 50px;
  align-items: center;
  grid-auto-flow: dense;
  z-index: 99;
  cursor: pointer;
}
.right img {
  width: 90%;
  min-height: 300px;
  max-height: 90vh;
  border-color: #9f9a9a;
  border-width: 15px;
  border-style: ridge;
}
.tall {
  grid-row: span 1;
}
.wide {
  grid-column: span 2;
}
@media only screen and (max-width: 1000px) {
  .gallery {
    grid-template-columns: 1fr;
    padding: 0 2rem;
  }
  .wide {
    grid-column: span 1;
    object-fit: cover;
  }
}
@media only screen and (max-width: 600px) {
  .gallery-panel img {
    height: auto;
  }
}
@media only screen and (max-width: 350px) {
  .gallery {
    padding: 0 0.5em;
  }
}
</style>
