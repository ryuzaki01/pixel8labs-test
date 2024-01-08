import { Avatar, Flex, Text } from '../primitives';
import { faUserGroup, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNumber } from '../../utils/numbers';
import Link from 'next/link';

export type Profile = {
  name: string
  avatar_url: string
  username: string
  private: boolean
  bio: string
  email: string
  followers: number
  following: number
  visits: number
  visitors: Visitor[]
}

type ProfileCardProps = {
  profile: Profile
}

const ProfileCard = (props: ProfileCardProps) => {
  const { profile } = props;

  return (
    <Flex
      direction="column"
      css={{
        p: 24,
        gap: 24,
        width: 232
      }}

    >
      <Flex
        direction="column"
        align="center"
      >
        <Avatar size="xxxxl" src={profile?.avatar_url || ''}/>
        <Text style="h5" boldest css={{ mt: 8, textAlign: 'center' }}>{profile?.name}</Text>
        <Text>{profile?.username}</Text>
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
            <Text style="body2" css={{ mb: 8 }}>{profile?.email || '-'}</Text>
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
              <Text>
                <Text style="body1" boldest css={{ mr: 4 }}>{formatNumber(profile?.followers)}</Text>
                {`followers`}
              </Text>
              <Text>
                <Text style="body1" boldest css={{ mr: 4 }}>{formatNumber(profile?.following)}</Text>
                {`following`}
              </Text>
            </Flex>
          </Flex>
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faEye} style={{ width: 20, height: 20 }} color="#344054" />
            <Text>
              <Text style="body1" boldest css={{ mr: 4 }}>{formatNumber(profile?.visits)}</Text>
              {`profile views`}
            </Text>
          </Flex>
        </Flex>
        <Text style="body2" boldest css={{ mt: 24 }}>Latest Visitor</Text>
        <Flex>
          {(profile?.visitors || []).map(visitor => (
            <Link key={`visitor-${visitor.username}`} href={`/${visitor.username}`}>
              <Avatar size="medium" src={visitor.avatar || ''} />
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProfileCard;
