import {lazy, Suspense} from 'react'
import {loadRemote} from '@module-federation/runtime'

const CheckoutPage = lazy(() => loadRemote('checkout/checkout'));

const Checkout = (props) => {
  return (
    <Suspense fallback={'loading'}>
      <CheckoutPage {...props}/>
    </Suspense>
  )
}

Checkout.getInitialProps = async (ctx) => {
  const res = await loadRemote('checkout/checkout')

  return res.default.getInitialProps(ctx)
}

export default Checkout;
