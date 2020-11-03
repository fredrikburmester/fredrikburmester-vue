<template>
  <div>
    <div class="close-btn" @click="closeLightbox">
      <div class="line" id="close-line-1"></div>
      <div class="line" id="close-line-2"></div>
    </div>
    <div
      v-if="isLeft"
      class="left-btn"
      @click="
        index -= 1;
        photo();
      "
    >
      <div class="line" id="left-line-1"></div>
      <div class="line" id="left-line-2"></div>
    </div>
    <div
      v-if="isRight"
      class="right-btn"
      @click="
        index += 1;
        photo();
      "
    >
      <div class="line" id="right-line-1"></div>
      <div class="line" id="right-line-2"></div>
    </div>
    <img
      @click="zoomImg()"
      src="@/assets/logo/zoom.png"
      alt="zoom"
      class="zoom-btn"
    />
    <div id="lightbox" class="lightbox" @click="closeLightbox">
      <img
        v-bind:src="photoUrl(currentPhoto.filename, currentPhoto.album)"
        v-bind:alt="currentPhoto.index"
        id="currentPhoto"
      />
      <p style="margin-bottom: 46vh; z-index: -1" id="loading">Loading...</p>
      <p>{{ currentPhoto.title }}</p>
    </div>
  </div>
</template>

<script>
function enableKey(vuecomponent) {
  var lightBoxActive = true;
  document.addEventListener("keydown", function(event) {
    // console.log(event.key, event.which);
    if (event.which == 39) {
      if (vuecomponent.isRight) {
        vuecomponent.index += 1;
        vuecomponent.photo();
      }
    } else if (event.which == 37) {
      if (vuecomponent.isLeft) {
        vuecomponent.index -= 1;
        vuecomponent.photo();
      }
    } else if (event.which == 27) {
      if (lightBoxActive) {
        vuecomponent.$emit("toggle-lightbox", vuecomponent.index);
      }
      lightBoxActive = false;
    }
  });
}

// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  name: "Photo",
  data() {
    return {
      photos: this.photosData,
      currentPhoto: new Image(),
      nextPhoto: new Image(),
      index: Number(this.id),
      isLeft: 0,
      isRight: 0,
      zoom: false
    };
  },
  props: {
    album: String,
    id: Number,
    photosData: JSON
  },
  beforeMount: function() {
    this.photo();
  },
  mounted: function() {
    enableKey(this);
    // document.getElementById("currentPhoto").
    this.showPhoto();
  },
  updated: function() {
    this.loadingPhoto();
  },
  methods: {
    photoUrl(filename, album) {
      // return `http://192.168.0.118:8017/images/${album}/${filename}`;
      return `https://vue.fredrikburmester.com/images/${album}/${filename}`;
    },
    photo() {
      this.currentPhoto = this.photos[this.index];
      if (this.index == 0) {
        this.isLeft = 0;
        this.isRight = 1;
      } else if (this.index == this.photos.length - 1) {
        this.isLeft = 1;
        this.isRight = 0;
      } else {
        if (this.photos[this.index - 1].album == this.album) {
          this.isLeft = 1;
        } else {
          this.isLeft = 0;
        }
        if (this.photos[this.index + 1].album == this.album) {
          this.isRight = 1;
        } else {
          this.isRight = 0;
        }
      }
      return this.currentPhoto;
    },
    findPhoto(index) {
      var photo = new Image();
      if (this.photos[index].album == this.album) {
        photo = this.photos[index];
      }
      return photo;
    },
    closeLightbox: function() {
      this.$emit("toggle-lightbox", this.index);
    },
    zoomImg() {
      if (!this.zoom) {
        document.getElementById("currentPhoto").style.transform = "scale(2)";
        this.zoom = true;
      } else {
        document.getElementById("currentPhoto").style.transform = "scale(1)";
        this.zoom = false;
      }
    },
    showPhoto() {
      let image = document.getElementById("currentPhoto");
      image.onload = function() {
        image.classList.add("visible");
      };
    },
    loadingPhoto() {
      var image = document.getElementById("currentPhoto");
      image.classList.remove("visible");
      var ref = this;
      image.onload = function() {
        image.classList.add("visible");
        axios
          .get(ref.photoUrl(ref.photos[ref.index + 1].filename, ref.album))
          .then(response => {
            ref.nextPhoto = response.data;
          });
      };
    }
  }
};
</script>

<style scoped>
.loading {
  opacity: 0;
}
.visible {
  opacity: 1 !important;
  transition: 1000ms linear;
  -webkit-transition: 1000ms linear;
  -moz-transition: 1000ms linear;
  -o-transition: 1000ms linear;
}
#currentPhoto {
  opacity: 0;
}
.zoom-btn {
  cursor: pointer;
  top: 13px;
  right: 23px;
  position: fixed;
  padding: 20px;
  z-index: 999;
  width: 20px;
  height: 20px;
}
.close-btn {
  position: fixed;
  cursor: pointer;
  top: 13px;
  left: 20px;
  width: 20px;
  height: 20px;
  padding: 20px;
  z-index: 999;
}
.left-btn {
  opacity: 0.6;
  position: fixed;
  cursor: pointer;
  padding: 3em;
  left: 5px;
  top: 42%;
  height: 34px;
  width: 30px;
  z-index: 999;
}
.right-btn {
  opacity: 0.6;
  position: fixed;
  cursor: pointer;
  padding: 3em;
  top: 42%;
  right: 0%;
  width: 30px;
  height: 34px;
  z-index: 999;
}
.line {
  background-color: white;
  width: 25px;
  height: 3px;
  margin-bottom: 5px;
}
#close-line-1 {
  transform: translateY(8px) rotate(45deg);
}
#close-line-2 {
  transform: translateY(-0px) rotate(-45deg);
}
#left-line-1 {
  transform: translateY(23px) rotate(45deg);
}
#left-line-2 {
  transform: translateY(-0px) rotate(-45deg);
}
#right-line-1 {
  transform: translateY(23px) rotate(-45deg);
}
#right-line-2 {
  transform: translateY(-0px) rotate(45deg);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 0;
  margin: 0;
  display: flex;
  z-index: 998;
  overflow: hidden;
}
.lightbox img {
  margin: auto;
  max-width: 90vw;
  max-height: 90vh;
  padding: 2rem;
  transition: 200ms ease;
}
.lightbox p {
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  color: white;
  opacity: 0.7;
  font-style: italic;
  position: fixed;
  bottom: 20px;
}
@media only screen and (max-width: 530px) {
  .lightbox img {
    padding: 0.5rem;
  }
  .right-btn,
  .left-btn {
    transform: scale(0.7);
  }
  .right-btn {
    padding-right: 0px;
  }
  .left-btn {
    padding-left: 0px;
  }
}
</style>
