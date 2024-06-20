import './Button.css';
/**
 * Button component.
 * @param {object} props - The properties of the button.
 * @param {string} [props.href] - The href for the button if it's a link.
 * @param {string} [props.type] - The type of the button.
 * @param {string} [props.value] - The value of the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {boolean} [props.rounded] - Whether the button is rounded.
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @param {string} [props.children] - The content inside the button.
 * @param {string} [props.dataId] - The data-id attribute of the button.
 * @param {('primary'|'secondary')} [props.variant] - The variant of the button. Valid options are 'primary' and 'secondary'.
 * @param {string} [props.title] - The title attribute of the button.
 * @param {('small'|'normal')} [props.size] - The size of the button. Valid options are 'small' and 'normal'.
 * @returns {JSX.Element} The button markup.
 */
const Button = ({
  href,
  type,
  value,
  disabled,
  rounded,
  className = '',
  children,
  dataId,
  size = 'normal',
  variant = 'secondary',
  title,
}) => {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      type={type}
      value={value}
      disabled={disabled}
      data-id={dataId}
      title={title}
      className={`c_Button c_Button--${variant} ${className} ${
        rounded ? 'c_Button--rounded' : ''
      } c_Button--size-${size}`}
      ontouchstart=""
    >
      <div className="c_Button__inner">{children}</div>
    </Tag>
  );
};

export default Button;
