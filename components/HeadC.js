import React from 'react'
import Head from 'next/head'
const HeadC = ({ title }) => {
  return (
    <Head>
      <title>{`Pickup | ${title}`}</title>
    </Head>
  )
}

export default HeadC