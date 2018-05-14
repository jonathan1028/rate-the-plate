<template>
  <div id="app">
      <app-header></app-header>
      <div class="main-content">
        <router-view></router-view>
        <!-- Standard page layout code -->
      </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>

<style>
html {
  background-color: whitesmoke;
  font-family: 'Open Sans', sans-serif;
}

.main-content {
  max-width: 90%;
  margin: 4em auto;
}

.box {
  background-color: white;
  margin-top: 1%;
  padding: 1%;
  /* border: 1px solid #BFBFBF;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #aaaaaa; */
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
  width: 30%;
  display: block;
  text-align: right;
  padding-right: 5%;
  /* border: .5px solid lightgray; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.field {
  width: 50%;
  /* border: .5px solid lightgray; */
  margin-bottom: 1%;
  display: flex;
  align-items: center;
}

input{
  width: 70%;
  border: .5px solid lightgray;
  padding: 1%;
}

input:hover{
  border: .5px solid gray;
  /* background-color: white;
  box-shadow: 3px 3px 3px 3px #aaaaaa; */
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

  /* body {
    margin: 0;
    padding: 0;
    font-family: Verdana, Geneva, sans-serif;
  }
  input {
    max-width: 500px;
  }
  .gray {
    color: #828282;
  }
  .orange {
    background-color: #ff6600;
  }
  .background-gray {
    background-color: rgb(246,246,239);
  }
  .f11 {
    font-size: 11px;
  }
  .w85 {
    width: 85%;
  }
  .button {
    font-family: monospace;
    font-size: 10pt;
    color: black;
    background-color: buttonface;
    text-align: center;
    padding: 2px 6px 3px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonface;
    cursor: pointer;
    max-width: 250px;
  } */
</style>
