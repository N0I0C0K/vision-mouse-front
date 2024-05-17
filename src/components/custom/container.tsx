import { styled } from '@stitches/react'

const Container = styled('div', {
  borderRadius: 'var(--radius)',
  variants: {
    border: {
      true: {
        borderWidth: '1px',
      },
    },
  },
})

export default Container
