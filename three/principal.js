import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";


export default class Draw {
  constructor(options) {
    this.container = options.dom;

    //SCENE
    this.scene = new THREE.Scene();

    //SIZE
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    //CAMERA
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      100,
      2000
    );
    this.camera.position.z = 600;
    this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);

    //RENDERER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(this.widht, this.height);
    this.container.appendChild(this.renderer.domElement);

    //Scroll
    this.currentScroll = 0

    // this.addObjects()
    this.createObject(0, 0, 0);
    
    //Objects
    this.resize();
    this.setupResize();
    this.render();

    // Mover objeto con el scroll
    window.addEventListener('scroll', () =>{
      this.currentScroll = window.scrollY
      this.plane.position.y = this.currentScroll
    })
    
    //Mover la camara
    // window.addEventListener('scroll', () =>{
    //   console.log(this.camera)
    //   this.camera.rotation.x =  window.scrollY / 500
    //   this.camera.updateProjectionMatrix();
    // })
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  //Create objects
  createObject(x, y, z, color) {
    let material = new THREE.ShaderMaterial({
      wireframe:false
    });
    let geometry = new THREE.BoxBufferGeometry(300, 300, 300, 1);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    //mesh.scale.y = 0
    this.scene.add(mesh);

    // save object
    this.plane = mesh
  }

  render() {
    this.time += 0.5;
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Draw({
  dom: document.getElementById("Canvas"),
});
