import Link from 'next/link';
import React from 'react'
import tw from "tailwind-styled-components"
import { checkout } from '../checkout';
import Header from './Header';

const RideSelector = ({ distance, data, type }) => {
   const CarsRef = React.useRef([]);
   const [currentCar, setCurrentCar] = React.useState(null)


   const setActive = (index, car) => {
      if (CarsRef.current[index].classList.contains("active")) {
         CarsRef.current[index].classList.remove("active");
         return;
      } else {

         CarsRef.current.forEach((ref) => {
            if (ref.classList.contains("active")) {
               ref.classList.remove("active");
            }
         })
         setCurrentCar(car)
         CarsRef.current[index].classList.add("active");
      }
   };

   const handleCheckout = () => {
      checkout(currentCar)
   }
   return (
      <>
         <Wrapper>
            <Header />
            <TitleContainer>
               <Title>Choose a ride or swipe up for more </Title>
            </TitleContainer>
            <CarList>
               {
                  data?.map((car, index) => (
                     <Car key={index} id='car'
                        onClick={setActive.bind(null, index, { username: car.user.username, type, price: ((distance * car.multiplier) / 10).toFixed(2) })}
                        ref={ref => {
                           CarsRef.current[index] = ref; // took this from your guide's example.
                        }}
                        onTouchEnd={setActive.bind(null, index)}
                     >
                        <CarImg src={car.imgUrl} />
                        <CarDetails>
                           <ServiceSection>
                              {car.service}
                           </ServiceSection>
                           <TimeSection>
                              5 min away
                           </TimeSection>
                        </CarDetails>
                        <Price>{'$' + ((distance * car.multiplier) / 10).toFixed(2)}</Price>
                     </Car>
                  ))
               }
            </CarList>
         </Wrapper>
         <ConfirmButtonContainer>
            <Link href={{
               pathname: '/search',
               query: {
                  type: type,
               }
            }}>
               <BackButton>
                  Back
               </BackButton>
            </Link>
            <ConfirmButton onClick={() => {
               handleCheckout()
            }}>
               Confirm
            </ConfirmButton>
         </ConfirmButtonContainer>
      </>
   )
}

export default RideSelector

const Wrapper = tw.div`
flex-1 overflow-y-hidden flex flex-col
`
const Title = tw.div`
text-gray-200 font-konit text-center text-sm sm:text-lg py-2 flex-1
`
const TitleContainer = tw.div`
flex items-center border-b mt-5
`
const CarList = tw.div`
overflow-y-scroll
`
const Car = tw.div`
flex p-4 items-center hover:bg-main hover:text-black cursor-pointer transition duration-200 ease-out hover:ease-in transform text-white
`

const CarImg = tw.img`
h-14 mr-2
`
const CarDetails = tw.div`
flex-1
`
const ServiceSection = tw.div`
font-medium text-lg
`
const TimeSection = tw.div`
text-xs
`
const Price = tw.div`
text-sm font-medium
`

const ConfirmButtonContainer = tw.div`
flex items-center
`
const ConfirmButton = tw.div`
bg-main rounded-xl flex-1 text-black my-4 mx-4 py-3 font-bold px-2 text-center text-xl cursor-pointer
`
const BackButton = tw.div`
bg-mainBlack rounded-xl flex-1 text-white my-4 mx-4 py-3 font-bold px-2 text-center text-xl cursor-pointer hover:shadow-custom transition duration-300 transform
`