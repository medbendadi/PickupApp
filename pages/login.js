import React, { useEffect } from 'react'
import tw from "tailwind-styled-components"
import HeadC from '../components/HeadC'
import { auth, googleProvider, githubProvider } from '../firebase'
import { useRouter } from 'next/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import Pagination from '../components/Pagination'

const data = [
   {
      title: 'Select your destination',
      description: 'Choose your destination by searching'
   },
   {
      title: 'Good prices',
      description: 'Choose the right rider for you'
   },
   {
      title: 'You ready ? ',
      description: 'Lets Login Or Create an Account'
   }
]

function Login() {
   const router = useRouter()
   useEffect(() => {
      onAuthStateChanged(auth, user => {
         if (user) {
            console.log(user);
            router.push('/')
         }
      })
   }, [])
   const renderBody = (item, index) => (
      <DescriptionContainer key={index}>
         <Title>{item.title}</Title>
         <Description>{item.description}</Description>
      </DescriptionContainer>
   )
   return (
      <Wrapper>
         <HeadC title='Login' />
         <Container>
            <LoginContainer>
               <LogoContainer>
                  <UberLogo src={'/original-892677c725f1b56cfbdd8031e35c3f90__3_-removebg-preview.png'} />
                  <LogoText>Pickup</LogoText>
               </LogoContainer>
               <DescriptionContainer>
                  <Pagination
                     limit='1'
                     renderBody={(item, index) => renderBody(item, index)}
                     bodyData={data}
                     auth={auth}
                     googleProvider={googleProvider}
                  />
                  {

                  }
               </DescriptionContainer>
            </LoginContainer>
            <ImageContainer>
               <CoverImage src='/login-cover.jpg' />
            </ImageContainer>
         </Container>
      </Wrapper>
   )
}

export default Login


const Wrapper = tw.div`
bg-gray-200  h-screen flex sm:justify-center sm:items-center bg-mainBlackLight text-white
`
const Container = tw.div`
flex bg-white-200 sm:h-2/3 sm:w-4/5 w-full h-full sm:flex-row flex-col rounded-xl overflow-hidden bg-mainBlack
`
const ImageContainer = tw.div`
flex-1 h-full sm:order-last order-first
`
const CoverImage = tw.img`
h-full w-full object-cover
`

const LoginContainer = tw.div`
flex-1 px-12 py-6 flex flex-col
`

const LogoContainer = tw.div`
flex items-center cursor-pointer
`
const LogoText = tw.div`
font-konit text-3xl text-main
`

const UberLogo = tw.img`
  h-7
`


const DescriptionContainer = tw.div`
h-full flex flex-col sm:mt-10
`
const Title = tw.div`
text-3xl pt-4 text-white my-5
`
const HeadImg = tw.img`
object-contain w-full
`
const Description = tw.p`
text-gray-400 text-lg
`