import * as Tabs from '@radix-ui/react-tabs'
import { styled } from 'stitches.config'

const TabsList = styled(Tabs.List, {
  display: 'flex',
  gap: '$3',
  py: '$3',
  mb: '$3',
  borderRadius: '$xl',
  backgroundColor: '#fff'
})

const TabsTrigger = styled(Tabs.Trigger, {
  fontWeight: '500',
  fontFamily: '$louize',
  fontSize: 24,
  display: 'inline-block',
  color: '#63697C',
  '&:hover': {
    color: '#000'
  },
  '&[data-state="active"]': {
    color: '#000',
    borderBottom: '2px solid $primary7'
  },
})

const TabsContent = styled(Tabs.Content, {})

export { Tabs as default, TabsList, TabsTrigger, TabsContent }
