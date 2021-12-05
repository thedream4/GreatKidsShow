<template>
  <div id="nav">
    <md-ripple
      ><router-link to="/"><p>Home</p></router-link></md-ripple
    >
    <md-ripple
      ><router-link to="/about"><p>About</p></router-link></md-ripple
    >
    <md-ripple
      ><router-link to="/games"><p>GamesPage</p></router-link></md-ripple
    >
    <md-ripple
      ><router-link to="/fruits"><p>Fruits</p></router-link></md-ripple
    >
    <md-ripple
      ><router-link to="/vegetables"><p>Vegetables</p></router-link></md-ripple
    >
    <md-ripple
      ><router-link to="/sushi"><p>Sushi</p></router-link></md-ripple
    >
    <md-ripple
      ><router-link to="/animals"><p>Animals</p></router-link></md-ripple
    >
    <md-ripple
      ><router-link to="/hobbies"><p>Hobbies</p></router-link></md-ripple
    >
  </div>
</template>

<style scoped>
#nav {
  width: 20%;
  float: right;
  top: 0;
  box-shadow: 1px 2px 3px #42b983;
  position: fixed;
  right: 0;
  background-color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

p {
  height: 12.5vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 480px) {
  #nav {
    width: 100%;
    display: flex;
    top: 0;
    position: sticky;
    margin-bottom: 20px;
  }
  p {
    height: 5vh;
  }
}
</style>