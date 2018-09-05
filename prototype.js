/** @jsx h */

function h(nodetype, attr, ...children){
   return { type, props: props || {}, children };
}

function createElement(node){
  if(typeof node === 'string'){
    return document.createTextNode(node);
  }
  
  const $element1 = document.createElement(node.nodetype);
  node.children.map(createElement)
    .forEach($element1.appendChild.bind($element1));
    
  return $element1;
  
}

//diff
function change(nodeOld, nodeNew){
    return typeof nodeOld !== typeof nodeNew || 
        typeof nodeOld === 'string' & nodeOld !== nodeNew ||
           nodeOld.type !== nodeNew
}

//patch 
function patch($parent, nodeNew, nodeOld, index=0){
    if(!nodeOld){
      //need to add new node
      $parent.appendChild(createElement(nodeNew));
    }else if(!nodeNew){
      //need to remove old node since newnode is empty
      $parent.removeChild(
        $parent.childNodes[index]
        );
    }else if(change(nodeOld, nodeNew)){
        //compare 2 nodes
        $parent.replaceChild(
          createElement(nodeNew),
          $parent.childNodes[index]
        );
    }else if(nodeNew.type){
       //recursively process selfnode
       const newLength = nodeNew.children.length;
       const oldLength = nodeOld.children.length;
       for(let i = 0; i < newLength; i++){
           patch(
           $parent.childNodes[index],
           nodeNew.children[i],
           nodeOld.children[i],
           i
           );
       }
    }
}

const list=(
  <ul class="list">
    <li>1</li>
    <li>pen1</li>
    <li>pen2</li>
    <li>applepen</li>
  </ul>
  );
  
const listNew=(
  <ul class="list">
    <li>apple</li>
    <li>pen1</li>
  </ul>
  );
  
  
//console.log(list)

const $root = document.getElementById('root');
const reload = document.getElementById('reload');
reload.addEventListener('click',()=>{
    patch($root,listNew,list)
  });
//$root.appendChild(createElement(list));
patch($root,list);