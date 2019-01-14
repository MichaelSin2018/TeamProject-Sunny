import React from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DEFAULT_IMAGE from './default.jpg'
import moment from 'moment'
import 'moment/locale/ko';
import './search.css';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '', 
      result: [], 
      modal: false,

      previousURL2: null,
      previousURL: null,
      playingURL: null,
      nextURL: null,
      playAndPause: 'play',
      newsTitle: '',
      blegh: 1
    };
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleToggle = (e) => {
    e.preventDefault()
    if (this.state.query === '') {
      alert('검색어를 입력해 주세요')
    }
    else if (this.state.query !== '') {
      this.setState({ modal: !this.state.modal })
      axios.get(`http://13.125.111.99/search/news?query=${this.state.query}`)
        .then(queried => {
          this.setState({result: queried.data})
        })
        .catch(error => console.log(error))
    }
  }

  playAudio = (URL, title) => {
    if(this.state.playingURL === null) {
      this.setState({
        previousURL2: null,
        previousURL: null,
        playingURL: URL,
        nextURL: null,
      }, () => {
        document.getElementById(this.state.playingURL).play();
        this.setState({
          newsTitle: title
        })
        // this.props.roadPlayingID(this.state.playingURL)
      })
    } else if(this.state.playingURL !== null) {
        this.setState({
          previousURL2: this.state.previousURL,
          previousURL: this.state.playingURL,
          playingURL: URL,
          nextURL: null,
        }, () => {
          if(this.state.previousURL === this.state.playingURL) {
            document.getElementById(this.state.previousURL).pause()
            // this.props.roadNewsTitle('')
            this.setState({
              previousURL2: null,
              previousURL: null,
              playingURL: null,
              nextURL: null,
            })
          } else {
            document.getElementById(this.state.previousURL).pause()
            // this.props.roadNewsTitle('')
            document.getElementById(this.state.playingURL).play();
            this.setState({
              newsTitle: title
            })
            // this.props.roadNewsTitle(title)
            // this.props.roadPlayingID(this.state.playingId)
          }
        })
    } 
   }

   togglePlay = () => {
    if(this.state.playingURL === null) {
      return 
    } else if(this.state.playAndPause === 'play') {
      this.setState({
        playAndPause: 'pause'
      },() => {
        document.getElementById(this.state.playingURL).pause()
      })
    } else if(this.state.playAndPause === 'pause') {
      this.setState({
        playAndPause: 'play'
      },()=>{
        document.getElementById(this.state.playingURL).play()
      })
    }
  }

  render() {
    moment.locale('ko')
    // console.log('search', this.state)

    let displayArticles = this.state.result.map((article, index) => {
      return (
        <div>
        <div data-index={index} className='card bg-light mb-2' key={index} onClick={() => this.playAudio(article.source_url, article.title)}>
          <div className='card-body'>
          <div>{article.image_url ? (<img src={article.image_url} alt='' />) : (<img src={DEFAULT_IMAGE} alt="" />)}</div>
          <h5 className='card-title'>{article.title} <span className='text-muted'>{article.publisher}</span></h5>
          <p className='card-subtitle text-muted'>{moment(article.createdAt).fromNow()}</p>
          </div>
          <audio id={article.source_url} preload='none' controls  >
            <source src={`http://13.125.111.99/play?url=${article.source_url}`} type="audio/mp3"/>
          </audio>  
        </div>
      </div>
      )        
    })

    return (
      <form>
        <div className='form-group'>
          <div className='input-group input-group-md mt-2 mb-2'>
            <input type='text' className='form-control' placeholder='Search for...'
              onChange={this.handleChange}
            />
            <div className='input-group-append'>
              <Button 
                id='BtnSubmit' type='submit' className='btn btn-outline-success btn-md' 
                onClick={this.handleToggle} onKeyPress={this.handleToggle}>검색
              </Button>
              <Modal isOpen={this.state.modal} size='lg' toggle={this.toggle}>
                <ModalHeader style={{ }}>{this.state.query}</ModalHeader>
                <ModalBody style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                  <div className='container-fluid'>
                  {displayArticles}
                  </div>
                </ModalBody>


                <ModalFooter>
                  <div className='searchPlayandPause' onClick={() =>this.togglePlay()}>Pause</div>

                  <span className='marquee'>{this.state.newsTitle}
                   {this.state.newsTitle}
                  </span>


                  <Button color='info' onClick={this.toggle} style={{ }}>닫기</Button>
                </ModalFooter>

              </Modal>
            </div>
          </div>
        </div>
      </form>     
    );
  }
}

export default Search
