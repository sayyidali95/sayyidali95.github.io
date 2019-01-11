var THREE = window.THREE = require('three');
require('../js/loaders/GLTFLoader');
//set up scene
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var raycaster = new THREE.Raycaster();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Add cube
var geometry = new THREE.SphereGeometry(1, 32, 32);
var boundingBox = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
var wireframeMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0000ff});
var cube = new THREE.Mesh(geometry, material);
var collisionCube = new THREE.Mesh(boundingBox, wireframeMat);
var clock = new THREE.Clock();
var vertex;
var velocityX, velocityY = 0.0001;
//var model;
scene.add(cube);
scene.add(collisionCube);

camera.position.z = 5;

// create a point light
const pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 200;
pointLight.intensity = 20;

// add to the scene
scene.add(pointLight);

var loader = new THREE.GLTFLoader();

loader.load( '../models/flameSword2.glb', function ( gltf ) {

    var model = gltf.scene;
    scene.add(model);
    model.scale = (.1, .1, .1);
}, undefined, function ( error ) {

    console.error( error );

});

velocityX = .008;
velocityY = .005;
var velocityZ = .01;
var boundsRadius = 5;
var animate = function () {
    requestAnimationFrame(animate);
    scene.updateMatrixWorld();
    var scaler = Math.sin(clock.getElapsedTime());
    //cube.rotation.x += 0.01;
    //cube.rotation.y += scaler;
    cube.translateX(velocityX);
    cube.translateY(velocityY);
    cube.translateZ(velocityZ);
    var vector = cube.getWorldPosition();
    //cube.position.x = 0;
    pointLight.intensity = 20 + 2 * scaler;
    cube.scale = 1;
    
    //make collisions for cube
    //console.log(vector);
        if (vector.x + .5 > boundsRadius
            || -boundsRadius > vector.x - .5) {
            velocityX *= -1;
        }
        if (vector.y + .5 > boundsRadius
                || -boundsRadius > vector.y - .5) {
            velocityY *= -1;
        }
        if (vector.z + .5 > boundsRadius
                || -boundsRadius > vector.z - .5) {
            velocityZ *= -1;
        }
        //if (vertex.position.y > collisionCube.innerHeight / 2
        //   || vertex.position.y > -collisionCube.innerHeight / 2) {
        //    velocityY *= -1;
        //}
    
   

    renderer.render(scene, camera);
};




animate();