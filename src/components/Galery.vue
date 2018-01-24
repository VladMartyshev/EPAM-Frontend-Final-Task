<template>
    <div class="galery">
      <ul class="galery-list">
        <li 
          v-for="(image, index) in images" @click="openGallery(index)" v-lazy:background-image="image.src" class="galery-item"
        >
          <!-- <img 
            v-lazy="image.src" 
            style="height: 100px" 
            @click="openGallery(index)"
          > -->
          <span class="caption">{{image.caption}}</span>
        </li>
      </ul>
      <lightbox 
        :images="images" 
        ref="lightbox"
        :show-caption="true"
        :siteLoading="siteLoading"
      ></lightbox>
    </div>
</template>

<script>
import Lightbox from './Lightbox'
import siteLoading from './../assets/load.gif'
export default {
	components: {
	'lightbox': Lightbox,
	},
	data () {
		return {
		  //images,
		  siteLoading,
		}
	},
	methods: {
		openGallery(index) {
		  this.$refs.lightbox.showImage(index)
		}
	},
	computed: {
		images () {
			return this.$store.getters.galeryImages;
		}
	},
}
</script>
<style lang="scss" scoped>
.galery {
	//background: #222;
}
.galery-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.galery-item {
	margin: 10px;
	display: inline-block; 
	background: no-repeat center; 
	background-size: cover;
	height: 300px;
	width: 300px;
	border-radius: 5%;
	text-align: center;

	.caption {
		display: none;
		font-family: "LatoWeb";
		font-size: 40px;
		color: #FFF;
    	width: 100%;
    	height: 100%;
    	justify-content: center;
    	align-items: center;
    	background: rgba(0,0,0,.5);
    	border-radius: inherit;
	}
	&:hover {
		.caption {
			display: flex;
		}
	}
}
</style>