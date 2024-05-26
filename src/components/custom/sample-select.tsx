import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { FC } from 'react'

export interface SelectItemProps {
  value: string
  lable: string
}

export interface SampleSelectProps
  extends React.ComponentPropsWithoutRef<typeof Select> {
  className?: string
  placeholder: string
  value?: string
  label?: string
  items: SelectItemProps[]
}

export const SampleSelect: FC<SampleSelectProps> = ({
  placeholder,
  className,
  value,
  items,
  label,
  ...props
}) => {
  return (
    <Select value={value} {...props}>
      <SelectTrigger className={cn('w-[180px]', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items.map((val) => (
            <SelectItem value={val.value}>{val.lable}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
