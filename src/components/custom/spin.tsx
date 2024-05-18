import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { FC } from 'react'

export const Spin: FC<{
  className?: string
}> = ({ className }) => {
  return <LoaderCircle className={cn('animate-spin h-5 w-5 mr-3', className)} />
}
