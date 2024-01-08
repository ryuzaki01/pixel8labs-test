import { FC } from 'react';
import { Flex } from '../primitives';

type RepositoryItemProps = {
  data: Repository
}

const RepositoryItem : FC<RepositoryItemProps> = (props) => {
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

    </Flex>
  )
}

export default RepositoryItem;
