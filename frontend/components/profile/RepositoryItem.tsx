import { FC } from 'react';
import { Flex, Text } from '../primitives';
import Badge from '../primitives/Badge';
import RepoLanguageColor from './RepoLanguageColor';
import { formatTimeFromNow } from 'utils/time';

type RepositoryItemProps = {
  data: Repository
}

const RepositoryItem : FC<RepositoryItemProps> = (props) => {
  const { data } = props;

  return (
    <Flex
      direction="column"
      css={{
        p: 24,
        gap: 24,
        backgroundColor: '$gray25',
        borderRadius: '$lg',
        border: '1px solid $gray200'
      }}
    >
      <Flex direction="column" css={{ gap: 8 }}>
        <Flex css={{ gap: 12 }}>
          <Text style="body1" boldest>{data.name}</Text>
          <Badge color={data.private ? 'secondary' : 'primary'}>{data.private ? 'private' : 'public'}</Badge>
        </Flex>
        <Text>{data.description}</Text>
      </Flex>
      <Flex css={{ gap: 23 }}>
        <Flex css={{ gap: 4 }} align="center">
          <RepoLanguageColor language={data.language}/>
          <Text style="body3" css={{
            '&::first-letter': {
              textTransform: 'capitalize'
            }
          }}>{data.language}</Text>
        </Flex>
        <Text style="body3">{formatTimeFromNow(data.updated_at)}</Text>
      </Flex>
    </Flex>
  )
}

export default RepositoryItem;
