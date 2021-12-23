/*
*Audio module for 2d-animation
*/
if(!App){
  throw "Please include 2d-animation-core.js before this extension";
}
//
//Extends App.core.Resources
//
App.core.Resources.loadAudio=function(key,url){
  return App.core.Resources.loadResource(key,url,App.core.Resources.handlers.audio);
};
//
//Overrides App.core.Resources.dispose to properly release the object URl
//
(function() {
  const origImpl=App.core.Resources.__proto__.dispose;
  App.core.Resources.dispose=(function(key){
    this.promiseFromResourceId(key).then(e=>{
      if(e instanceof HTMLMediaElement){
        if(e.src.startsWith("blob:")){
          URL.revokeObjectURL(e.src);
        }
        App.core.AudioManager.removeAny(e);
      }
    })
    .catch(e=>{})
    .finally(origImpl.bind(this,key));
  }).bind(App.core.Resources);
}());
//
//Extends App.core.handlers
//
//This shall resolves to HTMLAudioElement
App.core.Resources.handlers.audio=function(url,resolve,reject){
  //setup audio element
  let element=new Audio();
  element.preload="auto";
  element.onerror=reject;
  element.oncanplaythrough=()=>{
    element.onerror=undefined; //clear this handler to avoid problem when media decode error happened
    resolve();
  }
  if(window.location.protocol==="file:"){
    //no xhr/fetch support
    element.src=url;
  }
  else{
    //when xhr is usuable load it into blob then use object url
    const blob=App.core.Resources.handlers.blob;
    let handle={};
    let nextStep=function(){
        if(!handle.blob)reject();
        //create object url and assign
        element.src=URL.createObjectURL(handle.blob);
    };
    handle=blob(url,nextStep,reject); //load the blob
  }
  return element; //return the element as handle
}
App.core.AudioManager=new(class {
  constructor() {
      this.context=new AudioContext();
      this.sfxGain=this.context.createGain();
      this.sfxGain.connect(this.context.destination);
      this.bgmGain=this.context.createGain();
      this.bgmGain.connect(this.context.destination);
      function SplitExecObjectList(){};
      SplitExecObjectList.prototype.splitExec=function(filter,then,otherwise){
        let resolved=false;
        for(let keys of Object.keys(this)){
          if(filter(keys)){
            then(keys,this[keys]);
            resolved=true;
          }
          else{
            otherwise(keys,this[keys]);
          }
        }
        return resolved;
      };
      SplitExecObjectList.prototype.removeAll=function(beforeRemove){
        for(let keys of Object.keys(this)){
          if(beforeRemove)
            beforeRemove(this[keys]);
          delete this[keys];
        }
      };
      this.bgm=new SplitExecObjectList();
      this.sfx=new SplitExecObjectList();
      this.asClock=function(base=(()=>0)){
        let lastRef,freezed=false;
        return function(freeze=true){
          if(freeze){
            if(freezed){
              return lastRef;
            }
            else{
              freezed=true;
              lastRef=base();
              return lastRef;
            }
          }
          else{
            freezed=false;
            return base();
          }
        }
      };
  }
  start(){
      this.context.resume();
  }
  stop(){
      this.context.suspend();
  }
  addAudioAsBGM(handle,key){
    if(this.bgm[key])return Promise.resolve();
    else if(!(handle instanceof HTMLMediaElement)){
        return App.core.Resources.loadAudio(key,handle).then(e=>{
          let node=e.node||this.context.createMediaElementSource(e);
          e.node=node;
          this.bgm[key]=node;
        });
    }
    else{
      handle.currentTime=0;
      let node=handle.node||this.context.createMediaElementSource(handle);
      handle.node=node;
      this.bgm[key]=node;
      return Promise.resolve();
    }
  }
  addAudioAsSFX(handle,key){
    if(this.sfx[key])return Promise.resolve();
    else if(!(handle instanceof HTMLMediaElement)){
          return App.core.Resources.loadAudio(key,handle).then(e=>{
            let node=e.node||this.context.createMediaElementSource(e);
            e.node=node;
            this.sfx[key]=node;
          });
      }
    else{
        handle.currentTime=0;
        let node=handle.node||this.context.createMediaElementSource(handle);
        e.node=node;
        this.sfx[key]=node;
        return Promise.resolve();
      }
  }
  removeFromBGM(key){
    this.bgm[key]?.mediaElement.pause();
    this.bgm[key]?.disconnect();
    delete this.bgm[key];
  }
  removeFromSFX(key){
    this.sfx[key]?.mediaElement.pause();
    this.sfx[key]?.disconnect();
    delete this.sfx[key];
  }
  playBGM(key,loop=true,restart=false){
    const self=this;
    let resolved=this.bgm.splitExec(k=>k===key,(k,e)=>{
      if(restart){
        e.mediaElement.currentTime=0;
      }
      e.connect(self.bgmGain);
      e.mediaElement.loop=loop;
      e.mediaElement.play();
    },(k,e)=>{
      e.mediaElement.pause()
      e.disconnect();
    });
    if(!resolved){
      throw `BGM ${key} not exist`;
    }
  }
  playSFX(key,stopOthers=false){
    const self=this;
    let resolved=this.sfx.splitExec(k=>k===key,(k,e)=>{
      e.connect(self.sfxGain);
      e.mediaElement.currentTime=0;
      e.mediaElement.play();
    },(k,e)=>{
      if(stopOthers){
        e.mediaElement.pause();
        e.disconnect();
      }
    });
    if(!resolved){
      throw `SFX ${key} not exist`;
    }
  }
  stopBGM(){
    this.bgm.splitExec((k)=>true,(k,e)=>{
      e.mediaElement.pause();
      e.disconnect();
    },e=>{});
  }
  getBGMPlayhead(key){
    if(this.bgm[key]){
      return this.bgm[key].mediaElement.currentTime;
    }
    throw `BGM ${key} not exist`;
  }
  clearAll(){
    this.bgm.removeAll(e=>{
      e.mediaElement.pause();
      e.disconnect();
    });
    this.sfx.removeAll(e=>{
      e.mediaElement.pause();
      e.disconnect();
    });
  }
  //private api
  removeAny(element){
    const self=this;
    this.bgm.splitExec((k)=>true,(k,e)=>{
      if(e.mediaElement===element){
        e.mediaElement.pause();
        e.disconnect();
        delete self.bgm[k];
      }
    },e=>{});
    this.sfx.splitExec((k)=>true,(k,e)=>{
      if(e.mediaElement===element){
        e.mediaElement.pause();
        e.disconnect();
        delete self.sfx[k];
      }
    },e=>{});
  }
  getSFXGain(){
    return this.sfxGain.gain.value;
  }
  getBGMGain(){
    return this.bgmGain.gain.value;
  }
  adjustSFXGain(value){
    this.sfxGain.gain.value=value;
  }
  adjustBGMGain(value){
    this.bgmGain.gain.value=value;
  }
  get mainClock(){
    const self=this;
    return this.asClock(()=>self.context.currentTime);
  }
  getClockFromBGM(key){
    let target;
    let resolved=this.bgm.splitExec(k=>k===key,(k,e)=>{
      target=e;
    },()=>{
    });
    if(!resolved){
      throw `BGM ${key} not exist`;
    }
    else{
      return this.asClock(()=>target.mediaElement.currentTime);
    }
  }
});
//
//Overloads App.stopRendering && App.startRendering to handle audio context suspend
//
if(!window.audioContextSuspendOverride){
(function() {
  const _originalstopRendering=App.stopRendering;
  App.stopRendering=function(e){
    App.core.AudioManager.stop();
    _originalstopRendering.call(App,e);
  }
  const _originalStartRendering=App.startRendering;
  App.startRendering=function(){
    App.core.AudioManager.start();
    _originalStartRendering.call(App);
  }
}());
}
