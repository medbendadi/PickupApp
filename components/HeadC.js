import React from 'react'
import Head from 'next/head'
const HeadC = ({ title }) => {
  return (
    <Head>
      <title>{`Pickup | ${title}`}</title>
      <link rel="shortcut icon" href="/images/original-892677c725f1b56cfbdd8031e35c3f90__3_-removebg-preview.png" />
      <meta
        name="description"
        content="Pickup is a mobility service, ride-hailing allowing users to book a car and driver to transport them in a way similar to a taxiMohamed bendadi is a full stack greedy web developer building websites and applications that you would like to use."
      />
      <meta
        name="keywords"
        content="pickup, uber, uber eats, uber drive, taxi, traffic, maps, google maps, mapbox, nextjs"
      />
      <meta property="og:title" content="Mohamed Bendadi's Portfolio" />
      <meta
        property="og:description"
        content="A full-stack developer building websites that you'd like to use."
      />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://vscode-portfolio.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default HeadC