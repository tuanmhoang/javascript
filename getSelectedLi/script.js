function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

let ul = document.getElementById('my-list');
ul.onclick = function(event) {
    let target = getEventTarget(event);
    let li = target.closest('li'); // get reference
    let nodes = Array.from( li.closest('ul').children ); // get array
    let index = nodes.indexOf( li ); 
    alert(index);
};