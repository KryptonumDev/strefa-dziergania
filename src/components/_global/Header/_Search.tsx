'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

const Search = ({ SearchIcon, CloseIcon }: { SearchIcon: React.ReactNode; CloseIcon: React.ReactNode }) => {
  async function getSearchResults(value: string) {
    try {
      const response = await fetch(`/api/search?search=${value}`, {
        method: 'GET',
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  let debounce: NodeJS.Timeout | null = null;

  const ref = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    if (ref.current) {
      ref.current.value = '';
      ref.current.dataset.searching = 'false';
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      if (e.target.value.length >= 3) {
        if (debounce) clearTimeout(debounce);
        debounce = setTimeout(() => {
          getSearchResults(e.target.value);
        }, 1000);
      } else {
        debounce = null;
      }
    }
  };

  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
          setVisible(scrollY <= prevScrollPos);
        } else {
          setVisible(true);
        }
        prevScrollPos = Math.max(scrollY, 0);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={styles['Search']}
      data-visible={visible}
    >
      {SearchIcon}
      <input
        type='text'
        name='search'
        placeholder='Wpisz interesującą Cię frazę'
        ref={ref}
        onChange={(e) => handleChange(e)}
        data-searching={false}
      />
      <button
        onClick={() => handleClear()}
        aria-label='Wyczyść wyszukiwanie'
        className={styles.clear}
      >
        {CloseIcon}
      </button>
    </div>
  );
};

export default Search;
