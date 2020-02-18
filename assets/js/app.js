
   let scene, camera, renderer, mesh;
   let meshFloor, ambientLight, light, controls;

   let keyboard = {};
   let player = { 
      height:5, 
      speed:0.23, 
      turnSpeed:Math.PI*0.12 };
   let USE_WIREFRAME = false;

   function init(){
   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera(100, 1366/768, 0.1, 1000);

   let spotLight = new THREE.SpotLight( 0xFFFFFF, 1.7);
   spotLight.position.set( 7, 200, 30 );
   spotLight.target.position.set( 10, -350, -55 );
   spotLight.castShadow = true;
   spotLight.position.z = 1650;
   spotLight.position.x = 350;
   scene.add( spotLight.target );
   scene.add( spotLight );

   //PROPERTIES FOR SHADOWS AND THE SPOTLIGHTS
   spotLight.shadow.mapSize.width = 350; // default
   spotLight.shadow.mapSize.height = 212; // default
   spotLight.shadow.camera.near = 0.5; // default
   spotLight.shadow.camera.far = 1500; // default


   //SKY GEOMETRY
   let CloudsMaterialArray = [];
   for (var i = 0; i < 6; i++)
    CloudsMaterialArray.push( new THREE.MeshBasicMaterial({
     map: new THREE.TextureLoader().load('assets/textures/Clouds.jpg'),
     side: THREE.BackSide
    }));
    let CloudsGeometry = new THREE.CubeGeometry( 950,900, 1000 );
    let CloudsMaterial = new THREE.MeshFaceMaterial( CloudsMaterialArray );
    let CloudsBox = new THREE.Mesh(CloudsGeometry, CloudsMaterial);
    scene.add(CloudsBox);

   //ROOF
   const RoofGeometry = new THREE.PlaneGeometry(10, 10, 8);
   let RoofTexture = new THREE.TextureLoader().load('assets/textures/floor.jpg');
   let RoofMaterial = new THREE.MeshPhongMaterial({map: RoofTexture, wireframe:USE_WIREFRAME, shininess: 100, opacity: 1.1, 
   transparent: true, 
   side: THREE.DoubleSide, 
   depthWrite: true});

   let RoofMesh = new THREE.Mesh(RoofGeometry,RoofMaterial);
   RoofMesh.rotation.x -= Math.PI / 1.97;
   RoofMesh.position.x = 0;
   RoofMesh.position.z = -5;
   RoofMesh.position.y = 7.3;
   RoofMesh.receiveShadow = true;
   RoofMesh.castShadow = true;
   scene.add(RoofMesh);
    
   //GRASS TEXTURES
   const grassGeometry = new THREE.BoxGeometry(120,0.3,213);
   let grassTexture = new THREE.TextureLoader().load('assets/textures/grass.jpg');
   let grassMaterial = new THREE.MeshPhongMaterial({map: grassTexture, wireframe:USE_WIREFRAME, opacity: 1, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   grassTexture.wrapS = THREE.RepeatWrapping;
   grassTexture.wrapT = THREE.RepeatWrapping;
   grassTexture.repeat.x = 40;
   grassTexture.repeat.y = 45;
   let grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
   grassMesh.rotation.y -= 185 / 120;
   grassMesh.position.x = 2.4;
   grassMesh.position.y = -0.3;
   grassMesh.position.z = -3.1;
   grassMesh.rotation.x = -0.1;
   grassMesh.receiveShadow = true;
   grassMesh.castShadow = true;
   scene.add(grassMesh);

   //LEFTWALLS BEDROOM
   const leftSideWallGeometry = new THREE.BoxGeometry(8, 7.8, 0.5);
   let leftSideWallTexture = new THREE.TextureLoader().load('assets/textures/bedroomwall.jpg');
   let leftSideWallMaterial = new THREE.MeshPhongMaterial({map: leftSideWallTexture, wireframe:USE_WIREFRAME,
      opacity: 5, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let leftSideWallMesh = new THREE.Mesh(leftSideWallGeometry, leftSideWallMaterial);
   leftSideWallMesh.rotation.y -= Math.PI / 1.0;
   leftSideWallMesh.position.x = 7;
   leftSideWallMesh.position.y = 3.7;
   leftSideWallMesh.position.z = -0.45;
   leftSideWallMesh.rotation.y = 4.71;
   leftSideWallMesh.rotation.z = 0;
   leftSideWallMesh.receiveShadow = true;
   leftSideWallMesh.castShadow = true;
   scene.add(leftSideWallMesh);

   //RIGHTWALLS BEDROOM
   const rightSideWallGeometry = new THREE.BoxGeometry(8, 7.8, 0.5);
   let rightSideWallTexture = new THREE.TextureLoader().load('assets/textures/bedroomwall.jpg');
   let rightSideWallMaterial = new THREE.MeshPhongMaterial({map: rightSideWallTexture, wireframe:USE_WIREFRAME,opacity: 1, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let rightSideWallMesh = new THREE.Mesh(rightSideWallGeometry, rightSideWallMaterial);
   rightSideWallMesh.rotation.y -= Math.PI / 1.0;
   rightSideWallMesh.position.x= -7;
   rightSideWallMesh.position.y= 3.7;
   rightSideWallMesh.position.z = -0.9;
   rightSideWallMesh.rotation.y = -4.72;
   rightSideWallMesh.rotation.x = -0.05;
   rightSideWallMesh.receiveShadow = true;
   rightSideWallMesh.castShadow = true;
   scene.add(rightSideWallMesh);

   //BACKWALL BEDROOM
   const backWallGeometry = new THREE.BoxGeometry(14.5, 8, 0.5);
   let backWallTexture = new THREE.TextureLoader().load('assets/textures/backwall.jpg');
   let backWallMaterial = new THREE.MeshPhongMaterial({map: backWallTexture,
      opacity: 1, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true}); // to avoid looking pass through the center
   let backWallMesh = new THREE.Mesh(backWallGeometry, backWallMaterial);
   backWallMesh.rotation.y -= Math.PI / 1.0;
   backWallMesh.position.y=3.7;
   backWallMesh.position.z = 3.20;
   backWallMesh.rotation.x=-0.05;
   backWallMesh.receiveShadow = true;
   backWallMesh.castShadow = true;
   scene.add(backWallMesh);

   //DOORTEXTURE
   let DoorTexture = new THREE.TextureLoader().load('assets/textures/door.jpg');
   let cabinetTexture = new THREE.TextureLoader().load('assets/textures/cabinetTexture.jpg');

   const DoorWallInsideGeometry = new THREE.PlaneGeometry(5,10,0,0);
   let DoorWallInsideMaterial = new THREE.MeshPhongMaterial({map: DoorTexture, opacity: 5, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let DoorWallInsideMesh = new THREE.Mesh(DoorWallInsideGeometry, DoorWallInsideMaterial);
   DoorWallInsideMesh.rotation.y -= Math.PI / 1.0;
   DoorWallInsideMesh.position.x = -4.34;
   DoorWallInsideMesh.position.y= 2;
   DoorWallInsideMesh.position.z = -5;
   DoorWallInsideMesh.receiveShadow = true;
   DoorWallInsideMesh.castShadow = true;
   DoorWallInsideMesh.depthWrite = false;
   DoorWallInsideMesh.transparent = false;
   scene.add(DoorWallInsideMesh);

   //CABINET TEXTURE
   cabinetGeometry = new THREE.BoxGeometry(5,5,0,0);
   cabinetMaterial = new THREE.MeshPhongMaterial({map: cabinetTexture, wireframe:USE_WIREFRAME, opacity: 3, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let cabinetMesh = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
   cabinetMesh.rotation.y = 0;
   cabinetMesh.position.x = 4.3;
   cabinetMesh.position.y = 1;
   cabinetMesh.position.z = 2;
   cabinetMesh.receiveShadow = true;
   cabinetMesh.castShadow = true;
   scene.add(cabinetMesh);

   //BED TEXTURE
   const bedGeometry = new THREE.BoxGeometry(5,1,3);
   let bedTexture = new THREE.TextureLoader().load('assets/textures/bedsheet.jpg');
   let bedMaterial = new THREE.MeshPhongMaterial({map: bedTexture, wireframe:USE_WIREFRAME,opacity: 1, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let bedMesh = new THREE.Mesh(bedGeometry, bedMaterial);
   bedMesh.rotation.y = 0;
   bedMesh.position.x = 4;
   bedMesh.position.y= 1;
   bedMesh.position.z = -3;
   bedMesh.rotation.x = -0.1;
   bedMesh.receiveShadow = true;
   bedMesh.castShadow = true;
   scene.add(bedMesh);

   // WINDOWS TEXTURES
   const firstWindowGeometry = new THREE.BoxGeometry(2,2,2);
   let firstWindowTexture = new THREE.TextureLoader().load('assets/textures/glasswindow.jpg');
   let firstWindowMaterial = new THREE.MeshPhongMaterial({map: firstWindowTexture, wireframe:USE_WIREFRAME, shininess:110, opacity: 0.8, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let firstWindowMesh = new THREE.Mesh(firstWindowGeometry, firstWindowMaterial);
   firstWindowMesh.rotation.y -= Math.PI / 1.0;
   firstWindowMesh.position.x = 4.3;
   firstWindowMesh.position.y= 5.5;
   firstWindowMesh.position.z = 2.50;
   firstWindowMesh.receiveShadow = true;
   firstWindowMesh.castShadow = true;
   scene.add(firstWindowMesh);

   const secondWindowGeometry = new THREE.BoxGeometry(2,2,2);
   let secondWindowTexture = new THREE.TextureLoader().load('assets/textures/glasswindow.jpg');
   let secondWindowMaterial = new THREE.MeshPhongMaterial({map: secondWindowTexture, wireframe:USE_WIREFRAME, shininess:110, opacity: 0.8, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let secondWindowMesh = new THREE.Mesh(secondWindowGeometry, secondWindowMaterial);
   secondWindowMesh.rotation.y -= Math.PI / 1.0;
   secondWindowMesh.position.x = 0;
   secondWindowMesh.position.y= 5.5;
   secondWindowMesh.position.z = 2.50;
   secondWindowMesh.receiveShadow = true;
   secondWindowMesh.castShadow = true;
   scene.add(secondWindowMesh);

   const ThirdWindowGeometry = new THREE.BoxGeometry(2,2,1);
   let ThirdWindowTexture = new THREE.TextureLoader().load('assets/textures/glasswindow.jpg');
   let ThirdWindowMaterial = new THREE.MeshPhongMaterial({map: ThirdWindowTexture, wireframe:USE_WIREFRAME, shininess:110, opacity: 0.8, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let ThirdWindowMesh = new THREE.Mesh(ThirdWindowGeometry, ThirdWindowMaterial);
   ThirdWindowMesh.rotation.y -= Math.PI / 1.0;
   ThirdWindowMesh.position.x = -3.80;
   ThirdWindowMesh.position.y= 5.5;
   ThirdWindowMesh.position.z = 2.50;
   ThirdWindowMesh.receiveShadow = true;
   ThirdWindowMesh.castShadow = true;
   scene.add(ThirdWindowMesh);

   //FLOOR TEXTURE
   const floorGeometry = new THREE.PlaneGeometry(14,10, 10,10);
   let floorTexture = new THREE.TextureLoader().load('assets/textures/floor.jpg');
   let floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, wireframe:USE_WIREFRAME, shininess: 80, opacity: 1, 
      transparent: true, 
      side: THREE.DoubleSide, 
      depthWrite: true});
   let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
   floorMesh.rotation.x -= Math.PI / 1.9;
   floorMesh.position.z = -0.5;
   floorMesh.position.y = 0.4;
   floorMesh.receiveShadow = true;
   floorMesh.castShadow = true;
   scene.add(floorMesh);
  
  // LIGHTS
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  let directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.9 );
  directionalLight.position.set( 119, 418, 250 );
  directionalLight.castShadow = true;
  scene.add( directionalLight );
 
  //SETTING THE CAMERA NEAR AND FAR
  camera.position.set(0, player.height, -2.2);
  camera.lookAt(new THREE.Vector3(0,player.height,0));
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1640, 900);
 
  //SHADOWS FOR RENDERER
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
 
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls (camera, renderer.domElement);
  animate();
}
 
function animate(){
  controls.update();
  requestAnimationFrame(animate);

  //FUNCTIONS FOR THE KEYBOARD WASD FUNCTIONS
  if(keyboard[87]){ // W key
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
}

  if(keyboard[83]){ // S key
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
}

  if(keyboard[65]){ // A key
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
}
     if(keyboard[68]){ // D key
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
}
 
     if(keyboard[37]){ // left arrow key
     camera.rotation.x -= player.turnSpeed;
}
      if(keyboard[39]){ // right arrow key
      camera.rotation.x += player.turnSpeed;
}
 
   renderer.render(scene, camera);
}
 
   function keyDown(event){
   keyboard[event.keyCode] = true;
}
 
   function keyUp(event){
   keyboard[event.keyCode] = false;
} 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp); 
window.onload = init;

