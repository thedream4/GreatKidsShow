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