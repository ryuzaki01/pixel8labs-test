import { styled } from 'stitches.config'
import Flex from 'components/primitives/Flex'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react'
import { CSS } from '@stitches/react'
import Box from "./Box";

export const StyledInput = styled('input', {
  all: 'unset',
  width: '100%',
  px: 16,
  py: 12,
  borderRadius: 8,
  fontFamily: '$body',
  fontSize: 16,
  color: '$gray12',
  border: '2px solid $gray3',
  $$focusColor: '$colors$primary9',
  '&::placeholder': { color: '$gray10' },
  '&:focus': { boxShadow: 'inset 0 0 0 1px $$focusColor' },
  '&:disabled': {
    backgroundColor: '$gray2',
    color: '$gray9',
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  '&[type=number]': {
    '-moz-appearance': 'textfield',
  },
})

const Input = forwardRef<
  ElementRef<typeof StyledInput>,
  ComponentPropsWithoutRef<typeof StyledInput> & {
    before?: ReactNode
    after?: ReactNode
    css?: CSS
    containerCss?: CSS
    beforeCss?: CSS,
    afterCss?: CSS,
}
>(({ children, before, after, css, containerCss, beforeCss, afterCss, ...props }, forwardedRef) => (
  <Flex css={{ ...containerCss, position: 'relative' }}>
    {before && (
      <Box css={{ position: 'absolute', top: 12, left: 12, ...beforeCss }}>{before}</Box>
    )}
    <StyledInput css={{ pl: before ? 46 : 12, pr: after ? 46 : 12, ...css }} ref={forwardedRef} {...props} />
    {after && (
      <Box css={{ position: 'absolute', top: 12, right: 12, ...afterCss }}>{after}</Box>
    )}
  </Flex>
))

export default Input
