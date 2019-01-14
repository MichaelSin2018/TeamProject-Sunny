import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import ReactSwipeNavigation from 'react-swipe-navigation';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Navbar from './components/headers/Navbar'
import Login from './components/headers/Login'
import Search from './components/search/Search'
import Politics from './components/headline/Politics'
import Economy from './components/headline/Economy'
import Society from './components/headline/Society'
import World from './components/headline/World'
import Sports from './components/headline/Sports'
import Entertainment from './components/headline/Entertainment'
library.add(faClock)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      newsTitle: '',
      playingID: null,
      playAndPause: 'play',
      usrName: null,
      usrImg: null
    }
  }
  
  _getToken () {
    const currentUrl = window.location.href;
    const token = currentUrl.split('?token=')[1];
    
    if (token) {
      jwt.verify(token, process.env.REACT_APP_JWT_TOKEN, 
      (err, decoded) => {
        if (err) throw err; 

        localStorage.setItem('username', decoded.username)
        localStorage.setItem('thumbnail_image', decoded.thumbnail_image)

        let getUsername = localStorage.getItem('username')
        let getUserPic = localStorage.getItem('thumbnail_image')

        this.setState({usrName: getUsername, usrImg: getUserPic})
      })
    } 
  }

  componentDidMount() {
    this._getToken();
  }

  roadNewsTitle = (title) => {
    this.setState({
      newsTitle: title
    })
  }

  roadPlayingID = (id) => {
    this.setState({
      playingID: id
    })
  }

  togglePlay = () => {
    if(this.state.playingID === null) {
      return 
    } else if(this.state.playAndPause === 'play') {
      this.setState({
        playAndPause: 'pause'
      },() => {
        document.getElementById(this.state.playingID).pause()
      })
    } else if(this.state.playAndPause === 'pause') {
      this.setState({
        playAndPause: 'play'
      },()=>{
        document.getElementById(this.state.playingID).play()
      })
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <Route path='/login' component={Login} />
          <Route exact={true} path='/' render={() =>
            <React.Fragment>
              <Search articles={this.state.articles}/>
              <div>
              <ReactSwipeNavigation menu={['정치', '경제', '사회', '세계', '스포츠', '연예']} >
                <div>
                <Politics
                  articles={this.state.articles}
                  roadNewsTitle={this.roadNewsTitle}
                  roadPlayingID={this.roadPlayingID}
                  />
                </div>
                <div>
                <Economy 
                  articles={this.state.articles} 
                  roadNewsTitle={this.roadNewsTitle}
                  roadPlayingID={this.roadPlayingID}
                  />
                </div>
                <div>
                <Society 
                  articles={this.state.articles} 
                  roadNewsTitle={this.roadNewsTitle}
                  roadPlayingID={this.roadPlayingID}
                  />
                </div>
                <div>
                <World 
                  articles={this.state.articles} 
                  roadNewsTitle={this.roadNewsTitle}
                  roadPlayingID={this.roadPlayingID}
                  />
                </div>
                <div>
                <Sports 
                  articles={this.state.articles} 
                  roadNewsTitle={this.roadNewsTitle}
                  roadPlayingID={this.roadPlayingID}
                  />
                </div>
                <div>
                <Entertainment 
                  articles={this.state.articles} 
                  roadNewsTitle={this.roadNewsTitle}
                  roadPlayingID={this.roadPlayingID}
                  />
                </div>
              </ReactSwipeNavigation>
              </div>
 
              <footer className='playAndPause' onClick={() =>this.togglePlay()}>Pause</footer>
              <footer className="footerNewsTitle">
              <span className='marquee'>{this.state.newsTitle}</span>
              </footer>

            </React.Fragment>
          } />
        </div>
      </Router>
    );
  }
}

export default App;
