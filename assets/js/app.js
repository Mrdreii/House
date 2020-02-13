document.addEventListener( 'keypress', onDocumentKeyPress, false );
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 5000 );

//link textures
let textureWindows = new THREE.TextureLoader().load( 'assets/textures/windows.jpg' );
let textureWindows1 = new THREE.TextureLoader().load( 'assets/textures/windows.jpg' );
let textureWindows2 = new THREE.TextureLoader().load( 'assets/textures/windows.jpg' );
let textureWalls = new THREE.TextureLoader().load( 'assets/textures/beige.png' );
let textureSky = new THREE.TextureLoader().load( 'assets/textures/sky.jpg' );
let textureFloor = new THREE.TextureLoader().load( 'assets/textures/tiles.jpeg' );
let textureRoof = new THREE.TextureLoader().load( 'assets/textures/roof.jpg' );
let textureRoofMain = new THREE.TextureLoader().load( 'assets/textures/roofmain.jpg' );
let textureLamp = new THREE.TextureLoader().load( 'assets/textures/lamp.jpg' );
let textureDresser = new THREE.TextureLoader().load( 'assets/textures/cabinet.jpg' );

//declare variable textures
let textWindows = new THREE.MeshBasicMaterial( { map: textureWindows } );
let textWindows1 = new THREE.MeshBasicMaterial( { map: textureWindows1 } );
let textWindows2 = new THREE.MeshBasicMaterial( { map: textureWindows2 } );
let textWalls = new THREE.MeshBasicMaterial( { map: textureWalls } );
let textSky = new THREE.MeshBasicMaterial( { map: textureSky } );
let textFloor = new THREE.MeshBasicMaterial( { map: textureFloor } );
let textRoof = new THREE.MeshBasicMaterial( { map: textureRoof } );
let textUpperFloor = new THREE.MeshBasicMaterial( { map: textureRoofMain } );
let textLamp = new THREE.MeshBasicMaterial( { map: textureLamp } );
let textDresser = new THREE.MeshBasicMaterial( { map: textureDresser } );

//initialize shapes
const geomBackground = new THREE.BoxBufferGeometry(2100, 900, 2);
const geomWindows = new THREE.BoxBufferGeometry(20, 30, 10);
const geomWindows1 = new THREE.BoxBufferGeometry(20, 30, 10);
const geomWindows2 = new THREE.BoxBufferGeometry(20, 30, 10);
const geomBuilding = new THREE.BoxBufferGeometry(200, 50, 50);
const geomPlane = new THREE.BoxBufferGeometry(1000, 10, 500);
const geomPillar = new THREE.CylinderBufferGeometry(20, 20, 70, 12);
const geomPillarRoof = new THREE.CylinderBufferGeometry(10, 30, 20, 12);
const geomUpperBuilding = new THREE.BoxBufferGeometry(200, 20, 20);
const geomLamp = new THREE.BoxBufferGeometry(20, 30, 10);
const geomDresser = new THREE.BoxBufferGeometry(20, 30, 10);

//declare variable shapes
let background = new THREE.Mesh(geomBackground, textSky);
let windows = new THREE.Mesh(geomWindows, textWindows);
let windows1 = new THREE.Mesh(geomWindows1, textWindows1);
let windows2 = new THREE.Mesh(geomWindows2, textWindows2);
let buildingMain = new THREE.Mesh(geomBuilding, textWalls);
let buildingUpper = new THREE.Mesh(geomUpperBuilding, textUpperFloor);
let floor =  new THREE.Mesh(geomPlane, textFloor);
let pillar3 = new THREE.Mesh(geomPillar, textWalls);
let roof1 = new THREE.Mesh(geomPillarRoof, textRoof);
let lamp = new THREE.Mesh(geomLamp, textLamp);
let dresser = new THREE.Mesh(geomDresser, textDresser);

//ADD SHAPES TO SCENE
scene.add(background, floor, windows, buildingMain, buildingUpper, windows1, windows2, roof1, lamp, dresser);

//ADD POSITIONS OF OBJECTS
background.position.set(0, 0, -1100);       
floor.position.set(0, -39, -300);    
buildingMain.position.set(-10, -22, -230);       
buildingUpper.position.set(0, 5, -300);      
windows.position.set(-123, 50, -220);  
windows1.position.set(-1, 48, -209);  
windows2.position.set(109, 48, -202);                                 
pillar3.position.set(10, -20, -300);
roof1.position.set(-221, 19, -293);   
lamp.position.set(-153, -11, -202);   
dresser.position.set(118, -12, -189); 
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//RENDER FUNCTION
function animate() {
   requestAnimationFrame( animate );
   renderer.render( scene, camera );
}
animate();
document.addEventListener( 'keypress', onDocumentKeyPress, false );
function printLocation(target){
   console.log(
      "Z: " + target.position.z +
      "\nX: " + target.position.x +
      "\nY " + target.position.y
   );
}
function moveObject(entity, Key){
   if (Key == 119){
      entity.position.z -= 1;
      printLocation(entity);
   }else if (Key == 115){
      entity.position.z += 1;
      printLocation(entity);
   }else if (Key == 97){
      entity.position.x -= 1;
      printLocation(entity);
   }else if (Key == 100){
      entity.position.x += 1;
      printLocation(entity);
   }else if (Key == 113){
      entity.position.y += 1;
      printLocation(entity);
   }else if (Key == 101){
      entity.position.y -= 1;
      printLocation(entity);
   }
}
function onDocumentKeyPress(event){
   var Object = dresser;  // put object name here to move it (change buildingMain)
   var keyCode = event.which;
   console.log(keyCode);
   moveObject(Object, keyCode);
}