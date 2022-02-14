
let vData=[
  {
    "id": "PSOE",
    "num": "120",
    "perc": 34,
    "inArea": false,
  },
  {
    "id": "PP",
    "num": "88",
    "perc": 25,
    "inArea": false,
  },
  {
    "id": "Vox",
    "num": "52",
    "perc": 14,
    "inArea": false,
  },
  {
    "id": "UP",
    "num": "34",
    "perc": 9,
    "inArea": false,
  },
  {
    "id": "ERC",
    "num": "13",
    "perc": 3.7,
    "inArea": false,
  },
  {
    "id": "Cs",
    "num": "9",
    "perc": 2.5,
    "inArea": false,
  },
  {
    "id": "PNV",
    "num": "6",
    "perc": 1.7,
    "inArea": false,
  },
  {
    "id": "Bildu",
    "num": "5",
    "perc": 1.4,
    "inArea": false,
  },
  {
    "id": "Junts",
    "num": "4",
    "perc": 1.1,
    "inArea": false,
  },
  {
    "id": "Pdecat",
    "num": "4",
    "perc": 1.1,
    "inArea": false,
  },
  {
    "id": "CUP",
    "num": "2",
    "perc": 0.5,
    "inArea": false,
  },
  {
    "id": "MasP",
    "num": "2",
    "perc": 0.5,
    "inArea": false,
  },
  {
    "id": "UPN",
    "num": "2",
    "perc": 0.5,
    "inArea": false,
  },
  {
    "id": "Comp",
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
    "id": "Teruel",
    "num": "1",
    "perc": 0.2,
    "inArea": false,
  },
  {
    "id": "ForoA",
    "num": "1",
    "perc": 0.2,
    "inArea": false,
  },
  {
    "id": "PRC",
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
  {
    "id": "NC",
    "num": "1",
    "perc": 0.2,
    "inArea": false,
  },
  {
    "id": "noAds",
    "num": "1",
    "perc": 0.2,
    "inArea": false,
  },
  

];



let movedP;  // element being moved (id)

let yHeight = 0;
let nHeight = 0;

let yNum = 0;
let nNum = 0;

let partPerc;
  
let partNum;



window.onload = function() {

 
 
 };



// PROVA



// target elements with the "draggable" class
interact('.drag')
  .draggable({
    listeners: {
      start: mStart,  // función que se activa cuando arranca el movimiento
      move: dragMoveListener,
      //end: acaba, ---> función que se activa cuando arranca el movimiento (cuando sueltas ele elemento)
      
    }
  })

function mStart(event){
  movedP = event.target.id // id of element being moved
  console.log(movedP)
}

function dragMoveListener (event) {
    
  var target = event.target  // the element being moved

  
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx  // number of pixels the element is moving right (positive num) o left (neg num) from its original position
  //  x = la posición en el eje x (o en su defecto, cero) MÁS los píxels de movimiento horizontal que haya hecho el usuario al mover el elemento (esto es lo que indica event.dx)
 
 
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy  // same for height

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the position attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}






// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener


// DROPPING AREA

interact('.vCol').dropzone({
    accept: '.drag',
    ondragenter: adins,
    ondrop: activateBar,
    ondragleave: afora,

    
  });

function adins(event){

    dropZoneV = event.target;
    
    
    // console.log(event.relatedTarget.id
    //     + ' was dropped into '
    //     + event.target.id);

    $(dropZoneV).css("background-color", "rgb(157 149 149 / 30%)"); 

    
}

function activateBar(event){

  // movedP is the id of the element being moved
  
  let partPerc = vData.find(x => x.id === movedP).perc;
  
  let partNum = parseInt(vData.find(x => x.id === movedP).num);
  

  let usedP = vData.find(x => x.id === movedP);  // check if element has been moved to any column (true / false)
  usedP.inArea = true;

  

  if(event.target.id == "aye"){
    yHeight+=partPerc;
    $("#yBar .progress-bar").animate({
      height: `${yHeight}%`
    }, 2500);

    yNum+=partNum;
    $('#ayeNum').text(yNum);
    
  } else if(event.target.id == "nay"){
    nHeight+=partPerc;
    $("#nBar .progress-bar").animate({
      height: `${nHeight}%`
    }, 2500);

    nNum+=partNum;

    $('#nayNum').text(nNum);
  }

  
}


function afora(event){

  let partPerc = vData.find(x => x.id === movedP).perc;
  
  let partNum = parseInt(vData.find(x => x.id === movedP).num);

  console.log(yHeight)

  if(vData.find(x => x.id === movedP).inArea == true){
    console.log("ha estado en otra columna")
    if(event.target.id == "aye"){
      console.log("viene del sí")
      
      yHeight-=partPerc;
      
      $("#yBar .progress-bar").animate({
        height: `${yHeight}%`
      }, 2500);

      yNum-=partNum;
    $('#ayeNum').text(yNum);
} else if(event.target.id == "nay"){
      console.log("viene del no")
      

      nHeight-=partPerc;
      console.log(nHeight)
      
      $("#nBar .progress-bar").animate({
        height: `${nHeight}%` || 0
      }, 2500);

      nNum-=partNum;

    $('#nayNum').text(nNum);
    }
  }

  
}

