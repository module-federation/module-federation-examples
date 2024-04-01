import {lazy,Suspense} from 'react'
import {loadRemote} from '@module-federation/runtime'

const HomePage = lazy(() => loadRemote('home/pages/index'));

const Home = (props) => {
  return (
    <Suspense fallback={'loading'}>
      <HomePage {...props}/>
    </Suspense>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await loadRemote('home/pages/index')
  return res.default.getInitialProps(ctx)
}

export default Home;
