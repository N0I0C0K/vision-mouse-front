import { cn } from '@/lib/utils'
import { FC, cloneElement } from 'react'

interface IconProps {
  className?: string
}

function GenIcon(Element: React.ReactElement): FC<IconProps> {
  const ModifiedIcon: FC<IconProps> = ({ className }) => {
    const mergedClassName = cn('w-6 h-6 fill-current', className)
    return cloneElement(Element, { className: mergedClassName })
  }

  return ModifiedIcon
}

export const MouseLeftButton = GenIcon(
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <title>mouse-left-click</title>
    <path d='M13 9V1.07C16.94 1.56 20 4.92 20 9H13M6.34 20.66C4.84 19.16 4 17.12 4 15V11H20V15C20 17.12 19.16 19.16 17.66 20.66C16.16 22.16 14.12 23 12 23C9.88 23 7.84 22.16 6.34 20.66M11 9V1.07C10.3 1.16 9.63 1.33 9 1.59C6.67 2.53 4.89 4.53 4.25 7C4.09 7.64 4 8.31 4 9H11M6.34 7C6.82 5.65 7.78 4.5 9 3.81V7H6.34Z' />
  </svg>
)

export const MouseRightButton = GenIcon(
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <title>mouse-right-click</title>
    <path d='M13 9V1.07C13.7 1.16 14.37 1.33 15 1.59C17.33 2.53 19.11 4.53 19.75 7C19.91 7.64 20 8.31 20 9H13M17.66 7C17.18 5.65 16.23 4.5 15 3.81V7H17.66M11 9V1.07C7.06 1.56 4 4.92 4 9H11M6.34 20.66C4.84 19.16 4 17.12 4 15V11H20V15C20 17.12 19.16 19.16 17.66 20.66C16.16 22.16 14.12 23 12 23C9.88 23 7.84 22.16 6.34 20.66Z' />
  </svg>
)

export const MouseScrollDown = GenIcon(
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <title>mouse-move-down</title>
    <path d='M7 9H2C2 6.04 4.17 3.57 7 3.09V9M20 7H18V13H15L19 17L23 13H20V7M9 3.09V9H14C14 6.04 11.83 3.57 9 3.09M2 15C2 18.3 4.7 21 8 21S14 18.3 14 15V11H2V15Z' />
  </svg>
)

export const MouseScrollUp = GenIcon(
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <title>mouse-move-up</title>
    <path d='M7 9H2C2 6.04 4.17 3.57 7 3.09V9M18 17H20V11H23L19 7L15 11H18V17M9 3.09V9H14C14 6.04 11.83 3.57 9 3.09M2 15C2 18.3 4.7 21 8 21S14 18.3 14 15V11H2V15Z' />
  </svg>
)
