import React from 'react';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { useRouter } from 'next/router';

const Navigation = () => {
  const { pathname } = useRouter();
  return (
    <Nav defaultActiveKey="/" as="ul" className="justify-content-between">
      <Nav.Item as="li">
        <Link href="/">Home</Link>
      </Nav.Item>
      {pathname !== '/login' && (
        <Nav.Item as="li">
          <Link href="/login">Login</Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navigation;
