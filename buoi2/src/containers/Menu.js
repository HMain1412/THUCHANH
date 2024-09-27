import React from 'react';
import Item from './Item';

function Menu() {
  const list = [
    { link: '/home', content: 'Trang chủ' },
    { link: '/about', content: 'Sản phẩm' },
    { link: '/contact', content: 'Liên hệ' }
  ];

  return (
    <ul>
      {list.map((item, index) => (
        <Item key={index} link={item.link} content={item.content} />
      ))}
    </ul>
  );
}

export default Menu;
