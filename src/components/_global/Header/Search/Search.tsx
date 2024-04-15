'use client';

import { useEffect, useRef, useState } from 'react';
import { type SearchResultType } from '../Header.types';
import styles from '../Header.module.scss';
import Courses from './Courses';
import PhysicalProducts from './PhysicalProducts';
import Articles from './Articles';

const Search = ({ SearchIcon, CloseIcon }: { SearchIcon: React.ReactNode; CloseIcon: React.ReactNode }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultType | null>(null);
  const [visible, setVisible] = useState(true);

  const ref = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    if (ref.current) {
      ref.current.value = '';
      ref.current.dataset.searching = 'false';
      setSearchResults(null);
      setIsSearching(false);
    }
  };

  const handleFocus = () => {
    if (ref.current && ref.current.value.length >= 3) {
      setIsSearching(true);
    }
  };

  async function getSearchResults(value: string) {
    try {
      const response = await fetch(`/api/search?search=${value}`, {
        method: 'GET',
      });
      const results = await response.json();
      setSearchResults(results.data);
    } catch (error) {
      console.log(error);
    }
  }

  let debounce: NodeJS.Timeout | null = null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.dataset.searching = 'true';
      setIsSearching(e.target.value.length >= 3);
      if (debounce) clearTimeout(debounce);
      if (e.target.value.length >= 3) {
        debounce = setTimeout(() => {
          getSearchResults(e.target.value);
        }, 600);
      } else if (e.target.value.length == 0) {
        ref.current.dataset.searching = 'false';
      } else {
        setSearchResults(null);
      }
    }
  };

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

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchResults(null);
      }
    };

    const handleTouchOutside = (event: TouchEvent | MouseEvent) => {
      const searchRef = ref.current;
      const resRef = resultsRef.current;
      if (resRef && !resRef.contains(event.target as Node) && searchRef && !searchRef.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };

    const handleTabNavigation = (event: KeyboardEvent) => {
      const ref = resultsRef.current;
      if (event.key === 'Tab' && ref) {
        const focusableElements = ref.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        ) as unknown as HTMLElement[];
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && lastElement) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else if (document.activeElement === lastElement && firstElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabNavigation);
    window.addEventListener('mouseup', handleTouchOutside);
    window.addEventListener('touchend', handleTouchOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleTabNavigation);
      document.addEventListener('keydown', handleEscapeKey);
      window.removeEventListener('mouseup', handleTouchOutside);
      window.addEventListener('touchend', handleTouchOutside);
    };
  }, [resultsRef]);

  return (
    <>
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
          onFocus={handleFocus}
        />
        <button
          onClick={() => handleClear()}
          aria-label='Wyczyść wyszukiwanie'
          className={styles.clear}
        >
          {CloseIcon}
        </button>
      </div>
      {isSearching && (
        <div
          className={styles.results}
          ref={resultsRef}
        >
          <div
            className={styles.resultsWrapper}
            data-visible={visible}
          >
            <Courses
              passedRef={ref}
              searchResults={searchResults}
            />
            <PhysicalProducts
              passedRef={ref}
              searchResults={searchResults}
            />
            <Articles
              passedRef={ref}
              searchResults={searchResults}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
