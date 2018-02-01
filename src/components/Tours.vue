<template>
	<section>
		<div class="container">
			<aside class="aside">
				<!-- <input type="text" v-model="perPage" @change="paginate"></input> -->
				<ul class="filter-menu">
				</ul>
				<form class="filters" @submit="submit">
					<div class="date-range">
						<label class="range-label check-container">Date
							<input type="checkbox" v-model="date.use">
  							<span class="checkmark"></span>
  						</label>

						<div class="form-group" v-if="date.use">
							<label class="input-label">from</label>
							<datepicker class="date-pick" placeholder="Select a date" v-model="date.from" :required="true"></datepicker>
						</div>
						<div class="form-group" v-if="date.use">
							<label class="input-label">to</label>
							<datepicker class="date-pick" placeholder="Select a date" v-model="date.to" :required="true"></datepicker>
						</div>
					</div>
					<div class="price-range">
						<label class="range-label check-container">Price
							<input type="checkbox" v-model="price.use">
							<span class="checkmark"></span>
						</label>
						<div class="form-group" v-if="price.use">
							<label class="input-label">from</label>
							<div class="picker">
								<div class="dec-btn" @click="price.from+= -100"><i class="fas fa-minus"></i></div>
								<input type="text" class="count" v-model="price.from">
								<div class="inc-btn" @click="price.from+=100"><i class="fas fa-plus"></i></div>
							</div>
						</div>
						<div class="form-group" v-if="price.use">
							<label class="input-label">to</label>
							<div class="picker">
								<div class="dec-btn" @click="price.to+= -100"><i class="fas fa-minus"></i></div>
								<input type="text" class="count" v-model="price.to">
								<div class="inc-btn" @click="price.to+=100"><i class="fas fa-plus"></i></div>
							</div>
						</div>
					</div>
					<div class="countries">
						<label>countries</label>
						<div class="countries-list">
							<label class="country-label check-container">China
								<input type="checkbox" v-model="countries.china">
								<span class="checkmark"></span>
							</label>
							<label class="country-label check-container">India
								<input type="checkbox" v-model="countries.india">
								<span class="checkmark"></span>
							</label>
							<label class="country-label check-container">Canada
								<input type="checkbox" v-model="countries.canada">
								<span class="checkmark"></span>
							</label>
							<label class="country-label check-container">Indonesia
								<input type="checkbox" v-model="countries.indonesia">
								<span class="checkmark"></span>
							</label>
							<label class="country-label check-container">South Africa
								<input type="checkbox" v-model="countries.southAfrica">
								<span class="checkmark"></span>
							</label>
							<label class="range-label check-container">Kenya
								<input type="checkbox" v-model="countries.kenya">
								<span class="checkmark"></span>
							</label>
							<label class="range-label check-container">France
								<input type="checkbox" v-model="countries.france">
								<span class="checkmark"></span>
							</label>
						</div>
					</div>
					<input type="submit" class="submit" value="FILTER"/>
				</form>
			</aside>
			<main class="tours-main">
				<div class="tours-list">
					<div v-for="(item, index) in pageTours" class="tour-element">
						<div class="img" :style="{'background': `url(${item.img}) no-repeat center`, 'background-size':'cover'}">
							<div class="short-info">
								<div class="route">
									{{route(index, 16)}}
								</div>
								<span class="price"><span class="price-from">from </span><sup>$</sup>{{item.price}}</span>
							</div>
						</div>
						<div class="title"><h3>{{item.name}}</h3><router-link class="tour-link":to="{ name: 'Tour', params: {name: item.name.toLowerCase().split(' ').join('_')}}">More info</router-link></div>
					</div>
				</div>
				<!-- <pagination></pagination> -->
				<div is="uib-pagination" v-model="pagination" :boundary-links="false" :total-items="filterTours.length" :items-per-page="parseInt(perPage)" @change="paginate"></div>

			</main>
		</div>
	</section>
</template>

<script>

//import siteLoading from './../assets/load.gif'
import Pagination from './Pagination'
import Datepicker from 'vuejs-datepicker';
export default {
	components: {
		'pagination': Pagination,
		'datepicker': Datepicker,
	},
	data () {
		return {
		  //images,
		  //siteLoading,
		  pagination: {currentPage: 1},
		  perPage: 8,
		  pageTours: [],
		  filterTours: [],
		  date: {from: 0, to: 0, use: false},
		  price: {from: 0, to: 0, use: false},
		  countries: {
		  	china: false,
		  	india: false,
		  	canada: false,
		  	indonesia: false,
		  	southAfrica: false,
		  	kenya: false,
		  	france: false,
		  }
		}
	},
	computed: {
		tours () {
			return this.$store.getters.tours;
		},
	},
	mounted() {
		if(this.$route.query.datefrom && this.$route.query.dateto){
			console.log("date")
			this.date.use=true;
			this.date.from = new Date(Date.parse(this.$route.query.datefrom));
			this.date.to = new Date(Date.parse(this.$route.query.dateto));
		}
		if(this.$route.query.pricefrom && this.$route.query.priceto){
			console.log("date")
			this.price.use=true;
			this.price.from = parseInt(this.$route.query.pricefrom);
			this.price.to = parseInt(this.$route.query.priceto);
		}
		if(this.$route.query.countries){
			this.$route.query.countries.split(",").forEach((elem)=>this.countries[elem]=true);
		}
		this.filter();
		this.pagination.currentPage = this.$route.query.page? parseInt(this.$route.query.page):1;
		this.paginate();
		//this.pagination.currentPage = 2;
		//console.log(this.$route.query.page)
	},
	methods: {
		route(index, count){
			let ret = "";
			for(let i = 0; i < (count < this.$store.getters.tours[index].route.length? count : this.$store.getters.tours[index].route.length); i++){
				ret += this.$store.getters.tours[index].route[i];
				//console.log(this.$store.getters.tours[0])
				if(i != this.$store.getters.tours[index].route.length-1){
					ret += " > ";
				}
			}
			if(count < this.$store.getters.tours[index].route.length){
					ret += "...";
				}
			return ret;
		},
		paginate(){
			const perPage = parseInt(this.perPage);
			
			this.pageTours = [];
			const tours = this.filterTours;
			const to = (this.pagination.currentPage-1)*perPage + perPage;

			for(let i = (this.pagination.currentPage-1)*perPage; i < (to<tours.length?to:tours.length); i++){
				this.pageTours.push(this.filterTours[i]);
			}
			//console.log((this.pagination.currentPage-1)*perPage)
			//console.log((this.pagination.currentPage-1)*perPage + perPage)

			// if(pagination.currentPage > tours.length/perPage){
			// 	pagination.currentPage = parceInt(tours.length/perPage)
			// }
			const query = this.$route.query?this.$route.query:{page: 1};
			query['page'] = this.pagination.currentPage
			this.$router.push({ name: 'Tours', query});
			console.log(this.$route.query);
			//console.log(this.pageTours)
			//console.log(this.pagination)
		},
		filter(){
			this.filterTours = this.$store.getters.tours;

			const query = this.$route.query

			if(query.datefrom && query.dateto){
				const datefrom = Date.parse(query.datefrom);
				const dateto = Date.parse(query.dateto);
				//console.log(query.datefrom);
				this.filterTours = this.filterTours.filter(function(elem){
					let ret = false

					elem.dates.forEach(function(element, index, array){
						const tourDate = new Date(element.y, element.m-1, element.d).getTime();

						console.log(datefrom + "from");
						console.log(tourDate);
						//console.log(dateto);
						//console.log(tourDate);
						if(tourDate>=datefrom && tourDate<=dateto){
							ret = true;
						}
					});
					//console.log(ret);
					return ret;
					console.log(ret);
					
				});
			};

			if(query.pricefrom && query.priceto){
				const pricefrom = parseInt(query.pricefrom);
				const priceto = parseInt(query.priceto);
				this.filterTours = this.filterTours.filter(function(elem){
					let ret = false
					elem.dates.forEach(function(element, index, array){
						const tourPrice = element.price;
						if(tourPrice>=pricefrom&&tourPrice<=priceto){
							ret = true;
							//console.log(ret);
						}
					});
					return ret;				
				});
			}

			if(query.countries){
				const countries = query.countries.toLowerCase().split(",");

				//console.log(countries);

				this.filterTours = this.filterTours.filter(function(elem){
					let ret = false
					countries.forEach(function(element, index, array){
						//console.log(elem.country.toLowerCase().split(" ").join(""));
						if(elem.country.toLowerCase().split(" ").join("")==element){
							//console.log(elem.country.toLowerCase().split(" ").join(""));
							//console.log(element)
							ret = true;
							//console.log(ret);
							//console.log(ret);
						}
					});
					return ret;				
				});
			}
			//console.log(this.filterTours)
			this.paginate();
			//this.filterTours = tours;
		},

		submit(e) {
			e.preventDefault();

			let query = {};

			if(this.date.use){
				query['datefrom'] = this.date.from.toString();
				query['dateto'] = this.date.to.toString();
			}

			if(this.price.use){
				query['pricefrom'] = this.price.from.toString();
				query['priceto'] = this.price.to.toString();
			}

			let countries = [];
			for (let key in this.countries) {
				//console.log(key);
				if(this.countries[key]){
					countries.push(key);
				}
			}

			query['countries'] = countries.join(',')

			this.$router.push({ name: 'Tours', query});

			this.filter();
		}
	},

}
</script>

<style lang="scss">
.pagination {
	color: #666;
	list-style: none;
	display: flex;
	justify-content: center;
	margin-top: 30px;
	margin-bottom: 30px;
}

.pagination-page, .pagination-prev, .pagination-next {
	
	a {
		color: #333;
		text-decoration: none;
		margin: 0 5px;
	}
	&.active {
		a {
			text-decoration: underline;
		}
	}
}
</style>

<style lang="scss" scoped>

.container {
	max-width: 1300px;
	margin: 0 auto;
	width: 100%;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.aside {
	width: 100%;
	background: #FFF;
	box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
	margin-top: 30px;
	padding: 10px;
	height: fit-content;
	
	/* .date-range, */.price-range {
		margin-top: 15px;
	}
	.picker {
		margin-top: 5px;
		display: flex;
		justify-content: flex-start;
	}

	.inc-btn, .dec-btn {
		width: 33px;
		height: 40px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 40px;
		color: #666;
		font-size: 12px;
		cursor: pointer;
	}
	.dec-btn {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.inc-btn {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.count {
		width: 50px;
		height: 40px;
		padding: 5px;
		margin: 0 -1px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 40px;
		color: #666;
		font-size: 14px;
	}
	
	.countries {
		margin-top: 20px;
	}
	.countries > label {
		font-size: 20px;
		margin-left: 30px;
	}
	.countries-list {
		margin-top: 10px;
	}

	.check-container {
	    display: block;
	    position: relative;
	    padding-left: 35px;
	    margin-bottom: 12px;
	    cursor: pointer;
	    font-size: 22px;
	    user-select: none;
	}

	/* Hide the browser's default checkbox */
	.check-container input {
	    position: absolute;
	    opacity: 0;
	    cursor: pointer;
	}

	/* Create a custom checkbox */
	.checkmark {
	    position: absolute;
	    top: 0;
	    left: 0;
	    height: 25px;
	    width: 25px;
	    background-color: #eee;
	}

	/* On mouse-over, add a grey background color */
	.check-container:hover input ~ .checkmark {
	    background-color: #ccc;
	}

	/* When the checkbox is checked, add a blue background */
	.check-container input:checked ~ .checkmark {
	    background-color: #2196F3;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
	    content: "";
	    position: absolute;
	    display: none;
	}

	/* Show the checkmark when checked */
	.check-container input:checked ~ .checkmark:after {
	    display: block;
	}

	/* Style the checkmark/indicator */
	.check-container .checkmark:after {
	    left: 9px;
	    top: 5px;
	    width: 5px;
	    height: 10px;
	    border: solid white;
	    border-width: 0 3px 3px 0;
	    transform: rotate(45deg);
	}

	.submit {
		margin-top: 20px;
		width: 100%;
		color: #fff;
	    padding: 12px 20px;
	    cursor: pointer;
	    font-size: 12px;
	    text-transform: uppercase;
	    font-weight: 700;
	    display: block;
	    text-align: center;
	    background: #85c99d;
	    border: none;
	    border-radius: 3px;

	    &:hover {
			background: #333;
	    }
	}
}

.main {
	display: flex;
	justify-content: space-between;
}

.tours-main {
	width: 100%;
}

.tours-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	
}

.tour-element {
	width: 100%;
	//height: 300px;
	background: #FFF;
	//padding: 15px 0;
	margin-top: 30px;
	box-shadow: 0 0 5px 0 rgba(0,0,0,.1);

	.img {
		position: relative;
		background: url("http://qnimate.com/wp-content/uploads/2014/03/images2.jpg") no-repeat center;
		background-size: cover;

		&:after {
			content: "";
			display: block;
			padding-bottom: 70%;
		}
		.short-info {
			min-height: 50px;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			bottom: 0;
			background: rgba(0,0,0,.5);
			color: #FFF;
			font-family: "LatoWeb";
			font-size: 12px;
			padding: 0 10px;
			
			.price {
				font-size: 28px;
				font-weight: 700;
				display: flex;
				align-items: center;
				
				.price-from {
					font-size: 14px;
					margin: 0 10px;
				}

				sup {
					font-size: 18px;
				}
			}

		}
	}
	
	.title {
		height: 70px;
		font-weight: 700;
		display: flex;
		justify-content: space-between;
		align-items: center;
		//justify-content: center;
		//position: relative;
		padding-left: 10px;

		.tour-link {
			margin-left: 30px;
			text-decoration: none;
			display: block;
			width: 110px;
			line-height: 50px;
			background: rgb(224, 79, 103);
			//position: absolute;
			//right: 0;
			color: #FFF;
			text-align: center;
		}
	}
}

@media (min-width: 576px) {
	//section
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
	.tour-element {
		width: calc(50% - 15px);
	}
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
	.tours-main {
		width: calc(100% - 310px);
	}
	.aside {
		width: 280px;

	}
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {

}
</style>
<style>
	.date-pick > div > input {
		width: 100% !important;
		padding: 6px 12px;
		border: 1px solid #ccc;
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		border-radius: 4px;
		height: 40px;
		font-size: 12px;
		color: #666;
	}
</style>