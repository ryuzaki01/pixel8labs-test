import { Avatar, Flex, Text } from '../primitives';
import { faUserGroup, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNumber } from '../../utils/numbers';
import Link from 'next/link';
import { useMounted } from '../../hooks';
import { useMediaQuery } from 'react-responsive';
import Skeleton from '../primitives/Skeleton';

export type Profile = {
  name: string
  avatar_url: string
  login: string
  private: boolean
  bio: string
  email: string
  followers: number
  following: number
  visits: number
  visitors: Visitor[]
}

type ProfileCardProps = {
  profile: Profile,
  isLoading: boolean
}

const ProfileCard = (props: ProfileCardProps) => {
  const { profile, isLoading } = props;
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 600 }) && isMounted

  return (
    <Flex
      direction="column"
      css={{
        p: 24,
        gap: 24,
        '@lg': {
          width: 250
        }
      }}
    >
      <Flex
        align="center"
        css={{
          flexDirection: 'row',
          gap: 16,
          '@lg': {
            gap: 8,
            flexDirection: 'column'
          }
        }}
      >
        <Avatar fallback="..." size={isSmallDevice ? 'xxxl' : 'xxxxl'} src={profile?.avatar_url || 'https://placehold.co/160x160?text=...'}/>
        <Flex
          direction="column"
          css={{
            flex: 1,
            gap: 2,
            width: '100%'
          }}
        >

          {isLoading ? (
            <>
              <Skeleton variant="title" css={{ width: '100%' }} />
              <Skeleton variant="heading" css={{ width: '100%' }} />
            </>
          ) : (
            <>
              <Text style="h5" boldest css={{ '@lg': { textAlign: 'center' } }}>{profile?.name}</Text>
              <Text css={{ '@lg': { textAlign: 'center' } }}>{`@${profile?.login || '-'}`}</Text>
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        direction="column"
        css={{
          gap: 16
        }}
      >
        <Flex
          direction="column"
          css={{
            gap: 8
          }}
        >
          <Text style="body2" boldest>About</Text>
          <Text style="body1">{profile?.bio || '-'}</Text>
        </Flex>
        <Flex
          direction="column"
          css={{
            gap: 8
          }}
        >
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} style={{ width: 20, height: 20 }} color="#344054" />
            {isLoading ?
              <Skeleton variant="heading" css={{ width: 'calc(100% - 28px)' }} /> :
              <Text style="body2" css={{ mb: 8, wordBreak: 'break-all' }}>{profile?.email || '-'}</Text>
            }
          </Flex>
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faUserGroup} style={{ width: 20, height: 20 }} color="#344054" />
            <Flex
              direction="column"
            >
              {isLoading ? (
                <Skeleton variant="heading" css={{ width: '50%' }} />
              ) : (
                <Text>
                  <Text style="body1" boldest css={{ mr: 4 }}>{formatNumber(profile?.followers)}</Text>
                  {`followers`}
                </Text>
              )}
              {isLoading ? (
                <Skeleton variant="heading" css={{ width: '50%' }} />
              ) : (
                <Text>
                  <Text style="body1" boldest css={{ mr: 4 }}>{formatNumber(profile?.following)}</Text>
                  {`following`}
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faEye} style={{ width: 20, height: 20 }} color="#344054" />
            {isLoading ? (
              <Skeleton variant="heading" css={{ width: '100%' }} />
            ) : (
              <Text>
                <Text style="body1" boldest css={{ mr: 4 }}>{formatNumber(profile?.visits)}</Text>
                {`profile views`}
              </Text>
            )}
          </Flex>
        </Flex>
        <Text style="body2" boldest css={{ mt: 24 }}>Latest Visitor</Text>
        <Flex css={{ gap: 16 }}>
          {(profile?.visitors || []).map(visitor => (
            <Link key={`visitor-${visitor.username}`} href={`/${visitor.username}`}>
              <Avatar size="medium" src={visitor.avatar || 'https://placehold.co/160x160?text=...'} />
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProfileCard;
