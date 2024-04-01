import {lazy, Suspense} from 'react'
import {loadRemote} from '@module-federation/runtime'

const PdpPage = lazy(() => loadRemote('shop/pdp'));

const Pdp = (props) => {
  return (
    <Suspense fallback={'loading'}>
      <PdpPage {...props}/>
    </Suspense>
  )
}

Pdp.getInitialProps = async (ctx) => {
  const res = await loadRemote('shop/pdp')

  return res.default.getInitialProps(ctx)
}

export default Pdp;
