import CheckoutPage from 'checkout/checkout';

console.log(CheckoutPage.getInitialProps)
const Checkout = CheckoutPage;
Checkout.getInitialProps = CheckoutPage.getInitialProps;
export default Checkout;
