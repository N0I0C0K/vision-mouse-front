import { ElementType, FC, ReactElement } from 'react'
import Stack from './stack'
import { Heading, Text } from './typography'
import { cn } from '@/lib/utils'
import { Space } from './space'
import Center from './center'

export interface SettingItemProps {
  className?: string
  title: string
  description?: string
  funcElement: ReactElement
  Icon: ElementType
}

export const SettingItem: FC<SettingItemProps> = ({
  Icon,
  className,
  description: subTitle,
  title,
  funcElement,
}) => {
  return (
    <Stack
      direction={'row'}
      className={cn('border rounded-md p-4 shadow-sm', className)}
      center
    >
      <Icon className='mr-5 w-5 h-5' />
      <Stack direction={'column'}>
        <Text>{title}</Text>
        {subTitle && (
          <Text level='xs' className='text-gray-400'>
            {subTitle}
          </Text>
        )}
      </Stack>
      <Space />
      <Center className='min-w-[4rem]' column>
        {funcElement}
      </Center>
    </Stack>
  )
}
