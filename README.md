# GREAT KIDS SHOW

Your machine will need node.js to run this application

1. install node.js [here](https://nodejs.org/en/)
2. Navigate to bin folder once installed
3. copy directory of bin folder and paste into environment variable

Netbeans IDE will need cygwin to run node.js application

1. install cygwin [here](https://cygwin.com/install.html)
2. restart Netbeans IDE
3. Open netbeans terminal (Window > IDE Tools > terminal) and setup project
4. You may need to navigate to the project folder first (use shell commands)

## Setup project

```
npm install
```

> installs dependencies like javascript frameworks and css libraries

### Running Development Server

```
npm run serve
```

> preview the app

### Compiles and minifies for production

```
npm run build
```

> minifies the app for production

### Collaborating in Branches

1. Main - Most stable version of the app, only commit new changes through staging branch
2. Staging - Pre-production branch, to test code base on production environment. Feature merges goes to staging.
3. `feature-name` - Branch namespace for any feature that you are working on (e.g. `scroll-animation`, `button-sound-effects`, `embedding-game` etc.)

### FOR FUN!!! list of animations:

usage: just add the animation to your html tags
<br />`<p data-aos="slide-up" data-aos-duration="1500">Hello!</p>`
<br />
`<div data-aos="fade-in" data-aos-duration="2000"></div>`

|`Fade`|`Flip`|`Slide`|`Zoom`|
|--------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|fade-up<br>fade-down<br>fade-left<br>fade-right<br>fade-up-right<br>fade-up-left<br>fade-down-right<br>fade-down-left | flip-up<br>flip-down<br>flip-left<br>flip-right | slide-up<br>slide-down<br>slide-left<br>slide-right | zoom-in-up<br>zoom-in-down<br>zoom-in-left<br>zoom-in-right<br>zoom-out<br>zoom-out-up<br>zoom-out-down<br>zoom-out-left<br>zoom-out-right<br> |
