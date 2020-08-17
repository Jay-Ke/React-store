import React from 'react';
import Header from 'components/Header';

const Layout = props => {
  return (
    <div className="main">
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;