import './Button.css';

const Button = ({
  href,
  type,
  value,
  disabled,
  rounded,
  className,
  children,
  dataId,
  variant = 'secondary',
}) => {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      disabled={disabled}
      href={href}
      type={type}
      value={value}
      data-id={dataId}
      className={`e_Button e_Button--${variant} ${className} ${
        rounded ? 'e_Button--rounded' : ''
      }`}
    >
      <div className="e_Button__inner">{children}</div>
    </Tag>
  );
};

export default Button;
