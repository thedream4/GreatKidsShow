<!--
Cartoon player component (rev 1)
Param:
data_key as base
-->
<template>
<div>
  <h1>This is {{baseData.title}} page</h1>
  <p>
    {{baseData.description}}
  </p>
</div>
</template>

<script>
//import cartoonData
import cartoonData from "../data/cartoon.json";
/*
*This resolves the named or index reference into its valid ref
*/
function quickResolve(v){
let res=cartoonData[v]!==undefined;
if(res){
   return v;
}
else{
  for(let i=0;i<cartoonData.length;i++){
    const d=cartoonData[i];
    if(d.title===v||d.id===v){
      return i;
    }
  }
  return -1;
}
}
export default {
  name: "CartoonPlayerComponent",
  data:function(){
    return {
      baseData:cartoonData[quickResolve(this.data_key)]
    }
  },
  props:{ //properties exported
    data_key:{ //title="<Str>"
      type:String,
      required:true, //mandatory
      validator:function(v){
        return quickResolve(v)>=0;
      }
    }
  }
};
</script>
