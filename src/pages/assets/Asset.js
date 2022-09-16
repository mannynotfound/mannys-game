import { withRouter } from 'react-router-dom';

import { Page } from 'components';
import ForbiddenOne from './ForbiddenOne';
import Cryptoad from './Cryptoad';
import MarioPikachu from './MarioPikachu';

const Asset = (props) => {
  const pages = {
    'forbidden-one': <ForbiddenOne {...props} />,
    'cryptoadz-5958': <Cryptoad {...props} />,
    'mario-pikachu': <MarioPikachu {...props} />,
  };

  const slug = props?.match?.params?.assetSlug;

  return (
    <Page className="text-white">
      <div className="h-full overflow-y-scroll">{pages[slug]}</div>
    </Page>
  );
};

export default withRouter((props) => <Asset {...props} />);
