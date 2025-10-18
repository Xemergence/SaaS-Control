'use client'

// React Imports
import { useRef } from 'react'

// Third-party Imports
import { BrainCircuitIcon, CodeIcon, FigmaIcon, LayoutDashboardIcon, NotepadTextIcon } from 'lucide-react'

// Component Imports

import { AnimatedBeam } from '@/components/ui/animated-beam'

const WorkflowAutomation = () => {
  // Vars
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)
  const span4Ref = useRef<HTMLSpanElement>(null)

  return (
    <div ref={containerRef} className='relative z-10 px-8'>
      <div className='flex flex-col items-center justify-between gap-6'>
        <div
          ref={div1Ref}
          className='bg-card flex w-fit items-center gap-2 rounded-full border px-2.5 py-1.5 shadow-md'
        >
          <FigmaIcon className='h-[21.6px] w-[21.6px]' />
          <span className='text-card-foreground text-base font-medium'>Design</span>
        </div>
        <div className='w-ful flex items-center justify-between gap-15.5'>
          <span ref={span1Ref} className='size-0.5' />
          <div ref={div2Ref} className='bg-card h-5 w-5 rotate-45 rounded-xs border'></div>
          <span ref={span2Ref} className='size-0.5' />
        </div>
        <div className='flex items-center justify-between gap-6'>
          <div ref={div3Ref} className='flex w-30 justify-center'>
            <div className='bg-card flex items-center gap-2 rounded-full border px-2.5 py-1.5 shadow-md'>
              <BrainCircuitIcon className='h-[21.6px] w-[21.6px]' />
              <span className='text-card-foreground text-base font-medium'>AI</span>
            </div>
          </div>
          <div ref={div4Ref} className='flex w-30 justify-center'>
            <div className='bg-card flex items-center gap-2 rounded-full border px-2.5 py-1.5 shadow-md'>
              <NotepadTextIcon className='h-[21.6px] w-[21.6px]' />
              <span className='text-card-foreground text-base font-medium'>Instructions</span>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between gap-15.5'>
          <span ref={span3Ref} className='size-0.5' />
          <div ref={div5Ref} className='bg-card h-5 w-5 rotate-45 rounded-xs border'></div>
          <span ref={span4Ref} className='size-0.5' />
        </div>
        <div
          ref={div6Ref}
          className='bg-card flex w-fit items-center gap-2 rounded-full border px-2.5 py-1.5 shadow-md'
        >
          <CodeIcon className='h-[21.6px] w-[21.6px]' />
          <span className='text-card-foreground text-base font-medium'>Code</span>
        </div>
        <div
          ref={div7Ref}
          className='bg-card flex w-fit items-center gap-2 rounded-full border px-2.5 py-1.5 shadow-md'
        >
          <LayoutDashboardIcon className='h-[21.6px] w-[21.6px]' />
          <span className='text-card-foreground text-base font-medium'>Result</span>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={span1Ref}
        reverse
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={span2Ref}
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span1Ref}
        toRef={div3Ref}
        reverse
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span2Ref}
        toRef={div4Ref}
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={span3Ref}
        reverse
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={span4Ref}
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span3Ref}
        toRef={div5Ref}
        delay={1.85}
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span4Ref}
        toRef={div5Ref}
        reverse
        delay={1.85}
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        delay={1.85}
        className='text-primary -z-10'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        delay={1.85}
        className='text-primary -z-10'
        duration={4}
      />
    </div>
  )
}

export default WorkflowAutomation
