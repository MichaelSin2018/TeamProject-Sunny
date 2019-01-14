import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DEFAULT_IMAGE from './default.jpg'

class Economy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previousId2: null,
      previousId: null,
      playingId: null,
      nextId: null,
      economy: [],
    }
  }

  componentDidMount() {
    axios.get(`http://13.125.111.99/articles/?category_id=2`)
        .then(economy => {
          this.setState({economy: economy.data})
        })
        .catch(error => console.log(error))
  }

  playAudio = (id, title) => {
    if(this.state.playingId === null) {
      this.setState({
        previousId2: null,
        previousId: null,
        playingId: JSON.stringify(id),
        nextId: null,
      }, () => {
        document.getElementById(this.state.playingId).play();
        this.props.roadNewsTitle(title)
        this.props.roadPlayingID(this.state.playingId)
      })
    } else if(this.state.playingId !== null) {
        this.setState({
          previousId2: this.state.previousId,
          previousId: this.state.playingId,
          playingId: JSON.stringify(id),
          nextId: null,
        }, () => {
          if(this.state.previousId === this.state.playingId) {
            document.getElementById(this.state.previousId).pause()
            this.props.roadNewsTitle('')
            this.setState({
              previousId2: null,
              previousId: null,
              playingId: null,
              nextId: null,
            })
          } else {
            document.getElementById(this.state.previousId).pause()
            this.props.roadNewsTitle('')
            document.getElementById(this.state.playingId).play();
            this.props.roadNewsTitle(title)
            this.props.roadPlayingID(this.state.playingId)
          }
        })
    } 
   }

  render() {
    moment.locale('ko')
    let displayArticles = this.state.economy.map(article => {
        return (
          <div className='card bg-light mb-2' key={article.id} onDoubleClick={() => this.playAudio(article.id, article.title)}>
            <Media>
              <Media.Left>
                {article.image_url ? (<img src={article.image_url} className='headline-cover' alt="headline cover" />) : (<img src={DEFAULT_IMAGE} className='headline-cover' alt="headline cover" />)}
              </Media.Left>
              <Media.Body>
                <Media.Heading>
                  {article.title} 
                </Media.Heading>
                <div className='additional-article-info'>
                  <span className='publisher-name'>{article.publisher}</span> 
                  <span className='clock'><FontAwesomeIcon icon="clock" /></span>
                  <span className='article-createdAt'>
                    {moment(article.createdAt).locale('kr').fromNow()}</span>
                </div>
                
              </Media.Body>
            </Media>
              
            <audio id={article.id} preload='none' controls hidden >
              <source src={`http://13.125.111.99/play?url=${article.source_url}`} type="audio/mp3"/>
            </audio>
          </div>
          
        )        
    })
    return (
      <div>
        {displayArticles}
      </div>
    )
  }
}

export default Economy
