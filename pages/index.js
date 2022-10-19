import Link from "next/link"
import tw from "tailwind-styled-components"
import ActionItems from "../components/ActionItems"
import HeadC from "../components/HeadC"
import Map from "../components/Map"


export default function Home() {

  return (
    <Wrapper>
      <HeadC title='Home' />
      <Map />
      <ActionItems />
    </Wrapper>
  )
}


const Wrapper = tw.div`
  flex flex-col sm:flex-row h-screen w-screen
`
