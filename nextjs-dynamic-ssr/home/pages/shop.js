import {lazy, Suspense} from 'react'
import {loadRemote} from '@module-federation/runtime'

const ShopPage = lazy(() => loadRemote('shop/shop'));

const Shop = (props) => {
  return (
    <Suspense fallback={'loading'}>
      <ShopPage {...props}/>
    </Suspense>
  )
}

Shop.getInitialProps = async (ctx)=>{
  const res = await loadRemote('shop/shop')


  return res.default.getInitialProps(ctx)
}


export default Shop;
