import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  border: 4px dashed #228b22;
  border-radius: 0.25px;
`;

const titleSizes = {
  sm: '1.25em',
  md: '1.5em',
  lg: '1.75em',
};

export interface TitleProps {
  size?: keyof typeof titleSizes;
  color?: string;
}

export const Title = styled.h2<TitleProps>`
  font-size: ${props => titleSizes[props.size] || '1.5em'};
  font-weight: 700;
  color: ${props => props.color || 'palevioletred'};
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 300;
`;

export interface ContentProps {
  content?: string;
}

export const Content: React.FC<ContentProps> = (props: ContentProps) => {
  return (
    <Container>
      <Title>App 2: Content</Title>
      <Paragraph>This is the content from app2.</Paragraph>
      <Paragraph>
        Custom text: <strong>{props.content}</strong>
      </Paragraph>
    </Container>
  );
};

export default Content;
