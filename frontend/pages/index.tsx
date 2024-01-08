import Layout from "components/Layout";
import {Footer} from "components/Footer";
import {Flex, Text} from "components/primitives";
import ProfileCard from '../components/home/ProfileCard';

const HomePage = () => {
  return (
    <Layout>
      <Flex
        css={{
          flexDirection: 'column',
          maxWidth: 1280,
          mx: 'auto',
          px: 32,
          pt: 24,
          pb: 64,
          gap: 32,
          '@lg': {
            flexDirection: 'row',
            gap: 32,
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
          <Text style="h5" boldest>Repository</Text>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default HomePage
