import React, {Suspense} from 'react';

const LazyButton = React.lazy(() => import('remote/Button'));

const Button = (props) => (
    <Suspense fallback={<p>Please wait...</p>}><LazyButton {...props} /></Suspense>
);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Remote/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;
const Test = ({children}) => <div>{children}</div>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = Template.bind({variant: 'primary'});
Primary.args = {
  variant: 'primary',
  children: <div><Test>Button</Test></div>,
};


export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Button',
};
