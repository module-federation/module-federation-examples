import { Link } from '@modern-js/runtime/router';
import { src, srcset } from '../utils';
import './Recommendation.css';

/**
 * Recommendation component.
 * @param {Object} props - The properties of the Recommendation component.
 * @param {string} props.image - The image URL of the recommendation.
 * @param {string} props.url - The URL of the recommendation.
 * @param {string} props.name - The name of the recommendation.
 * @returns {JSX.Element} The Recommendation component markup.
 */
const Recommendation = ({ image, url, name }) => {
  return (
    <li className="e_Recommendation">
      <Link className="e_Recommendation_link" to={url}>
        <img
          className="e_Recommendation_image"
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400])}
          sizes="200px"
          width="200"
          height="200"
          alt={name}
        />
        <span className="e_Recommendation_name">{name}</span>
      </Link>
    </li>
  );
};

export default Recommendation;
