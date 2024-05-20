import { cn } from '@/lib/utils'
import { FC } from 'react'

const headingLevelToSizeMapping = {
  h1: 'text-5xl',
  h2: 'text-3xl',
  h3: 'text-1xl',
  h4: 'text-lg',
  h5: 'text-base',
}

type SupportHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: SupportHeadingLevel
  styled?: boolean
}

export const Heading: FC<HeadingProps> = ({
  level = 'h3',
  children,
  className,
  styled,
  ...props
}) => {
  return (
    <h1
      className={cn(
        `${headingLevelToSizeMapping[level]} font-bold subpixel-antialiased`,
        className,
        styled ? 'poetsen-one-regular' : ''
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

type SupportTextLevel = 'xs' | 's' | 'md' | 'lg' | 'xl'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  level?: SupportTextLevel
}

const pLevelToSizeMapping = {
  xs: 'text-xs',
  s: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

export const Text: FC<TextProps> = ({
  level = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <p
      {...props}
      className={cn('font-normal', pLevelToSizeMapping[level], className)}
    >
      {children}
    </p>
  )
}
