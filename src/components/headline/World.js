import React, { Component } from 'react'
import axios from 'axios'
import DEFAULT_IMAGE from './default.jpg'
import moment from 'moment'


class World extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previousId2: null,
      previousId: null,
      playingId: null,
      nextId: null,
      world: [],
    }
  }

  componentDidMount() {
    axios.get(`http://13.125.111.99/articles/?category_id=5`)
        .then(world => {
          this.setState({world: world.data})
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
    let displayArticles = this.state.world.map(article => {
        return (
          <div>
          <div className='card bg-light mb-2' key={article.id} onDoubleClick={() => this.playAudio(article.id, article.title)}>
            <div className='card-body'>
            <div className='scraped-img'>{article.image_url ? (<img src={article.image_url} alt='' />) : (<img src={DEFAULT_IMAGE} alt="" />)}</div>
            <span className='text-muted'>#{article.rank}</span>
            <h5 className='card-title'>{article.title} <span className='text-muted'>{article.publisher}</span></h5>
            <p className='card-subtitle text-muted'>{moment(article.createdAt).locale('kr').fromNow()}</p>
            </div>
            <audio id={article.id} preload='none' controls hidden >
            <source src={`http://13.125.111.99/play?url=${article.source_url}`} type="audio/mp3"/>
            </audio>
          </div>
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

export default World
