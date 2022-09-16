const Button = ({
  style = {},
  large = false,
  onClick = () => {},
  children,
  className = '',
  color = 'green',
  textColor = 'green',
  bgColor = 'transparent',
}) => {
  const buttonClasses = [
    'button cursor-pointer',
    `text-${textColor} hover:text-gray`,
    `border-2 border-${color}`,
    `bg-${bgColor} hover:bg-${color}`,
    className,
  ].join(' ');

  return (
    <span
      className={buttonClasses}
      style={{
        ...style,
        padding: large ? '6px 18px' : '0px 12px',
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Button;
