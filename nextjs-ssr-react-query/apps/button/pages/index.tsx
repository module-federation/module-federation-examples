import { Button } from '@button/components/Button';

export function Index() {
  return (
    <Button onClick={() => alert('hey, stop clicking me')}>
      Hello, I&apos;m a button on a button app
    </Button>
  );
}

export default Index;
