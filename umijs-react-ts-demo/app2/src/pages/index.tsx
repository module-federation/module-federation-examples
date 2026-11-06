import yayJpg from '../assets/yay.jpg';
import Header from 'app1/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <div>
        <h2>Yay! Welcome to umi!</h2>
        <p>
          <img src={yayJpg} width="388" />
        </p>
        <p>
          To get started, edit <code>pages/index.tsx</code> and save to reload.
        </p>
      </div>
    </>
  );
}
