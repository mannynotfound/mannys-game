import { Page } from 'components';

const NoParty = () => (
  <Page className="flex justify-center items-center">
    <div className="w-full h-auto overflow-y-auto p-8">
      <p className="text-xl mt-4 text-white text-center">
        Looks like you haven't contributed enough to the party, <br />
        <a
          href="https://v2.partybid.app/join/0x4523Fb71EC20f63928541c48cFC236219BD7700D"
          target="_blank"
          className="text-green"
          rel="noopener noreferrer"
        >
          click here to join
        </a>
        .
      </p>
    </div>
  </Page>
);

export default NoParty;
