import React, { useRef, Suspense, useState, useEffect} from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import logo from './logo.svg';
import './App.css';
import { useGLTF, PerspectiveCamera, OrbitControls  } from '@react-three/drei'
import url from "./Death_Dealer_Cover01-2DLenHolo01.mp4"

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="red"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}


/* export function Model(props) {
  const group = useRef()
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const { nodes, materials } = useGLTF('models/PosterCard_1v02.glb')
  useFrame((state, delta) => (group.current.rotation.y += 0.01))
  return (
    <>
    <OrbitControls camera={group.current} enableZoom={true}/>
    <PerspectiveCamera ref={group} position={[1,1,1]} />
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        // material={nodes.mesh_0.material}
        scale={[51.02, 75, 0.5]}
      >
        <videoTexture attach="map" args={{video}} />
      </mesh>
    </group>
    </>
  )
}
 */

export function Model(props) {
  const group = useRef()
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const { nodes, materials } = useGLTF('models/PosterCard_1v02.glb')
  // useFrame((state, delta) => (group.current.rotation.y += 0.01))
  return (
    <>
    <OrbitControls camera={group.current} enableZoom={true}/>
    <PerspectiveCamera ref={group} position={[1,1,1]} />
    <group rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} scale={[81.02, 100, 0.5]} ref={group} {...props} dispose={null}>
        <meshStandardMaterial  />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
        <planeGeometry args={[81.02, 100]} />
        <meshStandardMaterial side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          {/* <videoTexture attach="emissiveMap" args={[video]} /> */}
        </meshStandardMaterial>
      </mesh>
    </group>
    </>
  )
}

useGLTF.preload('models/PosterCard_1v02.glb')

/* function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('models/PosterCard_1v02.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        scale={[81.02, 100, 0.5]}
      />
    </group>
  )
}

useGLTF.preload('models/PosterCard_1v02.glb') */


function App() {

  return (
    <div className="App">
      <Canvas style={{ background: "lightpink" }}>
      <ambientLight />
        {/* <pointLight position={[1.02, 100, 0.5]} /> */}
        {/* <directionalLight intensity={5555.5} /> */}
        {/* <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>}> */}
        <Suspense fallback={<Loading />}>
          <Model position={[1, 1, -51]}/>
        </Suspense>
        {/* </ErrorBoundary> */}
      </Canvas>
    </div>
  );
}

export default App;
