import { text } from 'stream/consumers';
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
        10
    );
    camera.position.z = 3;
    camera.position.y = .1;
    //camera.rotateX(360)
    return camera;
};

const initScene = ():THREE.Scene =>{
    const scene = new THREE.Scene();
    return scene;
}

const initMesh = () =>{
    const objectGeometry = new THREE.PlaneGeometry(6, 6, 64, 64);
    
    var peak = .07;
    var vertices = objectGeometry.attributes.position.array;
    for (var i = 0; i <= vertices.length; i += 3) {
        (vertices[i+2] as any) = peak * Math.random();
    }
    objectGeometry.attributes.position.needsUpdate = true;
    objectGeometry.computeVertexNormals();

    
    const geometry = new THREE.WireframeGeometry(objectGeometry);
    const material = new THREE.LineBasicMaterial({
        color:'purple', linewidth: 1
    })
    const mesh = new THREE.LineSegments(geometry, material);


    let mat = new THREE.MeshBasicMaterial( { color: "rgb(34, 34, 34)"} );
    const texture = new THREE.Mesh( objectGeometry, mat );

    mesh.rotateX(Math.PI / 2);
    texture.rotateX(Math.PI / 2);

    return [mesh, texture];
}


function start(canvasEle: HTMLCanvasElement):[THREE.WebGLRenderer, THREE.PerspectiveCamera, THREE.Scene] {
    const camera = initCamera();

    const [mesh, texture] = initMesh();
    const scene = initScene();

    scene.add(mesh);
    scene.add(texture);
    
    const renderer = initRender(canvasEle);
    renderer.setAnimationLoop(animation);

    function animation(time: number) {
        camera.translateZ(-.0025)
        console.log(camera.position.z);
        if(camera.position.z < -1){            
            camera.position.z = 3;
        }
        //mesh.geometry.translate(0,-.0025,0);
        //texture.geometry.translate(0,-.0025,0)
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
