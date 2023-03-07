import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Header from '@/components/Header';
import MetaTags from '@/components/MetaTags';

type Props = {
  title?: string;
  className?: string;
  hideHeader?: boolean;
  children: ReactNode;
};

export default function Page({
  title,
  className = '',
  hideHeader,
  children,
}: Props) {
  return (
    <>
      <MetaTags title={title} />
      {!hideHeader && <Header />}
      <main
        className={twMerge(
          'pt-nav-height mx-auto relative',
          'min-h-screen max-w-screen-2xl',
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
