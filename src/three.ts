import * as THREE from 'three';

const initRender = (canvasElement: HTMLCanvasElement):THREE.WebGLRenderer => {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
        alpha: true
    });
    renderer.setSize(document.body.clientWidth, window.innerHeight, false);
    renderer.setClearColor(0xffffff, 0);
    return renderer;
};

const initCamera = ():THREE.PerspectiveCamera => {
    const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        2.5
    );
    camera.position.z = 3;
    camera.position.y = .1;
    return camera;
};

const initScene = ():THREE.Scene =>{
    const scene = new THREE.Scene();
    return scene;
}

const createPlane = () =>{
    const objectGeometry = new THREE.PlaneGeometry(6, 6, 64, 64);
    
    const peak = .07;
    const vertices = objectGeometry.attributes.position.array;
    for (let i = 0; i <= vertices.length; i += 3) {
        (vertices[i+2] as any) = peak * Math.random();
    }
    objectGeometry.attributes.position.needsUpdate = true;
    objectGeometry.computeVertexNormals();

    objectGeometry.rotateX(Math.PI / 2); 
    return objectGeometry;
}

const createWireframe = (object: THREE.PlaneGeometry) =>{
    const geometry = new THREE.WireframeGeometry(object);
    const material = new THREE.LineBasicMaterial({
        color:'purple', linewidth: 1
    })
    const mesh = new THREE.LineSegments(geometry, material);
    return mesh;
}

const createTexture = (object: THREE.PlaneGeometry) =>{
    let mat = new THREE.MeshBasicMaterial( { color: "rgb(34, 34, 34)"} );
    const texture = new THREE.Mesh(object, mat )
    return texture;
}

const initMesh = () =>{
    const plane = createPlane();
    const altPlane = plane.clone() as THREE.PlaneGeometry;

    altPlane.translate(0,0,-6);

    const mesh = createWireframe(plane);
    const texture = createTexture(plane);

    const altMesh = createWireframe(altPlane);
    const altTexture = createTexture(altPlane);

    return [mesh, texture, altMesh, altTexture];
}

function start(canvasEle: HTMLCanvasElement):[THREE.WebGLRenderer, THREE.PerspectiveCamera, THREE.Scene] {
    const camera = initCamera();

    const [mesh, texture, altMesh, altTexture] = initMesh();
    const scene = initScene();

    scene.add(mesh);
    scene.add(texture);

    scene.add(altMesh);
    scene.add(altTexture);
    
    const renderer = initRender(canvasEle);
    renderer.setAnimationLoop(animation);

    function animation(time: number) {
        camera.translateZ(-.002)
        if(camera.position.z < -3){            
            camera.position.z = 3;
        }
        renderer.render(scene, camera);
    }

    return [renderer, camera, scene];
}

function resizeRender(renderer:THREE.WebGLRenderer, camera:THREE.PerspectiveCamera){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( document.body.clientWidth, window.innerHeight );
}

export { start, resizeRender };
