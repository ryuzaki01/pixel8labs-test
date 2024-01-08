import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from "components/Layout";
import {Flex, Text} from "components/primitives";
import ProfileCard from '../components/profile/ProfileCard';
import RepositoryItem from '../components/profile/RepositoryItem';
import Badge from '../components/primitives/Badge';
import { useRepositories, useUser } from '../hooks';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ProfilePage = (props: Props) => {
  const { data: repositories } = useRepositories(props.ssr.username)
  const { data: profile } = useUser(props.ssr.username)

  return (
    <Layout>
      <Flex
        css={{
          flexDirection: 'column',
          maxWidth: 1280,
          mx: 'auto',
          pt: 24,
          pb: 64,
          gap: 32,
          '@lg': {
            flexDirection: 'row',
            gap: 32,
            px: 32,
          },
        }}
      >
        <ProfileCard profile={profile}/>
        <Flex
          css={{
            backgroundColor: '$neutralBg',
            border: '1px solid $gray100',
            borderRadius: '$lg',
            p: 24,
            gap: 24,
            flex: 1,
          }}
          direction="column"
        >
          <Flex css={{ gap: 12 }} align="center">
            <Text style="h5" boldest>Repository</Text>
            <Badge color="secondary" css={{ fontSize: 14, fontWeight: 500, borderRadius: 16 }}>{(repositories || []).length}</Badge>
          </Flex>
          {(repositories || []).map(repo => (
            <RepositoryItem key={`repo-${repo.name}`} data={repo} />
          ))}
        </Flex>
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    username: string
  }
}> = async ({ query }) => {
  return {
    props: { ssr: { username: query.username as string } }
  }
}

export default ProfilePage
