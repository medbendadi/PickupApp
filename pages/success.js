import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { carList } from '../data/carList'
import { cycleList } from '../data/cycleList'
const Success = () => {
   const router = useRouter()
   const { sessionId, username, type } = router.query
   const [data, setData] = useState([])
   useEffect(() => {
      if (!(sessionId && username && type)) return router.replace('/')
      if (type === 'cycling') {
         setData(cycleList)
      } else {
         setData(carList)
      }
   }, [])

   console.log(data);

   return (
      <div>Success</div>
   )
}

export default Success