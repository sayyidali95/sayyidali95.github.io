var THREE = window.THREE = require('three');
require('../js/loaders/GLTFLoader');
require('../js/controls/OrbitControls');
const dat = require('dat.gui');
//set up scene
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var raycaster = new THREE.Raycaster();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87cefa, 1);
document.body.appendChild(renderer.domElement);



//add camera controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//add scene controller and gui
const gui = new dat.GUI();
var controller = new THREE.Object3D();
controller.objects = [];
controller.scene = scene;
controller.gui = gui;
controller.velocityX = 0.001;
controller.velocityY = 0.002;
controller.velocityZ = 0.005;

gui.add(controller, 'velocityX', - 0.1, 0.1).listen();
gui.add(controller, 'velocityY', - 0.1, 0.1).listen();
gui.add(controller, 'velocityZ', - 0.1, 0.1).listen();

//Add cube
var geometry = new THREE.SphereGeometry(1, 32, 32);
var boundingBox = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
var wireframeMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0000ff});
var cube = new THREE.Mesh(geometry, material);
var collisionCube = new THREE.Mesh(boundingBox, wireframeMat);
var clock = new THREE.Clock();
var vertex;
var velocityX, velocityY = 0.0001;
var velocityZ = .01;
var boundsRadius = 5;

//var model;
scene.add(cube);
scene.add(collisionCube);

camera.position.z = 15;

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


//point light 2
const pointLight2 =
  new THREE.PointLight(0xFFFFFF);
pointLight2.intensity = 15;
scene.add(pointLight2);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);




velocityX = .008;
velocityY = .005;




function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    scene.updateMatrixWorld();
    var scaler = Math.sin(clock.getElapsedTime());
    //cube.rotation.x += 0.01;
    //cube.rotation.y += scaler;
    cube.translateX(controller.velocityX);
    cube.translateY(controller.velocityY);
    cube.translateZ(controller.velocityZ);
    var vector = cube.getWorldPosition();
    //cube.position.x = 0;
    //pointLight.position.set(0,0,0);
    pointLight.intensity = 20 + 2 * scaler;
    cube.scale = 1;
    
    //make collisions for cube
    //console.log(vector);
        if (vector.x + .5 > boundsRadius
            || -boundsRadius > vector.x - .5) {
            controller.velocityX *= -1;
        }
        if (vector.y + .5 > boundsRadius
                || -boundsRadius > vector.y - .5) {
            controller.velocityY *= -1;
        }
        if (vector.z + .5 > boundsRadius
                || -boundsRadius > vector.z - .5) {
            controller.velocityZ *= -1;
        }
        //if (vertex.position.y > collisionCube.innerHeight / 2
        //   || vertex.position.y > -collisionCube.innerHeight / 2) {
        //    velocityY *= -1;
        //}
    
   

        renderer.render(scene, camera);
        //stats.update();
};




animate();