import {addDecorator, configure} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';

addDecorator(withInfo({
  inline: true,
  styles: (styles) => ({...styles, infoStory: {paddingLeft: 40}})
}));
configure(require.context('../src', true, /\.stories\.tsx$/), module);
