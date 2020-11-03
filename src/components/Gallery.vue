<template>
  <div class="gallery" id="gallery">
    <div
      v-for="(photo, index) in filteredPhotos()"
      v-bind:key="photo.id"
      :class="`gallery-panel ${photo.display}`"
    >
      <a @click="this.$emit('toggle-lightbox', photo.id)">
        <img
          class="gallery-image"
          v-bind:id="photo.id"
          :src="index < 4 ? thumbUrl(photo.filename, photo.album) : ''"
          v-bind:alt="`${photo.filename}`"
          v-bind:data="index < 4 ? 1 : 0"
        />
      </a>
    </div>
  </div>
</template>

<script>
function isScrolledIntoView(el) {
  var images = document.getElementsByClassName("gallery-image");
  var isVisible = 0;
  images.forEach(image => {
    if (image.getAttribute("data") == 0) {
      var rect = image.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
      isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      if (isVisible) {
        image.setAttribute("data", 1);
        image.setAttribute("src", el.thumbUrl(image.alt, el.album));
        image.onload = function() {
          image.classList.add("visible");
        };
      }
    }
  });
}

function enableKey(el) {
  window.onscroll = function() {
    isScrolledIntoView(el);
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos >= 300) {
      document.getElementById("navbar").classList.add("navbar-shadow");
      document.getElementById("scroll-to-top").classList.add("show");
      document.getElementById("arrow").style.display = "inherit";
    } else {
      document.getElementById("navbar").classList.remove("navbar-shadow");
      document.getElementById("scroll-to-top").classList.remove("show");
      document.getElementById("arrow").style.display = "none";
    }
  };
}

export default {
  name: "Gallery",
  data() {
    return {
      photos: this.photosData,
      dataReady: false
    };
  },
  props: {
    album: String,
    photosData: Object
  },
  mounted: function() {
    enableKey(this);
    // this.hidePhotos();
    this.showInitialPhotos();
  },
  updated: function() {
    // this.hidePhotos();
    this.showInitialPhotos();
  },
  methods: {
    thumbUrl(filename, album) {
      try {
        return `https://vue.fredrikburmester.com/images/${album}/thumbs/${filename}`;
      } catch (error) {
        console.log(error);
      }
    },
    filteredPhotos() {
      let photosArray = [];
      this.photos.forEach(photo => {
        if (photo.album == this.album) {
          photosArray.push(photo);
        }
      });
      return photosArray;
    },
    // hidePhotos() {
    //   var images = document.getElementsByClassName("gallery-image");
    //   images.forEach(image => {
    //     image.style.opacity = "0";
    //   });
    // },
    showInitialPhotos() {
      var images = document.getElementsByClassName("gallery-image");
      images.forEach(image => {
        if (image.getAttribute("data") == 1) {
          image.onload = function() {
            image.classList.add("visible");
          };
        }
      });
    }
  }
};
</script>

<style scoped>
.visible {
  opacity: 1 !important;
  transition: 600ms linear;
  -webkit-transition: 600ms linear;
  -moz-transition: 600ms linear;
  -o-transition: 600ms linear;
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
.gallery img {
  opacity: 0;
  width: 100%;
  object-fit: contain;
  min-height: 300px;
  max-height: 90vh;
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
