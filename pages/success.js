import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { carList } from '../data/carList'
import { cycleList } from '../data/cycleList'
const Success = () => {
   const router = useRouter()
   const { username, type } = router.query
   const [data, setData] = useState([])
   useEffect(() => {
      const getData = () => {
         if (!(username && type))
            return router.replace('/')
         if (type === 'cycling') {
            setData(cycleList)
         } else {
            setData(carList)
         }
      }
      getData()
   }, [])

   console.log(data);


   return (
      <div>Success</div>
   )
}

export default Success