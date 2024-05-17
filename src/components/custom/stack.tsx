import { styled } from '@stitches/react'

const Stack = styled('div', {
  display: 'flex',
  variants: {
    direction: {
      row: {
        display: 'flex',
        flexDirection: 'row',
      },
      column: {
        display: 'flex',
        flexDirection: 'column',
      },
      rowr: {
        display: 'flex',
        flexDirection: 'row-reverse',
      },
      columnr: {
        display: 'flex',
        flexDirection: 'column-reverse',
      },
    },
    center: {
      true: {
        alignItems: 'center',
      },
    },
  },
})

export default Stack
