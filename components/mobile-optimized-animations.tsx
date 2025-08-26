"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface MobileOptimizedMotionProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  viewport?: any;
}

export function MobileOptimizedMotion({
  children,
  className = "",
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  whileHover,
  whileTap,
  transition = { duration: 0.4, ease: "easeOut" },
  viewport = { once: true, margin: "-50px" },
  ...props
}: MobileOptimizedMotionProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Disable complex animations on mobile or when user prefers reduced motion
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const disableComplexAnimations = shouldReduceMotion || isMobile;

  if (disableComplexAnimations) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function OptimizedMotionDiv({ children, ...props }: MobileOptimizedMotionProps) {
  return <MobileOptimizedMotion {...props}>{children}</MobileOptimizedMotion>;
}
