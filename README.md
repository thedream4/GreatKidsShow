# GREAT KIDS SHOW

1. Your machine will need node.js to run this application. install node.js [here](https://nodejs.org/en/)
2. Netbeans IDE will need cygwin to enable the terminal. install cygwin [here](https://cygwin.com/install.html)
3. Open project in netbeans and  bring out the terminal (Window > IDE Tools > terminal) and run the command in **setup project**

<br><br>
## Setup project

```
npm install
```

> installs dependencies like javascript frameworks and css libraries

### Running Development Server

```
npm run serve
```

> preview the app locally (localhost:8080)

<br><br>
## Collaborating in Branches

1. Main - Most stable version of the app, only commit new changes through staging branch
2. Staging - Pre-production branch, to test code base on production environment. Feature merges goes to staging.
3. `feature-name` - Branch namespace for any feature that you are working on (e.g. `feature-AOS`, `feature-accordion`, `feature-game-install` etc.)

### List of animations

usage: just add the animation to your html tags
<br />`<p data-aos="slide-up" data-aos-duration="1500">Hello!</p>`
<br />
`<div data-aos="fade-in" data-aos-duration="2000"></div>`

|`Fade`|`Flip`|`Slide`|`Zoom`|
|--------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|fade-up<br>fade-down<br>fade-left<br>fade-right<br>fade-up-right<br>fade-up-left<br>fade-down-right<br>fade-down-left | flip-up<br>flip-down<br>flip-left<br>flip-right | slide-up<br>slide-down<br>slide-left<br>slide-right | zoom-in-up<br>zoom-in-down<br>zoom-in-left<br>zoom-in-right<br>zoom-out<br>zoom-out-up<br>zoom-out-down<br>zoom-out-left<br>zoom-out-right<br> |
