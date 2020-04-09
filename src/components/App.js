import React from "react";
import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTab from "./MovieTab";
import Pagination from "./Pagination";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      myMovies: [],
      willWatch: [],
      sort_by: "popularity.desc",
      total_pages: "",
      page: 1
    }
  }

  componentDidMount() {
    // fetch("http://cors-anywhere.herokuapp.com/" + "https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
    this.getMovies();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevState.sort_by !== this.state.sort_by) || (prevState.page !== this.state.page)) {
      this.getMovies();
      window.scrollTo(0, 0);
    }
  };

  getMovies = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&language=en-US&sort_by=${this.state.sort_by}&page=${this.state.page}`)
      .then((response) => {
        return response.json()
      }).then((data) => {
      // console.log("data", data);
      this.setState(
        {myMovies: data.results,
          total_pages: data.total_pages}
      );
    });
  };

  removeMyMovie = myMovie => {
    const newMovies = this.state.myMovies.filter(function(item) {
      return item.id !== myMovie.id;
    });
    const newRemoveMovies = this.state.willWatch.filter(function(item) {
      return item.id !== myMovie.id;
    });
    this.setState(
      {myMovies: newMovies,
        willWatch: newRemoveMovies}
    );
  };

  addMyMovie = myMovie => {
    const newWillWatch = [...this.state.willWatch];
    newWillWatch.push(myMovie);
    this.setState(
      {willWatch: newWillWatch}
    );
  };

  removeMyMovieFromWillWatch = myMovie => {
    const newRemoveMovies = this.state.willWatch.filter(function(item) {
      return item.id !== myMovie.id;
    });
    this.setState(
      {willWatch: newRemoveMovies}
    );
  };

  changeSortBy = value => {
    this.setState({sort_by: value});
  };

  changePageToPrevious = () => {
    if(this.state.page !== 1) {
      const previousPage = this.state.page - 1;
      this.setState({page: previousPage});
    }
  };

  changePageToNext = () => {
    if(this.state.page !== 500) {
      const nextPage = this.state.page + 1;
      this.setState({page: nextPage});
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTab sort_by={this.state.sort_by} changeSortBy={this.changeSortBy} />
              </div>
            </div>
            <div className="row">
              {this.state.myMovies.map( myMovie => {
                return(
                  <div className="col-6 mb-4" key={myMovie.id}>
                    <MovieItem willWatch={this.state.willWatch} myMovie={myMovie} removeMyMovie={this.removeMyMovie} addMyMovie={this.addMyMovie} removeMyMovieFromWillWatch={this.removeMyMovieFromWillWatch} />
                  </div>
                );
              })}
            </div>
            <div className="row mb-4 mt-4">
              <div className="col-12">
                <Pagination totalPages={this.state.total_pages} changePageToPrevious={this.changePageToPrevious} page={this.state.page} changePageToNext={this.changePageToNext} />
              </div>
            </div>
          </div>
          <div className="col-3">
            <p className="h2">Will watch: {this.state.willWatch.length} movies</p>
            <ul className="list-group">
              {this.state.willWatch.map( myMovie => {
                return (
                  <li key={myMovie.id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <p>{myMovie.title}</p>
                      <p>{myMovie.vote_average}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

    )
  }
}

export default App;
