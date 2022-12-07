import { Page } from 'components';

const NoParty = () => (
  <Page className="flex justify-center items-center">
    <div className="w-full h-auto overflow-y-auto p-8">
      <p className="text-xl mt-4 text-white text-center">
        Looks like you haven't joined the party, <br />
        <a
          href="https://discord.gg/46FyE2ppmj"
          target="_blank"
          className="text-green"
          rel="noopener noreferrer"
        >
          join the discord to learn more.
        </a>
        .
      </p>
    </div>
  </Page>
);

export default NoParty;
