Elements.MusicNode=class extends Elements.Element{
  constructor(){
    super();
    this._animator=undefined;
    this.img=App.core.Resources.getOrThrow("music-node");
    this.size=new App.type.Point2D(30,20);
  }
  render(ctx){
    const position=App.asActualScale(this.innerAnimator.current);
    const size=App.asActualScale(this.size);
    ctx.drawImage(this.img,position.x,position.y,size.x,size.y);
  }
  get innerAnimator(){
    return this?._animator.inner??this._animator;
  }
  get animator(){
    return this._animator;
  }
  set animator(val){
    if(!(val instanceof App.core.Animator)){
      throw "invalid animator";
    }
    this._animator=val;
  }
}
Elements.Bomb=class extends Elements.Element{
  constructor(){
    super();
    this._animator=undefined;
    this.img=App.core.Resources.getOrThrow("bomb");
    this.size=new App.type.Point2D(20,30);
  }
  render(ctx){
    const position=App.asActualScale(this.innerAnimator.current);
    const size=App.asActualScale(this.size);
    ctx.drawImage(this.img,position.x,position.y,size.x,size.y);
  }
  get innerAnimator(){
    return this?._animator.inner??this._animator;
  }
  get animator(){
    return this._animator;
  }
  set animator(val){
    if(!(val instanceof App.core.Animator)){
      throw "invalid animator";
    }
    this._animator=val;
  }
}
Elements.Character=class extends Elements.Element{
  constructor(position){
    super();
    this._position=position instanceof App.type.Point2D ? position :new App.type.Point2D(0,0);
    this.img=App.core.Resources.getOrThrow("character");
    this.size=new App.type.Point2D(30,53);
  }
  render(ctx){
    const position=App.asActualScale(this._position);
    const size=App.asActualScale(this.size);
    ctx.drawImage(this.img,position.x,position.y,size.x,size.y);
  }
  get position(){
    return this._position;
  }
  set(position){
    if(!(position instanceof App.type.Point2D)){
      throw "not a point2d";
    }
    this._position=position;
  }
}
Elements.UI={};
Elements.UI.UIElementBase=class extends Elements.Element{
  constructor(){
    super();
  }
  handleInputEvent(e){}
  get rect(){
    throw "rect$get must be overrided";
  }
  get inputEventAware(){
    return false;
  }
}
Elements.UI.ProgressBar=class extends Elements.UI.UIElementBase{
  constructor(position,size,color=App.config.progressBarColor,bgColor=App.config.progressBarBG){
    super();
    this.position=position??new App.type.Point2D();
    this.size=size??new App.type.Point2D();
    this.now=this.size.clone();
    this.color=color??new App.type.Color4V();
    this.bgColor=bgColor??new App.type.Color4V();
    this.scale=1;
    this._progress=0;
  }
  render(ctx){
    const position=App.asActualScale(this.position);
    const fullSize=App.asActualScale(this.size);
    const size=App.asActualScale(this.now);
    ctx.fillStyle=this.bgColor.hex;
    ctx.fillRect(position.x,position.y,fullSize.x,fullSize.y);
    ctx.fillStyle=this.color.hex;
    ctx.fillRect(position.x,position.y,size.x,size.y);
  }
 get progress(){
   return this._progress;
 }
 set progress(val){
   this._progress=Math.min(val,this.scale);
   this.now.x=this.size.x*(val/this.scale);
 }
 updateBar(){
   this.progress=this._progress;
 }
}
Elements.UI.Button=class extends Elements.UI.UIElementBase{
  constructor(text,position,size,textColor=App.config.textColor,bgColor=App.config.buttonColor){
    super();
    this._rect=new App.type.Rect(
      position??new App.type.Point2D(),
      size??new App.type.Point2D()
    );
    this.color=textColor;
    this.bgColor=bgColor;
    this.text=text;
    this.hover=false;
    this.calculateHoverColor();
  }
  calculateHoverColor(){
    this.hoverColor=this.bgColor.clone();
    this.hoverColor.r=Math.ceil(this.hoverColor.r*1.2);
    this.hoverColor.g=Math.ceil(this.hoverColor.g*1.2);
    this.hoverColor.b=Math.ceil(this.hoverColor.b*1.2);
  }
  get inputEventAware(){
    return true;
  }
  get rect(){
    return this._rect;
  }
  handleInputEvent(e){
    if(e===false){
      this.hover=false;
    }
    else if(e.type==="mousemove"){
      this.hover=true;
    }
    else if(e.type==="click"){
      this.callback?.();
    }
    return true;
  }
  render(ctx){
    const oriAlpha=ctx.globalAlpha;
    ctx.globalAlpha=(this.alpha)*(oriAlpha)??oriAlpha;
    //get actual sizes
    const rect=App.asActualScaleRect(this._rect);
    //background
    ctx.fillStyle=(this.hover?this.hoverColor:this.bgColor).hex;
    ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
    //text
    if(this.font){
      ctx.font=this.font;
    }
    else{
      ctx.font=App.config.font.replace(/\d+/,rect.height*(this.fontScale??0.80));
    }
    ctx.fillStyle=this.color.hex;
    const height=ctx.font.match(/\d+/)[0];
    let y=Math.min(height,rect.height);
    //first get the height of the margin bottom
    //then substract from the height to get the end Y for rendering
    y=(rect.height-((rect.height-y)/2))*0.90;
    y+=rect.y;
    App.renderTextCentered(ctx,this.text,y,rect.x,rect.x+rect.width);
    ctx.globalAlpha=oriAlpha;
  }
}
Elements.UI.Layer=class extends Elements.UI.UIElementBase{
  constructor(proc=function(){}){
    super();
    this._renderer={
      last:undefined,
      controls:[]
    };
    proc(this);
  }
  update(delta){
      this._renderer.controls.forEach(c=>c.update(delta));
  }
  render(ctx){
    this.beforeRender?.(ctx);
    const ref=this._renderer.controls.filter(c=>(!c.hidden));
    for(let i=ref.length-1;i>=0;i--){
        ref[i].render(ctx);
    }
    this.afterRender?.(ctx);
  }
  handleInputEvent(e){
    let {last,controls}=this._renderer;
    const inputEventAwareControls=controls.filter(control=>control.inputEventAware&&!control.hidden);
    let resolved=undefined,handled=false;
    if(["mousemove","click"].includes(e.type)){
      const mousePos=App.asLocalScale(new App.type.Point2D(e.offsetX,e.offsetY));
      if(!controls.includes(last)){
        last=undefined;
      }
      for(let i=0;i<inputEventAwareControls.length;i++){
        const ref=inputEventAwareControls[i];
        if(ref instanceof Elements.UI.Layer || ref.rect.insideRect(mousePos)){
          if(last!=ref&&last){
            last.handleInputEvent(false); //focus lost
          }
          last=ref;
          resolved=last;
          handled=ref.handleInputEvent(e); //forward this to the control
          if(handled)
            break;
        }
      }
      if(!resolved){ //if nothing is resolved
        if(last)
          last.handleInputEvent(false); //remove focus of last element
        last=undefined;
      }
    }
    this._renderer.last=last;
    return handled;
  }
  get inputEventAware(){
    return true;
  }
}
Elements.UI.DialogLayer=class extends Elements.UI.Layer{
  constructor(init){
    super(init);
    this.hidden=true;
  }
  render(ctx){
    ctx.fillStyle="#000000aa";
    ctx.fillRect(0,0,App.element.width,App.element.height);
    Elements.UI.Layer.prototype.render.call(this,ctx);
  }
  handleInputEvent(e){
    Elements.UI.Layer.prototype.handleInputEvent.call(this,e);
    return true; //we need this to avoid the controls behind it got the control
  }
}
/*
*@brief use this as base class if the scene have UI components to render
*/
App.UIRenderer=class extends App.Renderer{
  constructor(){
    super();
    this._root=new Elements.UI.Layer();
    this._renderer=this._root._renderer; //needed to retain the link
    this._clock={
      ref:0,
      step:function(ref){
        this.ref+=ref;
      }
    };
  }
  update(delta){
    this._root.update(delta);
    this._clock.step(delta);
  }
  render(ctx){
    this._root.render(ctx);
  }
  handleInputEvent(e){
    this._root.handleInputEvent(e);
  }
  //for easy implementation of clock in case SyncedAnimationManager is needed but there are
  //no external clock for use
  get clock(){
    return (function(){return this._clock.ref;}).bind(this);
  }
}
App.GameSceneBase=class extends App.UIRenderer{
  constructor(initData=App.config.levelConfig){
    super();
    //this.clock provides default implementation of the clock
    this._am=new App.core.SyncedAnimationManager(this.clock);
    this.characterHeights=[130,230,330];
    this.nodeHeights=[150,250,350];
    this.characterHeight=App.random(this.characterHeights.length);
    //add character
    this.character=new Elements.Character(new App.type.Point2D(35,this.characterHeights[this.characterHeight]));
    //local variables
    this.blocks=[];
    this.paused=false;
    this.timeRemaining=120;
    //add a progress bar control [exciting point]
    this.progressBar=new Elements.UI.ProgressBar(
      new App.type.Point2D(550,5),
      new App.type.Point2D(200,30)
    );
    this.progressBar.scale=initData.excitingPtsMax??App.config.levelConfig.excitingPtsMax;
    this.initData=initData;
    this._renderer.controls.push(this.progressBar);
    //add a layer for the pause menu
    this.pauseMenu=new Elements.UI.DialogLayer(function(self){
      let resumeButton= new Elements.UI.Button(
        "Resume",
        new App.type.Point2D(300,200),
        new App.type.Point2D(200,60),
      );
      resumeButton.fontScale=0.4;
      resumeButton.callback=()=>{
        App.core.AudioManager.start();
        self.hidden=true;
      };
      let exitButton=new Elements.UI.Button(
        "Exit",
        new App.type.Point2D(300,300),
        new App.type.Point2D(200,60),
      );
      exitButton.fontScale=0.4;
      exitButton.callback=()=>{
        App.switchRenderer(new App.WelcomeScene());
      };
      self._renderer.controls.push(exitButton);
      self._renderer.controls.push(resumeButton);
    });
    this.pauseMenu.hidden=true;
    this.pauseMenu.beforeRender=function(ctx){
      /*this is a function hook called before the layer is drawn*/
      ctx.fillStyle=App.config.textColor.hex;
      App.renderTextCentered(ctx,"Game paused",App.asActualScaleY(100));
    }
    //attach it to root
    this._renderer.controls.unshift(this.pauseMenu);
    //game score
    App.runtime.score=0;
    //reset exciting points
    App.runtime.excitingPts=0;
    //load the sfx from the resources
    //it always succeeded because the loader will load the actual blob
    App.core.AudioManager.addAudioAsSFX(`null`,"node-hit");
    App.core.AudioManager.addAudioAsSFX(`null`,"bomb-hit");
    App.core.AudioManager.adjustSFXGain(0.5);
  }
  render(ctx){
    ctx.fillStyle=App.config.background;
    ctx.fillRect(0,0,App.element.width,App.element.height);
    ctx.font=App.asActualScaleFont(App.config.font);
    ctx.fillStyle=App.config.textColor.hex;
    ctx.fillText(`Score:${App.runtime.score} Remaining:${Math.ceil(this.timeRemaining)}`,App.asActualScaleX(10),App.asActualScaleY(30));
    this.blocks.filter(e=>!e.animator.pending).forEach((e=>e.render(ctx)));
    if(this.characterFlickerAnimator?.inner.current<0.5){
    }
    else{
      this.character.render(ctx);
    }
    App.UIRenderer.prototype.render.call(this,ctx);
  }
  update(time){
    if(!this.pauseMenu.hidden)return false;
    //update animator [breaks because the animator is synced to reference clock]
    App.UIRenderer.prototype.update.call(this,time);
    this._am.update(time);
    if(!this.getTimeRamaining)
      this.timeRemaining-=this._am.lastDelta??0;
    else
      this.timeRemaining=this.getTimeRamaining(); //this fix out of sync time issue
    if(this.timeRemaining<=0){
      App.runtime.levelData=this.initData;
      App.runtime.excitingPts=this.progressBar.progress;
      App.switchRenderer(new App.GameOverScene());
      return false;
    }
    //special case for characterFlickerAnimator
    if(this.characterFlickerAnimator){
      this.characterFlickerAnimator.remaining-=this._am.lastDelta??0;
      if(this.characterFlickerAnimator.remaining<=0){
        this.characterFlickerAnimator.kill();
        this.characterFlickerAnimator=undefined;
      }
    }
    const characterRight=this.character.position.x+this.character.size.x;
    //find blocks hit by the character
    for(let element of this.blocks.filter(e=>!e.innerAnimator.done&&e.innerAnimator.y==this.nodeHeights[this.characterHeight])){
      //for each elements inside [blocks] that have same y with player and not yet scheduled for removal
      if(element.innerAnimator.x<=characterRight){
        //if overlap with player
        element.animator.kill(); //kill the animation
        if(element instanceof Elements.MusicNode){
          App.runtime.score+=11; //100 points for each music block
          this.progressBar.progress++; //1 exciting point
          App.core.AudioManager.playSFX("node-hit"); //play the sfx
        }
        else{
          //deduct 5 exciting points for each bomb hit
          this.progressBar.progress=Math.max(0,this.progressBar.progress-5);
          //remove all nodes at bombs left side
          //forheiting the point
          this.blocks.filter(e=>!e.innerAnimator.done&&e.innerAnimator.x<=element.innerAnimator.x+50).forEach(e=>e.animator.kill());
          //scheduled flicker animation
          this.characterFlickerAnimator?.kill();
          this.characterFlickerAnimator=new App.core.KillableAnimator(
            new App.core.FlipFlopAnimator1D(0,1,0.1)
          )
          this.characterFlickerAnimator.remaining=0.3;
          this._am.add(this.characterFlickerAnimator);
          App.core.AudioManager.playSFX("bomb-hit");//play the sfx
        }
        break;
      }
    }
    //get missed blocks [excluding the killed and bomb]
    let blocksToKill=this.blocks.filter(e=>!(e instanceof Elements.Bomb)&&e.animator.done&&!e.animator.killed);
    //for each missed blocks lets deduct 3.5 exciting points
    this.progressBar.progress=Math.max(0,this.progressBar.progress-(3.5*blocksToKill.length));
    this.blocks=this.blocks.filter(e=>!e.animator.done);
    return true;
  }
  handleInputEvent(e){
    if(App.UIRenderer.prototype.handleInputEvent.call(this,e)){}
    else if(e.type==="keydown"){
      switch(e.code){
        case "KeyW": //up
        case "ArrowUp":
          this.characterHeight=Math.max(0,this.characterHeight-1);
          break;
        case "KeyS":
        case "ArrowDown":
          this.characterHeight=Math.min(this.characterHeights.length-1,this.characterHeight+1);
          break;
        case "Escape":
          if(this.pauseMenu.hidden){
            this.pauseMenu.hidden=false;
            App.core.AudioManager.stop();
          }
          else{
            this.pauseMenu.hidden=true;
            App.core.AudioManager.start();
          }
        default:
          return;
      }
      this.character.position.y=this.characterHeights[this.characterHeight];
      e.preventDefault();
    }
  }
  handleRendererPaused(){
    this.pauseMenu.hidden=false;
    App.core.AudioManager.stop();
  }
};
App.EndlessModeGameScene=class extends App.GameSceneBase{
  constructor(){
    super();
    this.delay=0.2;
  }
  update(time){
    if(!App.GameSceneBase.prototype.update.call(this,time)){
      return;
    }
    else{
      if(this.blocks.length<10){
        if(this.delay>0){
          this.delay-=time;
        }
        else{
          if(App.randomBoolean()&&App.randomBoolean())
            this.generateNode();
          this.delay=(App.randomRange(5,100)/1000)+this.delay-time;
        }
      }
    }
  }
  generateNode(){
    let heights=this.nodeHeights.slice();
    let y;
    while(true){
      if(this.blocks.length==0)
        y=App.randomElement(heights);
      else{
        let oriIdx=this.nodeHeights.indexOf(this.blocks[this.blocks.length-1].innerAnimator.y);
        let deltas=[0],delta;
        if(oriIdx>0){
          deltas.push(-1);
        }
        if(oriIdx<this.nodeHeights.length-1){
          deltas.push(1);
        }
        do{
          let idx=oriIdx;
          delta=App.randomElement(deltas);
          idx+=delta;
          y=this.nodeHeights[idx];
          if(!heights.includes(y)&&heights.length<2){
            return;
          }
        }
        while(!heights.includes(y));
      }
      //avoid blocks too near
      let exist=this.blocks.slice().reverse().filter(b=>{
        if(b.innerAnimator.percentage<10){
          if(b.innerAnimator.y===y){
            return true;
          }
        }
        return false;
      }).length>0;
      if(exist){
        heights.splice(heights.indexOf(y));
        if(heights.length==0){
          return;
        }
      }
      else{
        break;
      }
    }
    const node=App.random(75)<2?Elements.Bomb:Elements.MusicNode;
    let o=new node();
    //impart the classes into local
    const LinearAnimator2D=App.core.LinearAnimator2D;
    const Point2D=App.type.Point2D;
    o.animator=new App.core.KillableAnimator(
      new LinearAnimator2D(
        new Point2D(800,y), //start
        new Point2D(5,y), //target
        2)//dur
    );//base
    this.blocks.push(o);
    this._am.add(o.animator);
  }
};
App.WelcomeScene=class extends App.UIRenderer {
  constructor() {
    super();
    //create UI controls
    this._animatorFadeIn=new App.core.LinearAnimator1D(0,1,1);
    let creditDialog=new Elements.UI.DialogLayer(()=>{});
    creditDialog.beforeRender=function(ctx){
      /*this is a function hook called before the layer is drawn*/
      ctx.fillStyle=App.config.textColor.hex;
      ctx.font=App.asActualScaleFont(App.config.font);
      App.renderTextCentered(ctx,"Credits:",App.asActualScaleY(100));
      App.renderTextCentered(ctx,"Core Developer: Ngeo Jia Jun",App.asActualScaleY(150));
      App.renderTextCentered(ctx,"Advisor: Keoy Shon Tzu",App.asActualScaleY(180));
      App.renderTextCentered(ctx,"Multimedia Director: Chan Vern Yi",App.asActualScaleY(210));
      App.renderTextCentered(ctx,"Music from https://www.zapsplat.com",App.asActualScaleY(240));
      App.renderTextCentered(ctx,"Click anywhere to exit",App.asActualScaleY(450));
    };
    creditDialog.handleInputEvent=function(e){
      if(e?.type==="click"){
        this.hidden=true;
      }
      return true;
    }
    creditDialog.hidden=true;
    let endlessStart=new Elements.UI.Button(
      "Endless Mode",
      new App.type.Point2D(250,200),
      new App.type.Point2D(300,60),
      App.config.StartButtonColor,
      App.config.StartButtonBG
    );
    endlessStart.callback=()=>{
      App.switchRenderer(new App.EndlessModeGameScene())
      App.core.AudioManager.start();
    };
    endlessStart.fontScale=0.4;
    let musicStart=new Elements.UI.Button(
      "Music Mode",
      new App.type.Point2D(250,300),
      new App.type.Point2D(300,60),
      App.config.StartButtonColor,
      App.config.StartButtonBG
    )
    musicStart.callback=()=>{
      App.switchRenderer(new App.MusicModeMenuScreen())
      App.core.AudioManager.start();
    };
    musicStart.fontScale=0.4;
    let creditsButton=new Elements.UI.Button(
      "Credits",
      new App.type.Point2D(250,400),
      new App.type.Point2D(300,60),
      App.config.StartButtonColor,
      App.config.StartButtonBG
    )
    creditsButton.callback=()=>{
      creditDialog.hidden=false;
    };
    creditsButton.fontScale=0.4;
    this._renderer.controls.push(creditDialog);
    this._renderer.controls.push(endlessStart);
    this._renderer.controls.push(musicStart);
    this._renderer.controls.push(creditsButton);
    //load boot.json file
    App.runtime.bootstrapData=App.core.Resources.getOrThrow("bootstrap").object;
  }
  render(ctx){
    if(!this._animatorFadeIn.done){
      ctx.fillStyle="#000";
      ctx.fillRect(0,0,App.element.width,App.element.height);
    }
    ctx.globalAlpha=this._animatorFadeIn.current;
    ctx.fillStyle=App.config.background;
    ctx.fillRect(0,0,App.element.width,App.element.height);
    ctx.font=App.asActualScaleFont(App.config.font);
    ctx.fillStyle=App.config.textColor.hex;
    App.renderTextCentered(ctx,"Welcome to Music Rush",App.asActualScaleY(100));
    {
      ctx.font=App.asActualScaleFont(App.config.font,0.5);
      const text=`Built on: ${App.runtime.bootstrapData.build_stamp}`;
      let width=ctx.measureText(text).width;
      ctx.fillText(text,App.element.width-width,App.asActualScaleY(500));
    }
    App.UIRenderer.prototype.render.call(this,ctx);
  }
  update(time){
    if(!this._animatorFadeIn.done){
      this._animatorFadeIn.update(time);
    }
  }
};
App.GameOverScene=class extends App.UIRenderer {
  constructor() {
    super();
    this._am=new App.core.SyncedAnimationManager(this.clock);
    this._animatorFadeIn=new App.core.LinearAnimator1D(0,1,1);
    this._animatorRestartText=new App.core.FlipFlopAnimator1D(0,255,0.7);
    this._restartTextColor=App.config.flashingTextColor.clone();
    this._excitingPointAnimator=new App.core.LinearAnimator1D(0,App.runtime.excitingPts,1);
    this._am.add(this._animatorFadeIn);
    this._am.addAfter(this._animatorRestartText,this._animatorFadeIn);
    this._am.addAfter(this._excitingPointAnimator,this._animatorFadeIn);
    this._comment=App.config.levelConfig.excitingPtsThreshold[0];
    const excitingPtsMax=App.runtime.levelData.excitingPtsMax??App.config.levelConfig.excitingPtsMax;
    for(let pts of Object.keys(App.config.levelConfig.excitingPtsThreshold).reverse()){
      if(App.runtime.excitingPts/100*excitingPtsMax>=parseInt(pts)){
        this._comment=App.config.levelConfig.excitingPtsThreshold[pts];
        break;
      }
    }
    //add a progress bar control [exciting point]
    this.progressBar=new Elements.UI.ProgressBar(
      new App.type.Point2D(200,250),
      new App.type.Point2D(400,50)
    );
    this.progressBar.scale=excitingPtsMax;
    this.progressBar.progress=0;
    this._renderer.controls.push(this.progressBar);
    //check the score status with the database
    //this function returns true if the overwrite is done as it passes the test
    this.newHighScore=App.highScoreDatabase.setIf(App.runtime.levelData.key,App.runtime.score,(n,o)=>n>o);
  }
  render(ctx){
    if(!this._animatorFadeIn.done){
      ctx.fillStyle="#000";
      ctx.fillRect(0,0,App.element.width,App.element.height);
    }
    ctx.globalAlpha=this._animatorFadeIn.current;
    ctx.fillStyle=App.config.background;
    ctx.fillRect(0,0,App.element.width,App.element.height);
    ctx.font=App.asActualScaleFont(App.config.font);
    ctx.fillStyle=App.config.textColor.hex;
    App.renderTextCentered(ctx,"Gameover!",100);
    if(this.newHighScore)
      App.renderTextCentered(ctx,"New High Score:",150);
    else
      App.renderTextCentered(ctx,"Score:",150);
    App.renderTextCentered(ctx,`${App.runtime.score}${this.newHighScore?"":" (Highest:"+App.highScoreDatabase.get(App.runtime.levelData.key)+")"}`,App.asActualScaleY(200));
    if(this._excitingPointAnimator.done){
      App.renderTextCentered(ctx,this._comment,App.asActualScaleY(350))
    }
    ctx.fillStyle=this._restartTextColor.hex;
    App.renderTextCentered(ctx,"Click anywhere to return to menu",App.asActualScaleY(400))
    App.UIRenderer.prototype.render.call(this,ctx);
  }
  update(time){
    App.UIRenderer.prototype.update.call(this,time);
    this._am.update();
    if(this._animatorFadeIn.done){
      this._restartTextColor.a=Math.ceil(this._animatorRestartText.current);
      this.progressBar.progress=this._excitingPointAnimator.current;
    }
  }
  handleInputEvent(e){
    if(e.type=="click"){
      if(this._excitingPointAnimator.done)
        App.switchRenderer(new App.WelcomeScene());
      else
        this._excitingPointAnimator.update(200);
    }
  }
};
App.LoadingScreen=class extends App.Renderer{
  constructor(config=App.config.resources.initial,next){
      super();
      this.config=config;
      this.next=next;
      this.progressBar=new Elements.UI.ProgressBar(
        new App.type.Point2D(200,300),
        new App.type.Point2D(400,50)
      )
      this.processRequests();
  }
  render(ctx){
    ctx.fillStyle=App.config.background;
    ctx.fillRect(0,0,App.element.width,App.element.height);
    ctx.fillStyle=App.config.textColor.hex;
    ctx.font=App.asActualScaleFont(App.config.font);
    if(this.failed)
      App.renderTextCentered(ctx,"Error in loading.....",App.asActualScaleY(150));
    else{
      App.renderTextCentered(ctx,"Loading.....",App.asActualScaleY(150));
      this.progressBar.render(ctx);
    }
  }
  update(){
    if(this.completed){
      App.switchRenderer(this.next?this.next():new App.WelcomeScene());
      return;
    }
  }
  processRequests(){
    let {images,audio,json}=this.config;
    let promises=[];
    const self=this;
    const incCount=(function(){this.progressBar.progress++;}).bind(this);
    if(images){
      for(let key of Object.keys(images)){
        promises.push(App.core.Resources.loadImage(key,images[key]).then(incCount));
      }
    }
    if(audio){
      if(!App.core.AudioManager){
        console.error("Fatal error: 2d-animation-audio is not present");
      }
      else{
        for(let key of Object.keys(audio)){
          promises.push(App.core.Resources.loadAudio(key,audio[key]).then(incCount));
        }
      }
    }
    if(json){
      for(let key of Object.keys(json)){
        promises.push(App.core.Resources.loadJSON(key,json[key]).then(incCount));
      }
    }
    Promise.all(promises).then(()=>{self.completed=true;}).catch((e)=>{console.error(e);self.failed=true;});
    this.progressBar.scale=promises.length;
    this.progressBar.updateBar();
  }
};
App.MusicModeMenuScreen=class extends App.UIRenderer{
  constructor(){
    super();
    const self=this;
    this._animatorFadeIn=new App.core.LinearAnimator1D(0,1,1);
    //represent a single page
    this.page=class extends Elements.UI.Layer{
      constructor(data){
        super();
        let baseY=60;
        const baseX=20,size=new App.type.Point2D(390,60),stepY=90;
        //simply create a button for each song
        for(const entry of data){
          const controlToCreate=new Elements.UI.Button(
            entry.name,
            new App.type.Point2D(baseX,baseY),
            size,
            App.config.StartButtonColor,
            App.config.StartButtonBG
          );
          controlToCreate.fontScale=0.3;
          controlToCreate.data=entry;
          controlToCreate.callback=function(){
            self.showDetail(this.data);
          };
          this._renderer.controls.push(controlToCreate);
          baseY+=stepY;
        }
      }
    }
    //create a detail dialog for the level
    this.levelDialog=new Elements.UI.DialogLayer(function(self){
      //the UI renderer
      self.beforeRender=(ctx)=>{
        /*this is a function hook called before the layer is drawn*/
        ctx.fillStyle=App.config.textColor.hex;
        ctx.font=App.asActualScaleFont(App.config.font);
        //title on middle
        App.renderTextCentered(ctx,self.data?.name,App.asActualScaleY(150));
        App.renderTextCentered(ctx,`High Score:${App.highScoreDatabase.get(self.data?.key)??0}`,App.asActualScaleY(230));
      }
      //add button under the score
      const play=new Elements.UI.Button(
        "Play",
        new App.type.Point2D(200,300),
        new App.type.Point2D(100,50)
      );
      const exit=new Elements.UI.Button(
        "Exit",
        new App.type.Point2D(500,300),
        new App.type.Point2D(100,50)
      );
      play.fontScale=0.4;
      play.callback=()=>{
        const init=(function(data){
          return new App.MusicModeGameScreen(data);
        }).bind(null,self.data);
        let loader={json:{},audio:{}};
        loader.json[`${self.data.key}-map`]=`map/${self.data.key}-map.json`;
        loader.audio[`${self.data.key}-audio`]=`music/${self.data.key}-audio.flac`;
        App.switchRenderer(new App.LoadingScreen(loader,init));
      };
      exit.fontScale=0.4;
      exit.callback=()=>self.hidden=true; //hide the layer itself effectively close the dialog
      self._renderer.controls.push(exit);
      self._renderer.controls.push(play);
    });
    this._renderer.controls.push(this.levelDialog);
    //add an exit button
    const exit=new Elements.UI.Button(
      "Back",
      new App.type.Point2D(700,0),
      new App.type.Point2D(100,50),
      App.config.StartButtonColor,
      App.config.StartButtonBG
    );
    exit.fontScale=0.5;
    exit.callback=()=>{
      App.switchRenderer(new App.WelcomeScene());
    }
    this._renderer.controls.push(exit);
    //hold the pages
    this.pages=[];
    this.pageId=0;
    //create the pages based on the init data
    {
      const ref=App.runtime.bootstrapData.songs;
      for(let i=0;i<ref.length;i+=4){
        const page=new (this.page)(ref.slice(i,i+4));
        page.hidden=(i>0);
        this.pages.push(page);
        this._renderer.controls.push(page);
      }
    }
    if(this.pages.length>1){
      //add pager buttons
      this.backButton=new Elements.UI.Button(
        "<",
        new App.type.Point2D(20,400),
        new App.type.Point2D(175,60)
      );
      this.backButton.hidden=true;
      this.backButton.callback=this.updatePager.bind(this,"<");
      this.forwardButton=new Elements.UI.Button(
        ">",
        new App.type.Point2D(215,400),
        new App.type.Point2D(175,60)
      );
      this.forwardButton.callback=this.updatePager.bind(this,">");
      this._renderer.controls.push(this.forwardButton);
      this._renderer.controls.push(this.backButton);
    }
  }
  render(ctx){
    if(!this._animatorFadeIn.done){
      ctx.fillStyle="#000";
      ctx.fillRect(0,0,App.element.width,App.element.height);
    }
    ctx.globalAlpha=this._animatorFadeIn.current;
    ctx.font=App.asActualScaleFont(App.config.font);
    ctx.fillStyle=App.config.background;
    ctx.fillRect(0,0,App.element.width,App.element.height);
    ctx.fillStyle=App.config.textColor.hex;
    ctx.fillText(`Select a song to play`,App.asActualScaleX(10),App.asActualScaleY(30));
    App.UIRenderer.prototype.render.call(this,ctx);
  }
  update(time){
    if(!this._animatorFadeIn.done){
      this._animatorFadeIn.update(time);
    }
  }
  showDetail(data){
    //simply set the reference of the data and unhide it shall works
    this.levelDialog.data=data;
    this.levelDialog.hidden=false;
  }
  updatePager(dir){
    if(dir==">"){
      if(this.pageId+1<this.pages.length){
        this.pageId++;
      }
    }
    else{
      if(this.pageId-1>=0){
        this.pageId--;
      }
    }
    const self=this;
    this.pages.forEach((page,index)=>{
      if(index===self.pageId){
        page.hidden=false;
      }
      else{
        page.hidden=true;
      }
    });
    this.backButton.hidden=(this.pageId<=0);
    this.forwardButton.hidden=(this.pageId>=this.pages.length-1);
  }
}
App.MusicModeGameScreenBase=class extends App.GameSceneBase{
  constructor(initData){
    super(initData);
    if(!initData)throw "Empty init data";
    //here the initData is a JS object that have following properties at minimum
    //song:the key to the song in flac file
    const resolvedName=`${initData.key}-audio`;
    const self=this;
    this.inited=false;
    this.key=resolvedName;
    //ask the loader to load the data
    App.core.AudioManager.addAudioAsBGM(`music/${resolvedName}.flac`,resolvedName).then(()=>{
      //after loaded do two thing
      //reset the player
      App.core.Resources.getOrThrow(resolvedName).currentTime=0;
      //first overwrite the animation manager
      self._audioClock=App.core.AudioManager.getClockFromBGM(resolvedName);
      self._am=new App.core.SyncedAnimationManager(self._audioClock);
      self.timeRemaining=App.core.Resources.getOrThrow(resolvedName).duration;
      //second ask the engine to init it
      if(self.initNodesData){
        self.initNodesData();
      }
      //after this is done unlock the engine
      self.inited=true;
      App.core.AudioManager.playBGM(resolvedName,false,false /*already done*/);
    });
  }
  update(time/*ignored*/){
    //ignore this call when the engine is still initializing
    if(this.inited){
      //update the engine
      App.GameSceneBase.prototype.update.call(this,time)
    }
  }
  handleRendererTerminate(){
    App.core.AudioManager.stopBGM();
  }
  getTimeRamaining(){
    if(!this.inited){
      return 200;
    }
    else{
      const ref=self.timeRemaining=App.core.Resources.getOrThrow(this.key);
      return ref.duration-ref.currentTime;
    }
  }
}
//Music Mode game screen
//this class implements the required initNodesData() only
App.MusicModeGameScreen=class extends App.MusicModeGameScreenBase{
  constructor(initData){
    super(initData);
    //attempt to load nodes data
    this.nodesData=App.core.Resources.getOrThrow(`${initData.key}-map`).object;
  }
  initNodesData(){
    //this function need to import all the data into the [blocks] and [_am]
    //list so the engine know where are the nodes
    //all the nodes have duration of 2sec
    //so the starting time will be on pts-2
    if(!this.nodesData){
      throw "Data is missing";
    }
    const {nodeHeights}=this;
    this.nodesData.forEach(node=>{
      //node is object that contains following
      //type: 0: normal, 1:bomb
      //position: relative index inside the nodeHeights
      //time: the presentation time (pts)
      let {position,time}=node;
      time-=2; //the animation have duration of 2 sec
      const type=[Elements.MusicNode,Elements.Bomb][node.type];
      let o=new type(); //create the node
      o.animator=new App.core.KillableAnimator(
        new App.core.LinearAnimator2D(
          new App.type.Point2D(800,this.nodeHeights[position]), //start
          new App.type.Point2D(5,this.nodeHeights[position]), //target
          2)//dur
        );//base
        this._am.addOn(o.animator,time); //add the animator to the animator list
        this.blocks.push(o);//add the object onto the list
    })
  }
}
App.highScoreDatabase=new(class{
  constructor(){
    this.db={};
    try{
      this.storage=window.localStorage;
      const x = '__storage_test__';
      this.storage.setItem(x, x);
      this.storage.removeItem(x);
      this._enabled=true;
    }
    catch(e){
      this._enabled=false;
      alert("No localStorage support, high score will not be saved across the session");
    }
  }
  get(key){
    if(this.db[key]){
      return this.db[key];
    }
    else if(this._enabled&&this.storage.getItem(key)!=null){
      const result=this.storage.getItem(key);
      try{
        const obj=JSON.parse(result);
        this.db[key]=obj;
        return obj;
      }
      catch(e){
        return undefined;
      }
    }
    else{
      return undefined;
    }
  }
  set(key,value){
    this.db[key]=value;
    if(this._enabled){
      try{
        this.storage.setItem(key,JSON.stringify(value));
      }
      catch(e){
        console.error(e);
        alert("Failed to save the result")
      }
    }
  }
  setIf(key,value,operation){
    if(!operation)return false;
    else if(this.get(key)&&!operation(value,this.get(key))){
      return false;
    }
    else{
      this.set(key,value);
      return true;
    }
  }
})();
//export LoadingScreen as GameScene [entry point]
App.GameScene=App.LoadingScreen;
//Application runtime data
App.runtime={score:0,excitingPts:0};
//Application configuration data
App.config={
  background:"#87a858",
  font:"30px Verdana",
  textColor:new App.type.Color4V(255,255,255),
  progressBarColor:new App.type.Color4V(0xfc,0x96,0xff),
  progressBarBG:new App.type.Color4V(),
  buttonColor:new App.type.Color4V(0xfc,0x96,0xff),
  flashingTextColor:new App.type.Color4V(255,0,0,0),
  referenceSize: new App.type.Point2D(800,500),
  StartButtonColor:new App.type.Color4V(244, 149, 252),
  StartButtonBG:new App.type.Color4V(82, 2, 78),
  resources:{
    initial:{
      images:{
        "music-node":"./icons/music-node.png",
        "character":"./icons/character.png",
        "bomb":"./icons/bomb.png"
      },
      json:{
        "bootstrap":"./boot.json"
      },
      audio:{
        "node-hit":"./sfx/Blastwave_FX_BounceTympani_BW.59868.mp3",
        "bomb-hit":"./sfx/esm_8bit_explosion_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3"
      }
    }
  },
  levelConfig:{
    key:"endless_$$",
    excitingPtsMax:100,
    excitingPtsThreshold:{
      0:"Lame",
      20:"Noob",
      80:"Try harder",
      90:"So near yet so far",
      95:"Impressive!"
    }
  }
}
