import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera, WebGLRenderer } from "three";
import { resizeRender, start } from "../src/three";
import styles from "../styles/Terrain.module.scss";

const Terrain = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [renderer, setRenderer] = useState<WebGLRenderer|null>(null); 
    const [camera, setCamera]  = useState<PerspectiveCamera|null>(null);
    
    useEffect(() => {
        const [render, camera] = start(canvasRef.current!);
        setRenderer(render);
        setCamera(camera);

        window.addEventListener('resize',()=>{
            resizeRender(render, camera);
        }, false)
    }, []);

    return (
        <canvas id={styles.terrainRenderer} ref={canvasRef}></canvas>
    )
}

export { Terrain };