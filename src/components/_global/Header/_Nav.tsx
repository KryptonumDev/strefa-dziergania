'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import type { _NavProps } from './Header.types';
import Search from './_Search';
import Img from '@/components/ui/image';

const Nav = ({ links, ChevronDownIcon, ChevronBackIcon, SearchIcon, CloseIcon }: _NavProps) => {
  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState<number | null>(null);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpened(false);
      setTab(null);
    }
  };
  const handleClick = () => setTab(null);
  const navToggle = () => setOpened(!opened);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleClick);
    };
  });

  const BackBtn = ({ children }: { children: React.ReactNode }) => (
    <button
      className={styles['back-btn']}
      onClick={() => setTab(null)}
    >
      {ChevronBackIcon}
      <span>{children}</span>
    </button>
  );

  return (
    <>
      <nav
        className={styles['Nav']}
        data-opened={opened}
        data-tab={tab}
      >
        <ul>
          <li>
            <Search
              SearchIcon={SearchIcon}
              CloseIcon={CloseIcon}
            />
          </li>
          {links.map(({ name, href, sublinks }, i) => (
            <li
              className={styles['Nav__item']}
              data-id={i}
              key={i}
            >
              {href ? (
                <Link href={href}>{name}</Link>
              ) : (
                <button onClick={() => setTab(tab === i ? null : i)}>
                  <span>{name}</span>
                  {ChevronDownIcon}
                </button>
              )}
              {sublinks && (
                <ul>
                  <BackBtn>{name}</BackBtn>
                  {sublinks.map(({ img, name, href }, i) => (
                    <li key={i}>
                      <Link href={href}>
                        {img && (
                          <Img data={img} sizes='48px' />
                        )}
                        <span>{name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={styles['Nav__Toggle']}
        onClick={() => navToggle()}
      >
        <svg
          width='26'
          height='26'
          viewBox='0 0 26 26'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M1 1H25L1 25' />
          <path d='M1 25H25L1 1' />
          <path d='M1 13H25' />
        </svg>
      </button>
      <div className={styles['Overlay']} onClick={() => setOpened(false)}></div>
    </>
  );
};

export default Nav;