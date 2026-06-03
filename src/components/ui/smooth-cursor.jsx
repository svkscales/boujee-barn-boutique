import React, { useEffect, useState } from "react"
import { motion, useMotionValue } from "motion/react"

export function SmoothCursor({ className = "" }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (e.pointerType === "touch") return
      x.set(e.clientX)
      y.set(e.clientY)
      setIsVisible(true)
    }

    const handlePointerLeave = () => setIsVisible(false)

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerout", handlePointerLeave, { passive: true })
    
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerout", handlePointerLeave)
    }
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999999]"
      style={{
        top: y,
        left: x,
        opacity: isVisible ? 1 : 0,
        willChange: "transform"
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        className={`rotate-[-70deg] stroke-white text-black ${className}`}
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
    </motion.div>
  )
}

