/*
*(C) 2021 Jia Jun Ngeo All Rights Reserved
*/
/*
*@brief All elements
*/
let Elements={};
/*
@brief Base class for all rendering elements
*/
Elements.Element=class{
    render(ctx){
      throw "render() must be overrided";
    }
    update(delta){}
};
/*
@brief Application name space
*/
let App={last:undefined,paused:undefined,pause:false};
/*
@brief Check weather input v is a valid number
@param v input to check
@return true if it is number false otherwise
*/
App.isNumber=(v)=>(v||v===0)&&typeof v==="number"&&!isNaN(v);
/*
*@brief Clamp the value ref in the range of boundary
*@param ref the base number to clamp
*@param boundary the max/min value that ref can be
*@param sign the sign of the manipulation if positive then _boundary_ is maximum, minimum otherwise
*@return clamped number
*/
App.clamp3V=(ref,boundary,sign)=>(sign>0)?(ref>boundary?boundary:ref):(ref<boundary?boundary:ref);
/*
*@brief generate a random integer within [0-(max-1)]
*@param max maximum integer the function could return (exclusive)
*@return generated random number
*/
if(window.crypto.getRandomValues){
  App.random=function(max){
    let value=new Uint32Array(1);
    window.crypto.getRandomValues(value);
    return value%max;
  }
}
else{
  App.random=(max)=>Math.ceil(Math.random()*(Math.exp(Math.log(max)+3)))%max;
}
/*
*@brief generate a random integer within [min-(max-1)]
*@param min minimum integer the function could return (inclusive)
*@param max maximum integer the function could return (exclusive)
*@return generated random number
*/
App.randomRange=(min,max)=>min+App.random(max-min);
/*
*@brief return random elements from Array-like object e
*@param e Array-like object
*@return random object from e
*/
App.randomElement=(e)=>e[App.random(e.length)];
/*
*@brief generate random boolean
*@return random boolean
*/
App.randomBoolean=()=>(App.random(1000)>500);
//Note:
//first it generate number between 1-3 (4 is exclusive)
//then it scale down to -1 => 1 by subtracting 2 from it
/*
*@brief shuffle array e using internal random generator
*@param e Array to shuffle
*@return shuffled array
*/
App.shuffleArray=(e)=>e.sort(()=>App.randomRange(1,4)-2);
/*
*@brief Render a text in center by x-axis at specified y
*@param context The rendering context of the canvas
*@param text Text to render
*@param y The y value of the place the text should be rendered. This should be [top+font size[px]]
*@param minX The minimum X of the range it should center the text [optional[default=0]]
*@param maxX The maximum X of the range it should center the text [optional[default=width of the canvas]]
*/
App.renderTextCentered=function(context,text,y,minX=0,maxX=App.element.width){
  //get the width of the text
  let width=context.measureText(text).width;
  //get width of the text
  let renderWidth=maxX-minX;
  if(renderWidth<=width){
    context.fillText(text,minX,y,renderWidth);
  }
  else{
    //First remove the text width to get the width of the empty space
    //Then divide it by 2 to get it
    //Finally add minX to get final X
    let x=(renderWidth-width)/2+minX;
    context.fillText(text,x,y,width);
  }
}
/*
*@brief Get the actual screen coordinate of the given coordinate
*@param e the coordinate to convert
*@param reference the reference size [optional[default=canvas size]]
*@return the screen coordinate
*/
App.asActualScale=function(e,reference=App?.config?.referenceSize){
  if(!(e instanceof App.type.Point2D)){
    throw "Not a Point2D";
  }
  if(!(reference instanceof App.type.Point2D)){
    return e.clone();
  }
  let value=e.clone();
  value.x=value.x/reference.x*App.element.width;
  value.y=value.y/reference.y*App.element.height;
  return value;
}
/*
*@brief Get the actual screen coordinate of the given rect
*@param e the rect to convert
*@param reference the reference size [optional[default=canvas size]]
*@return the rect screen coordinate
*/
App.asActualScaleRect=function(e,reference=App?.config?.referenceSize){
  if(!(e instanceof App.type.Rect)){
    throw "Not a Rect";
  }
  if(!(reference instanceof App.type.Point2D)){
    return e.clone();
  }
  let value=e.clone();
  value.x=value.x/reference.x*App.element.width;
  value.y=value.y/reference.y*App.element.height;
  value.width=value.width/reference.x*App.element.width;
  value.height=value.height/reference.y*App.element.height;
  return value;
}
/*
*@brief Get the actual screen coordinate of the given coordinate in X-axis only
*@param e the coordinate to convert (X-axis only)
*@param reference the reference size [optional[default=canvas size]]
*@return the screen coordinate (X axis only)
*/
App.asActualScaleX=function(e,reference=App?.config?.referenceSize){
  if(!App.isNumber(e)){
    throw "Not a number";
  }
  if(!(reference instanceof App.type.Point2D)){
    return e;
  }
  return e/reference.x*App.element.width;
}
/*
*@brief Get the actual screen coordinate of the given coordinate in Y-axis only
*@param e the coordinate to convert (Y-axis only)
*@param reference the reference size [optional[default=canvas size]]
*@return the screen coordinate (Y axis only)
*/
App.asActualScaleY=function(e,reference=App?.config?.referenceSize){
  if(!App.isNumber(e)){
    throw "Not a number";
  }
  if(!(reference instanceof App.type.Point2D)){
    return e;
  }
  return e/reference.y*App.element.height;
}
App.asActualScaleFont=function(e,scale=1,reference=App?.config?.referenceSize){
  const height=e.match(/\d+/)[0];
  return e.replace(/\d+/,height/reference.y*App.element.height*scale);
}
/*
*@brief Get the local coordinate of the given screen coordinate
*@param e the coordinate to convert
*@param reference the reference size [optional[default=canvas size]]
*@return the local coordinate
*/
App.asLocalScale=function(e,reference=App?.config?.referenceSize){
  if(!(e instanceof App.type.Point2D)){
    throw "Not a Point2D";
  }
  if(!(reference instanceof App.type.Point2D)){
    return e.clone();
  }
  let value=e.clone();
  value.x=value.x/App.element.width*reference.x;
  value.y=value.y/App.element.height*reference.y;
  return value;
}
/*
*@brief Data types used inside the application
*/
App.type={};
/*
*@brief 2D coordinate
*/
App.type.Point2D=class{
  /*
  *@brief construct the object with provided x and y values
  *@param x x value
  *@param y y value
  */
  constructor(x,y){
    this._x=App.isNumber(x)?x:0;
    this._y=App.isNumber(y)?y:0;
  }
  /*
  *@brief get x value
  *@return x value
  */
  get x(){
    return this._x;
  }
  /*
  *@brief get y value
  *@return y value
  */
  get y(){
    return this._y;
  }
  /*
  *@brief set x value
  *@param x x value
  */
  set x(x){
    this._x=App.isNumber(x)?x:0;
  }
  /*
  *@brief set y value
  *@param y y value
  */
  set y(y){
    this._y=App.isNumber(y)?y:0;
  }
  /*
  *@brief add another vector into this vector object
  *@param rhs another operand
  *@return reference to this object for chaining
  */
  addVector(rhs){
    if(!(rhs instanceof App.type.Point2D)){
      throw "rhs not a valid Point2D object";
    }
    this._x+=rhs._x;
    this._y+=rhs._y;
    return this;
  }
  /*
  *@brief substract another vector from this vector object
  *@param rhs another operand
  *@return reference to this object for chaining
  */
  subVector(rhs){
    if(!(rhs instanceof App.type.Point2D)){
      throw "rhs not a valid Point2D object";
    }
    return this.addVector(rhs.clone().mulScalar(-1));
  }
  /*
  *@brief make a copy of this object
  *@return reference to cloned object
  */
  clone(){
    return new App.type.Point2D(this._x,this._y);
  }
  /*
  *@brief multiply this vector object with a scalar value
  *@param s another operand
  *@return reference to this object for chaining
  */
  mulScalar(s){
    if(!App.isNumber(s)){
      throw "s is not a number";
    }
    this._x*=s;
    this._y*=s;
    return this;
  }
  /*
  *@brief divide this vector object with a scalar value
  *@param s another operand
  *@return reference to this object for chaining
  */
  divScalar(s){
    if(!App.isNumber(s)){
      throw "s is not a number";
    }
    return this.mulScalar(1/s);
  }
  /*
  *@brief perform App.clamp3V on all components inside the object
  *@param boundaryVec a Point2D object to represent boundary for both x and y
  *@param sign a Point2D object to represent sign for both x and y
  *@return reference to this object for chaining
  */
  rangeClamp(boundaryVec,sign){
    if(!(boundaryVec instanceof App.type.Point2D)||
    !(sign instanceof App.type.Point2D)){
      throw "boundaryVec or sign not a valid Point2D object";
    }
    this._x=App.clamp3V(this._x,boundaryVec._x,sign._x);
    this._y=App.clamp3V(this._y,boundaryVec._y,sign._y);
    return this;
  }
};
/*
*@brief Represent RGBA color
*/
App.type.Color4V=class{
  /*
  *@brief Construct the class using the provided r,g,b,a values
  *@param r r component
  *@param g g component
  *@param b b component
  *@param a a component
  */
  constructor(r,g,b,a) {
    this._r=App.isNumber(r)?r:0;
    this._g=App.isNumber(g)?g:0;
    this._b=App.isNumber(b)?b:0;
    this._a=App.isNumber(a)?a:255;
  }
  /*
  *@brief get r value
  *@return r value
  */
  get r(){
    return this._r;
  }
  /*
  *@brief get g value
  *@return g value
  */
  get g(){
    return this._g;
  }
  /*
  *@brief get b value
  *@return b value
  */
  get b(){
    return this._b;
  }
  /*
  *@brief get a value
  *@return a value
  */
  get a(){
    return this._a;
  }
  /*
  *@brief set r value
  *@param r r value
  */
  set r(r){
    this._r=App.isNumber(r)?r:0;
    if(this._r<0){
      this._r=0;
    }
    else if(this._r>255){
      this._r=255;
    }
  }
  /*
  *@brief set g value
  *@param g g value
  */
  set g(g){
    this._g=App.isNumber(g)?g:0;
    if(this._g<0){
      this._g=0;
    }
    else if(this._g>255){
      this._g=255;
    }
  }
  /*
  *@brief set b value
  *@param b b value
  */
  set b(b){
    this._b=App.isNumber(b)?b:0;
    if(this._b<0){
      this._b=0;
    }
    else if(this._b>255){
      this._b=255;
    }
  }
  /*
  *@brief set a value
  *@param a a value
  */
  set a(a){
    this._a=App.isNumber(a)?a:255;
    if(this._a<0){
      this._a=0;
    }
    else if(this._a>255){
      this._a=255;
    }
  }
  /*
  *@brief get the hex representation of this
  *@return hex representation
  */
  get hex(){
    let hex=v=>(v>0&&v<256)?`0${v.toString(16)}`.slice(-2):"00";
    return `#${hex(this._r)}${hex(this._g)}${hex(this._b)}${hex(this._a)}`;
  }
  /*
  *@brief Clone this object
  *@return A duplicate copy of this object
  */
  clone(){
    return new App.type.Color4V(this._r,this._g,this._b,this._a);
  }
}
/*
*@brief represent a region of rectangle
*/
App.type.Rect=class{
  /*
  *@brief construct the object
  *@param x X value of the rectangle
  *@param y Y value of the rectangle
  *@param w Width of the rectangle
  *@param h height of the rectangle
  */
  /*
  *@param position a Point2D that represents the position
  *@param size a Point2D that represents the size
  */
  constructor(x,y,w,h){
    if(x instanceof App.type.Point2D){
      this.position=x.clone();
      this.size=y.clone();
    }
    else{
      this.position=new App.type.Point2D(x,y);
      this.size=new App.type.Point2D(w,h);
    }
  }
  /*
  *@brief get x value
  *@return x value
  */
  get x(){
    return this.position.x;
  }
  /*
  *@brief get y value
  *@return y value
  */
  get y(){
    return this.position.y;
  }
  /*
  *@brief get width
  *@return width of the rectangle
  */
  get width(){
    return this.size.x;
  }
  /*
  *@brief get height
  *@return height of the rectangle
  */
  get height(){
    return this.size.y;
  }
  /*
  *@brief set X value
  *@param X X value
  */
  set x(val){
    this.position.x=val;
  }
  /*
  *@brief set Y value
  *@param Y Y value
  */
  set y(val){
    this.position.y=val;
  }
  /*
  *@brief set width
  *@param val width value
  */
  set width(val){
    this.size.x=val;
  }
  /*
  *@brief set height
  *@param val height value
  */
  set height(val){
    this.size.y=val;
  }
  /*
  *@brief returns whether a Point2D is inside the rectangle
  *@param rect Point2D to test against
  *@return weather it is inside the rectangle
  */
  insideRect(rect){
    if(!(rect instanceof App.type.Point2D)){
      throw "not a Point2D object";
    }
    if(this.size.x===0||this.size.y===0){
      return false;
    }
    const anotherSide=this.position.clone().addVector(this.size);
    return (rect.x>=this.position.x&&rect.x<=anotherSide.x&&
      rect.y>=this.position.y&&rect.y<=anotherSide.y);
  }
  /*
  *@brief clone this object
  *@return a copy of this object
  */
  clone(){
    return new App.type.Rect(this.position,this.size);
  }
}
/*@brief Core APIs*/
App.core={};
/*@brief Main resource loader*/
App.core.Resources=new (class {
  constructor(){
    this.cache=[];
    this._updateCache=(k,v)=>{
      if(k&&v)
        this.cache[k]=v;
    };
    this._failed=(k)=>{if(k)this.cache[k]=undefined;};
  }
  /*
  *@brief get the object that stored as key
  *@param key key of the object
  *@return Promise which will resolves when succeeded and rejects when failed
  */
  promiseFromResourceId(key){
    if(!key)return Promise.reject("Invalid key");
    else{
      if(typeof this.cache[key]?.then === 'function'){
        //the resource loading is pending
        return this.cache[key];
      }
      else if(this.cache[key]){
        //object exist
        return Promise.resolve(this.cache[key]);
      }
      else{
        return Promise.reject("Object not exist");
      }
    }
  }
  /*
  *@brief load image from url as key
  *@param key object key
  *@param url url of the image
  *@return Promise which will resolves when succeeded and rejects when failed
  */
  loadImage(key,url){
    return this.loadResource(key,url,App.core.Resources.handlers.image);
  }
  loadBlob(key,url){
    return this.loadResource(key,url,App.core.Resources.handlers.blob);
  }
  loadJSON(key,url){
    return this.loadResource(key,url,App.core.Resources.handlers.json);
  }
  /*
  *@brief load resource from url as key using the specific handler
  *@param key object key
  *@param url url of the resource
  *@param handler
  *@return Promise which will resolves when succeeded and rejects when failed
  */
  loadResource(key,url,handler){
    if(key&&url&&handler){
      let self=this;
      return this.promiseFromResourceId(key)
      .catch(function(y){
        if(y===123)throw y;
        let _handler=handler.bind(this,null); //bind handler as protected apis
        let resolveHandler,rejectHandler;
        let handle;
        let promise=new Promise((resolve,reject)=>{
          resolveHandler=resolve;
          rejectHandler=function(e){
            console.error(e);
            reject(123);
          }
        }).catch(err=>{
          self._failed(key);
          throw err;
        })
        .then(()=>{
          self._updateCache(key,handle);
          return handle;
        });
        //put this into the store
        self.cache[key]=promise;
        handle=handler(url,resolveHandler,rejectHandler);
        return promise;
      });
    }
    else{
      return Promise.reject("Invalid parameters");
    }
  }
  /*
  *@brief synchoronously get the object that stored as key
  *@param key key of the object
  *@return The resolved object and throws when pending or failed
  */
  getOrThrow(key){
    if(!key)throw "Invalid key";
    else{
      if(typeof this.cache[key]?.then === 'function'){
        //the resource loading is pending
        throw "Object pending";
      }
      else if(this.cache[key]){
        //object exist
        return this.cache[key];
      }
      else{
        throw "Object not exist";
      }
    }
  }
  /*
  *@brief Dispose the cache entry on entry key
  *@param key key of object to be disposed
  */
  dispose(key){
    this.cache[key]=undefined;
  }
})();
App.core.Resources.handlers={
  image:function(url,resolve,reject){
    let e=new Image();
    e.onload=resolve;
    e.onerror=reject;
    e.src=url;
    return e;
  },
  blob:function(url,resolve,reject){
    let handle={blob:undefined};
    fetch(url).then(e=>{
      if(!e.ok)throw "Request failed";
      else return e.blob();
    }).then(e=>{
      handle.blob=e;
      resolve();
    }).catch(reject);
    return handle;
  },
  json:function(url,resolve,reject){
    /*
    *Note: we use blob loader instead or direct fetch in order to allow
    *protected content to load without changing the infrastructure too much
    */
    let retHandle={object:undefined}; //handle to the result
    let loaderHandle; //handle for blob loader
    const next=function(){
      if(!loaderHandle.blob)reject();
      loaderHandle.blob.arrayBuffer() //convert blob to arrayBuffer
      .then(buf=>new TextDecoder().decode(buf)) //then decode it into utf8 txt
      .then(txt=>JSON.parse(txt)) //parse it as json
      .then(obj=>{
        retHandle.object=obj; //set the result
        resolve(); //resolve the promise
      })
      .catch(reject);
    };
    loaderHandle=App.core.Resources.handlers.blob(url,next,reject);
    return retHandle;
  }
};

/*
*@brief This serves as the base class of the animators that
* will be responsible in animating objects.
*This class is abstract and not to be constructed directly
*/
App.core.Animator=class{
  /*
  *@brief Get the completation status of the animator
  *@returns Weather the animator have finished
  */
  get done(){
    throw "done$get() must be overrided"
  }
  /*
  *@brief Update the animator with delta time
  *@param time Delta in second
  */
  update(time){}
}

/*
*@brief a variant of animator but also expose the kill()
*to force terminate the animation from outside. The killed animator
*will appears as finished animation
*/
App.core.KillableAnimator=class extends App.core.Animator{
    /*
    *@brief initialize this animator with animator
    *@param baseAnimator base animator that this animator based on
    */
    constructor(baseAnimator){
      super();
      if(baseAnimator&&(baseAnimator instanceof App.core.Animator)){
        this._animator=baseAnimator;
      }
      this._killed=false;
    }
    /*
    *@see App.core.Animator::done$get
    */
    get done(){
      return this._killed||((this._animator?.done)??false);
    }
    /*
    *@brief get kill status of this animator
    *@return Weather this animator is killed
    */
    get killed(){
      return this._killed;
    }
    /*
    *@brief get the inner animator that this animator is based on
    *@return The inner animator
    */
    get inner(){
      return this._animator;
    }
    /*
    *@see App.core.Animator::update(time)
    */
    update(time){
      this._animator?.update(time);
    }
    /*
    *@brief Kill the animation
    */
    kill(){
      this._killed=true;
    }
};

/*
*@brief A simple container to hold and update all animators in a place
*/
App.core.AnimationManager=class{
  //default
  constructor(){
    this.animator=[];
  }
  /*
  *@brief add an animator into this container
  *@param animator animator to add
  */
  add(animator){
    if(!(animator instanceof App.core.Animator)){
      throw "invalid animator"
    }
    else if(animator.done){
      console.warn("Warning: ignored this call to AnimationManager::add as the animator is completed");
    }
    else{
      this.animator.push(animator);
    }
  }
  /*
  *@brief Update the animators with delta time
  *@param time Delta in second
  */
  update(time){
    let subjectsToupdate=this.animator.filter(a=>!a.done);
    subjectsToupdate.forEach((item) => {
      item.update(time);
    });
    this.animator=subjectsToupdate;
  }
}
/*
*@brief Same as AnimationManager but it is synced to a clock and also provides capbility to defer
*/
App.core.SyncedAnimationManager=class extends App.core.AnimationManager{
    constructor(clock){
      super();
      this._deferred=[];
      if(typeof clock !== "function"&&!isNumber(clock())){
        throw "The clock provided is invalid";
      }
      this.clock=clock;
    }
    //add is not overrided
    /*
    *@brief Update the animators. While this is similar to AnimationManager::update
    *the time parameter provided is not used, instead the delta is computed internally
    */
    update(/*time is ignored*/){
      this.clock(false); //unfreeze the clock
      if(!this.last){
        this.last=this.clock();
      }
      else{
        let now=this.clock();
        const delta=now-this.last;
        //update parent list
        App.core.AnimationManager.prototype.update.call(this,delta);
        //now process the deferred list
        //first interpolate the timers
        let newDeferredList=[];
        this._deferred.forEach((item) => {
          //addAfter push items that do not have timer
          if(item.remaining)
            item.remaining-=delta;
          if(item.afterAnimator?.done||item.remaining<=0){
            //the timers expired or the precedding animator have done
            if(item.remaining&&item.remaining!==0){
              //perform the interpolation
              let diff=item.remaining*-1;
              item.animator.update(diff);
            }
            //add the animator to active list
            item.animator.pending=false;
            this.add(item.animator);
          }
          else{
            //otherwise add this to the newDeferredList
            newDeferredList.push(item);
          }
        });
        //swao the list
        this._deferred=newDeferredList;
        this.last=now;
        this.lastDelta=delta;
      }
    }
    /*
    *@brief add an animator into this container after delay seconds
    *@param animator animator to add
    *@param delay delay in second
    */
    addDeferred(animator,delay=1){
      if(!(animator instanceof App.core.Animator)){
        throw "invalid animator"
      }
      else if(animator.done){
        console.warn("Warning: ignored this call to SyncedAnimationManager::add as the animator is completed");
      }
      else{
        animator.pending=true;
        this._deferred.push({animator:animator,remaining:delay});
      }
    }
    /*
    *@brief add an animator into this container after an animator done
    *@param animator animator to add
    *@param precedding animator before
    */
    addAfter(animator,precedding){
      if(!(animator instanceof App.core.Animator)||!(precedding instanceof App.core.Animator)){
        throw "invalid animator"
      }
      else if(animator.done){
        console.warn("Warning: ignored this call to SyncedAnimationManager::add as the animator is completed");
      }
      else{
        animator.pending=true;
        this._deferred.push({animator:animator,afterAnimator:precedding});
      }
    }
    /*
    *@brief add an animator into this container and make it active on certain presentation timestamp(pts)
    *@param animator animator to add
    *@param timestamp of the object shall activate
    */
    addOn(animator,pts){
      const ref=this.clock();
      if(!App.isNumber(pts)){
        throw "Invalid timestamp";
      }
      else{
        this.addDeferred(animator,pts-ref);
      }
    }
}
App.core.LinearAnimator1D=class extends App.core.Animator{
  constructor(start,target,dur){
    super();
    this.delta=(target-start)/dur;
    this.current=start;
    this.target=target;
    this.dur=dur;
    this.cur=0;
  }
  get done(){
    return this.cur>=this.dur;
  }
  get percentage(){
    return this.cur/this.dur*100;
  }
  update(time){
    this.cur+=time;
    this.current=App.clamp3V(this.current+this.delta*time,this.target,this.delta);
  }
}
App.core.FlipFlopAnimator1D=class extends App.core.Animator{
  constructor(start,target,dur){
    super();
    this.delta=(target-start)/dur;
    this.start=start;
    this.current=start;
    this.target=target;
    this.dur=dur;
  }
  get done(){
    return false;
  }
  update(time){
    this.current+=this.delta*time;
    const shouldFlip=this.delta>0?this.current>=this.target:this.current<=this.target;
    if(shouldFlip){
      let diff=this.target-this.current;
      //reverse all props
      this.delta*=-1;
      this.current=this.target;
      this.target=this.start;
      this.start=this.current;
      //apply the extra interpolation
      this.current+=diff;
    }
  }
}
App.core.LinearAnimator2D=class extends App.core.Animator{
  constructor(start,target,dur){
    super();
    this.delta=target.clone().subVector(start).divScalar(dur);
    this.current=start;
    this.target=target;
    this.dur=dur;
    this.cur=0;
  }
  get done(){
    return this.cur>=this.dur;
  }
  get x(){
    return this.current.x;
  }
  get y(){
    return this.current.y;
  }
  get percentage(){
    return this.cur/this.dur*100;
  }
  update(time){
    this.cur+=time;
    //this.current+=this.delta*time
    this.current.addVector(this.delta.clone().mulScalar(time));
    this.current.rangeClamp(this.target,this.delta);
  }
}
/*
* @class-spec abstract
*/
App.Renderer=class {
  constructor() {
  }
  render(ctx){
    throw "render() must be overrided";
  }
  update(time){}
};

App.doRendering=function(){
  window.requestAnimationFrame(function render(pts){
    if(App.terminate)return;
    if(!App.last){
      App.last=pts;
    }
    else if(App.pauseQueued){
      App.pauseQueued=false;
    }
    else if(App.paused){
      App.scene.update((App.paused-App.last)/1000);
      App.last=pts;
      App.paused=undefined;
      App.pause=false;
    }
    else{
      App.scene.update((pts-App.last)/1000);
      App.scene.render(App.ctx);
      App.last=pts;
    }
    if(!App.pause){
      window.requestAnimationFrame(render);
    }
  });
};

App.stopRendering=function(terminate=false){
  App.pause=true;
  App.pauseQueued=true;
  App.paused=performance.now(); //safe way to stop it because it stops immediately
  if(!terminate)
    App.scene.handleRendererPaused?.();
  else
    App.scene.handleRendererTerminate?.();
}

App.startRendering=function(force) {
  if(App.pause||force){
    App.pauseQueued=false;
    App.doRendering();
  }
}

App.handleInputEvent=function(e){
    if(!App.pause&&!App.terminate)
      App.scene.handleInputEvent?.(e);
}

App.resetRendererState=function(e){
  App.last=undefined;
}

App.switchRenderer=function(e){
  App.stopRendering(true);
  App.resetRendererState();
  App.ctx.clearRect(0,0,App.element.width,App.element.height);
  App.ctx.restore();//force reset the states into the initial
  App.ctx.save();
  App.scene=e;
  App.startRendering();
}

App.initRenderer=async function(){
  console.log("2d-animation-core JS revision 2");
  //optional loadResources could be export by application to load their resources
  try{
    await App.loadResources?.();
  }
  catch(e){
    console.error("Initialization terminated due to the resource loading errors");
    throw e;
  }
  App.element=document.querySelector(`${App.config?.canvas_selector??"canvas"}`);
  App.scene=new App.GameScene();
  App.ctx=App.element.getContext('2d');
  App.ctx.save();
  //create default configuration if not presents
  App.config=App.config??{config:new App.type.Point2D(App.element.width,App.element.height)};
  const eventsToListen=["keydown","keyup","click","mousemove"];
  for(const evt of eventsToListen){
      App.element.addEventListener(evt,App.handleInputEvent);
  }
  document.addEventListener("visibilitychange", ()=>{
    if(document.visibilityState === "visible"){
      App.startRendering();
    }
    else{
      App.stopRendering(false);
    }
  });
  App.doRendering();
}
if(!window._animatorOverride){
  window.addEventListener("load",App.initRenderer);
}
