import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Button } from '../../src/components/button'

storiesOf('Button', module).add('with text', () => (
  <Button onClick={action('clicked')}>Hello Mujo</Button>
))
