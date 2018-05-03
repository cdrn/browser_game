// import all our dependencies
import * as THREE from 'three'
import './main.css' // add css dependency for webpack

import Player from './player.js'

// SCENE
let scene = new THREE.Scene()

/*args: FOV(degrees), aspect ratio, near clipping plane, far clipping plane (point which rendering ceases) */
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 3, -1)

// Set up our WebGL renderer and append it to the DOM
let renderer = new THREE.WebGLRenderer()
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
planeTexture.repeat.set( 100, 100 )

let planeGeo = new THREE.PlaneGeometry(1000, 1000, 1000, 1000)
let planeMat = new THREE.MeshLambertMaterial({ color: 0xffffff, side:THREE.DoubleSide, wireframe: false, map: planeTexture})
let plane = new THREE.Mesh(planeGeo, planeMat)
plane.rotation.x = Math.PI / 2
scene.add(plane)


// LIGHTS
let ambientLight = new THREE.AmbientLight(0x404040)
ambientLight.position.set(50, 50, 50)
scene.add(ambientLight)

let pointLight = new THREE.PointLight( 0xff0000, 1, 100 )
pointLight.position.set(0, 50, 50)
scene.add(pointLight)


// PLAYER
// test placing our player
const player = new Player
player.playerMesh.position.set(-10, 0, 0)
scene.add(player.playerMesh)


// CONTROLS
// Pointer lock controls

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

//GAMELOOP
function animate () {

  // controls.update()

  //Register player movement
  if (keys.left) {
    camera.position.x -= 0.1
  }
  if (keys.right) {
    camera.position.x += 0.1
  }
  if (keys.forward) {
    camera.position.z -= 0.1
  }
  if (keys.back) {
    camera.position.z += 0.1
  }


  // LOGGING
  // console.log(camera.position.z, camera.position.x)
  
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()