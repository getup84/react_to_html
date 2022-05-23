import React from 'react';
export const Head = (props) => {
  return (
    <>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={props.meta.title} />
      <meta property="og:description" content={props.meta.description} />
      <meta property="og:url" content={props.meta.url} />
      <meta property="og:type" content={props.meta.type} />
      <meta property="og:image" content={props.meta.ogpImage} />
      <meta name="description" content={props.meta.description} />
      <link rel="canonical" href={props.meta.url} />
      <link rel="stylesheet" href="./css/main.css" />
      <title>{props.meta.title}</title>
    </>
  );
}