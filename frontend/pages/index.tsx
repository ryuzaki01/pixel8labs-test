import Layout from "components/Layout";
import {Flex, Text} from "components/primitives";
import ProfileCard from '../components/home/ProfileCard';
import RepositoryItem from '../components/home/RepositoryItem';
import Badge from '../components/primitives/Badge';
import { useRepositories } from '../hooks';

const HomePage = () => {
  const { data: repositories } = useRepositories()

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
        <ProfileCard />
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

export default HomePage
