import { useProfile } from '../../hooks';
import { Avatar, Flex, Text } from '../primitives';

const ProfileCard = () => {
  const { data: profile } = useProfile()

  return (
    <Flex
      direction="column"
      css={{
        p: 24,
        gap: 24,
      }}

    >
      <Flex
        direction="column"
        align="center"
      >
        <Avatar size="xxxxl" src={profile?.image || ''}/>
        <Text style="h5" boldest css={{ mt: 8 }}>{profile?.name}</Text>
        <Text>{profile?.email}</Text>
      </Flex>
      <Flex
        direction="column"
      >
        <Text style="body2" boldest css={{ mb: 8 }}>About</Text>
      </Flex>
    </Flex>
  )
}

export default ProfileCard;
