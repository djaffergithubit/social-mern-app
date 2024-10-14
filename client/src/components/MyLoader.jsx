import { Oval } from 'react-loader-spinner'

const MyLoader = () => {
  return <Oval
  visible={true}
  height="24"
  width="24"
  color="#ffffff"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
}

export default MyLoader