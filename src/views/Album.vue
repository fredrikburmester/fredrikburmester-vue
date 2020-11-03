<template>
  <Lightbox
    :photosData="photosData"
    :album="album"
    :id="id"
    v-if="lightbox == 1"
    :key="lightbox"
    @toggle-lightbox="toggleLightbox"
  />
  <Navbar :album="album" />
  <div class="grid">
    <div class="left">
      <Header />
      <h1 id="title">{{ title }}</h1>
      <p style="font-style: italic; color: #757575;">{{ description }}</p>
    </div>
    <div class="right">
      <Gallery
        v-if="dataReady"
        :photosData="photosData"
        :album="album"
        @toggle-lightbox="toggleLightbox"
      />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Gallery from "@/components/Gallery.vue";
import Navbar from "@/components/Navbar.vue";
import Lightbox from "@/components/Lightbox.vue";
import axios from "axios";
import menuLinks from "@/json/menuLinks.json";

// eslint-disable-next-line no-unused-vars
var url_dev = "http://192.168.0.118:8017/json/photos.json";
// eslint-disable-next-line no-unused-vars
var url = "https://vue.fredrikburmester.com/json/photos.json";

export default {
  data() {
    return {
      photosData: Object,
      dataReady: false,
      lightbox: 0,
      id: 1,
      title: "",
      description: ""
    };
  },
  name: "Album",
  props: {
    album: String
  },
  components: {
    Gallery,
    Header,
    Navbar,
    Lightbox
  },
  mounted: function() {
    axios.get(url).then(response => {
      this.photosData = response.data;
      this.dataReady = true;
    });
    this.setTitle();
  },
  updated() {
    this.setTitle();
    document.title = "FB - " + this.album;
  },
  methods: {
    toggleLightbox(value) {
      this.id = value;
      if (!this.lightbox) {
        this.lightbox = 1;
      } else {
        this.lightbox = 0;
      }
    },
    setTitle() {
      menuLinks.forEach(x => {
        if (x.link == this.album) {
          this.description = x.description;
          if (x.title.length > 0) {
            this.title = x.title;
          } else {
            this.title = x.name;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
header h1 {
  font-family: "Open Sans", sans-serif;
  padding: 0;
  font-size: 100px;
  line-height: 100px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 18px;
  margin-left: 18px;
  margin-bottom: 0;
  color: #131516;
}
header p {
  letter-spacing: 12px;
  text-align: center;
  margin-left: 8px;
}
#title {
  font-family: "Playfair Display", serif;
  padding: 1rem;
}
</style>
