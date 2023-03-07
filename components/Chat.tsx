import { useState, useEffect, ReactNode, ReactElement, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { useRouter } from 'next/router';
import { Account, Token } from '@/utils/types';

function Whisper({ children }: { children: ReactNode }) {
  return (
    <div className="text-magenta">
      <span className="text-cyan">[Manny]</span> whispers: {children}
    </div>
  );
}

function ChatLog({ children }: { children: ReactNode }) {
  const [oldChildren, setOldChildren] = useState<ReactNode[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      setTimeout(() => {
        if (chatRef.current !== null) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 100);
    };
    if (oldChildren.length) {
      // make sure the new children are actually different
      const lastOldChild = renderToString(
        oldChildren[oldChildren.length - 1] as ReactElement
      );
      const lastNewChild = renderToString(children as ReactElement);
      if (lastOldChild !== lastNewChild) {
        setOldChildren((prev) => prev.concat(children));
        scroll();
      }
    } else {
      setOldChildren([children]);
      scroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <div ref={chatRef} className="flex flex-col min-h-min">
      {oldChildren}
    </div>
  );
}

type Props = {
  account: Account;
  mannys: Token[] | undefined;
};

export default function Chat({ account, mannys }: Props) {
  const address = account.address;
  let messages = null;
  const router = useRouter();

  const onClickId = (id: number) => router.push(`/${id}`);

  if (!account.isConnecting && address === undefined) {
    messages = (
      <Whisper>
        LMAO you dont even have a wallet connected... connect one to start
        playing the game (use top right button)
      </Whisper>
    );
  }

  // hasnt checked for mannys yet
  if (!account.isConnecting && address && mannys === undefined) {
    messages = (
      <Whisper>hold on a sec lemme check the game contract...</Whisper>
    );
  }

  const ownsNoMannys = mannys !== undefined && mannys.length === 0;
  if (!account.isConnecting && address && ownsNoMannys) {
    messages = (
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
    messages = (
      <Whisper>
        you own {mannys.length > 1 ? `${mannys.length} Mannys: ` : 'a Manny! '}
        {mannys
          .sort((a, b) => a.tokenId - b.tokenId)
          .map((m, i, arr) => (
            <span className="mr-[5px]" key={m.tokenId}>
              <span
                className="text-green underline cursor-pointer"
                onClick={() => onClickId(m.tokenId)}
              >
                {m.tokenId}
              </span>
              {i < arr.length - 1 ? ',' : ''}
            </span>
          ))}
      </Whisper>
    );
  }

  return (
    <div className="w-full">
      <div className="flex overflow-auto h-[120px] max-w-[580px]">
        <ChatLog>{messages}</ChatLog>
      </div>
    </div>
  );
}
