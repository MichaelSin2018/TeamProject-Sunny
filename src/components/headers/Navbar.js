import React, { Component } from 'react'
import logo from './beach.svg'
import './navbar.css'

class Navbar extends Component {
  state = {
    query: ''
  }

  toggleLogin = () => {
    if (localStorage.length > 1) {
      return (
        <div>
          <img id='user-kakao-pic' src={localStorage.getItem('thumbnail_image')} alt='user-thumbnail'></img>
          <br clear='all' />
          <p id='user-kakao-nickname'>Welcome {localStorage.getItem('username')}!</p>
        </div>
      )
    } else {
      return (
        <a className='nav-link' id='login-link' href='/login'>Login</a>
      )
    }
  }

  render() {
    return (
      <div>
        <nav className='navbar sticky-top'>     
            <div className='navbar-header'>
            <span><img id='logo-image' src={logo} className='logo' alt='logo' /></span>
            <a className='navbar-brand app-title' href='/'>sunny</a>
            </div>         

          <button className='navbar-toggler p-0' type='button' data-toggle='collapse' data-target='#toggler-items' aria-controls='toggler-items' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='navbar-collapse collapse' id='toggler-items'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                {this.toggleLogin()}
              </li>
            </ul>
          </div>
        </nav>      

      </div>
    )
  }
}

export default Navbar
