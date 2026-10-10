"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

const BAYER8 = [
    0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
    14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55,
    23, 61, 29, 53, 21,
]

const DEFAULTS = {
    colorA: "#050A16",
    colorB: "#5A9438",
    accent: "#EAF7FF",
    pixel: 19,
    levels: 4,
    land: 8,
    globeSize: 12,
    glowEnabled: true,
    glowSize: 1,
    speed: 8,
    dragEnabled: false,
}

type Config = {
    colorA: string
    colorB: string
    accent: string
    pixel: number
    levels: number
    land: number
    globeSize: number
    glowEnabled: boolean
    glowSize: number
    speed: number
    dragEnabled: boolean
}

function clamp(v: number, lo: number, hi: number, fallback: number): number {
    const n = typeof v === "number" && isFinite(v) ? v : fallback
    return Math.max(lo, Math.min(hi, n))
}

function settingsFor(cfg: Config) {
    return {
        pixel: 14 - clamp(cfg.pixel, 1, 20, DEFAULTS.pixel) * 0.55,
        levels: Math.max(2, Math.round(clamp(cfg.levels, 2, 8, DEFAULTS.levels))),
        land: 0.62 - clamp(cfg.land, 1, 20, DEFAULTS.land) * 0.012,
        globeSize: 0.12 + clamp(cfg.globeSize, 1, 20, DEFAULTS.globeSize) * 0.018,
        glow: 0.15 + clamp(cfg.glowSize, 1, 20, DEFAULTS.glowSize) * 0.09,
        speed: clamp(cfg.speed, 0, 20, DEFAULTS.speed) * 0.1,
    }
}

function parseHex(hex: string): number[] {
    const h = (hex || "").replace("#", "").trim()
    if (h.length === 3) {
        return [
            parseInt(h[0] + h[0], 16),
            parseInt(h[1] + h[1], 16),
            parseInt(h[2] + h[2], 16),
        ]
    }
    if (h.length >= 6) {
        return [
            parseInt(h.slice(0, 2), 16),
            parseInt(h.slice(2, 4), 16),
            parseInt(h.slice(4, 6), 16),
        ]
    }
    return [128, 128, 128]
}

function hash(x: number, y: number): number {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
    return s - Math.floor(s)
}

function noise2(x: number, y: number): number {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = x - xi
    const yf = y - yi
    const u = xf * xf * (3 - 2 * xf)
    const v = yf * yf * (3 - 2 * yf)
    const a = hash(xi, yi)
    const b = hash(xi + 1, yi)
    const c = hash(xi, yi + 1)
    const d = hash(xi + 1, yi + 1)
    return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v
}

function fbm(x: number, y: number): number {
    let v = 0
    let amp = 0.5
    let fx = x
    let fy = y
    for (let i = 0; i < 3; i++) {
        v += noise2(fx, fy) * amp
        fx *= 2.03
        fy *= 2.01
        amp *= 0.5
    }
    return v
}

class GlobeScene {
    private container: HTMLElement
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private cfg: Config

    private buffer: HTMLCanvasElement
    private bufferCtx: CanvasRenderingContext2D
    private image: ImageData | null = null
    private bufferWidth = 0
    private bufferHeight = 0

    private width = 0
    private height = 0
    private time = 0
    private frameId = 0
    private lastT = 0
    private disposed = false

    private dragging = false
    private dragSpin = 0
    private lastDragX = 0

    constructor(container: HTMLElement, cfg: Config) {
        this.container = container
        this.cfg = cfg

        this.canvas = document.createElement("canvas")
        this.canvas.style.position = "absolute"
        this.canvas.style.inset = "0"
        this.canvas.style.width = "100%"
        this.canvas.style.height = "100%"

        this.canvas.style.imageRendering = "pixelated"
        container.appendChild(this.canvas)

        const ctx = this.canvas.getContext("2d")
        if (!ctx) throw new Error("no 2d context")
        this.ctx = ctx

        this.buffer = document.createElement("canvas")
        const bufferCtx = this.buffer.getContext("2d")
        if (!bufferCtx) throw new Error("no 2d context")
        this.bufferCtx = bufferCtx

        container.addEventListener("pointermove", this.onMove)
        container.addEventListener("pointerdown", this.onDown)
        container.addEventListener("pointerup", this.onUp)
    }

    private onMove = (e: PointerEvent) => {
        if (this.dragging) {
            this.dragSpin += (e.clientX - this.lastDragX) * 0.012
            this.lastDragX = e.clientX
        }
    }
    private onDown = (e: PointerEvent) => {
        if (!this.cfg.dragEnabled) return
        this.dragging = true
        this.lastDragX = e.clientX
        this.container.setPointerCapture(e.pointerId)
    }
    private onUp = () => {
        this.dragging = false
    }

    start() {
        this.lastT = performance.now()
        const loop = () => {
            this.frameId = requestAnimationFrame(loop)
            this.step()
        }
        loop()
    }

    setSize(width: number, height: number) {
        if (this.disposed || width <= 0 || height <= 0) return
        this.width = width
        this.height = height
        this.canvas.width = Math.round(width)
        this.canvas.height = Math.round(height)
        this.resizeBuffer()
    }

    private resizeBuffer() {
        const S = settingsFor(this.cfg)
        const pixel = Math.max(1, S.pixel)
        const w = Math.max(16, Math.round(this.width / pixel))
        const h = Math.max(16, Math.round(this.height / pixel))
        if (w === this.bufferWidth && h === this.bufferHeight) return
        this.bufferWidth = w
        this.bufferHeight = h
        this.buffer.width = w
        this.buffer.height = h
        this.image = this.bufferCtx.createImageData(w, h)
    }

    updateConfig(cfg: Config) {
        if (this.disposed) return
        const prev = this.cfg
        this.cfg = cfg

        if (prev.pixel !== cfg.pixel) this.resizeBuffer()
    }

    private step() {
        if (this.disposed || this.width <= 0) return
        const now = performance.now()
        let dt = (now - this.lastT) / 1000
        this.lastT = now
        if (!isFinite(dt) || dt < 0) dt = 0
        if (dt > 0.05) dt = 0.05

        const S = settingsFor(this.cfg)
        this.time += dt
        if (!this.image) return

        const dark = parseHex(this.cfg.colorA || DEFAULTS.colorA)
        const light = parseHex(this.cfg.colorB || DEFAULTS.colorB)
        const hot = parseHex(this.cfg.accent || DEFAULTS.accent)

        const data = this.image.data
        const bw = this.bufferWidth
        const bh = this.bufferHeight
        const levels = S.levels
        const last = levels - 1
        const t = this.time * S.speed

        const cx = bw * 0.5
        const cy = bh * 0.5
        const scale = 2 / Math.min(bw, bh)

        const R = Math.min(bw, bh) * S.globeSize
        const spin = this.time * S.speed * 3 + this.dragSpin
        let lx = -0.5
        let ly = -0.4
        const ll = Math.sqrt(lx * lx + ly * ly + 1) || 1
        lx /= ll
        ly /= ll
        const lz = 1 / ll

        const ditherShift = Math.floor(this.time * S.speed * 8)
        for (let y = 0; y < bh; y++) {
            for (let x = 0; x < bw; x++) {
                const dx = x - cx
                const dy = y - cy
                const rr = Math.sqrt(dx * dx + dy * dy)
                let v: number
                if (rr < R) {
                    const nx = dx / R
                    const ny = dy / R
                    const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))
                    const lam = Math.max(0, nx * lx + ny * ly + nz * lz)

                    const lon = Math.atan2(nx, nz) + spin
                    const lat = Math.asin(Math.max(-1, Math.min(1, ny)))
                    const land = fbm(lon * 1.6 + 10, lat * 2.2 + 5)
                    const isLand = land > S.land

                    const coast = Math.abs(land - S.land) < 0.035 ? 0.18 : 0
                    v = lam * (isLand ? 0.95 : 0.5) + coast
                } else {
                    v = this.cfg.glowEnabled
                        ? Math.max(0, 1 - (rr - R) / (R * S.glow)) * 0.14
                        : 0
                }

                const m =
                    BAYER8[
                        ((y + ditherShift) & 7) * 8 + ((x + ditherShift) & 7)
                    ] / 64 - 0.5
                let idx = Math.round(v * last + m)
                if (idx < 0) idx = 0
                else if (idx > last) idx = last

                const f = idx / last
                const to = idx === last && levels > 2 ? hot : light
                const i = (y * bw + x) * 4
                data[i] = dark[0] + (to[0] - dark[0]) * f
                data[i + 1] = dark[1] + (to[1] - dark[1]) * f
                data[i + 2] = dark[2] + (to[2] - dark[2]) * f
                data[i + 3] = 255
            }
        }

        this.bufferCtx.putImageData(this.image, 0, 0)

        this.ctx.imageSmoothingEnabled = false
        this.ctx.drawImage(this.buffer, 0, 0, this.width, this.height)
    }

    dispose() {
        this.disposed = true
        cancelAnimationFrame(this.frameId)
        this.container.removeEventListener("pointermove", this.onMove)
        this.container.removeEventListener("pointerdown", this.onDown)
        this.container.removeEventListener("pointerup", this.onUp)
        if (this.canvas.parentNode === this.container) {
            this.container.removeChild(this.canvas)
        }
    }
}

export interface BayerGlobeProps {
    colorA?: string
    colorB?: string
    accent?: string
    pixel?: number
    levels?: number
    land?: number
    globeSize?: number
    glowEnabled?: boolean
    glowSize?: number
    speed?: number
    dragEnabled?: boolean
    style?: React.CSSProperties
}

function __OriginkitBase_BayerGlobe(props: BayerGlobeProps) {
    const {
        colorA = DEFAULTS.colorA,
        colorB = DEFAULTS.colorB,
        accent = DEFAULTS.accent,
        pixel = DEFAULTS.pixel,
        levels = DEFAULTS.levels,
        land = DEFAULTS.land,
        globeSize = DEFAULTS.globeSize,
        glowEnabled = DEFAULTS.glowEnabled,
        glowSize = DEFAULTS.glowSize,
        speed = DEFAULTS.speed,
        dragEnabled = DEFAULTS.dragEnabled,
        style,
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const sceneRef = useRef<GlobeScene | null>(null)

    const cfgRef = useRef<Config>(null as any)
    cfgRef.current = {
        colorA,
        colorB,
        accent,
        pixel,
        levels,
        land,
        globeSize,
        glowEnabled,
        glowSize,
        speed,
        dragEnabled,
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        let scene: GlobeScene
        try {
            scene = new GlobeScene(container, cfgRef.current)
        } catch {
            return
        }
        sceneRef.current = scene
        scene.setSize(container.clientWidth, container.clientHeight)
        scene.start()

        const ro = new ResizeObserver(() => {
            scene.setSize(container.clientWidth, container.clientHeight)
        })
        ro.observe(container)
        return () => {
            ro.disconnect()
            scene.dispose()
            sceneRef.current = null
        }
    }, [])

    useEffect(() => {
        sceneRef.current?.updateConfig(cfgRef.current)
    }, [
        colorA,
        colorB,
        accent,
        pixel,
        levels,
        land,
        globeSize,
        glowEnabled,
        glowSize,
        speed,
        dragEnabled,
    ])

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label="A dithered globe turning on its axis"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 120,
                minHeight: 120,
                overflow: "hidden",
                ...style,
            }}
        />
    )
}

__OriginkitBase_BayerGlobe.displayName = "Bayer Vortex"
__OriginkitBase_BayerGlobe.defaultProps = { ...DEFAULTS }

const __originkitPresetProps = {
  "colorA": "#F3F0E8", // Background to match page
  "colorB": "#4285F4", // Globe Ocean (Google Blue)
  "accent": "#34A853", // Globe Landmasses (Google Green)
  "pixel": 12, // Lower pixel size for much better readability
  "speed": 8,
  "dragEnabled": true
};

export default function BayerGlobe(props: Record<string, unknown>) {
  return <__OriginkitBase_BayerGlobe {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
