// Three.js - Load .GLTF
// from https://threejsfundamentals.org/threejs/threejs-load-gltf.html


'use strict';

/* global THREE */

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xEEEEEE);

  // {
  //   const planeSize = 40;

  //   const loader = new THREE.TextureLoader();
  //   const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
  //   texture.wrapS = THREE.RepeatWrapping;
  //   texture.wrapT = THREE.RepeatWrapping;
  //   texture.magFilter = THREE.NearestFilter;
  //   const repeats = planeSize / 2;
  //   texture.repeat.set(repeats, repeats);

  //   const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  //   const planeMat = new THREE.MeshPhongMaterial({
  //     map: texture,
  //     side: THREE.DoubleSide,
  //   });
  //   const mesh = new THREE.Mesh(planeGeo, planeMat);
  //   mesh.rotation.x = Math.PI * -.5;
  //   scene.add(mesh);
  // }

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 0.4;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 0.5;
    const light_front = new THREE.DirectionalLight(color, intensity);
    const light_back = new THREE.DirectionalLight(color, intensity);
    const light_top = new THREE.DirectionalLight(color, intensity);    
    const light_bottom = new THREE.DirectionalLight(color, intensity);
    const light_left = new THREE.DirectionalLight(color, intensity);    
    const light_right = new THREE.DirectionalLight(color, intensity);    

    light_front.position.set(0, 0, 1);
    light_back.position.set(0, 0, -1);
    light_top.position.set(0, 1, 0);
    light_bottom.position.set(0, -1, 0);
    light_left.position.set(1, 0, 0);
    light_right.position.set(-1, 0, 0);

    scene.add(light_front);
    scene.add(light_back);
    scene.add(light_top);
    scene.add(light_bottom);
    scene.add(light_left);
    scene.add(light_right);

    scene.add(light_front.target);
    scene.add(light_back.target);
    scene.add(light_top.target);
    scene.add(light_bottom.target);
    scene.add(light_left.target);
    scene.add(light_right.target);

  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.Math.degToRad(camera.fov * .5);
    const distance = (halfSizeToFitOnScreen / Math.tan(halfFovY));
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x , boxCenter.y, boxCenter.z);
  }

  {
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('/assets/3dmodels/Pastry.glb', (gltf) => {
      const root = gltf.scene;
      scene.add(root);

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = (box.getSize(new THREE.Vector3()).length());
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      frameArea(boxSize * 1, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();