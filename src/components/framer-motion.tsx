'use client'

import { motion, useInView } from "motion/react";
import { PropsWithChildren, useRef } from "react";

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH3 = motion.h3;

interface AnimatedSectionProps {
  className?: string;
}
export function AnimatedSection({
  children,
  className
}: PropsWithChildren<AnimatedSectionProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.section >
  );
}
