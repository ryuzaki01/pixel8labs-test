import { Text, Flex, Anchor } from './primitives'
import Image from 'next/image'

export const Footer = () => {
  return (
    <Flex
      css={{
        backgroundColor: '$neutralBgSubtle',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Flex
        justify="center"
        align="center"
        css={{
          py: '$5',
          width: '100%',
          flexDirection: 'column',
          gap: 36
        }}
      >
        <Text color="secondary">© 2023 Pixel8Labs. All rights reserved.</Text>
      </Flex>
    </Flex>
  )
}
