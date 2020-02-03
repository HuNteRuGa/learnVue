<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import './styles/vars.scss';
@import './styles/fonts.scss';

* {
  color: $textColor;
  font-family: $textFont;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: $backgroundColor;
}
</style>
