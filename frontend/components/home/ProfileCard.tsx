import { useProfile } from '../../hooks';
import { Avatar, Flex, Text } from '../primitives';
import { faUserGroup, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNumber } from '../../utils/numbers';

const ProfileCard = () => {
  const { data: profile } = useProfile()

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
        <Avatar size="xxxxl" src={profile?.image || ''}/>
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
          <Text style="body2" boldest css={{ mb: 8 }}>About</Text>
          <Text style="body1" boldest css={{ mt: 8 }}>{profile?.bio}</Text>
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
            <Text style="body2" css={{ mb: 8 }}>{profile?.email}</Text>
          </Flex>
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faUserGroup} style={{ width: 20, height: 20 }} color="#344054" />
            <Text><Text style="body1" boldest css={{ mr: 4 }}>{formatNumber(821320)}</Text>profile visitor</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProfileCard;
