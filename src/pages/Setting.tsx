import { SettingItem } from '@/components/custom/set-item'
import Stack from '@/components/custom/stack'
import { ThemeToggle } from '@/components/custom/theme'
import { Heading, Text } from '@/components/custom/typography'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, Palette, Power } from 'lucide-react'
import { observer } from 'mobx-react-lite'

export const SettingPage = observer(() => {
  return (
    <Stack direction={'column'} className='gap-2'>
      <Stack direction={'column'} className='mb-4'>
        <Heading level='h3' className=''>
          设置
        </Heading>
        <Text level='s' gray>
          软件的常用设置
        </Text>
      </Stack>
      <SettingItem
        title='开机自启'
        description='当系统开机时自动启动软件'
        Icon={Power}
        funcElement={<Checkbox />}
      />
      <SettingItem
        title='自动运行'
        description='当软件打开时自动开始运行手势跟踪'
        Icon={Eye}
        funcElement={<Checkbox />}
      />
      <SettingItem
        title='Theme'
        description='切换 暗黑/亮色 模式'
        Icon={Palette}
        funcElement={<ThemeToggle />}
      />
    </Stack>
  )
})
