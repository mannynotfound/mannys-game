import Address from './Address';

const Account = ({ account, setWalletMenuOpen }) => (
  <>
    {account?.ens?.avatar && (
      <img
        className="rounded-full mr-2"
        style={{
          height: 40,
          width: 40,
        }}
        alt="ens avatar"
        src={account.ens.avatar}
      />
    )}
    <Address
      size="short"
      account={account}
      onClick={() => setWalletMenuOpen(true)}
    />
  </>
);

export default Account;
