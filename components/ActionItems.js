import Link from 'next/link'
import tw from "tailwind-styled-components"
import React from 'react'

import Header from './Header';
const ActionItems = () => {

   return (
      <ActionItemsContainer>
         <Header />
         <InputButton>
            Looking For ?
         </InputButton>
         <ActionButtons>
            <Link href={{
               pathname: '/search',
               query: {
                  type: 'driving-traffic',
               }
            }}>
               <ActionButton>
                  <ActionButtonImg src='https://i.ibb.co/cyvcpfF/uberx.png' />
                  Ride
               </ActionButton>
            </Link>
            <Link href={{
               pathname: '/search',
               query: {
                  type: 'cycling',
               }
            }}>
               <ActionButton>
                  <ActionButtonImg src='https://i.ibb.co/VV1Fv0H/electric-bicycle-mountain-bike-cross-country-cycling-bikes-27337026abeb8ff2166df994c2770cd4.png' />
                  Wheel
               </ActionButton>
            </Link>
            <Link href='/search'>
               <ActionButton>
                  <ActionButtonImg src='https://i.ibb.co/5RjchBg/uberschedule.png' />
                  Reserve
               </ActionButton>
            </Link>
         </ActionButtons>



      </ActionItemsContainer>
   )
}

export default ActionItems



const ActionItemsContainer = tw.div`
  flex-1 p-4 sm:flex-none sm:w-2/5 bg-mainBlack
`

const ActionButtons = tw.div`
flex
`

const ActionButton = tw.div`
  flex bg-mainBlackLight flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:bg-main transition duration-200 ease-out hover:text-black hover:ease-in text-xl cursor-pointer box-content border-none text-white
`

const ActionButtonImg = tw.img`
h-3/5
`

const InputButton = tw.div`
h-20 bg-mainBlackLight text-white text-2xl p-4 flex items-center mb-8 rounded-lg sm:mt-14 mt-10
`