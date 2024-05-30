import { styled } from '@stitches/react'
import { motion } from 'framer-motion'

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
  defaultVariants: {
    direction: 'row',
    center: false,
  },
})

export const AnimateStack = styled(motion.div, {
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
  defaultVariants: {
    direction: 'row',
    center: false,
  },
})

export default Stack
