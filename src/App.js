import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header';
import { StockItems } from './components/StockItems';
import { ItemDetails } from './components/ItemDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.filterFavourites = this.filterFavourites.bind(this);
    this.resetFavourites = this.resetFavourites.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.doAdvancedSearch = this.doAdvancedSearch.bind(this);
    this.state = {
      items: [],
      displayedItems: [],
      loaded: false,
      nextPage: 1,
      errors: null,
      selectedItem: null,
      isFavouritesPage: false,
      favourites: [],
      showModal: false,
      infiniteScroll: true
    };
  }
  filterFavourites(){
    let items = this.state.items.filter((item) => this.state.favourites.includes(item.id));
    this.setState({displayedItems: items, isFavouritesPage: true, infiniteScroll: false});
  }
  resetFavourites(){
    this.setState({displayedItems: this.state.items, isFavouritesPage: false, infiniteScroll: true});
  }
  handleLike(id) {
    let newList = this.state.favourites;
    if(newList.includes(id)){
      newList.splice(newList.indexOf(id),1);
    } else {
      newList.push(id);
    }
    
    this.setState({favourites: newList});
    if(this.state.isFavouritesPage) {
      this.filterFavourites();
    }
    
  }

  handleCloseModal() {
    this.setState({ showModal: false, selectedItem: null});
  }

  handleShowModal(itemId) {
    let item = this.state.items.find(item => item.id === itemId);
    this.setState({ showModal: true , selectedItem: item});
  }
  render() {

    return (
      <div className="container-fluid">
          <Header 
              onShowFavourites={this.filterFavourites} 
              onResetFavourites={this.resetFavourites} 
              onSearch={this.doSearch} 
              onAdvSearch={this.doAdvancedSearch} />
          <div className="main">
            <StockItems 
                infiniteScroll = {this.state.infiniteScroll}
                onLoadMore={this.getNextPage} 
                favourites={this.state.favourites} 
                items={this.state.displayedItems} 
                onToggleFavourite= {this.handleLike} 
                onShowModal={this.handleShowModal}  /> 
          </div>
          <ItemDetails 
              item={this.state.selectedItem} 
              similar={this.state.displayedItems.slice(Math.floor(Math.random*this.state.items.length-3),3)} 
              onCloseModal={this.handleCloseModal} 
              onShowItem={this.handleShowModal} />
      </div>
    );
  }

  componentDidMount() {
    fetch("https://api.punkapi.com/v2/beers")
    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            items: result,
            displayedItems: result,
            nextPage:2,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            errors: error,
            infiniteScroll: false
          });
        }
      )
  }
  getNextPage() {
    fetch(`https://api.punkapi.com/v2/beers?page=${this.state.nextPage}`)
    .then(res => res.json())
      .then(
        (result) => {
          if(result.length === 0){
            this.setState({
              infiniteScroll: false
            });
          } else {
            let noDuplicates = this.removeDuplicates(this.state.items.concat(result));
            this.setState({
              items: noDuplicates,
              displayedItems: noDuplicates,
              nextPage: this.state.nextPage + 1 
            });
          }
          
        },
        (error) => {
          this.setState({
            errors: error,
            // infiniteScroll: false
          });
        }
      )
  }
  doAdvancedSearch(searchOptions) {
    let searchString = '';
    for(var name in searchOptions) {
      if(searchOptions[name] !== '') {
        if (searchString !== '') {
          searchString += "&";
        }
        searchString+= `${name}=${encodeURIComponent(searchOptions[name].replace(/ /g,"_"))}`;
      }
    }
    fetch(`https://api.punkapi.com/v2/beers?${searchString}`)
    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            displayedItems: result,
            items: this.removeDuplicates(this.state.items.concat(result)),
            infiniteScroll: false
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            errors: error,
            infiniteScroll: false
          });
        }
      )

  }
  doSearch(searchString) {
    if(searchString.length < 1) {
      // this.resetFavourites();
      return;
    }
    searchString = searchString.replace(/ /g,"_");
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${searchString}`)
    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            displayedItems: result,
            items: this.removeDuplicates(this.state.items.concat(result)),
            infiniteScroll: false
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            errors: error,
            infiniteScroll: false
          });
        }
      )
  }

  removeDuplicates(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].id === a[j].id)
                a.splice(j--, 1);
        }
    }

    return a;
  }
}

export default App;
