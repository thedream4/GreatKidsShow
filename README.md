# GREAT KIDS SHOW
You will need node.js to run this application on your local machine: 
1. install node.js [here](https://nodejs.org/en/)
2. Navigate to bin folder once installed
3. copy directory of bin folder and paste into environment variable

## Project setup

```
npm install
```
> installs dependencies like javascript frameworks and css libraries

### Running Development Server
```
npm run serve
```
> preview the app locally 

### Compiles and minifies for production
```
npm run build
```
> minifies the app for production

### Collaborating in Branches
1. Main - Most stable version of the app, only commit new changes through staging branch
2. Staging - Pre-production branch, to test code base on production environment. Feature merges goes to staging.
3. `feature-name` - Branch namespace for any feature that you are working on (e.g. `scroll-animation`, `button-sound-effects`, `embedding-game` etc.)


### FOR FUN!!!
list of animations:
<br />fade
<br />fade-up
<br />fade-down
<br />fade-left
<br />fade-right
<br />fade-up-right
<br />fade-up-left
<br />fade-down-right
<br />fade-down-left
<br />
<br />Flip animations:
<br />flip-up
<br />flip-down
<br />flip-left
<br />flip-right
<br />
<br />Slide animations:
<br />slide-up
<br />slide-down
<br />slide-left
<br />slide-right
<br />
<br />Zoom animations:
<br />zoom-in-up
<br />zoom-in-down
<br />zoom-in-left
<br />zoom-in-right
<br />zoom-out
<br />zoom-out-up
<br />zoom-out-down
<br />zoom-out-left
<br />zoom-out-right
<br />
<br />usage: just add the animation to your html tags
<br />`<p data-aos="slide-up" data-aos-duration="1500">Hello!</p>`
<br />
`<div data-aos="fade-in" data-aos-duration="2000"></div>`