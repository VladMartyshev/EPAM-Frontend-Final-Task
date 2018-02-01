<template>
	<section>
		<div class="container">
			<main class="tour-main">
				<img class="tour-img" :src="currentTour.img" alt="">
				<div class="tags">
					<span class="tag">{{currentTour.country}}</span>
					<span class="tag">{{currentTour.durability}} {{currentTour.durability == 1 ? "day" : "days"}}</span>
				</div>
				<span class="route">{{route}}</span>
				<h1 class="tour-name">{{currentTour.name}}</h1>
				<p class="description">
					{{currentTour.description}}
					<!-- {{new Date(date).getMonth()}} --> 
				</p>
				<table class="prices">
					<thead>
						<tr>
							<td>Departure dates</td>
							<td>Price</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="date in currentTour.dates">
							<td>{{date.d}} {{months[date.m-1]}} {{date.y}}</td>
							<td>${{date.price}}</td>
						</tr>
					</tbody>
				</table>
			</main>
			<aside class="aside">
				<h3 class="title">- Booking -</h3>
				<form class="booking" @submit="submit">
					<div class="column">
						<div class="form-group">
							<label class="input-label"><i class="far fa-calendar-alt"></i> Select a date</label>
							<datepicker class="date-pick" placeholder="Select a date" v-model="date" :required="true" :disabled="datepicker.disabled"></datepicker>
						</div>
						<div class="tourists">
							<div class="form-group">
								<label class="input-label"><i class="fas fa-male"></i> Adults</label>
								<div class="picker">
									<div class="dec-btn" @click="adults+= -1"><i class="fas fa-minus"></i></div>
									<input type="text" class="count" v-model="adults">
									<div class="inc-btn" @click="adults+=1"><i class="fas fa-plus"></i></div>
								</div>
							</div>
							<div class="form-group">
								<label class="input-label"><i class="fas fa-child"></i> Children</label>
								<div class="picker">
									<div class="dec-btn" @click="children+= -1"><i class="fas fa-minus"></i></div>
									<input type="text" class="count" v-model="children">
									<div class="inc-btn" @click="children+=1"><i class="fas fa-plus"></i></div>
								</div>
							</div>
						</div>
					</div>

					<div class="column">
						<table class="summary">
							<tbody>
								<tr>
									<td>
										Adults
									</td>
									<td class="text-right">
										{{adults}}
									</td>
								</tr>
								<tr>
									<td>
										Children
									</td>
									<td class="text-right">
										{{children}}
									</td>
								</tr>
								<tr>
									<td>
										Total amount
									</td>
									<td class="text-right">
										<!-- 3x $52 -->
										<!-- {{addults? `${adults}x {}` currentTour.}} -->
										{{totalAmount}}
									</td>
								</tr>
								<tr class="total">
									<td>
										Total cost
									</td>
									<td class="text-right">
										<!-- $154 -->
										<!-- {{selectedPrice()}} -->
										{{totalCost}}$
									</td>
								</tr>
							</tbody>
						</table>
						<input type="submit" class="submit" value="BOOK NOW"/>
					</div>
					
				</form>
			</aside>
		</div>
	</section>
</template>
<script>
import Datepicker from 'vuejs-datepicker';

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	export default {
		components: {
			'datepicker': Datepicker,
		},
		created() {
			let currentTour = this.$store.getters.tours.find((elem)=>elem.name.toLowerCase().split(" ").join("_") == this.$route.params.name?elem:false);
			this.currentTour = currentTour;
			console.log(currentTour);
			//this.$route.params.name;
			this.datepicker.disabled = {customPredictor: function(date) {
          		return !currentTour.dates.find(function(elem){
          			//console.log(!(elem.d == date.getDate() && elem.m == date.getMonth() && elem.y == date.getFullYear()));
          			return (elem.d == date.getDate() && elem.m-1 == date.getMonth() && elem.y == date.getFullYear());
        		})
        	}
        	}
		},

		data() {
			return {
				name: "",
				currentTour: {},
				children: 0,
				adults: 1,
				datepicker: {disabled: {}, highlighted: {},},
				months,
				date: ""
			}
		},
		methods: {
			selectedPrice(){
				let date = Date.parse(this.date);
				if(isNaN(date)) {
					return 0;
				}
				//console.log("date")
				//console.log(date)
				date = new Date(date);
				let tourDate = this.currentTour.dates.find((elem)=>(elem.d == date.getDate() && elem.m-1 == date.getMonth() && elem.y == date.getFullYear()))
				if(typeof tourDate !== undefined) {
					return tourDate.price;
				} else {
					return 0;
				}
			},
			submit(e){
				e.preventDefault()
				if(this.date == ""){
					alert("Select date before");
				} else {
					alert("send data to server")
				}
				
			},
		},
		computed: {
			route(){
				let ret = "";
				for(let i = 0; i < this.currentTour.route.length; i++){
					ret += this.currentTour.route[i];
					//console.log(this.$store.getters.tours[0])
					if(i != this.currentTour.route.length-1){
						ret += " > ";
					}
				}
				return ret;
			},

			totalAmount() {
				return `${this.adults?this.adults+"x "+this.selectedPrice()+"$":""}${(this.adults && this.children)?" + ":""}${this.children?this.children+"x "+this.selectedPrice()/2+"$":""}`
			},
			totalCost() {
				return this.adults*this.selectedPrice()+this.children*(this.selectedPrice()/2);
			}
		}
	}
</script>
<style lang="scss" scoped>

.container {
	max-width: 1300px;
	margin: 0 auto;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.tour-main {
	//height: 100px;
	background: #FFF;
	width: 100%;
	padding: 10px;

	.tour-img {
		width: 100%;
	}
	
	.tags {
		margin-top: 20px;
	}

	.tag {
		background: #ebedef;
	    border-radius: 3px;
	    padding: 4px 10px;
	    margin: 0 14px 10px 0;
	    font-size: 14px;
	    min-width: 110px;
	    display: inline-block;
	    text-align: center;
	    color: #333;
	}

	.tour-name {
		width: 100%;
		text-align: center;
		color: #333;
		font-size: 30px;
		margin-top: 40px;
	}
	.description {
		//margin-top: 40px;
		color: #666;
		padding: 20px;
		display: block;
	}

	.prices {
		width: 100%;
		font-size: 16px;
		border-collapse: collapse;
		//padding: 10px;

		// tbody, thead {
		// 	width: 100%;
		// }
		tbody {
			tr {
				height: 50px;
				//width: 100%;
				&:nth-child(odd){
					background-color: #f2f2f2
				}
			}
		}

		thead {
			tr {
				background: #565a5c;
				color: #FFF;
				font-weight: 700;
				height: 50px;
			}
		}

		td {
			padding: 0 10px;
		}
	}
}
.aside {
	background: #FFF;
	margin-top: 30px;
	width: 100%;
	height: fit-content;

	.column {
		width: 100%;
	}

	.title {
		display: block;
		width: 100%;
		padding: 10px;
		color: #FFF;
		text-align: center;
		background: #565a5c;
	}
	.booking {
		padding: 30px;
		font-size: 16px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		height: auto;
	}

	.tourists {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;

		.form-group {
			width: 50%;
		}
	}

	.input-label {
		color: #666;
		//font-size: 12px;
		line-height: 20px;
		//margin-bottom: 5px;
	}
	.date-pick {
		margin-top: 5px;
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
		width: 35px;
		height: 40px;
		padding: 5px;
		margin: 0 -1px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 40px;
		color: #666;
		font-size: 14px;
	}

	.summary {
		margin-top: 20px;
		width: 100%;
		color: #666;
		font-size: 14px;
		border-bottom: 1px solid #ddd;

		td {
			line-height: 20px;
			border-top: 1px solid #ededed;
			padding: 8px;
		}

		.text-right {
			text-align: right;
		}

		.total {
			color: #e04f67;
    		font-size: 20px;
  			font-weight: 700;
		}
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
	
@media (min-width: 576px) {
	//section
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
	.aside {

		.column {
			width: calc(50% - 10px);
		}
	}

}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
	
	.tour-main {
		width: calc(100% - 390px);
	}
	.aside {
		width: 360px;
		margin-top: 0px;

		.column {
			width: 100%;
		}
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