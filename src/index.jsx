import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Head } from './components/_Head.jsx';
import { Header } from './components/_Header.jsx';
import { Footer } from './components/_Footer.jsx';
import { Body } from './components/_Body.jsx';

const pageMeta = {
  name: 'home',
  title: 'トップページ',
  description: 'サイトのトップページです',
  ogpImage: 'assets/img/ogp.jpg',
  type: 'website',
  url: 'https://example.com/'
};

const Content = () => {
  return (
    <>
      <main>
        <h1>トップページコンテンツ</h1>
        <a href="about.html">ABOUT</a>
        <div id="app"></div>
      </main>
    </>
  )
};

export default () => `
<!DOCTYPE html>
<html lang="ja">
  <head>
    ${renderToStaticMarkup(<Head meta={pageMeta} />)}
  </head>
  <body>
    ${renderToStaticMarkup(<Header meta={pageMeta} />)}
    ${renderToStaticMarkup(<Content meta={pageMeta} />)}
    ${renderToStaticMarkup(<Body meta={pageMeta} />)}
    ${renderToStaticMarkup(<Footer meta={pageMeta} />)}
  </body>
</html>
`;