import * as motion from 'motion/react-client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'

import Collaboration from '@/components/shadcn-studio/blocks/bento-grid-07/collaboration'
import WorkflowAutomation from '@/components/shadcn-studio/blocks/bento-grid-07/workflow-automation'
import SmartData from '@/components/shadcn-studio/blocks/bento-grid-07/smart-data'
import ShieldCheck from '@/assets/svg/shield-check'

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        {/* Header Section */}
        <div className='mx-auto max-w-3xl space-y-4 text-center'>
          <div className='flex justify-center'>
            <Badge className='transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow hover:bg-primary/80 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary'>
              Our Approach
            </Badge>
          </div>
          <MotionPreset
            component='h2'
            fade
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
            className='text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl'
          >
            Your All in One Platform
          </MotionPreset>

          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.5 }}>
            <p className='text-muted-foreground text-base leading-relaxed md:text-lg'>
              From visualization to action — simplify how your organization works with data every day.
            </p>
          </MotionPreset>
        </div>

        <MotionPreset fade blur transition={{ duration: 0.5 }} delay={0.6}>
          <div className='relative overflow-hidden rounded-[2rem] border border-border/40 bg-background/80 p-4 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)] backdrop-blur-xl max-sm:p-2 sm:p-6 lg:p-8 dark:border-white/10 dark:bg-slate-950/60'>
            <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_15%,rgba(126,87,255,0.2),transparent_65%),radial-gradient(circle_at_82%_20%,rgba(59,130,246,0.18),transparent_64%),radial-gradient(circle_at_50%_85%,rgba(236,72,153,0.22),transparent_70%)] opacity-80 dark:bg-[radial-gradient(circle_at_15%_10%,rgba(126,87,255,0.32),transparent_68%),radial-gradient(circle_at_84%_22%,rgba(59,130,246,0.28),transparent_70%),radial-gradient(circle_at_52%_86%,rgba(236,72,153,0.26),transparent_72%)]' />
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6'>
            {/* Smart Data Insights */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full sm:col-span-2 lg:col-span-3'
              delay={0.7}
            >
              <Card className='rounded-2xl border border-border/40 bg-background/90 shadow-lg shadow-primary/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70'>
                <CardContent className='p-5'>
                  <SmartData />
                </CardContent>
                <CardHeader className='gap-3 px-5 pb-5'>
                  <CardTitle className='text-lg tracking-tight'>Smart Data Insights</CardTitle>
                  <CardDescription className='text-sm font-medium leading-relaxed text-muted-foreground'>
                    Turn raw metrics into interactive visual stories with powerful analytics tools.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Modular Dashboards */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-3'
              delay={0.85}
            >
              <Card className='justify-between rounded-2xl border border-border/40 bg-background/90 shadow-lg shadow-primary/5 backdrop-blur-md overflow-hidden lg:col-span-3 dark:border-white/10 dark:bg-slate-900/70'>
                <CardContent className='p-5'>
                  <div className='max-h-90 w-full overflow-hidden rounded-lg'>
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-1.png'
                      alt='Modular Dashboards'
                      className='w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105'
                    />
                  </div>
                </CardContent>
                <CardHeader className='gap-3 px-5 pb-5'>
                  <CardTitle className='text-lg tracking-tight'>Modular Dashboards</CardTitle>
                  <CardDescription className='text-sm font-medium leading-relaxed text-muted-foreground'>
                    Build personalized dashboards with flexible layouts for deep data visibility.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Live Collaboration */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-2'
              delay={1}
            >
              <Card className='h-full justify-between rounded-2xl border border-border/40 bg-background/90 shadow-lg shadow-primary/5 backdrop-blur-md overflow-hidden dark:border-white/10 dark:bg-slate-900/70'>
                <CardContent className='relative flex h-60 w-full items-center justify-center p-5'>
                  <motion.svg
                    width='1em'
                    height='1em'
                    viewBox='0 0 247 247'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='size-61.5'
                    initial='hidden'
                    animate='visible'
                  >
                    <motion.circle
                      strokeOpacity={0.2}
                      cx='123.5'
                      cy='123.5'
                      r='122.31'
                      fill='var(--card)'
                      stroke='var(--border)'
                      strokeWidth='1.62'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { duration: 2.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />
                    <motion.circle
                      strokeOpacity={0.4}
                      cx='123.5'
                      cy='123.5'
                      r='104.69'
                      fill='var(--card)'
                      stroke='var(--border)'
                      strokeWidth='1.35'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { delay: 0.12, duration: 2.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />
                    <motion.circle
                      strokeOpacity={0.6}
                      cx='123.5'
                      cy='123.5'
                      r='87.3127'
                      fill='var(--card)'
                      stroke='var(--border)'
                      strokeWidth='1.125'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { delay: 0.24, duration: 2.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />
                    <motion.circle
                      strokeOpacity={0.8}
                      cx='123.5'
                      cy='123.5'
                      r='69.8801'
                      fill='var(--card)'
                      stroke='var(--border)'
                      strokeWidth='1.125'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { delay: 0.36, duration: 2.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />
                    <motion.circle
                      strokeOpacity={1}
                      cx='123.5'
                      cy='123.5'
                      r='53.0625'
                      fill='var(--card)'
                      stroke='var(--border)'
                      strokeWidth='1.125'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { delay: 0.48, duration: 2.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />
                  </motion.svg>
                  <Collaboration />
                </CardContent>
                <CardHeader className='gap-3 px-5 pb-5'>
                  <CardTitle className='text-lg tracking-tight'>Live Collaboration</CardTitle>
                  <CardDescription className='text-sm font-medium leading-relaxed text-muted-foreground'>
                    Work with your team in real time to explore data and uncover patterns.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Workflow Automation */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-2'
              delay={1.15}
            >
              <Card className='h-full justify-between rounded-2xl border border-border/40 bg-background/90 shadow-lg shadow-primary/5 backdrop-blur-md overflow-hidden lg:col-span-2 dark:border-white/10 dark:bg-slate-900/70'>
                <CardContent className='p-5'>
                  <WorkflowAutomation />
                </CardContent>
                <CardHeader className='gap-3 px-5 pb-5'>
                  <CardTitle className='text-lg tracking-tight'>Workflow Automation</CardTitle>
                  <CardDescription className='text-sm font-medium leading-relaxed text-muted-foreground'>
                    Automate tasks and connect tools using drag-and-drop logic flows.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Integrated Data Security */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-2'
              delay={1.3}
            >
              <Card className='h-full justify-between rounded-2xl border border-border/40 bg-background/90 shadow-lg shadow-primary/5 backdrop-blur-md overflow-hidden lg:col-span-2 dark:border-white/10 dark:bg-slate-900/70'>
                <CardContent className='flex items-center p-5'>
                  <ShieldCheck className='max-h-50 w-full sm:max-h-60' />
                </CardContent>
                <CardHeader className='gap-3 px-5 pb-5'>
                  <CardTitle className='text-lg tracking-tight'>Integrated Data Security</CardTitle>
                  <CardDescription className='text-sm font-medium leading-relaxed text-muted-foreground'>
                    Secure information with encrypted pipelines and unified data governance.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>
          </div>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default BentoGrid
