import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, Sphere, TorusKnot } from '@react-three/drei'
import { Suspense } from 'react'

function Orb() {
  return <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
    <TorusKnot args={[0.82, 0.23, 160, 24]} rotation={[0.4, 0.2, 0]}>
      <MeshDistortMaterial color="#668cff" emissive="#202d75" emissiveIntensity={0.45} roughness={0.2} metalness={0.65} distort={0.22} speed={1.8} />
    </TorusKnot>
    <Sphere args={[1.22, 48, 48]} scale={1.12}>
      <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.11} />
    </Sphere>
  </Float>
}

export default function Scene() {
  return <div className="scene-wrap" aria-label="Abstract animated 3D blue violet form">
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.4} />
      <pointLight position={[3, 3, 3]} intensity={30} color="#7dd3fc" />
      <pointLight position={[-3, -2, 1]} intensity={22} color="#8b5cf6" />
      <Suspense fallback={null}><Orb /></Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
    </Canvas>
    <div className="scene-label"><span className="pulse-dot" /> JAVA • BUILD • DEPLOY</div>
  </div>
}
