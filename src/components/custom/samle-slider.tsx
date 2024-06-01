import { Slider } from '@/components/ui/slider'
import { cn, getDecimalPlaces } from '@/lib/utils'
import {
  FC,
  ComponentPropsWithoutRef,
  useMemo,
  useState,
  useEffect,
} from 'react'
import Stack from './stack'
import { Text } from './typography'

interface SampleSliderProps extends ComponentPropsWithoutRef<typeof Slider> {
  range: {
    min: number
    max: number
  }
  className?: string
  onValueCmt?: (val: number[]) => void
}

export const SampleSlider: FC<SampleSliderProps> = ({
  className,
  value,
  range,
  step,
  onValueCmt,
  ...props
}) => {
  const max = useMemo(() => range.max - range.min, [range])
  const val = useMemo(() => {
    return value === undefined ? [] : value.map((v) => v - range.min)
  }, [range.min, value])
  const [_val, SetVal] = useState(val)
  useEffect(() => {
    SetVal(val)
  }, [val, value])
  const decim = useMemo(
    () => (step === undefined ? 0 : getDecimalPlaces(step)),
    [step]
  )
  return (
    <Stack center className={cn('w-28', className)}>
      <Slider
        className={cn('flex-1')}
        value={_val}
        max={max}
        onValueChange={(vals) => {
          SetVal(vals)
        }}
        onValueCommit={(val) => {
          onValueCmt?.(val.map((v) => v + range.min))
        }}
        step={step}
        {...props}
      />
      <Text className='ml-4'>
        {_val.map((v) => (v + range.min).toFixed(decim))}
      </Text>
    </Stack>
  )
}
