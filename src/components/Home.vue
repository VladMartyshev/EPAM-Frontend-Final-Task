<template>
	<section>
		<slider></slider>
		<div class="container">
			<router-link class="tour-btn":to="{ name: 'Tours'}">Find your tour</router-link>
		</div>
		
	</section>

</template>
<script>

import Slider from './Slider'

export default {
  components: {
    'slider': Slider
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
	.container {
		padding: 10px;
		height: 600px;
		display: flex;
		align-items: center;
		justify-content: center
	}
	.tour-btn {
		display: block;
		width: 100%;
		max-width: 500px;
		height: 80px;
		background: #4CAF50;
		line-height: 80px;
		text-align: center;
		text-decoration: none;
		color: #FFF;
		font-size: 30px;
		//margin: 400px auto;
	}
</style>