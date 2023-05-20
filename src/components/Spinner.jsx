import Loading from '../assets/Loading.gif'

const Spinner =()=> {
    return (
      <div className='text-center'>
        <img src={Loading} className='my-3' style={{width:"30px",
      height:"30px"
      }} alt="Loading" />
      </div>
    )
}

export default Spinner;
