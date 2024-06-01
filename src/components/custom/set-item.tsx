import { ElementType, FC, ReactElement } from 'react'
import Stack from './stack'
import { Heading, Text } from './typography'
import { cn } from '@/lib/utils'
import { Space } from './space'
import Center from './center'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'

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

export interface ExpandSettingItemProps {
  className?: string
  title: string
  description?: string
  children: ReactElement
  Icon: ElementType
}

export const ExpandSettingItem: FC<ExpandSettingItemProps> = ({
  className,
  title,
  description,
  children,
  Icon,
}) => {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem
        value='item-1'
        className={cn('border px-4 rounded-md shadow-sm', className)}
      >
        <AccordionTrigger>
          <Stack center>
            <Icon className='mr-5 w-5 h-5' />
            <Stack direction={'column'} className='items-start'>
              <Text>{title}</Text>
              {description && (
                <Text gray level='xs'>
                  {description}
                </Text>
              )}
            </Stack>
          </Stack>
        </AccordionTrigger>
        <AccordionContent>
          <Separator />
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
