export default {
  state: { 
    data: [
      {img: require("./../../assets/slider/1.png"), state: "Hawaii", place: "Maui", link: "#", price: "900$"},
      {img: require("./../../assets/slider/2.png"), state: "Spain", place: "Barcelona", link: "#", price: "600$"},
      {img: require("./../../assets/slider/3.png"), state: "Indonesia", place: "Bali", link: "#", price: "900$"}
      ],
    currentIndex: 0,
  },

  mutations: {
    SET_CURRENT_INDEX(state, currentIndex) {
      state.currentIndex = currentIndex;
    },
    // ADD_DATA(state, data) {

    // }
  },

  actions: {
    setCurentIndex({commit}, currentIndex){
      commit('SET_CURRENT_INDEX', currentIndex);
    },
  },

  getters: {
    data: (state) => {
      return state.data;
    },
    currentIndex: (state) => {
      return state.currentIndex;
    },
  },
}