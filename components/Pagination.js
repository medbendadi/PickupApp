import React, { useEffect, useRef, useState } from 'react'
import tw from "tailwind-styled-components"
import { signInWithPopup } from 'firebase/auth';



const Table = props => {
   const [data, setData] = useState([{}]);
   const [dataShow, setDataShow] = useState([{}])
   const pageRef = useRef([]);
   const [thisIndex, setThisIndex] = useState(0)


   const initDataShow = props.limit && data ? data.slice(0, Number(props.limit)) : data
   useEffect(
      () => {
         function getData() {
            setDataShow(initDataShow)
            setData(props.bodyData)
         }
         getData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data]);



   let pages = 1

   let range = []
   let page = Math.ceil(props.bodyData.length / Number(props.limit))

   if (props.limit) {
      pages = props.bodyData.length & Number(props.limit) === 0 ? page : page
      range = [...Array(pages).keys()]
   }


   const [currPage, setCurrPage] = useState(1)

   const selectPage = page => {
      // console.log(page);
      setThisIndex(page)
      const start = Number(props.limit) * (page)
      const end = start + Number(props.limit)

      setDataShow(props.bodyData.slice(start, end))

      setCurrPage(page + 1)
   }

   const onNextClick = () => {
      const start = Number(props.limit) * (page)
      const end = start + Number(props.limit)

      setDataShow(props.bodyData.slice(start, end))

      setCurrPage(page + 1)
      // selectPage(pageRef.current[thisIndex])
      setActive()
      // currPage === pageRef.current.id && pageRef.current.classList.add('active')
   }

   const setActive = index => {
      if (pageRef.current[thisIndex].classList.contains("active")) {
         pageRef.current[thisIndex].classList.remove("active");
         return;
      } else {

         pageRef.current.forEach((ref) => {
            if (ref.classList.contains("active")) {
               ref.classList.remove("active");
            }
         })
         pageRef.current[thisIndex].classList.add("active");
      }
   };

   return (
      <div key={props.bodyData[0].id}>
         {
            dataShow.map((item, index) => props.renderBody(item, index))
         }
         {
            page > 1 ? (
               <>
                  <div className="table__pagination">
                     {
                        (thisIndex !== 2) ? (
                           <div className='table__pagination-items'>
                              {
                                 range.map((item, index) => (
                                    <div
                                       ref={ref => {
                                          pageRef.current[index] = ref; // took this from your guide's example.
                                       }}
                                       key={index}
                                       id={index}
                                       className={`table__pagination-item ${currPage === index + 1 ? 'active' : ''}`}
                                       onClick={() => {
                                          selectPage(index)

                                       }}
                                    >
                                    </div>

                                 ))
                              }

                           </div>

                        ) : null
                     }
                     <ButtonContainer>

                        {
                           [0, 1, 2].map((item, index) => (
                              (item === thisIndex) &&
                              <React.Fragment key={index}>
                                 {
                                    (index === 2) ? (
                                       <SignInButton onClick={() => signInWithPopup(props.auth, props.googleProvider)}>Sign in with Google</SignInButton>
                                    ) : (
                                       <NextButton key={index} onClick={() => {
                                          setThisIndex(index);
                                          selectPage(index + 1)
                                          setActive(index + 1)
                                       }}>
                                          <NextButtonImg src='https://i.ibb.co/3p9LyNN/right-arrow-alt-regular-24.png" alt="right-arrow-alt-regular-24' />
                                       </NextButton>
                                    )
                                 }
                              </React.Fragment>
                           ))
                        }
                     </ButtonContainer>
                  </div>
               </>
            ) : null
         }
      </div>
   )
}

export default Table

const NextButton = tw.div`
h-12 bg-main w-12 hover:shadow-custom rounded-full self-end cursor-pointer transition duration-300 transform
`
const NextButtonImg = tw.img`
h-full
`
const SignInButton = tw.button`
bg-main rounded-xl font-bold text-center py-3 w-full text-black hover:shadow-custom transition duration-300 transform
`

const ButtonContainer = tw.div`
flex w-full justify-end
`