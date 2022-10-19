import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import tw from "tailwind-styled-components"
import AsyncSelect from 'react-select/async';
import axios from 'axios'
import HeadC from '../components/HeadC';
import Header from '../components/Header';
import { useRouter } from 'next/router'



const loadOptions = inputValue => {
   return new Promise((resolve, reject) => {
      // using setTimeout to emulate a call to server
      setTimeout(() => {
         if (inputValue === '') {
            resolve('')
         }
         resolve(filter(inputValue));
      }, 500);
   });
};

const filter = async inputValue => {

   const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?` +
      new URLSearchParams({
         access_token: 'pk.eyJ1IjoibWVkYmVuZGFkaSIsImEiOiJjbDlhMTlhejkwbHAxM3dwOHkycHJ3cTNwIn0.HCITQvgNiGt3bn1DNbliww',
         limit: 10,
         autocomplete: true,
         // country: 'ma'
      }))
   if (response.status === 200) {
      return response.data.features.filter(option =>
         option.place_name.toLowerCase().includes(inputValue.toLowerCase())
      )
   }

}
const customStyles = {
   control: (provided, state) => {

      const backgroundColor = '#343332'
      const borderColor = '#343332'
      const hover = {
         borderColor: '#c0ec4e'
      }
      const boxShadow = !state.menuIsOpen ? "none" : '0 0 0 1px #c0ec4e'



      return { ...provided, backgroundColor, borderColor, '&:hover': hover, boxShadow }

   },
   option: (provided, state) => {
      const backgroundColor = '#343332'
      const color = '#ffff'
      const hover = {
         backgroundColor: '#c0ec4e',
         color: '#000'
      }


      return { ...provided, backgroundColor, color, '&:hover': hover }
   },

   input: (provided, state) => {
      const color = '#ffff'


      return { ...provided, color }
   },

   menu: (provided, state) => {

      const backgroundColor = '#343332'
      const color = '#fff'

      return { ...provided, color, backgroundColor }
   },

   loadingIndicator: (provided, state) => {

      const color = '#c0ec4e'

      return { ...provided, color }
   },

   singleValue: (provided, state) => {

      const color = '#c0ec4e'

      return { ...provided, color }
   },

}

const Search = () => {
   const [fromSelectedValue, setFromSelectedValue] = useState(null)
   const [toSelectedValue, setToSelectedValue] = useState(null)
   const [fromSelectedValueInput, setFromSelectedValueInput] = useState(null)
   const [toSelectedValueInput, setToSelectedValueInput] = useState(null)
   const router = useRouter()
   const { type } = router.query




   const handleFromInputChange = (value) => {
      setFromSelectedValueInput(value);
   };

   const handleToInputChange = (value) => {
      setToSelectedValueInput(value);
   };

   const handleFromSelectChange = (value) => {
      setFromSelectedValue(value.place_name);
   };
   const handleToSelectChange = (value) => {
      setToSelectedValue(value.place_name);
   };
   return (
      <Wrapper>
         <HeadC title='Search' />
         <Header />
         <InputContainer>
            <FromToIcons>
               <Circle src='https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png' />
               <Line src='https://img.icons8.com/ios/50/9CA3AF/vertical-line.png' />
               <Square src='https://img.icons8.com/windows/50/000000/square-full.png' />
            </FromToIcons>
            <InputBoxes>
               <Input>
                  <AsyncSelect
                     styles={customStyles}
                     cacheOptions
                     defaultOptions
                     id="long-value-select"
                     instanceId="long-value-select"
                     placeholder='From: City, State, Country'
                     getOptionLabel={(e) => e.place_name}
                     getOptionValue={(e) => e.center}
                     loadOptions={loadOptions}
                     onInputChange={handleFromInputChange}
                     onChange={handleFromSelectChange}
                  />
               </Input>
               <Input>
                  <AsyncSelect
                     cacheOptions
                     defaultOptions
                     styles={customStyles}
                     id="long-value-select"
                     instanceId="long-value-select"
                     placeholder='To: City, State, Country'
                     getOptionLabel={(e) => e.place_name}
                     getOptionValue={(e) => e.center}
                     loadOptions={loadOptions}
                     onInputChange={handleToInputChange}
                     onChange={handleToSelectChange}
                  />
               </Input>
               {/* <Input placeholder='Enter pickup location' name="address" type="text" /> */}
               {/* <Input placeholder='Where to?' name="address" type="text" /> */}
            </InputBoxes>
            <PlusIcon src='https://img.icons8.com/ios/50/000000/plus-math.png' />
         </InputContainer>
         <SavedPlaces>
            <StarIcon src='https://img.icons8.com/ios-filled/50/ffffff/star--v1.png' />
            Saved Places
         </SavedPlaces>
         <ConfirmButtonContainer>
            <Link href='/'>
               <BackButton>
                  Back
               </BackButton>
            </Link>
            <Link href={{
               pathname: '/confirm',
               query: {
                  from: fromSelectedValue,
                  to: toSelectedValue,
                  type: type
               }
            }}>
               <ConfirmButton>
                  Confirm
               </ConfirmButton>
            </Link>
         </ConfirmButtonContainer>
      </Wrapper>
   )
}

export default Search

const Wrapper = tw.div`
bg-mainBlack h-screen
`
const ButtonContainer = tw.div`
bg-mainBlack px-3
`
// const BackButton = tw.img`
// h-12 cursor-pointer
// `
const InputContainer = tw.div`
bg-mainBlack flex items-center mt-12 mb-3 pt-2 px-4
`
const FromToIcons = tw.div`
w-10 flex flex-col items-center mr-2
`
const Circle = tw.img`
h-2.5 
`
const Line = tw.img`
h-10
`
const Square = tw.img`
h-3.5
`
const InputBoxes = tw.div`
flex flex-col flex-1
`
const Input = tw.div`
h-10 my-2
`

const PlusIcon = tw.img`
h-10 w-10 bg-main rounded-full ml-3 p-1
`

const SavedPlaces = tw.div`
flex items-center bg-mainBlack text-white px-4 py-2
`
const StarIcon = tw.img`
bg-mainBlackLight w-10 h-10 p-2 rounded-full mr-2
`

const ConfirmLocation = tw.div`
px-4 my-2
`
// const ConfirmButton = tw.button`
// bg-main rounded-xl text-black font-bold p-3 w-full text-xl
// `

const ConfirmButtonContainer = tw.div`
flex items-center
`
const ConfirmButton = tw.div`
bg-main rounded-xl flex-1 text-black my-4 mx-4 py-3 font-bold px-2 text-center text-xl cursor-pointer hover:shadow-custom transition duration-300 transform
`
const BackButton = tw.div`
bg-mainBlackLight rounded-xl flex-1 text-white my-4 mx-4 py-3 font-bold px-2 text-center text-xl cursor-pointer
`