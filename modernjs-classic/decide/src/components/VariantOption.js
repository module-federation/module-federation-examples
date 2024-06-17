import { Link } from '@modern-js/runtime/router';
import './VariantOption.css';

/**
 * VariantOption component.
 * @param {object} props - The properties of the VariantOption component.
 * @param {string} props.sku - The SKU of the product variant.
 * @param {string} props.name - The name of the product variant.
 * @param {boolean} props.selected - Whether the variant is selected.
 * @param {string} props.color - The color of the product variant.
 * @returns {JSX.Element} The VariantOption component markup.
 */
const VariantOption = ({ sku, name, selected, color }) => {
  return (
    <li className="d_VariantOption" style={{ '--variant-color': color }}>
      <i className="d_VariantOption__color"></i>
      {selected ? (
        <strong>{name}</strong>
      ) : (
        <Link to={`?sku=${sku}`}>{name}</Link>
      )}
    </li>
  );
};

export default VariantOption;
