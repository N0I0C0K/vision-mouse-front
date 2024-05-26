import { cn } from '@/lib/utils'
import React, { FC, ReactElement } from 'react'
import { Link, LinkProps } from 'react-router-dom'

export interface SelectLinkProps extends LinkProps {
  title: string
  selected?: boolean
  icon?: ReactElement
  rightElement?: ReactElement
}

export const SelectLink: FC<SelectLinkProps> = ({
  selected,
  icon,
  title,
  className,
  rightElement,
  ...rest
}) => {
  return (
    <Link
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary',
        ` ${selected ? 'bg-muted text-primary' : 'text-muted-foreground'}`,
        className
      )}
      {...rest}
    >
      {icon}
      {title}
      {rightElement}
    </Link>
  )
}
