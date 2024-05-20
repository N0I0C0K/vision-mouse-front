import { styled } from '@stitches/react'

const Container = styled('div', {
  borderRadius: 'var(--radius)',
  variants: {
    border: {
      true: {
        borderWidth: '1px',
      },
    },
    full: {
      true: {
        width: '100%',
        height: '100%',
      },
    },
  },
})

export default Container
