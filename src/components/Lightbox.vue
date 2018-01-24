<template>
	<div @click.stop="closeLightBox">
	  <v-touch
	    class="vue-lb-container"
	    v-show="lightBoxOn"
	    v-if="images && images.length > 0"
	    @swiperight="previousImage()"
	    @swipeleft="nextImage()"
	  >
	    <div class="vue-lb-content">
	      <div class="vue-lb-header">
	        <span></span>
	        <button 
	          type="button" 
	          title="Close (Esc)" 
	          class="vue-lb-button-close" 
	        >
	          <span>
	            <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
	              <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
	            </svg>
	          </span>
	        </button> <!-- .vue-lb-button-close -->

	      </div> <!-- .vue-lb-header -->
	      <div 
	        class="vue-lb-figure"
	        @click.stop
	      >
	        <transition 
	          mode="out-in" 
	          name="fade"
	        >
	          <img 
	           :key="images[select].src"
	           :src="images[select].src"
	           class="vue-lb-modal-image"
	          >
	        </transition>

	        <div 
	          class="vue-lb-info" 
	          v-html="images[select].caption"
	          v-show="showCaption"
	        ></div>

	        <div class="vue-lb-footer">
	          <div class="vue-lb-footer-info"></div>
	          <div class="vue-lb-footer-count">
	            {{ select + 1 }}/{{ countImages }}
	          </div> 
	        </div> 

	      </div> 
	    </div> <!-- .vue-lb-content -->
	    <div class="vue-lb-thumbnail-wrapper">
	    <div v-if="showThumbs" class="vue-lb-thumbnail">
	      <button 
	        v-if="images.length > 1"
	        type="button" 
	        class="vue-lb-thumbnail-arrow vue-lb-thumbnail-left" 
	        title="Previous" 
	        @click.stop="previousImage()"
	      >
	        <span>
	          <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512">
	            <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"></path>
	          </svg>
	        </span>
	      </button>

	      <div 
	        v-for="(image, index) in imagesThumb" 
	        :key="index"
	        :class="'vue-lb-modal-thumbnail' + (thumbSelect === index ? '-active' : '')" 
	        v-lazy:background-image="image"
	        @click.stop="showImage(index + beginThumbIndex)"
	      >
	      </div>

	      <button 
	        v-if="images.length > 1"
	        type="button" 
	        class="vue-lb-thumbnail-arrow vue-lb-thumbnail-right" 
	        title="Next" 
	        @click.stop="nextImage()"
	      >
	        <span>
	          <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512">
	            <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"></path>
	          </svg>
	        </span>
	      </button>
	    </div> <!-- .vue-lb-thumbnail -->
	    </div>
	    <button 
	      v-if="images.length > 1"
	      type="button" 
	      class="vue-lb-arrow vue-lb-left" 
	      title="Previous" 
	      @click.stop="previousImage()"
	    >
	      <span>
	        <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512">
	          <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"></path>
	        </svg>
	      </span>
	    </button>

	    <button 
	      v-if="images.length > 1"
	      type="button" 
	      class="vue-lb-arrow vue-lb-right" 
	      title="Next" 
	      @click.stop="nextImage()"
	    >
	      <span>
	        <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">
	          <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"></path>
	        </svg>
	      </span>
	    </button>
	  </v-touch> <!-- .vue-lb-container --> 
	</div>
</template>
<script>
export default {
	props: {
	images: {
	  type: Array,
	  required: true,
	},

	showLightBox: {
	  type: Boolean,
	  default: false,
	},

	startAt: {
	  type: Number,
	  default: 0,
	},

	nThumbs: {
	  type: Number,
	  default: 7,
	},

	showThumbs: {
	  type: Boolean,
	  default: false,
	},

	// Mode
	autoPlay: {
	  type: Boolean, 
	  default: false,
	},

	autoPlayTime: {
	  type: Number,
	  default: 3000,
	},

	siteLoading: {
	  default: null,
	},

	showCaption: {
	  type: Boolean,
	  default: false,
	}
	},

	data() {
	return {
	  select: this.startAt,
	  thumbSelect: this.startAt,
	  lightBoxOn: this.showLightBox,
	  displayThumbs: this.images.slice(0, this.nThumbs),
	  timer: null,

	  beginThumbIndex: 0,
	}
	},

	computed: {
	countImages() { 
	  return this.images.length
	},

	imagesThumb() {
	  if (this.siteLoading) {
	    return this.displayThumbs.map(({ thumb }) => ({
	      src: thumb,
	      loading: this.siteLoading,
	      error: this.siteLoading,
	    }))
	  }

	  return this.displayThumbs.map(({ thumb }) => thumb)
	},
	},

	watch: {
	startAt() {
	  this.$set(this, 'select', this.startAt)
	  this.$set(this, 'thumbSelect', this.startAt)
	},

	images() {
	  this.$set(this, 'displayThumbs', this.images.slice(0, this.nThumbs))
	},

	select() {
	  let halfDown = Math.floor(this.nThumbs / 2)
	  let mod = 1 - (this.nThumbs % 2)

	  if (this.select <= halfDown) {
	    this.$set(this, 'beginThumbIndex', 0)
	    this.$set(this, 'thumbSelect', this.select)
	    this.$set(this, 'displayThumbs', this.images.slice(0, this.nThumbs))
	    return
	  }

	  if (this.select >= this.countImages - halfDown) {
	    this.$set(this, 'beginThumbIndex', this.countImages - this.nThumbs)
	    this.$set(this, 'thumbSelect', this.nThumbs - (this.countImages - this.select))
	    this.$set(this, 'displayThumbs', this.images.slice(-this.nThumbs))
	    return
	  }

	  this.$set(this, 'beginThumbIndex', this.select - halfDown + mod)
	  this.$set(this, 'thumbSelect', halfDown - mod)
	  this.$set(this, 'displayThumbs', this.images.slice(this.select - halfDown + mod, this.select + halfDown + 1))
	},

	lightBoxOn(value) {
		if (document != null) {
		    if (value) {
		      document.getElementsByTagName('body')[0].classList.add('vue-lb-open')
		      this.$emit('lightBoxOn', true)
		    } else {
		      document.getElementsByTagName('body')[0].classList.remove('vue-lb-open')
		      this.$emit('lightBoxOn', false)
		    }
		  } 
		},
	},

	mounted() {
	if (this.autoPlay) {
	  this.timer = setInterval(() => {
	    this.nextImage()
	  }, this.autoPlayTime)
	}
	},

	methods: {
		showImage(index) {
		  document.addEventListener('keydown', this.addKeyEvent)

		  this.$set(this, 'lightBoxOn', true)
		  this.$set(this, 'select', index)
		},

		addKeyEvent(event) {
		  if (event.keyCode === 37) this.previousImage()
		  if (event.keyCode === 39) this.nextImage()
		  if (event.keyCode === 27) this.closeLightBox()
		},

		closeLightBox() {
		  this.$set(this, 'lightBoxOn', false)
		  document.removeEventListener('keydown', this.addKeyEvent)
		},

		nextImage() {
		  this.$set(this, 'select', (this.select + 1) % this.countImages)
		},

		previousImage() {
		  this.$set(this, 'select', ((this.select - 1) + this.countImages) % this.countImages)
		},
	},


	beforeDestroy() {
		document.removeEventListener('keydown', this.addKeyEvent)

		if (this.autoPlay) {
		  clearInterval(this.timer)
		}
	},
}
</script>
<style scoped>

.vue-lb-box {
  width: 100%;
}

.vue-lb-container {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0px;
  padding: 10px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2001;
  -webkit-align-items: center;
  -moz-box-sizing: border-box;
  -webkit-justify-content: center;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
}

.vue-lb-content {
  margin-bottom: 20px;
  max-width: 1024px;
  position: relative;
}

.vue-lb-header {
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  height: 40px;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  -webkit-box-pack: justify;
}

.vue-lb-button-close {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  top: 0px;
  vertical-align: bottom;
  height: 40px;
  margin-right: -10px;
  padding: 10px;
  width: 40px;
}

.vue-lb-figure {
  margin: 0px;
  display: block;
  position: relative;
}

img.vue-lb-modal-image {
  cursor: pointer;
  max-height: calc(100vh - 90px);
  cursor: pointer;
  display: block;
  height: auto;
  margin: 0 auto;
  max-width: 100%;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vue-lb-info {
  visibility: initial;
  position: absolute;
  bottom: 25px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  height: 40px;
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-align: center;
}


.vue-lb-footer {
  box-sizing: border-box;
  color: white;
  cursor: auto;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  left: 0px;
  line-height: 1.3;
  padding-bottom: 5px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 5px;
  -moz-box-sizing: border-box;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  -webkit-box-pack: justify;
}

.vue-lb-footer-info {
  display: block;
  flex: 1 1 0;
  -webkit-flex: 1 1 0;
  -ms-flex: 1 1 0;
}

.vue-lb-footer-count {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85em;
  padding-left: 1em;
}

.vue-lb-thumbnail {
  bottom: 10px;
  height: 50px;
  padding: 0 50px;
  text-align: center;
  white-space: nowrap;
  display: inline-block;
  position: relative;
}

.vue-lb-modal-thumbnail {
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px hsla(0,0%,100%,.2);
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px;
  overflow: hidden;
  width: 50px;
}

.vue-lb-modal-thumbnail-active {
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  box-shadow: inset 0 0 0 2px white;
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px;
  overflow: hidden;
  width: 50px;
}

.vue-lb-thumbnail-arrow {
  height: 54px;
  width: 40px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  padding: 10px;
  position: absolute;
  top: 50%;
  -webkit-touch-callout: none;
  user-select: none;
  height: 50px;
  margin-top: -25px;
  width: 30px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vue-lb-thumbnail-left {
  left: 10px;
}

.vue-lb-thumbnail-right {
  right: 10px;
}

.vue-lb-arrow {
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  padding: 10px;
  position: absolute;
  top: 50%;
  -webkit-touch-callout: none;
  user-select: none;
  height: 120px;
  margin-top: -60px;
  width: 40px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vue-lb-left {
  left: 10px;
}

.vue-lb-right {
  right: 10px;
}

.vue-lb-open {
  overflow: hidden;
}

.vue-lb-thumbnail-wrapper {
  bottom: 10px;
  height: 50px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  text-align: center;
  top: auto;
}

@media (min-width: 500px) {
  .vue-lb-thumbnail-arrow {
    width: 40px;
  }
}

@media (min-width: 768px) {
  .vue-lb-arrow {
      width: 70px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>