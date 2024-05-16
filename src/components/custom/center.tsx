import { styled } from '@stitches/react'

const Center = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  variants: {
    column: {
      true: {
        height: '100%',
        alignItems: 'center',
      },
    },
  },
})

export default Center
