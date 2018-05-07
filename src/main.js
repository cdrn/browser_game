// import all our dependencies
import * as THREE from 'three'

import PointerLockControls from './PointerLockControls'
import './main.css' // add css dependency for webpack
import Player from './player.js'


// Declare our important variables
let scene;
let camera;
let renderer;

// SCENE
scene = new THREE.Scene()

/*args: FOV(degrees), aspect ratio, near clipping plane, far clipping plane (point which rendering ceases) */
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Set up our WebGL renderer and append it to the DOM
renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// SKYBOX
let color = new THREE.Color(0xCCFFFF)
// Load urls 
// var urls = [
// ]
// cubeTexture = new THREE.CubeTextureLoader().setPath('../threejs/').load(urls);

scene.background = color


// PLANE
import grassPath from './textures/grass_texture.jpg'

let planeTexture = new THREE.TextureLoader().load(grassPath)
planeTexture.wrapS = THREE.RepeatWrapping
planeTexture.wrapT = THREE.RepeatWrapping
planeTexture.offset.set( 0, 0 )
planeTexture.repeat.set( 1, 1 )

let planeGeo = new THREE.PlaneGeometry(1000, 1000, 1000, 1000)
let planeMat = new THREE.MeshLambertMaterial({ color: 0xffffff, side:THREE.DoubleSide, wireframe: false, map: planeTexture})
let plane = new THREE.Mesh(planeGeo, planeMat)
plane.rotation.x = Math.PI / 2
scene.add(plane)


// LIGHTS
let ambientLight = new THREE.AmbientLight(0x404040)
ambientLight.position.set(50, 50, 50)
scene.add(ambientLight)

let pointLight = new THREE.PointLight( 0xffffff, 1, 100 )
pointLight.position.set(0, 50, 50)
scene.add(pointLight)


// PLAYER
// test placing our player
const player = new Player
player.playerMesh.position.set(-10, 0, 0)
scene.add(player.playerMesh)


// CONTROLS
// Pointer lock controls
// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
let havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if (havePointerLock) {
  let element = document.body;
  let pointerlockchange = function (event) {
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
        controls.enabled = true
    } else {
        controls.enabled = false
    }
  }
  let pointerlockerror = function (event) {

  }
  // Hook pointer lock state change events
  document.addEventListener('pointerlockchange', pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
  document.addEventListener('pointerlockerror', pointerlockerror, false);
  document.addEventListener('mozpointerlockerror', pointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
  document.addEventListener('click', function (event) {
      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock()
    }, false)
} else {
}

// Add our pointerlock controls to the scene
const controls = new PointerLockControls(camera)
scene.add(controls.getObject())

camera.position.set(0, 3, 10)

// input keys
let keys = {
  left: false,
  right: false,
  forward: false,
  backward: false,
}

//Event listeners for keypress
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'a') {
    keys.left = true
  } 
  if (keyName === 'd') {
    keys.right = true
  }
  if (keyName === 'w') {
    keys.forward = true
  }
  if (keyName === 's') {
    keys.back = true
  }
})
document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  if (keyName === 'a') {
    keys.left = false;
  } 
  if (keyName === 'd') {
    keys.right = false
  }
  if (keyName === 'w') {
    keys.forward = false
  }
  if (keyName === 's') {
    keys.back = false
  }
})


//COLLISION
let raycaster = new THREE.Raycaster()

//GAMELOOP
function animate () {

  //Register player movement
  if (keys.left) {
    camera.position.x -= 1
  }
  if (keys.right) {
    camera.position.x += 1
  }
  if (keys.forward) {
  }
  if (keys.back) {
  }

  player.playerMesh.position.set(camera.position)  // Set playermodel to camera pos

  // LOGGING
  // console.log(camera.position.z, camera.position.x)

  // COLLISION
  // Floor detection
  // raycaster.set(player.playerMesh.position)
  
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()