import { Page } from 'components';

const NoMannys = () => (
  <Page className="flex justify-center items-center">
    <div className="w-full h-auto overflow-y-auto p-8">
      <p className="text-xl mt-4 text-center">
        Looks like you dont have any mannys, <br />
        try getting some on the{' '}
        <a
          href="https://opensea.io/collection/mannys-game"
          target="_blank"
          className="text-green"
          rel="noopener noreferrer"
        >
          secondary market
        </a>
        .
      </p>
    </div>
  </Page>
);

export default NoMannys;
