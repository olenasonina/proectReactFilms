import React from "react";

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      myWillWatch: false,
    }
  }
  render() {
    const { willWatch, myMovie, removeMyMovie, addMyMovie, removeMyMovieFromWillWatch } = this.props;
    return (
      <div className="card">
        <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${myMovie.backdrop_path || myMovie.poster_path}`} alt={myMovie.title} />
        <div className="card-body">
          <h6 className="card-title">{myMovie.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {myMovie.vote_average}</p>
            {(this.state.myWillWatch || willWatch.filter( (item) => item.id === myMovie.id).length !== 0 )
              ?
              <button type="button"
                      className={(this.state.myWillWatch || willWatch.find( (item) => item.id === myMovie.id)) ? "btn btn-success" : "btn btn-secondary"}
                      onClick = {() => {
                        {(this.state.myWillWatch || willWatch.find( (item) => item.id === myMovie.id)) ? this.setState({myWillWatch: false}) : this.setState({myWillWatch: true})}
                        removeMyMovieFromWillWatch(myMovie);
                      }}
              >
                Remove will watch
              </button>
              :
              <button type="button"
                      className={(this.state.myWillWatch && willWatch.find( (item) => item.id !== myMovie.id)) ? "btn btn-success" : "btn btn-secondary"}
                      onClick = {() => {
                        {this.state.myWillWatch ? this.setState({myWillWatch: false}) : this.setState({myWillWatch: true})}
                        addMyMovie(myMovie);
                      }}
              >
                Add will watch
              </button>}
          </div>
          <button className="mb-4" type="button" onClick={removeMyMovie.bind(this, myMovie)}>Delete movie</button>
        </div>
      </div>
    )
  }
}

export default MovieItem;
