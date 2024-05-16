import { FC, ReactElement } from 'react'

export interface SelectLinkProps {
  title: string
  selected: boolean
  icon?: ReactElement
}

export const SelectLink: FC<SelectLinkProps> = ({ selected }) => {
  return <link></link>
}
