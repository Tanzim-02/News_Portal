import React, { Component } from 'react';

import Loading from '../assets/Loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Loading} className='my-3' style={{width:"30px",
      height:"30px"
      }} alt="Loading" />
      </div>
    )
  }
}
