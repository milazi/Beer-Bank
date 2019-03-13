import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export class StockItems extends Component {
    constructor(props){
        super(props);
        this.loadMore = this.loadMore.bind(this);
    }
    loadMore(){
        this.props.onLoadMore();
    }
    render(){
        const {items} = this.props;
        const {favourites} = this.props;
        return (
            <div className="stock-items">
                <InfiniteScroll
                    dataLength={items.length}
                    children = {items}
                    next={this.loadMore}
                    hasMore = {this.props.infiniteScroll}
                    loader = {<div className='col-sm-12'>Loading..</div>}
                    endMessage={
                        <div className="col-sm-12" style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                        </div>
                    }
                >
                    {items.map((item, index)=> {
                        let offsetClass = "";
                        if(index % 2 === 0 ){
                            offsetClass += " stock-item-offset-2";
                        }
                        if(index % 3 === 0 ){
                            offsetClass += " stock-item-offset-3";
                        }
                        return (
                            <StockItem 
                                key={item.id} 
                                item={item} 
                                favourite={favourites.includes(item.id)} 
                                onToggleFavourite= {this.props.onToggleFavourite} 
                                onItemSelected={this.props.onShowModal} 
                                extraClasses={offsetClass}
                                />
                        );
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}

export class StockItem extends Component {
    constructor(props) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
        this.toggleFavouriteItem = this.toggleFavouriteItem.bind(this);
    }
    toggleFavouriteItem(id){
        this.props.onToggleFavourite(id);
    }
    selectItem(id){
        this.props.onItemSelected(id);
    }
    render(){
        const { item } = this.props;
        return (
            <div className={"stock-item "+ this.props.extraClasses}>
                <div className="stock-favourite-icon">
                    <span className={"fa " + (this.props.favourite ? "fa-star" : "fa-star-o")} onClick={() => this.toggleFavouriteItem(item.id)}> </span>
                </div>
                <div className="stock-image-wrapper">
                        <img src={ item.image_url } alt="Beer" className="stock-item-image" />
                </div>
                <div className="stock-name" data-toggle="modal" data-target="#myModal" onClick={() => this.selectItem(item.id)}>
                 { item.name }
                </div>
                <div className="stock-tagline" >
                { item.tagline }
                </div>
            </div>  
        );
    }
}