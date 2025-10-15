import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Rating } from '@/components/ui/rating'
import { ArrowRight } from 'lucide-react'
import AuthDialog from '@/components/auth/AuthDialog'

export type AvatarItem = {
  src: string
  name: string
  fallback: string
}

const avatars: AvatarItem[] = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    name: 'Howard Lloyd',
    fallback: 'HL'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    name: 'Jenny Wilson',
    fallback: 'JW'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    name: 'Hallie Richards',
    fallback: 'HR'
  }
]

export default function HeroSection() {
  return (
    <section className='from-primary/20 to-background flex min-h-screen flex-1 flex-col bg-gradient-to-bl to-50% bg-[#121219]'>
      <div className='mx-auto grid w-full max-w-7xl flex-1 gap-19 px-4 sm:px-6 lg:grid-cols-2 lg:px-8'>
        {/* Left Content */}
        <div className='flex max-w-2xl flex-col justify-center gap-10 pt-28 pb-12'>
          <div className='flex flex-col items-start gap-8'>
            <MotionPreset
              fade
              slide
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='bg-muted flex items-center gap-2.5 rounded-full border px-3 py-2 bg-purple-900/30 border-purple-500/50'
            >
              <Badge className='rounded-full bg-gradient-to-r from-purple-600 to-blue-600'>AI-Powered</Badge>
              <span className='text-muted-foreground text-gray-300'>Solution for small teams & local businesses</span>
            </MotionPreset>

            <MotionPreset
              component='h1'
              fade
              slide
              delay={0.3}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl text-white'
            >
              Empowering Small Teams & Local Businesses
            </MotionPreset>

            <MotionPreset
              component='p'
              fade
              slide
              delay={0.6}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-muted-foreground text-gray-300'
            >
              Transform your data into digital solutions with our comprehensive control tower platform. Aggregate and visualize critical business metrics from your digital components, enabling real-time insights, cost management, and operational efficiency for small businesses, individuals, and teams.
            </MotionPreset>

            <MotionPreset
              fade
              slide
              delay={0.9}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='flex flex-wrap items-center gap-4'
            >
              <AuthDialog
                mode="signin"
                trigger={
                  <Button size='lg' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'>
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              <Button size='lg' className='bg-primary/10 hover:bg-primary/20 text-primary bg-purple-600/10 hover:bg-purple-600/20 text-purple-400'>
                Live Demo
              </Button>
            </MotionPreset>
          </div>

          <hr className='border-dashed border-gray-700' />

          <MotionPreset
            fade
            slide
            delay={1.5}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex items-center gap-3'
          >
            {/* Avatar Group */}
            <TooltipProvider>
              <div className='flex -space-x-4'>
                {avatars.map((avatar, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md ring-gray-800'>
                        <AvatarImage src={avatar.src} alt={avatar.name} />
                        <AvatarFallback className='text-xs bg-purple-600'>{avatar.fallback}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{avatar.name}</TooltipContent>
                  </Tooltip>
                ))}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md ring-gray-800'>
                      <AvatarFallback className='text-xs bg-blue-600'>+39k</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>39k more</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            <div className='space-y-1'>
              {/* Ratings */}
              <div className='flex gap-0.5'>
                <Rating readOnly variant='yellow' size={24} value={4.5} precision={0.5} />
              </div>

              <span className='text-sm text-gray-400'>From 4000+ Reviews</span>
            </div>
          </MotionPreset>
        </div>

        {/* Right Content */}
        <MotionPreset
          fade
          blur
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='grid grid-cols-2 max-lg:hidden'
        >
          <Marquee vertical pauseOnHover duration={20} gap={1.5} className='h-screen min-h-182 overflow-hidden'>
            <img
              src='/images/admin/expenses-view.png'
              alt='Expenses View'
              className='dark:invert rounded-lg'
            />
            <img
              src='/images/admin/expense-input.png'
              alt='Expense Input'
              className='dark:invert rounded-lg'
            />
            <img
              src='/images/Dashboard Example.png'
              alt='Dashboard'
              className='dark:invert rounded-lg'
            />
            <img
              src='/images/admin/expenses-2-view.png'
              alt='Expenses Overview'
              className='dark:invert rounded-lg'
            />
          </Marquee>

          <Marquee vertical pauseOnHover duration={22} gap={1.5} reverse className='h-screen min-h-182 overflow-hidden'>
            <img
              src='/images/admin/business-and-marketing-view.png'
              alt='Business & Marketing'
              className='dark:invert rounded-lg'
            />
            <img
              src='/images/Dashboard Example.png'
              alt='Dashboard Analytics'
              className='dark:invert rounded-lg'
            />
            <img
              src='/images/admin/expenses-view.png'
              alt='Expenses'
              className='dark:invert rounded-lg'
            />
            <img
              src='/images/admin/expense-input.png'
              alt='Input Form'
              className='dark:invert rounded-lg'
            />
            <img
              src='/images/admin/expenses-2-view.png'
              alt='Financial Overview'
              className='dark:invert rounded-lg'
            />
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  )
}