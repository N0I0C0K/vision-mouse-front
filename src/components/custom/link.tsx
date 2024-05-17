import React, { FC, ReactElement } from 'react'
import { Link, LinkProps } from 'react-router-dom'

export interface SelectLinkProps extends LinkProps {
  title: string
  selected?: boolean
  icon?: ReactElement
}

export const SelectLink: FC<SelectLinkProps> = ({
  selected,
  icon,
  title,
  ...rest
}) => {
  return (
    <Link
      className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
        selected ? 'bg-muted text-primary' : 'text-muted-foreground'
      }`}
      {...rest}
    >
      {icon}
      {title}
    </Link>
  )
}
