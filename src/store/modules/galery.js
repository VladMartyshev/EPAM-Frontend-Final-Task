export default {
  state: { 
    images: [
      {
        thumb: require("./../../assets/galery/Venuce.jpg"),
        src: require("./../../assets/galery/Venuce.jpg"),
        caption: 'Venuce',
      },
      {
        thumb: require("./../../assets/galery/Antalya.jpg"),
        src: require("./../../assets/galery/Antalya.jpg"),
        caption: 'Antalya',
      },
      {
        thumb: require("./../../assets/galery/Hurchada.jpg"),
        src: require("./../../assets/galery/Hurchada.jpg"),
        caption: 'Hurchada',
      },
      {
        thumb: require("./../../assets/galery/Port_of_Nice.jpg"),
        src: require("./../../assets/galery/Port_of_Nice.jpg"),
        caption: 'Port of Nice',
      },
      {
        thumb: require("./../../assets/galery/Westmister_Abbey.jpg"),
        src: require("./../../assets/galery/Westmister_Abbey.jpg"),
        caption: 'Westmister Abbey',
      },
      {
        thumb: require("./../../assets/galery/Park_Guell.jpg"),
        src: require("./../../assets/galery/Park_Guell.jpg"),
        caption: 'Park Guell',
      },
      {
        thumb: require("./../../assets/galery/Himalaya_Montains.jpg"),
        src: require("./../../assets/galery/Himalaya_Montains.jpg"),
        caption: 'Himallaya Montains',
      },
      {
        thumb: require("./../../assets/galery/Nessebar.jpg"),
        src: require("./../../assets/galery/Nessebar.jpg"),
        caption: 'Nessebar',
      },
      {
        thumb: require("./../../assets/galery/Colloseum_in_Rome.jpg"),
        src: require("./../../assets/galery/Colloseum_in_Rome.jpg"),
        caption: 'Colloseum in Rome',
      },
      {
        thumb: require("./../../assets/galery/Paris.jpg"),
        src: require("./../../assets/galery/Paris.jpg"),
        caption: 'Paris',
      },
    ]
  },

  mutations: {
    // SET_CURRENT_INDEX(state, currentIndex) {
    //   state.currentIndex = currentIndex;
    // },
    // ADD_DATA(state, data) {

    // }
  },

  actions: {
    // setCurentIndex({commit}, currentIndex){
    //   commit('SET_CURRENT_INDEX', currentIndex);
    // },
  },

  getters: {
    galeryImages: (state) => {
      return state.images;
    },
    // currentIndex: (state) => {
    //   return state.currentIndex;
    // },
  },
}