
var VSHADER_SOURCE =`

precision mediump float;

  attribute vec4 a_Position;
  attribute vec2 a_UV; 
  varying vec2 v_UV; 
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix; 
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
   gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
   v_UV = a_UV; 
  
  }`

// Fragment shader program
var FSHADER_SOURCE =`


  precision mediump float;
  varying vec2 v_UV; 
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1; 
  uniform sampler2D u_Sampler2; 
  uniform sampler2D u_Sampler3; 
  uniform sampler2D u_Sampler4; 
  
  
  

  uniform int u_whichTexture; 
 
  void main() {

   if(u_whichTexture == -2){
      gl_FragColor = u_FragColor; 
    }

    else if(u_whichTexture == -1){
      gl_FragColor = vec4(v_UV, 02.0,1.0);
    }
   else if(u_whichTexture == 0){
   gl_FragColor = texture2D(u_Sampler0, v_UV);
}
  else if(u_whichTexture == 1){
   gl_FragColor = texture2D(u_Sampler1, v_UV)* (vec4(0.8,0.0,0.5,0.7));
}

 else if(u_whichTexture == 2){
   gl_FragColor = texture2D(u_Sampler2, v_UV);
}
    else if(u_whichTexture == 3){
   gl_FragColor = texture2D(u_Sampler3, v_UV) * (0.5 * vec4(0.9,0.6,0.0,1.0));
}
    else if(u_whichTexture == 4){
   gl_FragColor = texture2D(u_Sampler4, v_UV) * (0.5 * vec4(0.9,0.6,0.3,1.0));
}
 

    else{
    gl_FragColor = vec4(1.0, 0.2, 0.2, 1.0);
  }

  }`
let canvas;
let gl;
let a_Position;
let u_FragColor;
let a_UV; 
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_ViewMatrix; 
let u_ProjectionMatrix; 
let u_Sampler0; 
let u_Sampler1; 
let u_Sampler2; 
let u_Sampler3; 
let u_Sampler4;
let u_whichTexture; 


function setupWebGL(){
  canvas = document.getElementById('webgl');
  

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
 // initMouseControl();
  
}

function connectVariablesToGLSL(){

   // Initialize shaders
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if(a_UV < 0){
    console.log('Failed to get storage location of a_UV');
  }
  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }


  u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  if(!u_ModelMatrix){
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;

  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotateMatrix");
  if(!u_GlobalRotateMatrix){
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;

  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
  if(!u_ViewMatrix){
    console.log("Failed to get storage location of u_ViewMatrix");
    return; 
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, "u_ProjectionMatrix");
    if(!u_ProjectionMatrix){
      console.log("Failed to get storage location of u_ProjectionMatrix");
    }
  
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }
  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
   if (!u_Sampler1) {
     console.log('Failed to get the storage location of u_Sampler1');
     return false;
   }
   u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
   if (!u_Sampler2) {
     console.log('Failed to get the storage location of u_Sampler2');
     return false;
   }

   u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
   if (!u_Sampler3) {
     console.log('Failed to get the storage location of u_Sampler3');
     return false;
   }

   u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
   if (!u_Sampler4) {
     console.log('Failed to get the storage location of u_Sampler4');
     return false;
   }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
      console.error('Failed to get uniform location for u_whichTexture');
      return false;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}


//problem is in here 


function initTextures() {

  
  var sky_image = new Image();
  var red_grid = new Image();
  var building = new Image(); 
  var palm = new Image(); 
  var wave = new Image(); 

   if (!sky_image || !red_grid || !building || !palm || !wave) {
     console.log('Failed to create image objects');
     return false;
   }
  

 //if(u_whichTexture == 0){
   sky_image.onload = function() { sendIMGtoText0(sky_image); };
   sky_image.src = 'vp_sky.png';
 //
  
  //if (u_whichTexture == 1) {
      red_grid.onload = function() { sendIMGtoText1(red_grid); };
      red_grid.src = 'cropped_grid.png';
  // }
  
  building.onload = function(){sendIMGtoText2(building);};
  building.src = 'building.png';

  palm.onload = function(){sendIMGtoText3(palm);};
  palm.src = 'palm.png';

  wave.onload = function(){sendIMGtoText4(wave);};
  wave.src = 'wave.png';



return true;
}


function sendIMGtoText0(image) {

  var texture = gl.createTexture();

  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }


  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // flip the image's y axis
  // enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);


  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  
  gl.uniform1i(u_Sampler0, 0);
  
//  gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

 // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}
function sendIMGtoText1(image) {
  var texture = gl.createTexture();   
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

  gl.activeTexture(gl.TEXTURE1);

  gl.bindTexture(gl.TEXTURE_2D, texture);

  
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  gl.uniform1i(u_Sampler1, 1);
}

function sendIMGtoText2(image) {
  var texture = gl.createTexture();   
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

  gl.activeTexture(gl.TEXTURE2);

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  gl.uniform1i(u_Sampler2, 2);
}

function sendIMGtoText3(image) {
  var texture = gl.createTexture();   
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

  gl.activeTexture(gl.TEXTURE3);

  gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  gl.uniform1i(u_Sampler3, 3);
}


function sendIMGtoText4(image) {
  var texture = gl.createTexture();   
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

  gl.activeTexture(gl.TEXTURE4);

  gl.bindTexture(gl.TEXTURE_2D, texture);


  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  gl.uniform1i(u_Sampler4, 4);
}


//citation: https://math.hws.edu/eck/cs424/notes2013/webgl/cube-with-rotator.html


let isDragging = false;
let lastX = 0;

//initilizing rotation with mouse control 
function initMouseControl() {
  canvas.onmousedown = (ev) => {
      isDragging = true;
      lastX = ev.clientX;
      
  };

  canvas.onmouseup = () => {
      isDragging = false;
  };

  canvas.onmouseleave = () => {
      isDragging = false;
  };

  canvas.onmousemove = (ev) => {
   //  if (!isDragging) return;

      let deltaX = ev.clientX - lastX;
      lastX = ev.clientX;

      //normalize rotationm something is still a little glitchy
      g_globalAngle = (g_globalAngle + deltaX * 0.5) % 360;

      requestAnimationFrame(renderAllShapes);
  };
}
function updateRotationFromSlider(sliderValue) {
  g_globalAngle = parseFloat(sliderValue) % 360;
  if (g_globalAngle < 0) g_globalAngle += 360;
  lastAngle = g_globalAngle; 
  requestAnimationFrame(renderAllShapes);
}




//tick animation function 

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime; 

function tick(){

  g_seconds = performance.now()/1000.0 - g_startTime; 
  console.log(performance.now());

  //updateAnimationAngle();

  renderAllShapes();

  requestAnimationFrame(tick);

}





var g_shapesList = [];


function conversion(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return[x,y];
}

function updateAnimationAngle(){
  if(g_animate){
    g_globalHead = (20*Math.sin(g_seconds));
  g_globalTail2 = (-10*Math.sin(g_seconds)); 
  g_globalLeg = (20*Math.sin(g_seconds));
  }

}

//buildings

var p_map = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,1,0],
  [0,0,0,0,0,0,0,0],
  [0,1,0,1,0,1,0,1],
  [0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1],




  
  
  
];
var g_map = [
  
  [0,0,0,0,0,0,0,0],
  [1,0,1,0,0,0,1,1],
  [0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [1,0,1,0,0,1,0,1],
  [0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1],
  
  [0,0,0,0,1,0,1,1],
  
  
  
  
  
  
  
  ];


  


// var g_eye = [0,0,6];
// var g_at = [-10,0,-1];
// var g_up = [0,1,0];
let camera;
let g_globalMove = 0; 
let g_globalMoveL = 0;
let g_globalTurn = 0; 

//add blocks 

let g_found = 0; 

  

function renderAllShapes() {
  
  
var startTime = performance.now();
//var projMat = new Matrix4();
//projMat.setPerspective(90,canvas.width/canvas.height, 0.1, 30);
gl.uniformMatrix4fv(u_ProjectionMatrix, false, camera.projectionMatrix.elements);

//var viewMat = new Matrix4();
//viewMat.setLookAt(g_eye[0], g_eye[1], g_eye[2], g_at[0],g_at[1],g_at[2], g_up[0], g_up[1], g_up[2]);

gl.uniformMatrix4fv(u_ViewMatrix, false, camera.viewMatrix.elements)
// gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);


var globalRotMatrix = new Matrix4().rotate(g_globalAngle,0,1,0);
gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMatrix.elements);

 
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//  gl.clear(gl.COLOR_BUFFER_BIT);




//dino head 
var head = new Cube();

if(g_found == 0){
head.textureNumber = -1;
}
if(g_found != 0){
  head.textureNumber = 4; 
}
if(g_found == 1){
  sendTextToHTML("whoops you turned garfield into soundwaves, now he is stuck in this world forever, this is irreversible.", "status");
  }

head.matrix.translate(0.1, 0.2, 0.2);
head.matrix.translate(0, 0,g_globalMove);
head.matrix.translate(g_globalMoveL,0,0);
head.matrix.rotate(0,0,0,1);
head.matrix.rotate(g_globalHead, 0 , 0, 1); 
//head.matrix.rotate(g_globalTurn % 90,0,1,0);

//copy for other elements of face
var head_mat = new Matrix4(head.matrix); 
var head_mat2 = new Matrix4(head.matrix); 
var mouth_mat = new Matrix4(head.matrix);
var eye_mat1 = new Matrix4(head.matrix); 
var eye_mat2 = new Matrix4(head.matrix); 


head.matrix.scale(0.4, 0.3, 0.2);


 
head.renderfast();


//head spikes 
var head_spike1 = new Pyramid();
head_spike1.color = [0.8, 0.4, 1.0, 1.0];  
head_spike1.matrix = new Matrix4(head_mat); 
head_spike1.matrix.translate(0.2, 0.3, 0); 
head_spike1.matrix.rotate(0, 0, 1, 0); 

head_spike1.matrix.scale(0.05, 0.1, 0.1);

head_spike1.render();

var head_spike2 = new Pyramid();
head_spike2.color = [0.8, 0.4, 1.0, 1.0];  

;  


head_spike2.matrix = new Matrix4(head_mat2); 
head_spike2.matrix.translate(0.1, 0.3, 0); 
head_spike2.matrix.rotate(0, 0, 1, 0);
head_spike2.matrix.scale(0.05, 0.1, 0.1);
head_spike2.render();


//mouth 

var mouth = new Cube();
if(g_found == 0){
  mouth.textureNumber = -1;
  }
  if(g_found != 0){
    mouth.textureNumber = 4; 
  }
mouth.color = [0.0,0.0,0.0,1.0];
mouth.matrix = new Matrix4(mouth_mat);
mouth.matrix.translate(0.23,0.05, -0.04);
mouth.matrix.rotate(0,1,0,0);
mouth.matrix.scale(0.20,0.019,0.25);
mouth.render();



//eyes


var pupil_1 = new Cylinder();
if(g_found == 0){
  pupil_1.textureNumber = -1;
  }
  if(g_found != 0){
    pupil_1.textureNumber = 4; 
  }
pupil_1.color = [0.0, 0.0, 0.0, 1.0];
pupil_1.matrix = new Matrix4(eye_mat1);
pupil_1.matrix.translate(0.1, 0.2, 0.0);
pupil_1.matrix.rotate(90, 1, 0,0);  
pupil_1.matrix.scale(0.04, 0.02, 0.04);
pupil_1.render();

var pupil_2 = new Cylinder();
if(g_found == 0){
  head.textureNumber = -1;
  }
  if(g_found != 0){
    head.textureNumber = 4; 
  }
pupil_2.color = [0.0, 0.0, 0.0, 1.0];
pupil_2.matrix = new Matrix4(eye_mat2);
pupil_2.matrix.translate(0.1, 0.2, 0.2);

pupil_2.matrix.rotate(90, 1, 0,0);  
pupil_2.matrix.scale(0.04, 0.02, 0.04);
pupil_2.render();


//body and neck

var body = new Cube();
if(g_found == 0){
  body.textureNumber = -1;
  }
  if(g_found != 0){
    body.textureNumber = 4; 
  }


body.matrix.translate(-0.50,-0.5,0.0);
body.matrix.translate(0, 0, g_globalMove);
body.matrix.translate(g_globalMoveL,0,0);
body.matrix.rotate(0,1,0,0);
//body.matrix.rotate(g_globalTurn % 90,0,1,0);
body.matrix.scale(0.8,0.4,0.6);
body.renderfast();



var neck = new Cube();
if(g_found == 0){
  neck.textureNumber = -1;
  }
  if(g_found != 0){
    neck.textureNumber = 4; 
  }
neck.color = [0.0,1.0,0.6,1.0];
neck.matrix.translate(0.15,-0.2,0.2);
neck.matrix.translate(0, 0,g_globalMove);
neck.matrix.translate(g_globalMoveL,0,0);
neck.matrix.rotate(0,1,0,0);
//neck.matrix.rotate(g_globalTurn % 90,0,1,0);
neck.matrix.scale(0.12,0.4,0.15);
neck.renderfast();

var sky =  new Cube();
sky.color = [1.0,0.0,0.0,1.0];
sky.textureNumber = 0; 
sky.matrix.scale(15,15,15);;
sky.matrix.translate(-0.5, -0.5, -0.5);
sky.renderfast(); 




var floor =  new Cube();
floor.color = [1.0,0.0,0.0,1.0];
floor.textureNumber = 1; 
floor.matrix.translate(0.0, -0.75, 0.0);
floor.matrix.scale(15,0,15);
floor.matrix.translate(-0.5, 0, -0.5);
floor.render(); 

//tail stuff 
var tail = new Cube();
if(g_found == 0){
  tail.textureNumber = -1;
  }
  if(g_found != 0){
    tail.textureNumber = 4; 
  }
tail.color = [0.0,1.0,0.4,1.0];
tail.matrix.setIdentity();
tail.matrix.translate(-0.8,-0.2,0.2);
tail.matrix.translate(0, 0, g_globalMove);
tail.matrix.translate(g_globalMoveL,0,0);
tail.matrix.rotate(g_globalTail, 0, 0, 1); 
tail.matrix.rotate(90,1,0,0); 
tail.matrix.rotate(0,0,1,0);
//tail.matrix.rotate(-g_globalTurn % 90,0,0,1);
var new_tail = new Matrix4(tail.matrix);
//var new_tail_spike = new Matrix4(tail.matrix);
tail.matrix.scale(0.42,0.2,0.12);
tail.renderfast();

var tail2 = new Cube();
if(g_found == 0){
  tail2.textureNumber = -1;
  }
  if(g_found != 0){
  tail2.textureNumber = 4; 
  }
tail2.color = [0.0, 1.0, 0.4, 1.0];
tail2.matrix = new Matrix4(new_tail);
tail2.matrix.translate(0.0, 0.0, 0.09);
tail2.matrix.translate(0, 0, 0);
tail2.matrix.rotate(-275, 0, 1, 0);
tail2.matrix.rotate(g_globalTail2, 0, 1, 0);
//tail2.matrix.rotate(1,0,g_globalTurn % 90,0);

var new_tail2 = new Matrix4(tail2.matrix);
tail2.matrix.scale(0.4, 0.2, 0.1);
tail2.render();




//legs
//make one back and one front move the same
//one back and one front move oppositie so 
//it looks like it is walking 

var back_leg1 = new Cylinder();
if(g_found == 0){
  head.textureNumber = -1;
  }
  if(g_found != 0){
    head.textureNumber = 4; 
  }
back_leg1.color = [0.0, 0.6, 0.2, 1.0];
back_leg1.matrix.translate(-0.35, -0.55, 0.1);
back_leg1.matrix.translate(0, 0,g_globalMove);
back_leg1.matrix.translate(g_globalMoveL,0,0);
back_leg1.matrix.rotate(g_globalLeg, 0, 0, 1); 
back_leg1.matrix.scale(0.15, 0.3, 0.1); 
back_leg1.render(); 



var back_leg2 = new Cylinder();
if(g_found == 0){
  head.textureNumber = -1;
  }
  if(g_found != 0){
    head.textureNumber = 4; 
  }
back_leg2.color = [0.0, 0.3, 0.2, 1.0];
back_leg2.matrix.setTranslate(-0.35, -0.55, 0.5);
back_leg2.matrix.translate(0, 0,g_globalMove);
back_leg2.matrix.translate(g_globalMoveL,0,0);
back_leg2.matrix.rotate(-g_globalLeg, 0, 0,1);  
back_leg2.matrix.scale(0.15, 0.3, 0.1);
back_leg2.render();



var front_leg1 = new Cylinder();
if(g_found == 0){
head.textureNumber = -1;
}
if(g_found != 0){
  head.textureNumber = 4; 
}
front_leg1.color = [0.0, 0.6, 0.2, 1.0];
front_leg1.matrix.setTranslate(0.1, -0.55, 0.1);
front_leg1.matrix.translate(0, 0,g_globalMove);
front_leg1.matrix.translate(g_globalMoveL,0,0);
front_leg1.matrix.rotate(-g_globalLeg, 0,0);  
front_leg1.matrix.scale(0.15, 0.3, 0.1);
front_leg1.render();


var front_leg2 = new Cylinder();
if(g_found == 0){
  head.textureNumber = -1;
  }
  if(g_found != 0){
    head.textureNumber = 4; 
  }
front_leg2.color = [0.0, 0.3, 0.2, 1.0];
front_leg2.matrix.setTranslate(0.1, -0.55, 0.5);
front_leg2.matrix.translate(0, 0,g_globalMove);
front_leg2.matrix.translate(g_globalMoveL,0,0);
front_leg2.matrix.rotate(g_globalLeg, 0, 0,1); 
front_leg2.matrix.scale(0.15, 0.3, 0.1);
front_leg2.render();




// half of the buildings are 5 blocks tall  
//so 8 x 8 x 5 = 320 blocks 
for(x = 0; x < 10; x++){
  for(y = 0; y < 10; y++){
    if(g_map[x][y] == 1){
      for(z = 0; z < 5; z++){
        var cube = new Cube();
        cube.color = [1.0,1.0,1.0,1.0];
        cube.textureNumber = 2;
        //+ 0.8 each time 
        var height = -0.8 + (z * 0.8);
        cube.matrix.setTranslate(x-2, height, y-4);
        cube.renderfast();
        
        
      }
    }
  }
}
//half of building 6 blocks tall 
for(x = 0; x < 8; x++){
  for(y = 0; y < 8; y++){
    if(g_map[x][y] == 1){
      for(z = 0; z < 6; z++){
        var build2 = new Cube();
        build2.color = [1.0,1.0,1.0,1.0];
        build2.textureNumber = 2;
        //+ 0.8 each time 
        var height = -0.8 + (z * 0.8);
        build2.matrix.setTranslate(x - 7, height, y-5);
        build2.renderfast();
        
        
      }
    }
  }
}


for(i = 0; i < 2; i++){

for(x = 0; x < 8; x++){
  for(y = 0; y< 8; y++){

    if(g_map[x][y] == 1){

      var palm_tree = new Cube(); 
      palm_tree.color = [1.0,1.0,1.0,1.0];
      palm_tree.textureNumber = 3; 
      palm_tree.matrix.setTranslate(x-8, -0.8, y-5);
      palm_tree.matrix.scale(0.75,0.75,0.75);
      palm_tree.renderfast();
    }
  }
}
}
for(i = 0; i < 2; i++){

  for(x = 0; x < 8; x++){
    for(y = 0; y< 8; y++){
  
      if(g_map[x][y] == 1){
  
        var palm_tree2 = new Cube(); 
        palm_tree2.color = [1.0,1.0,1.0,1.0];
        palm_tree2.textureNumber = 3; 
        palm_tree2.matrix.setTranslate(x-3, -0.8, y-8);
        palm_tree2.matrix.scale(0.75,0.75,0.75);
        palm_tree2.renderfast();
      }
    }
  }
  }

for(x = 0; x < 8; x++){
  for(y = 0; y< 8; y++){

    if(g_map[x][y] == 1){

      var wave = new Cube(); 
      wave.color = [1.0,1.0,1.0,1.0];
      wave.textureNumber = 4; 
      //semi-random looking placement
      wave.matrix.setTranslate(x - 6.5, 3.8, y-7);
      wave.matrix.scale(1.0,1.0,1.0);
      wave.renderfast();
    }
  }
}
for(x = 0; x < 8; x++){
  for(y = 0; y< 8; y++){

    if(g_map[x][y] == 1){

      var wave2 = new Cube(); 
      wave2.color = [1.0,1.0,1.0,1.0];
      wave2.textureNumber = 4; 
     
      wave2.matrix.setTranslate(x - 2, 4.5, y-3);
      wave2.matrix.scale(1.0,1.0,1.0);
      wave2.renderfast();
    }
  }
}
for(x = 0; x < 8; x++){
  for(y = 0; y< 8; y++){

    if(g_map[x][y] == 1){

      var wave1 = new Cube(); 
      wave1.color = [1.0,1.0,1.0,1.0];
      wave1.textureNumber = 4; 
      wave1.matrix.setTranslate(x - 7, 2.0, y-10);
      wave1.matrix.scale(0.75,0.75,0.75);
      wave1.renderfast();
    }
  }
}


var duration = performance.now() - startTime;
sendTextToHTML("ms: " + Math.floor(duration) + "  fps: " + Math.floor(10000/duration)/10, "numbd")



;




}

function sendTextToHTML(text, htmlId){

var HTMLelm = document.getElementById(htmlId);

if(!HTMLelm){
  console.log("Failed to get" +htmlId);
  return;
}

HTMLelm.innerHTML = text;
}

let g_globalAngle = 0;
let g_globalLeg = 0;

let g_globalTail = 0; 
let g_globalTail2 = 0; 
let g_globalTail3 = 0; 
let g_globalHead = 0; 
let g_animate = false; 

function userInterface(){

  //document.getElementById("camera_slide").addEventListener('mousemove', function() {g_globalAngle = this.value; renderAllShapes();});
 // document.getElementById("join2_slide").addEventListener('mousemove', function() {g_globalJoin2 = this.value; renderAllShapes();});
 


document.getElementById("button").onclick = function(){g_found = 1;};



}

function keydown(ev){


  //a
  if(ev.keyCode == 65){

    camera.moveLeft();
  }
  //d
  if(ev.keyCode == 68){
    camera.moveRight(); 
  }
  //w
  if(ev.keyCode == 87){
    camera.moveForward();
  }

  //s
 if(ev.keyCode == 83){
    camera.moveBackward();
  }

  //q

  if(ev.keyCode == 81){

    camera.panLeft(); 
  }

  //e
  if(ev.keyCode == 69){

    camera.panRight();
  }


  //forward and backward
  //up
if(ev.keyCode == 38){
    g_globalMove -= 0.1; 
  }
  //down
  if(ev.keyCode == 40){
    g_globalMove += 0.1; 
  }

  //l
  if(ev.keyCode == 37){
    g_globalMoveL -= 0.1; 
  }
  //r
  if(ev.keyCode == 39){
    g_globalMoveL += 0.1; 
  }
  // else if(ev.keyCode == 37){

  //   g_globalTurn += 10; 

  // }
  // else if(ev.keyCode == 39){

  //   g_globalTurn -= 10; 

  // }



  renderAllShapes();
  console.log(ev.keyCode);

}



function main() {
  // Initialize WebGL and shaders
  setupWebGL();
  connectVariablesToGLSL();
  userInterface();



  
  initTextures();
  //too glitvhy 
  //initMouseControl();
  camera = new Camera(canvas.width/canvas.height, 0, 1000);
  document.onkeydown = keydown;
//  camera.eye = new Vector3([0, 0, 2]);
//  camera.at = new Vector3([0, 0, -1]);
  //camera.updateViewMatrix();
  renderAllShapes(); 


  //drawWalter(); 

  // Set up event handlers
  // canvas.onmousedown = click;
  // canvas.onmousemove = function (ev) {
  //   if (ev.buttons === 1) {
  //     click(ev);
  //   }
  // };

  gl.clearColor(0.0,0.0,0.0,1.0);
 // renderAllShapes();

 requestAnimationFrame(tick);
}
