import { src, srcset } from '../utils';

/**
 * Store component.
 * @param {Object} props - The properties of the Store component.
 * @param {string} props.name - The name of the store.
 * @param {string} props.image - The image URL of the store.
 * @param {string} props.street - The street address of the store.
 * @param {string} props.city - The city where the store is located.
 * @returns {JSX.Element} The Store component markup.
 */
const Store = ({ name, image, street, city }) => {
  return (
    <li className="e_Store">
      <div className="e_Store_content">
        <img
          className="e_Store_image"
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400])}
          width="200"
          height="200"
          alt={`${name} store`}
        />
        <p className="e_Store_address">
          {name}
          <br />
          {street}
          <br />
          {city}
        </p>
      </div>
    </li>
  );
};

export default Store;
