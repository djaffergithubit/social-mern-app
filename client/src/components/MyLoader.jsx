import { Oval } from 'react-loader-spinner'

const MyLoader = ({height, width}) => {
  return <Oval
  visible={true}
  height={height}
  width={width}
  color="#ffffff"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
}

export default MyLoader