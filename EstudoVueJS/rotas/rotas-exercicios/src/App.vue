<template>
  <div id="app">
    <h1>Rotas com VueRouter</h1>
    <!-- <Menu/> -->
    <router-view name="menu"></router-view>
    <transition mode="out-in"
	   enter-active-class="animated rubberBand"
	   leaveactive-class="animated rollOut"
	>
      <router-view />
    </transition>
    <router-view name="menuInferior"></router-view>
  </div>
</template>

<script>
/* import Menu from './components/template/Menu.vue'
export default {
	components:{Menu}
} */
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
