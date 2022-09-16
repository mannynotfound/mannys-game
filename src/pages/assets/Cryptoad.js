import { Link } from 'react-router-dom';

const Cryptoad = () => (
  <section className="p-8 border-t-2 border-yellow">
    <div className="max-w-screen-xl mx-auto mb-2">
      <Link to="/dao/assets" className="text-lg">
        🠐 Back
      </Link>
    </div>
    <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center mb-6">
      <h2 className="text-4xl md:text-7xl text-yellow text-center flex items-center">
        <b className="tracking-tighter">CrypToadz #5958</b>
      </h2>
    </div>
    <div className="flex flex-col-reverse md:flex-row w-full max-w-screen-xl mx-auto">
      <div className="flex-1 font-body text-xl md:pr-8">
        <p>
          MannyDAO is pleased to welcome CrypToadz #5958 into the collection.
          This lasagna toad sports a gold Rolex and sits on a salmon background,
          staring down the viewer with judgemental eyes. Originally purchased by
          manny on 10/2/2021 and donated to the DAO on 1/30/2022.
        </p>
      </div>
      <div className="flex-1 mb-6 md:mb-0 md:pl-8">
        <img
          className="mx-auto w-full h-auto"
          alt="cryptoadz 5958"
          src="/assets/toad.png"
        />
      </div>
    </div>
  </section>
);

export default Cryptoad;
