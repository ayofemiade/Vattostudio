"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"

const bentoGridVariants = cva(
  "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
          [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
        `,
        /* ── 3-video cinematic layout ──────────────────────────────
           ┌──────────────────────┬────────────┐
           │  Cell 1 (large)      │  Cell 2    │
           │  col-span-2 row-1    │  row-span-2│
           ├──────────────────────┤            │
           │  Cell 3              │            │
           │  col-span-2 row-2    │            │
           └──────────────────────┴────────────┘
        ─────────────────────────────────────── */
        threeVideos: `
          grid-cols-3 grid-rows-2
          [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-1
          [&>*:nth-child(2)]:col-span-1 [&>*:nth-child(2)]:row-span-2
          [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:row-span-1
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
      `,
        fourCells: `
        grid-cols-3 grid-rows-2
        [&>*:first-child]:col-span-1
        [&>*:nth-child(2)]:col-span-2
        [&>*:nth-child(3)]:col-span-2
      `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}
const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)
function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}
const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  )
})
BentoGrid.displayName = "BentoGrid"

interface BentoCellProps extends HTMLMotionProps<"div"> {
  index?: number
}

const BentoCell = React.forwardRef<HTMLDivElement, BentoCellProps>(
  ({ className, style, index = 0, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()

    // Fly-in vectors — each cell launches from a screen quadrant and assembles to centre
    // Works for both the 5-cell default layout and the 3-cell threeVideos layout
    let startX = "-35%"
    let startY = "0%"

    if (index === 0) {
      startX = "-65%"
      startY = "-45%"
    } else if (index === 1) {
      startX = "65%"
      startY = "-55%"
    } else if (index === 2) {
      // Bottom-left for 3-video layout (was index 3 in 5-cell layout)
      startX = "-55%"
      startY = "55%"
    } else if (index === 3) {
      startX = "-55%"
      startY = "55%"
    } else if (index === 4) {
      startX = "0%"
      startY = "65%"
    }

    const x = useTransform(scrollYProgress, [0.1, 0.9], [startX, "0%"])
    const y = useTransform(scrollYProgress, [0.1, 0.9], [startY, "0%"])
    const scale = useTransform(scrollYProgress, [0, 0.9], [0.5, 1])

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ x, y, scale, ...style }}
        {...props}
      ></motion.div>
    )
  }
)
BentoCell.displayName = "BentoCell"


const ContainerScale = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const opacity = useTransform(scrollYProgress, [0, 0.42], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.42], [1, 0.65])

    return (
      <motion.div
        ref={ref}
        className={cn("absolute left-1/2 top-1/2 size-fit", className)}
        style={{
          x: "-50%",
          y: "-50%",
          scale,
          opacity,
          ...style,
        }}
        {...props}
      />
    )
  }
)
ContainerScale.displayName = "ContainerScale"
export { ContainerScroll, BentoGrid, BentoCell, ContainerScale }
