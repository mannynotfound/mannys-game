import { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { useHistory } from 'react-router-dom';

const Whisper = (props) => (
  <div className="text-magenta">
    <span className="mannys-chat-logo" />
    <span>
      <span className="text-cyan">[Manny]</span> whispers:{' '}
    </span>
    {props.children}
  </div>
);

const ChatLog = (props) => {
  const [oldChildren, setOldChildren] = useState([]);

  useEffect(() => {
    const scroll = () => {
      setTimeout(() => {
        const chatDiv = document.getElementById('chatDiv');
        if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
      }, 100);
    };
    if (oldChildren.length) {
      // make sure the new children are actually different
      const lastOldChild = renderToString(oldChildren[oldChildren.length - 1]);
      const lastNewChild = renderToString(props.children);
      if (lastOldChild !== lastNewChild) {
        setOldChildren(oldChildren.concat(props.children));
        scroll();
      }
    } else {
      setOldChildren([props.children]);
      scroll();
    }
  }, [props.children]);

  return (
    <div
      id="chatDiv"
      className="flex flex-col overflow-auto min-h-min"
      style={{ wordBreak: 'break-word' }}
    >
      {oldChildren}
    </div>
  );
};

const Chat = ({ account, mannys }) => {
  const address = account?.address;
  let innerPanel = null;
  const history = useHistory();
  const onClickId = (id) => history.push(`/${id}`);

  if (!account.isConnecting && !address) {
    innerPanel = (
      <>
        <Whisper>
          LMAO you dont even have a wallet connected... connect one to start
          playing the game (use top right button)
        </Whisper>
      </>
    );
  }

  // hasnt checked for mannys yet
  if (!account.isConnecting && address && mannys === undefined) {
    innerPanel = (
      <Whisper>hold on a sec lemme check the game contract...</Whisper>
    );
  }

  const isEmpty = Array.isArray(mannys) && mannys.length === 0;
  if (!account.isConnecting && address && isEmpty) {
    innerPanel = (
      <>
        <Whisper>
          smh it says you have no Mannys... try getting some on the secondary
          market!
        </Whisper>
        <Whisper>
          <a
            href="https://opensea.io/collection/mannys-game"
            target="_blank"
            rel="noreferrer noopener"
            className="text-green underline cursor-pointer"
          >
            Browse secondary market for mannys.
          </a>
        </Whisper>
      </>
    );
  }

  if (mannys?.length) {
    innerPanel = (
      <>
        <Whisper>
          you own{' '}
          {mannys.length > 1 ? `${mannys.length} Mannys: ` : 'a Manny! '}
          {mannys
            .sort((a, b) => a.id - b.id)
            .map((yc, i, arr) => (
              <span href={`/${yc.id}`} style={{ marginRight: 5 }} key={yc.id}>
                <span
                  className="text-green underline cursor-pointer"
                  onClick={() => onClickId(yc.id)}
                >
                  {yc.id}
                </span>
                {i < arr.length - 1 ? ',' : ''}
              </span>
            ))}
        </Whisper>
      </>
    );
  }

  return (
    <div className="w-full">
      <div
        className="flex overflow-auto"
        style={{ height: 120, maxWidth: 580 }}
      >
        <ChatLog>{innerPanel}</ChatLog>
      </div>
    </div>
  );
};

export default Chat;
