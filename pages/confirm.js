import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Map from '../components/Map'
import RideSelector from '../components/RideSelector'
import * as turf from '@turf/turf'
import HeadC from '../components/HeadC'
import { carList } from '../data/carList'
import { cycleList } from '../data/cycleList'



const Confirm = () => {
   const router = useRouter()
   const { from, to, type } = router.query

   const [fromCoordinates, setFromCoordinates] = useState([0, 0])
   const [toCoordinates, setToCoordinates] = useState([0, 0])
   const [distance, setDistance] = useState(0)


   const getFromCoordinates = (from) => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${from}.json?` +
         new URLSearchParams({
            access_token: 'pk.eyJ1IjoibWVkYmVuZGFkaSIsImEiOiJjbDlhMTlhejkwbHAxM3dwOHkycHJ3cTNwIn0.HCITQvgNiGt3bn1DNbliww',
            limit: 1,
            autocomplete: false,
         })
      )
         .then(res => res.json())
         .then((data) => {
            if (!data.features[0].center) return;
            if (data.features[0].place_name != from) return;
            setFromCoordinates(data.features[0].center)
         })
         .catch(err => console.error(err))
   }

   const getToCoordinates = (to) => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${to}.json?` +
         new URLSearchParams({
            access_token: 'pk.eyJ1IjoibWVkYmVuZGFkaSIsImEiOiJjbDlhMTlhejkwbHAxM3dwOHkycHJ3cTNwIn0.HCITQvgNiGt3bn1DNbliww',
            limit: 1,
            autocomplete: false,
         })
      )
         .then(res => res.json())
         .then((data) => {
            if (!data.features[0].center) return;
            if (data.features[0].place_name != to) return;
            setToCoordinates(data.features[0].center)
         })
         .catch(err => console.error(err))

   }

   const getPointsDistance = (FromCoordinates, ToCoordinates) => {
      var fromTurf = turf.point(FromCoordinates);
      var toTurf = turf.point(ToCoordinates);
      var distanceNum = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3, }).format(turf.distance(fromTurf, toTurf))
      setDistance(parseInt(distanceNum).toFixed(2));
   }

   useEffect(() => {
      getFromCoordinates(from)
      getToCoordinates(to)
   }, [from, to])

   useEffect(() => {
      getPointsDistance(fromCoordinates, toCoordinates)

   }, [fromCoordinates, toCoordinates])
   return (
      <Wrapper>
         <HeadC title='Confirm' />
         <Map
            distance={distance}
            fromCoordinates={fromCoordinates}
            toCoordinates={toCoordinates}
            type={type}
         />
         <RideContainer>
            <RideSelector
               distance={distance}
               data={type === 'cycling' ? cycleList : carList}
            />
            <ConfirmButtonContainer>
               <Link href={`/search/${type}`}>
                  <BackButton>
                     Back
                  </BackButton>
               </Link>
               <ConfirmButton>
                  Confirm
               </ConfirmButton>
            </ConfirmButtonContainer>
         </RideContainer>
      </Wrapper >
   )
}

export default Confirm



const Wrapper = tw.div`
h-screen flex flex-col sm:flex-row bg-mainBlackLight
`

const RideContainer = tw.div`
flex-1 flex flex-col sm:h-full h-3/5 sm:flex-none sm:w-2/5
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