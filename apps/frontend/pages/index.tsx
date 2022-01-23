import {useEffect, useState} from 'react'
import Button from '@mui/material/Button';

export function Index() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   fetch('http://localhost:3333/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setData(JSON.stringify(data))
  //       setLoading(false)
  //     })
  // }, [])

  if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No profile data</p>

  return (
    <div>
      {/* <h1>{data.name}</h1> */}
      {/* <p>{data}</p> */}
      <Button>CLICK ME</Button>
    </div>
  )
}

export default Index;
