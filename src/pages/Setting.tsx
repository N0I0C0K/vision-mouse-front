import { SettingItem } from '@/components/custom/set-item'
import Stack from '@/components/custom/stack'
import { ThemeToggle } from '@/components/custom/theme'
import { Heading } from '@/components/custom/typography'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, Palette, Power } from 'lucide-react'
import { observer } from 'mobx-react-lite'

export const SettingPage = observer(() => {
  return (
    <Stack direction={'column'} className='gap-2'>
      <Heading level='h3' className='text-2xl mb-4' styled>
        Setting
      </Heading>
      <SettingItem
        title='Auto load on power on'
        subTitle='test sub title'
        Icon={Power}
        funcElement={<Checkbox />}
      />
      <SettingItem
        title='Auto lanuch on open'
        subTitle='will auto active vision mouse on open'
        Icon={Eye}
        funcElement={<Checkbox />}
      />
      <SettingItem
        title='Theme'
        subTitle='switch dark/light mode'
        Icon={Palette}
        funcElement={<ThemeToggle />}
      />
    </Stack>
  )
})
