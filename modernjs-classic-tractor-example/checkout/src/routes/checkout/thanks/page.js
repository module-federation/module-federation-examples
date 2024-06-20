import Header from 'explore/Header';
import Footer from 'explore/Footer';
import Button from '../../../components/Button';
import './Thanks.css';

/**
 * Thanks component.
 * @param {object} props - The properties of the Thanks component.
 * @param {HonoContext} props.c - The hono context.
 * @returns {JSX.Element} The Thanks component markup.
 */
const Thanks = ({ c }) => {
  return (
    <>
      <Header c={c} />
      <main className="c_Thanks">
        <h2 className="c_Thanks__title">Thanks for your order!</h2>
        <p className="c_Thanks__text">
          We&apos;ll notify you, when its ready for pickup.
        </p>
        <Button href="/" variant="secondary">
          Continue Shopping
        </Button>
      </main>
      <Footer />
    </>
  );
};

export default Thanks;
