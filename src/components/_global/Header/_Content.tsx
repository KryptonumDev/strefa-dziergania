'use client';
import Link from 'next/link';
import styles from './Header.module.scss';
import Search from './_Search';
import Annotation from './_Annotation';
import Nav from './_Nav';
import type { QueryProps } from './Header.types';
import { useState } from 'react';
import { useCartItems } from '@/utils/useCartItems';
import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('./_Cart'), { ssr: false });
const Checkout = dynamic(() => import('./Checkout'), { ssr: false });

const Content = ({
  markdownNavAnnotation,
  global: { image_crochet, image_knitting, nav_Annotation, nav_Links },
  Logo,
  ChevronDownIcon,
  ChevronBackIcon,
  SearchIcon,
  CloseIcon,
  CrossIcon,
}: QueryProps) => {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const { cart, fetchedItems, updateItemQuantity, removeItem } = useCartItems();

  return (
    <>
      <div
        onClick={() => {
          setShowCart(false);
          setShowCheckout(false);
        }}
        className={`${styles['overlay']} ${showCart || showCheckout ? styles['active'] : ''}`}
      />
      <Checkout
        CrossIcon={CrossIcon}
        setShowCheckout={() => setShowCheckout(false)}
        showCheckout={showCheckout}
        fetchedItems={fetchedItems}
        goToCart={() => {
          setShowCart(true);
          setShowCheckout(false);
        }}
      />
      <Cart
        goToCheckout={() => {
          setShowCheckout(true);
          setShowCart(false);
        }}
        setShowCart={() => setShowCart(false)}
        showCart={showCart}
        image_knitting={image_knitting}
        image_crochet={image_crochet}
        CrossIcon={CrossIcon}
        cart={cart}
        fetchedItems={fetchedItems}
        updateItemQuantity={updateItemQuantity}
        removeItem={removeItem}
      />
      <a
        href='#main'
        className={styles.skipToMainContent}
      >
        Przejdź do głównej treści
      </a>
      {nav_Annotation && (
        <Annotation
          CloseIcon={CloseIcon}
          rawContent={nav_Annotation}
        >
          {markdownNavAnnotation}
        </Annotation>
      )}
      <header className={styles['Header']}>
        <div className={`max-width ${styles['max-width']}`}>
          <Link
            href='/'
            aria-label='Strona główna'
            className={styles.logo}
          >
            {Logo}
          </Link>
          <Nav
            links={nav_Links}
            ChevronDownIcon={ChevronDownIcon}
            ChevronBackIcon={ChevronBackIcon}
            SearchIcon={SearchIcon}
            CloseIcon={CloseIcon}
          />
          <ul className={styles.quickLinks}>
            <li>
              <Link href='/kontakt'>Kontakt</Link>
            </li>
            <li>
              <Link href='/moje-konto'>Mój profil</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowCart(true);
                }}
                className={styles.basket}
                data-basket-items='2'
              >
                Koszyk
              </button>
            </li>
          </ul>
        </div>
        <Search
          SearchIcon={SearchIcon}
          CloseIcon={CloseIcon}
        />
      </header>
    </>
  );
};

export default Content;