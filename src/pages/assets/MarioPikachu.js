import { Link } from 'react-router-dom';

const MarioPikachu = () => (
  <section className="p-8 border-t-2 border-yellow">
    <div className="max-w-screen-xl mx-auto mb-2">
      <Link to="/dao/assets" className="text-lg">
        🠐 Back
      </Link>
    </div>
    <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center mb-6">
      <h2 className="text-4xl md:text-7xl text-yellow text-center flex items-center">
        <b className="tracking-tighter">Mario Pikachu Full Art Promo</b>
      </h2>
    </div>
    <div className="flex flex-col-reverse md:flex-row w-full max-w-screen-xl mx-auto">
      <div className="flex-1 font-body text-xl md:pr-8">
        <p>
          In October of 2016, the Pokemon company issued a special edition gift
          box in Japan as part of a crossover campaign between the Super Mario
          and Pokemon franchises. Part of the gift box was a set of 4 pokemon
          cards featuring Pikachu as Mario or Luigi, with the Mario full art
          card being the most popular.
        </p>
        <p className="mt-2">
          This PSA 10 example of the card was purchased by mannyDAO on 3/20/2022
          after an overwhelmingly positive proposal.
        </p>
      </div>
      <div className="flex-1 mb-6 md:mb-0 md:pl-8">
        <img
          className="mx-auto w-full h-auto"
          alt="mario pikachu full art promo"
          src="/assets/mariopikachuslab.png"
        />
      </div>
    </div>
  </section>
);

export default MarioPikachu;
