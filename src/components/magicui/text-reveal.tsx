// Vendored from Magic UI (magicui.design/docs/components/text-reveal), MIT licence. Local edits: relative import, site tokens.
"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "../../lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children?: string
  /** Local edit: text as a prop, because Astro passes slot children as an element. */
  text?: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, text, className }) => {
  const content = text ?? children
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  })

  if (typeof content !== "string") {
    throw new Error("TextReveal: text must be a string")
  }

  const words = content.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 flex h-[50%] w-full max-w-[58rem] items-center bg-transparent py-20"
        }
      >
        <span
          className={
            "flex flex-wrap font-display text-[clamp(1.75rem,1rem+3vw,3.6rem)] leading-[1.12] font-normal tracking-[-0.02em] text-text"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  // Local edit: the word being read lights up in the accent, then settles to the text colour.
  const span = range[1] - range[0]
  const color = useTransform(
    progress,
    [range[0], range[1], Math.min(1, range[1] + span * 3)],
    ["var(--accent)", "var(--accent)", "var(--text)"],
  )
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-25" aria-hidden="true">{children}</span>
      <motion.span
        style={{ opacity, color }}
      >
        {children}
      </motion.span>
    </span>
  )
}
