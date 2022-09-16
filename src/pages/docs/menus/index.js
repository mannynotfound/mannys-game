import { Link } from 'react-router-dom';

const Menu = ({
  docsPath,
  subPath,
  contentPath,
  onClick = () => {},
  menuCfg = [],
}) =>
  menuCfg.map((m) => {
    const linkClasses = ['mb-2', 'px-2', 'mr-2', 'pt-1'];
    const activeClasses = 'text-gray-dark font-bold bg-green rounded-md';
    if (m.to) {
      linkClasses.push(
        contentPath === m.to ? activeClasses : 'text-gray-lightest'
      );
      return (
        <div key={m.label} className={linkClasses.join(' ')}>
          <Link onClick={onClick} to={`/docs/${docsPath}/${m.to}`}>
            {m.label}
          </Link>
        </div>
      );
    }

    linkClasses.push('text-gray-lightest');

    return (
      <div key={m.label} className={linkClasses.join(' ')}>
        <div>{m.label}</div>
        <div className="pl-4">
          {m.subMenu.map((sm) => {
            const subLinkClasses = ['px-2', 'pt-1', 'truncate'];
            subLinkClasses.push(
              subPath === m.subPath && contentPath === sm.to
                ? activeClasses
                : 'text-gray-lightest'
            );
            return (
              <div key={sm.label} className={subLinkClasses.join(' ')}>
                <Link
                  onClick={onClick}
                  to={`/docs/${docsPath}/${m.subPath}/${sm.to}`}
                >
                  {sm.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

export default Menu;
