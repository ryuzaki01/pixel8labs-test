import Link from 'next/link'
import Image from "next/image"
import {useMediaQuery} from "react-responsive";
import { signIn, signOut, useSession } from 'next-auth/react';
import * as HoverCard from '@radix-ui/react-hover-card'

import {Avatar, Box, Button, Flex, Text} from '../primitives'
import NavItem from './NavItem'
import { useMounted } from 'hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const NAVBAR_HEIGHT = 80
const Navbar = () => {
  const { data: session } = useSession();
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 600 }) && isMounted

  if (!isMounted) {
    return null
  }

  return (
    <Flex
      css={{
        height: NAVBAR_HEIGHT,
        width: '100%',
        mx: 'auto',
        zIndex: 999,
        background: '$neutralBg',
        position: 'fixed',
        borderBottom: '1px solid #F2F4F7',
        boxShadow: '0px 1px 2px 0px #1018280D',
        top: 0,
        left: 0,
        right: 0
      }}
      align="center"
      justify="center"
    >
      <Flex
        css={{
          width: '100%',
          maxWidth: 1280,
          px: 16,
          '@lg': {
            px: 32
          }
        }}
        align="center"
        justify="between"
      >
        <Flex align="center" justify="between" css={{ flex: 1 }}>
          <Flex align="center" css={{ flex: 1, gap: 32 }}>
            <Link href={`/`}>
              <Flex
                align="center"
                css={{
                  gap: 10,
                  p: 10
                }}
              >
                <Image
                  src="/images/pixel8labs-icon.svg"
                  width={34}
                  height={36}
                  alt="ART"
                />
                <Text css={{ fontSize: 18 }} bolder>Simple<Text css={{ color: '#DD2590', fontSize: 18 }} bolder>.</Text>Repo</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>

        {!isSmallDevice && (
          <Flex css={{ gap: '$3' }} justify="end" align="center">
            <Box css={{ maxWidth: '185px' }}>
              {session ? (
                <HoverCard.Root openDelay={200}>
                  <HoverCard.Trigger>
                    <Flex
                      align="center"
                      css={{
                        px: 16,
                        py: 8,
                        gap: 16,
                        cursor: 'pointer',
                        borderRadius: 360,
                        border: '1px solid $gray300',
                        '&:hover': {
                          backgroundColor: "$gray100"
                        }
                      }}
                    >
                      <Avatar size="medium" src={session?.user?.image || ''} />
                      <FontAwesomeIcon icon={faBars} style={{ width: 24, height: 24 }} color="#000" />
                    </Flex>
                  </HoverCard.Trigger>
                  <HoverCard.Content sideOffset={0} align="end">
                    <Flex
                      direction="column"
                      css={{
                        backgroundColor: '#fff',
                        py: 8,
                        mt: 6,
                        zIndex: 1000,
                        borderRadius: 8,
                        width: 'auto',
                        minWidth: 'max-content',
                        boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
                        border: '1px solid $gray100'
                      }}
                    >
                      <Flex
                        css={{
                          gap: 12,
                          borderBottom: '1px solid $gray100',
                          py: 12,
                          px: 16,
                        }}
                      >
                        <Avatar size="medium" src={session.user?.image || ''} />
                        <Flex
                          direction="column"
                        >
                          <Text style="body2" bolder>{session.user?.name}</Text>
                          <Text color="secondary">{session.user?.email}</Text>
                        </Flex>
                      </Flex>
                      <NavItem
                        /** @ts-ignore **/
                        as={Link}
                        css={{
                          py: 10,
                          px: 16,
                          display: 'flex',
                          '&:hover': {
                            backgroundColor: "#F7F8FC",
                          }
                        }}
                        href="/"
                      >
                        <Text style="body1" color="dark" css={{ fontWeight: 500 }}>View Profile</Text>
                      </NavItem>
                      <Flex css={{ height: 2, backgroundColor: '$gray100' }} />
                      <NavItem
                        css={{
                          py: 10,
                          px: 16,
                          display: 'flex',
                          '&:hover': {
                            backgroundColor: "#F7F8FC",
                          }
                        }}
                        onClick={() => signOut()}
                      >
                        <Text style="body1" color="dark" css={{ fontWeight: 500 }}>Log out</Text>
                      </NavItem>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>
              ) : (
                <Button size="sm" onClick={() => signIn('github')}>Login with Github</Button>
              )}
            </Box>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
