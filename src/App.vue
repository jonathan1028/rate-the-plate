<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html {
  background-color: whitesmoke;
  font-family: 'Open Sans', sans-serif;
}

/* ------------------------- Application Variables ------------------------- */
:root {
  --page-height: 100vh;
  --page-width: 100vw;

  --font-color1: #47535e;
  --font-color3: #f7ca44;
  --font-color4: lightgray;

  --background-color1: #fc0;
  --background-color2: white;
  --background-color3: #555;
  --background-color4: #e7e9ea;

  --theme-color1: #f7ca44;
  --theme-color2: #fff2c7;
  --theme-color3: #47535d;
  --theme-color4: lightgray;
  --theme-color5: #e7e9ea;
  --color2: rgb(42, 177, 182);
  --link-color: rgb(48,62,240);
  --shadow3: 1.5vh -1vh 1vh rgba(0, 7, 2, 0.3);
  --shadow1: 0 .5vh 2vh rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  --shadow2: 1.5vh -1vh 1vh rgba(0, 0, 0, 0.3);
  --text-color1: #47535d;
}

.main-content {
  max-width: 90%;
  margin: 4em auto;
}

.box {
  background-color: white;
  margin-top: 1%;
  padding: 1%;
  border: 1px solid #BFBFBF;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #aaaaaa;
  -webkit-box-shadow: 0 1px 2px #777;
  -moz-box-shadow: 0 2px 1px #777;
  box-shadow: 0 2px 1px #777;

}
form{
  padding: 0px;
  margin: 0px;
}

form > button{
  margin-top: 40px;
}

label {
  // width: 30%;
  // display: block;
  // text-align: right;
  // padding-right: 5%;
  // display: flex;
  // align-items: center;
  // justify-content: flex-end;
}

.field {
  // width: 50%;
  // margin-bottom: 1%;
  // display: flex;
  // align-items: center;
}

input{
  // width: 70%;
  // border: .5px solid lightgray;
  // padding: 1%;
}

input:hover{
  border: .5px solid gray;

}

button{
  margin-bottom: 1%;
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}

button:hover{
  background-color: rgb(250, 250, 250);
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}

._box-shadow1 {
  -webkit-box-shadow: 0 .25vh 1vh #777;
  -moz-box-shadow: 0 .25vh 1vh #777;
  box-shadow: 0 .25vh 1vh #777;
}
._box-shadow2 {
  -webkit-box-shadow: 0 .25vh 1vh #777;
  -moz-box-shadow: 0 .25vh 1vh #777;
  box-shadow: 0 .25vh 1vh #777;
}
</style>
