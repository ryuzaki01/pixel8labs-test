import {Box, Button, Avatar, Flex, Text} from 'components/primitives'
import * as RadixDialog from '@radix-ui/react-dialog'
import {
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from "next/image"
import {FullscreenModal} from './FullscreenModal'
import {useProfile} from 'hooks'
import { signIn, signOut, useSession } from 'next-auth/react';

const HamburgerMenu = () => {
  const { status } = useSession()
  const { data: profile } = useProfile()

  const trigger = (
    <Button
      css={{justifyContent: 'center', width: '44px', height: '44px', mr: 8 }}
      type="button"
      size="sm"
      color="white"
    >
      <FontAwesomeIcon icon={faBars} width={16} height={16}/>
    </Button>
  )

  return (
    <FullscreenModal trigger={trigger}>
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Flex
          css={{
            py: 17,
            px: 26,
            width: '100%',
            borderBottom: '1px solid $gray4',
          }}
          align="center"
          justify="between"
        >
          <Link href="/octocat">
            <Flex align="center" css={{gap: 10, cursor: 'pointer'}}>
              <Image
                src="/images/pixel8labs-icon.svg"
                width={34}
                height={36}
                alt="Pixel8Labs"
              />
              <Text css={{ fontSize: 18 }} bolder>Simple<Text css={{ color: '#DD2590', fontSize: 18 }} bolder>.</Text>Repo</Text>
            </Flex>
          </Link>
          <RadixDialog.Close>
            <Flex
              css={{
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: '#fff',
                color: '$gray12',
                '&:hover': {
                  backgroundColor: '$gray4',
                },
              }}
            >
              <FontAwesomeIcon icon={faXmark} width={16} height={16}/>
            </Flex>
          </RadixDialog.Close>
        </Flex>
        <Flex
          css={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
            px: 16,
          }}
        >
          {(status === 'authenticated' && profile) ? (
            <>
              <Flex
                css={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  py: 12,
                }}
              >
                <Flex css={{ gap: 12, alignItems: 'center'}}>
                  <Avatar size="medium" src={profile.image}/>
                  <Flex direction="column">
                    <Text style="body2" bolder>
                      {profile.name}
                    </Text>
                    <Text style="body2">
                      {profile.email}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" css={{ py: 24 }}>
                <Link href={`/${profile.username}`} legacyBehavior>
                  <Text
                    style="body2"
                    css={{
                      borderBottom: '1px solid $gray4',
                      cursor: 'pointer',
                      mb: 8,
                      py: 12,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    View Profile
                  </Text>
                </Link>
                <Text
                  style="body2"
                  onClick={() => signOut()}
                  css={{
                    cursor: 'pointer',
                    mt: 8,
                    py: 12,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Log out
                </Text>
              </Flex>
            </>
          ) : (
            <Button size="sm" onClick={() => signIn('github')} css={{ justifyContent: 'center'} }>Login with Github</Button>
          )}
        </Flex>
      </Flex>
    </FullscreenModal>
  )
}

export default HamburgerMenu
