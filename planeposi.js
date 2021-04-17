import gsap from "https://cdn.skypack.dev/gsap"
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from "https://cdn.skypack.dev/dat.gui"

// const scene = new THREE.Scene()

// const camera = new THREE.PerspectiveCamera(
//   90,
//   innerWidth / innerHeight,
//   0.1,
//   1000
// )
// const renderer = new THREE.WebGLRenderer()

// renderer.setSize(innerWidth, innerHeight)
// renderer.setPixelRatio(devicePixelRatio)
// document.body.appendChild(renderer.domElement)

// const geometry = new THREE.PlaneGeometry( 10, 10, 32, 32 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( geometry, material );
// camera.position.z = 5
// scene.add(plane);
// console.log(plane)

const gui = new dat.GUI()
const world = {
  plane: {
    camerax: 0,
    cameray: 0,
    cameraz: 5,
  }
}
gui.add(world.plane, 'camerax', -20, 20).onChange(changeCamera)
gui.add(world.plane, 'cameray', -20, 20).onChange(changeCamera)
gui.add(world.plane, 'cameraz', -20, 20).onChange(changeCamera)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

function changeCamera(){
	camera.position.set( world.plane.camerax, world.plane.cameray, world.plane.cameraz);
	controls.update();
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry(10,10,32,32);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00,side: THREE.DoubleSide } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 200;
// camera.position.x = 0;
// camera.position.y = -1;
camera.position.set( 0, -10, 15);
controls.update();

const animate = function () {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

    	controls.update();
        // console.log(camera.position)

	renderer.render( scene, camera );
	console.log(camera.position)
};

animate();

document.getElementById("glideBtn").onclick = glideAnimate;
function glideAnimate(){
	console.log("clicked from js file");

	const glideCamera = {
		x:0,y:0,z:2
	}
	const initCamera = {
		x:0,y:-3,z:0.2
	}
	gsap.to(glideCamera, {
      	x:initCamera.x,
		y:initCamera.y,
		z:initCamera.z,
      duration: 2,
      onUpdate: () => {
		camera.position.set(glideCamera.x,glideCamera.y,glideCamera.z)
       	controls.update()
      },
	  onComplete: ()=> {
		//   window.open("https://github.com/ChiragKr04","_self")
		// zoomAnimate()
	  }
    })

}		

function zoomAnimate(){
	const zoomToCamera = {
		x:0,y:-3,z:0.2
	}

	const initCamera = {
		x:0,y:-3,z:-4
	}

	gsap.to(zoomToCamera, {
      	x:initCamera.x,
		y:initCamera.y,
		z:initCamera.z,
      duration: 2,
      onUpdate: () => {
		camera.position.set(zoomToCamera.x,zoomToCamera.y,zoomToCamera.z)
       	controls.update()
      },
	  onComplete: ()=> {
		//   window.open("https://github.com/ChiragKr04","_self")
	  }
    })

}
			
