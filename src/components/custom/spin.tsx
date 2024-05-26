import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { FC } from 'react'

export const Spin: FC<{
  className?: string
}> = ({ className }) => {
  return <LoaderCircle className={cn('animate-spin h-4 w-4 mr-2', className)} />
}
