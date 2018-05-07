/* 
  We are going to make a constructor function which constructs a player object
  The player object should contain a camera and a mesh which are tightly coupled in 3d space
  All the attributes of the player should be stored here
  Should be similar to the character "class"
*/

// IMPORTS
import * as THREE from 'three'

export default class {

  constructor () {
    // PROPERTIES
    this.playerSpeed = 1
    this.playerSize = 1 // Scalar value of player size
    this.playerHeight = 1.8

    // MESH
    this.playerTex = null
    this.playerMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
    this.playerGeo = new THREE.CylinderBufferGeometry(1 * this.playerSize, 1 * this.playerSize, this.playerHeight * this.playerSize, 20)
    this.playerMesh = new THREE.Mesh(this.playerGeo, this.playerMat)
  }

  get getPosition () {
    return this.playerMesh.position()
  }
  setPosition (x, y, z) {
    this.playerMesh.position.set(x, y, z)
  }


}