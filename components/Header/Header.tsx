import React from 'react';
import Nav from '@components/Header/Nav';
import scss from './Header.module.scss';

const Header = () => {
  return (
    <header className={scss.header}>
      <Nav />
    </header>
  );
};

export default Header;
