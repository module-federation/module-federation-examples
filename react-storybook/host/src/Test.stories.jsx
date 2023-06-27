import React from 'react';

import Test from './Test';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Local/Test',
  component: Test,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    number: 'string'
  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Test {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const TestWithNumber1 = Template.bind();
TestWithNumber1.args = {
  number: '1'
};


export const TestWithNumber2 = Template.bind({});
TestWithNumber2.args = {
  number: '2'
};
