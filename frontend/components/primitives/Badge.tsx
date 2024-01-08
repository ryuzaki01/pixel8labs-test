import { styled } from 'stitches.config'

export default styled('span', {
  display: 'inline-block',
  fontSize: 10,
  fontFamily: '$button',
  backgroundColor: '#fff',
  px: 5,
  py: 2,
  variants: {
    color: {
      primary: {
        color: '$primary7'
      },
      secondary: {
        color: '#000'
      },
    },
    corners: {
      square: {
        borderRadius: '$base',
      },
      rounded: {
        borderRadius: '$lg',
      },
      pill: {
        borderRadius: 99999,
      },
      circle: {
        borderRadius: '99999px',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    corners: 'rounded'
  },
})
