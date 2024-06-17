import { Helmet } from '@modern-js/runtime/head';
import data from '../database/index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recommendations from '../components/Recommendations';
import { src, srcset } from '../utils';
import Meta from '../components/Meta';

import './page.css';

/**
 * HomePage component.
 * @param {object} props - The properties of the HomePage component.
 * @param {HonoContext} props.c - The hone context.
 * @returns {JSX.Element} The HomePage component markup.
 */
const HomePage = c => {
  return (
    <>
      <Helmet>
        <title>Tractor Store</title>
        <Meta />
      </Helmet>
      <div data-boundary="explore-page">
        <Header c={c} />
        <main className="e_HomePage">
          {data.teaser.map(({ title, image, url }) => (
            <a className="e_HomePage__categoryLink" href={url} key={url}>
              <img
                src={src(image, 500)}
                srcSet={srcset(image, [500, 1000])}
                sizes="100vw, (min-width: 500px) 50vw"
                alt={title}
              />
              {title}
            </a>
          ))}
          <div className="e_HomePage__recommendations">
            <Recommendations skus={['CL-01-GY', 'AU-07-MT']} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
