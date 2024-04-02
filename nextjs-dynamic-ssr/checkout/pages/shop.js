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

export const getServerSideProps = async (ctx) => {
  const remotes = isServer => {
    const location = isServer ? 'ssr' : 'chunks';
    return [
      {
        name: 'shop',
        entry:`http://localhost:3002/_next/static/${location}/remoteEntry.js`
      },
      {
        name: 'checkout',
        entry:`http://localhost:3000/_next/static/${location}/remoteEntry.js`
      },
      {
        name: 'home',
        entry:`http://localhost:3001/_next/static/${location}/remoteEntry.js`
      },
    ];
  };

  init({
    name: 'home',
    remotes: remotes(typeof window === 'undefined'),
    force: true
  })
  const res = await loadRemote('shop/shop')


  return res.getServerSideProps(ctx)
}

export default Shop;
