
function addEventHandler(target,type,func){ 
  if(target.addEventListener){ 
    target.addEventListener(type, func, false); 
  }else if(target.attachEvent){ 
    target.attachEvent("on" + type, func); 
  }else{ 
    target["on" + type] = func; 
  }  
} 

function removeEventHandler(target, type, func) { 
  if (target.removeEventListener){ 
    target.removeEventListener(type, func, false); 
  } else if (target.detachEvent){ 
    target.detachEvent("on" + type, func); 
  }else { 
    delete target["on" + type]; 
  } 
} 
