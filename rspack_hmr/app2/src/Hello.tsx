interface Props {
  name: string;
}

export const Hello = ({ name }: Props) => {
  return <div>Hello, from app_02, {name}!</div>;
};
