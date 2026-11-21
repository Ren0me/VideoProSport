"use client"

import * as React from "react"

import styles from './accordion.module.scss';

const CENTER = 24
const BLADE_COUNT = 6
const INNER_RADIUS = 17
const OUTER_RADIUS = 120
const BLADE_START = -20
const BLADE_END = 50

const polar = (radius: number, angle: number) => {
  const radians = (angle * Math.PI) / 180

  return `${(CENTER + radius * Math.cos(radians)).toFixed(3)} ${(
    CENTER + radius * Math.sin(radians)
  ).toFixed(3)}`
}

const BLADE_PATH = [
  `M ${polar(INNER_RADIUS, BLADE_START)}`,
  `L ${polar(INNER_RADIUS, BLADE_END)}`,
  `L ${polar(OUTER_RADIUS, BLADE_END)}`,
  `L ${polar(OUTER_RADIUS, BLADE_START)}`,
  "Z",
].join(" ")

export function ApertureIcon({ className }: { className?: string }) {
  const clipId = `aperture-blades-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={CENTER} cy={CENTER} r="20.5" />
        </clipPath>
      </defs>
      <circle className={styles.apertureRing} cx={CENTER} cy={CENTER} r="21" />
      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: BLADE_COUNT }, (_, index) => (
          <g
            key={index}
            className={styles.apertureBladeGroup}
            style={
              {
                "--blade-rotation": `${index * (360 / BLADE_COUNT)}deg`,
              } as React.CSSProperties
            }
          >
            <path className={styles.apertureBlade} d={BLADE_PATH} />
          </g>
        ))}
      </g>
    </svg>
  )
}
