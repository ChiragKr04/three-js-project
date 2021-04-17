import gsap from "https://cdn.skypack.dev/gsap"
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from "https://cdn.skypack.dev/dat.gui"


let scene,camera,renderer

    scene = new THREE.Scene;
    camera = new THREE.PerspectiveCamera( 
        55, window.innerWidth / window.innerHeight, 45, 30000 
        );
    camera.position.set(-900,-200,-900)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth,innerHeight)
    document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change',renderer)

    let materialArray = []
    let texture_ft = new THREE.TextureLoader().load('meadow_ft.jpg')
    let texture_bk = new THREE.TextureLoader().load('meadow_bk.jpg')
    let texture_up = new THREE.TextureLoader().load('meadow_up.jpg')
    let texture_dn = new THREE.TextureLoader().load('meadow_dn.jpg')
    let texture_rt = new THREE.TextureLoader().load('meadow_rt.jpg')
    let texture_lf = new THREE.TextureLoader().load('meadow_lf.jpg')


    materialArray.push(new THREE.MeshBasicMaterial({map:texture_ft}))
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_bk}))
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}))
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_dn}))
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_rt}))
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_lf}))

    for (let i =0 ; i<6 ; i++){
        materialArray[i].side = THREE.BackSide
    }

    let skyboxgeo = new THREE.BoxGeometry(10000,10000,10000)
    let skybox = new THREE.Mesh(skyboxgeo,materialArray)

    scene.add(skybox)
    animate()

function animate(){
    renderer.render(scene,camera)
    requestAnimationFrame(animate)
    console.log(camera.position)
}

document.getElementById("glideBtn").onclick = glideAnimate;
function glideAnimate(){
	console.log("clicked from js file");

	const initCamera = {
		x:-300,y:-300,z:-3000
	}
	const glideCamera = {
		x:-900,y:-200,z:-900
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
