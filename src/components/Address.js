import { ConnectKitButton } from 'connectkit';

const Address = ({
  account,
  size = 'short',
  color = 'green',
  isYou = false,
  onClick,
  link,
}) => {
  const { address, ens, isConnecting } = account;
  if (!address && isConnecting) {
    return null;
  }

  if (!isConnecting && !address) {
    return (
      <ConnectKitButton.Custom>
        {({ show }) => (
          <button onClick={show} type="button">
            Connect
          </button>
        )}
      </ConnectKitButton.Custom>
    );
  }

  let displayAddress = address.substr(0, 6);

  if (size === 'short') {
    displayAddress += '...' + address.substr(-4);
  } else if (size === 'long') {
    displayAddress = address;
  }

  if (ens?.name) {
    displayAddress = ens?.name;
  }

  if (isYou) {
    displayAddress = 'you';
  }

  if (onClick) {
    return (
      <span className={`text-${color} cursor-pointer`} onClick={onClick}>
        {displayAddress}
      </span>
    );
  }

  return (
    <a
      target="_blank"
      href={link}
      rel="noopener noreferrer"
      className={`text-${color}`}
    >
      {displayAddress}
    </a>
  );
};

export default Address;
