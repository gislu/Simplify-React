/** @jsx h */

function h(nodetype, attr, ...children){
    return{nodetype, attr, children}
}

function createElement(node){
	if(typeof node === 'string'){
  	return document.createTextNode(node);
  }
  
	const $element1 = document.createElement(node.type);
  node.children.map(createElement)
  	.forEach($element1.appendChild.bind($element1));
    
  return $element1;
  
}

const list=(
  <ul class="list">
    <li>apple</li>
    <li>beer</li>
  </ul>
  );
  

//console.log(list)

const $root = document.getElementById('root');
$root.appendChild(createElement(list));