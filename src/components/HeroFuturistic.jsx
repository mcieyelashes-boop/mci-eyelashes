import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useAspect, useTexture } from '@react-three/drei'
import { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three/webgpu'
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js'
import {
  abs, blendScreen, float, mod, mx_cell_noise_float, oneMinus,
  smoothstep, texture, uniform, uv, vec2, vec3, pass, mix, add,
} from 'three/tsl'

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' }
const DEPTHMAP   = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' }

extend(THREE)

const PostProcessing = ({ strength = 1, threshold = 1, fullScreenEffect = true }) => {
  const { gl, scene, camera } = useThree()
  const progressRef = useRef({ value: 0 })

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl)
    const scenePass = pass(scene, camera)
    const scenePassColor = scenePass.getTextureNode('output')
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold)

    const uScanProgress = uniform(0)
    progressRef.current = uScanProgress

    const uvY = uv().y
    const scanWidth = float(0.05)
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(uScanProgress)))
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4)

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    )

    postProcessing.outputNode = withScanEffect.add(bloomPass)
    return postProcessing
  }, [camera, gl, scene, strength, threshold, fullScreenEffect])

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
    render.renderAsync()
  }, 1)

  return null
}

const WIDTH = 300
const HEIGHT = 300

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src])
  const meshRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true)
  }, [rawMap, depthMap])

  const { material, uniforms } = useMemo(() => {
    const uPointer  = uniform(new THREE.Vector2(0))
    const uProgress = uniform(0)

    const tDepthMap = texture(depthMap)
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(0.01)))

    const aspect  = float(WIDTH).div(HEIGHT)
    const tUv     = vec2(uv().x.mul(aspect), uv().y)
    const tiling  = vec2(120.0)
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0)

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2))
    const dist = float(tiledUv.length())
    const dot  = float(smoothstep(0.5, 0.49, dist)).mul(brightness)

    const flow = oneMinus(smoothstep(0, 0.02, abs(tDepthMap.sub(uProgress))))
    const mask = dot.mul(flow).mul(vec3(10, 0, 0))

    const mat = new THREE.MeshBasicNodeMaterial({
      colorNode: blendScreen(tMap, mask),
      transparent: true,
      opacity: 0,
    })

    return { material: mat, uniforms: { uPointer, uProgress } }
  }, [rawMap, depthMap])

  const [w, h] = useAspect(WIDTH, HEIGHT)

  useFrame(({ clock, pointer }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
    uniforms.uPointer.value  = pointer
    if (meshRef.current?.material && 'opacity' in meshRef.current.material) {
      meshRef.current.material.opacity = THREE.MathUtils.lerp(
        meshRef.current.material.opacity,
        visible ? 1 : 0,
        0.07
      )
    }
  })

  return (
    <mesh ref={meshRef} scale={[w * 0.40, h * 0.40, 1]} material={material}>
      <planeGeometry />
    </mesh>
  )
}

const TITLE_WORDS = ['Premium', 'Wholesale', 'Lashes']
const SUBTITLE    = 'World-class manufacturer · Private label & OEM services'

export default function HeroFuturistic() {
  const [visibleWords, setVisibleWords]     = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays, setDelays]                 = useState([])

  useEffect(() => {
    setDelays(TITLE_WORDS.map(() => Math.random() * 0.07))
  }, [])

  useEffect(() => {
    if (visibleWords < TITLE_WORDS.length) {
      const t = setTimeout(() => setVisibleWords(v => v + 1), 600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setSubtitleVisible(true), 800)
    return () => clearTimeout(t)
  }, [visibleWords])

  const scrollToHero = () =>
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="hero-fut-root">
      {/* Text overlay */}
      <div className="hero-fut-overlay">
        <div className="hero-fut-title">
          {TITLE_WORDS.map((word, i) => (
            <span
              key={word}
              className={`hero-fut-word${i < visibleWords ? ' hero-fut-word--in' : ''}`}
              style={{ animationDelay: `${i * 0.13 + (delays[i] || 0)}s` }}
            >
              {word}
            </span>
          ))}
        </div>
        <p
          className={`hero-fut-subtitle${subtitleVisible ? ' hero-fut-subtitle--in' : ''}`}
          style={{ animationDelay: `${TITLE_WORDS.length * 0.13 + 0.3}s` }}
        >
          {SUBTITLE}
        </p>
      </div>

      {/* Scroll hint */}
      <button className="hero-fut-scroll-btn" onClick={scrollToHero}>
        Scroll to explore
        <span className="hero-fut-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      {/* WebGPU Canvas */}
      <Canvas
        flat
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props)
          await renderer.init()
          return renderer
        }}
      >
        <PostProcessing fullScreenEffect />
        <Scene />
      </Canvas>
    </div>
  )
}
