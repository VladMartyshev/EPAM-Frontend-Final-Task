<template>
  <div id="app" @click="hideMenu" @scroll="console.log('scroll')">
    <header>
      <div class="nav-fixed">
        <nav class="navbar">
          <div class="logo"><img src="./assets/logo.jpg" class="logo-img"></div>
          <button :class="`toggle-btn ${isActive ? 'active' : ''}`" ref="toggle" @click="toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul :class="`nav-list ${isActive ? 'open' : ''}`" id="nav-list">
            <li class="nav-element"><router-link :to="{ name: 'Home'}">Home</router-link></li>
            <li class="nav-element"><router-link :to="{ name: 'Tours'}">Tours</router-link></li>
            <li class="nav-element"><router-link :to="{ name: 'Galery'}">Galery</router-link></li>
            <!-- <li class="nav-element"><a href="#">Contacts</a></li> -->
          </ul>
        </nav>
      </div>
    </header>

    <router-view class="router-view"/>
    
    <footer class="footer">
      <div class="copyright">&copy;2018. Travel - All Rights Reserved</div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {isActive: false}
  },
  methods: {
    toggle(e){
      this.isActive = !this.isActive;
    },
    hideMenu(e){
      if(this.isActive && !(this.$refs.toggle.contains(e.target))) {
        this.isActive = false;
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/fonts/Lato/latofonts.css';
//@import "./assets/fontawesome/scss/fontawesome.scss";
@import "./assets/fontawesome/css/fontawesome-all.css";
//@import "./assets/fontawesome/scss/fa-solid.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "LatoWeb"
}
</style>

<style lang="scss" scoped>

$toggle-size: 30px;
$toggle-thickness: 5px;
$toggle-between: ($toggle-size - $toggle-thickness * 3)/2; 

#app {
}

.nav-fixed {
  position: fixed;
  width: 100%;
  z-index: 115;
  background: #FFF;
  padding: 20px;
  border-bottom: 0px solid #cccccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
  //background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.01) 100%);

  .navbar {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: space-between;
    line-height: 30px;
    font-size: 20px;
    color: #FFF;
    //line-height: 40px;
    //padding-bottom: 10px;
    //height: 30px;

    .logo {
      max-height: 30px;

      .logo-img {
        max-height: 100%;
      }
    }

    .toggle-btn {
      position: relative;
      display: inline-block;
      padding: 0;
      height: $toggle-size;
      width: $toggle-size;
      background: none;
      border: none;
      cursor: pointer;
      outline: 0;
      
      span {
        position: absolute;
        display: block;
        height: $toggle-thickness;
        width: 100%;
        background: #666;
        transition: top 0.2s 0.2s linear, opacity 0.1s 0.2s linear, transform 0.2s linear;
      
        &:nth-child(1) { top: 0; }
        &:nth-child(2) { top: $toggle-thickness + $toggle-between;}
        &:nth-child(3) { top: ($toggle-thickness + $toggle-between)*2;}
      }
    }

    .toggle-btn.active span {
      top: $toggle-thickness + $toggle-between;
      transition: top 0.2s linear, opacity 0.1s 0.2s linear, transform 0.2s 0.2s linear;

      &:nth-child(1) { transform: rotate(45deg); }
      &:nth-child(2) { opacity: 0; }
      &:nth-child(3) { transform: rotate(-45deg); }
    }

    .nav-list {
      //display: flex;
      padding-top: 20px;
      width: 100%;
      text-decoration: none;
      list-style: none;
      flex-direction: column;
      //height: 0;
      // transform: scaleY(0);    
      // transform-origin: top;
      // transition: transform 0.1s 0.2s ease;
      display: none;


      .nav-element {
        //display: block;
        width: 100%;
        a {
          display: block;
          width: 100%;
          text-decoration: none;
          font-family: Helvetica, Arial, sans-serif;
          text-align: center;
          color: #666;
          border-bottom: 1px solid #efefef; 
          line-height: 45px;
          &:hover {
            color: #2a6496;
            height: auto;
          }
        }
      }

      &.open {
        display: flex;
        //transform: scaleY(1);
      }
    }
  }
}
.toggle-btn {
  position: relative;
  display: inline-block;
  padding: 0;
  height: $toggle-size;
  width: $toggle-size;
  background: none;
  border: none;
  cursor: pointer;
  outline: 0;
  
  span {
    position: absolute;
    display: block;
    height: $toggle-thickness;
    width: 100%;
    background: #666;
    transition: top 0.2s 0.2s linear, opacity 0.1s 0.2s linear, transform 0.2s linear;
  
    &:nth-child(1) { top: 0; }
    &:nth-child(2) { top: $toggle-thickness + $toggle-between;}
    &:nth-child(3) { top: ($toggle-thickness + $toggle-between)*2;}
  }
}

.toggle-btn.active span {
  top: $toggle-thickness + $toggle-between;
  transition: top 0.2s linear, opacity 0.1s 0.2s linear, transform 0.2s 0.2s linear;

  &:nth-child(1) { transform: rotate(45deg); }
  &:nth-child(2) { opacity: 0; }
  &:nth-child(3) { transform: rotate(-45deg); }
}

.router-view {
  padding-top: 70px;

  background: #f9f9f9;
  min-height: 400px;
}

.footer {
  height: 100px;
  background: #282828;
  display: flex;
  align-items: center;
  justify-content: center;

  .copyright {
    color: #FFF;
    font-family: "LatoWeb";
  }
}

// Small devices
@media (min-width: 576px) {

}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .nav-fixed {
    .navbar {
      .toggle-btn {
        display: none;
      }
      .nav-list {
        display: flex;
        flex-direction: row;
        width: auto;
        padding-top: 0;

        .nav-element {

          a {
            border: none;
            line-height: 30px;
            padding: 0 20px;
          }
        }
      }
    }
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {

}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {

}
</style>

