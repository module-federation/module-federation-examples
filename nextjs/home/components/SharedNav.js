import React from 'react';
import Link from 'next/link';
import { Header, Space, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

const HeadLink = ({ href, children, sup }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <>
      <Link href={href}>
        <a style={{ fontWeight: isActive ? 700 : 400 }}>{children}</a>
      </Link>
      {!!sup && (
        <Text size="xs" color="dimmed">
          &nbsp;
          {sup}
        </Text>
      )}
      <Space w="lg" />
    </>
  );
};

const SharedNav = () => (
  <Header fixed height={70} p="md" style={{ display: 'flex', alignItems: 'center' }}>
    <Title order={2}>nextjs-mf</Title>
    <Space w="lg" />
    <HeadLink href="/" sup="(from 3000)">
      Home
    </HeadLink>
    <HeadLink href="/shop" sup="(from 3001)">
      Shop
    </HeadLink>
    <HeadLink href="/checkout" sup="(from 3002)">
      Checkout
    </HeadLink>
    <HeadLink href="/p/something" sup="(from 3001)">
      Federated Catch All
    </HeadLink>
  </Header>
);

export default SharedNav;
