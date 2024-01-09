
const vData=[
  {
    "id": "PP",
    "num": "137",
    "perc": 39,
    "inArea": false,
  },
  {
    "id": "PSOE",
    "num": "121",
    "perc": 34,
    "inArea": false,
  },
  {
    "id": "Vox",
    "num": "33",
    "perc": 9,
    "inArea": false,
  },
  {
    "id": "Sumar",
    "num": "26",
    "perc": 7,
    "inArea": false,
  },
  {
    "id": "ERC",
    "num": "7",
    "perc": 2,
    "inArea": false,
  },
  {
    "id": "Junts",
    "num": "7",
    "perc": 2,
    "inArea": false,
  },
  {
    "id": "Bildu",
    "num": "6",
    "perc": 1.7,
    "inArea": false,
  },
  {
    "id": "PNV",
    "num": "5",
    "perc": 1.4,
    "inArea": false,
  },
  {
    "id": "Podemos",
    "num": "5",
    "perc": 1.4,
    "inArea": false,
  },
  {
    "id": "UPN",
    "num": "1",
    "perc": 0.2,
    "inArea": false,
  },
  {
    "id": "BNG",
    "num": "1",
    "perc": 0.2,
    "inArea": false,
  },
  {
    "id": "CC",
    "num": "1",
    "perc": 0.2,
    "inArea": false,
  },

  

];



let movedP;  // element being moved (id)

let yCol = [];
let nCol = [];

let yHeight = 0;
let nHeight = 0;

let yNum = 0;
let nNum = 0;


window.onload = function() {


interact('.drag')
  .draggable({
    listeners: {
      start: mStart,  
      move: dragMoveListener,
      end: mEnd, 
      
    }
  })

  

function mStart(event){
  movedP = event.target.id // id of element being moved
}

function dragMoveListener (event) {
    
  var target = event.target  // the element being moved

  
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx  // number of pixels the element is moving right (positive num) o left (neg num) from its original position
  //  x = la posición en el eje x (o en su defecto, cero) MÁS los píxels de movimiento horizontal que haya hecho el usuario al mover el elemento (esto es lo que indica event.dx)
 
 
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy 

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the position attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

function mEnd(event){

  let target = event.target;

  // return element to its original position
  if (!event.dropzone){  //if element is not on dropzone area
    
    target.style.transform = 'translate(0px, 0px)';

  // update the position attributes
    target.setAttribute('data-x', 0)
    target.setAttribute('data-y', 0)
    
  }
}



window.dragMoveListener = dragMoveListener


// DROPPING AREA

interact('.vCol').dropzone({
    accept: '.drag',
    ondragenter: elmIn,
    ondrop: elDropped,
    ondragleave: elmOut,

    
  });

function elmIn(event){

    dropZoneV = event.target;

    $(dropZoneV).css("background-color", "rgb(157 149 149 / 30%)"); 
    
}


function elDropped(event){

    let pId = event.relatedTarget.id

    let colName = event.target.id


    let usedP = vData.find(x => x.id === movedP);  // check if element has been moved to any column (true / false)

    if(!usedP.inArea){
      usedP.inArea = true;
    
      addV(pId,colName);
  } 
  
}



function elmOut(event){

  let pId = event.relatedTarget.id  //ID of party

  let colName = event.target.id  // ID of dropzone

  let usedP = vData.find(x => x.id === movedP); 

    if(usedP.inArea){
      usedP.inArea = false;
      
  }

    subsV(pId,colName);   
  
}



// ADD - SUBTRACT

function addV(id,col){

  let partPerc = vData.find(x => x.id === id).perc;
  
  let partNum = parseInt(vData.find(x => x.id === id).num);

  if(col == "aye"){
    yCol.push(id);
    calcHeightVotes(col);
  }else if(col == "nay"){
    nCol.push(id);
    calcHeightVotes(col);
  }


}



function subsV(id,col){
  
  if(yCol.length > 0 && col == "aye"){
    let indexY = yCol.indexOf(id);
    if (indexY > -1) {
      yCol.splice(indexY, 1); 
      calcHeightVotes(col);
    }   
  }else if(nCol.length > 0 && col == "nay"){
    let indexN = nCol.indexOf(id);
    if (indexN > -1) {
      nCol.splice(indexN, 1); 
      calcHeightVotes(col);
    }  
    
  }


}




/* CALCULATE BAR HEIGHT AND VOTES  */

function calcHeightVotes(col){

  let sumPercY = 0;
  let sumPercN = 0;

  let sumNumY = 0;
  let sumNumN = 0;


  for(var i = 0; i<yCol.length; i++){
    sumPercY+= vData.find(x => x.id === yCol[i]).perc;
  }

  $("#yBar .progress-bar").animate({
          height: `${sumPercY}%`
         }, 1000);


  for(var i = 0; i<nCol.length; i++){
    sumPercN+= vData.find(x => x.id === nCol[i]).perc;
  }
      
  $("#nBar .progress-bar").animate({
          height: `${sumPercN}%`
      }, 1000);



  // NUM OF VOTES

  for(var i = 0; i<yCol.length; i++){
    sumNumY+= parseInt(vData.find(x => x.id === yCol[i]).num);
  }

  $('#ayeNum').text(sumNumY)

  for(var i = 0; i<nCol.length; i++){
    sumNumN+= parseInt(vData.find(x => x.id === nCol[i]).num);
  }

  $('#nayNum').text(sumNumN);

  
 
   


}







};





