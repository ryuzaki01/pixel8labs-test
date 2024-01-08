import { Text } from 'components/primitives'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import {CSS} from "@stitches/react";

type NavItemProps = {
  active?: boolean
  css?: CSS
  children: ReactNode
}

const NavItem = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof Text> & NavItemProps
>(({ children, active, css, ...props }, forwardedRef) => (
  <Text
    ref={forwardedRef}
    css={{
      color: active ? 'rgba(43, 82, 238, 1)' : '#08090C',
      cursor: 'pointer',
      '&:hover': {
        color: 'rgba(43, 82, 238, 1)',
      },
      ...css
    }}
    as="p"
    style="body1"
    {...props}
  >
    {children}
  </Text>
))

export default NavItem
