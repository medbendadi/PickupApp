import Link from 'next/link'
import React from 'react'
import tw from "tailwind-styled-components"
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image'

const Header = () => {
   const [user, setUser] = React.useState(null)
   const router = useRouter()

   React.useEffect(() => {
      return onAuthStateChanged(auth, user => {
         if (user) {
            setUser({ name: user.displayName, imgUrl: user.photoURL })
            console.log(user.photoURL);
         } else {
            router.push('/login')
            setUser(null)
         }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth])
   return (
      <HeaderContainer>
         <Link href='/'>
            <LogoContainer>
               <UberLogo src={'/original-892677c725f1b56cfbdd8031e35c3f90__3_-removebg-preview.png'} />
               <LogoText>Pickup</LogoText>

            </LogoContainer>
         </Link>
         <Profile onClick={() => signOut(auth)}>
            <Name>{user && user.name}</Name>

            <UserImg src={user && user.imgUrl} />
         </Profile>

      </HeaderContainer>
   )
}

export default Header


const HeaderContainer = tw.div`
flex justify-between items-center pt-2 px-4
`
const LogoContainer = tw.div`
flex items-center cursor-pointer
`
const LogoText = tw.div`
font-konit text-4xl text-main
`

const UberLogo = tw.img`
  h-10

`
const Profile = tw.div`
flex  items-center cursor-pointer
`
const Name = tw.div`
mr-4 w-20 text-sm text-white
`
const UserImg = tw.img`
h-12 w-12 rounded-full border-grey-200 p-px
`
