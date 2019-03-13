import React, {Component} from 'react';
export class ItemDetails extends Component {
    constructor(props, context) {
      super(props, context);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
      this.props.onCloseModal();
    }
  

    render(){
        const modalStyles = {
          'overflow': 'auto'
        };
        return (
           <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body" style={modalStyles}>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <ExpandedItem item={this.props.item} />
                        <SimilarItems onShowItem={this.props.onShowItem} items = {this.props.similar}  />
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export class ExpandedItem extends Component {
    render(){
        const item = this.props.item || {
            "id": 192,
            "name": "Punk IPA 2007 - 2010",
            "tagline": "Post Modern Classic. Spiky. Tropical. Hoppy.",
            "first_brewed": "04/2007",
            "description": "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
            "image_url": "https://images.punkapi.com/v2/192.png",
            "abv": 6.0,
            "ibu": 60.0,
            "target_fg": 1010.0,
            "target_og": 1056.0,
            "ebc": 17.0,
            "srm": 8.5,
            "ph": 4.4,
            "attenuation_level": 82.14,
            "volume": {
              "value": 20,
              "unit": "liters"
            },
            "boil_volume": {
              "value": 25,
              "unit": "liters"
            },
            "method": {
              "mash_temp": [
                {
                  "temp": {
                    "value": 65,
                    "unit": "celsius"
                  },
                  "duration": 75
                }
              ],
              "fermentation": {
                "temp": {
                  "value": 19.0,
                  "unit": "celsius"
                }
              },
              "twist": null
            },
            "ingredients": {
              "malt": [
                {
                  "name": "Extra Pale",
                  "amount": {
                    "value": 5.3,
                    "unit": "kilograms"
                  }
                }
              ],
              "hops": [
                {
                  "name": "Ahtanum",
                  "amount": {
                    "value": 17.5,
                    "unit": "grams"
                   },
                   "add": "start",
                   "attribute": "bitter"
                 },
                 {
                   "name": "Chinook",
                   "amount": {
                     "value": 15,
                     "unit": "grams"
                   },
                   "add": "start",
                   "attribute": "bitter"
                 },
              ],
              "yeast": "Wyeast 1056 - American Ale™"
            },
            "food_pairing": [
              "Spicy carne asada with a pico de gallo sauce",
              "Shredded chicken tacos with a mango chilli lime salsa",
              "Cheesecake with a passion fruit swirl sauce"
            ],
            "brewers_tips": "While it may surprise you, this version of Punk IPA isn't dry hopped but still packs a punch! To make the best of the aroma hops make sure they are fully submerged and add them just before knock out for an intense hop hit.",
            "contributed_by": "Sam Mason <samjbmason>"
          };
        return (
            <div className="expanded-item">
                <div className="item-image">
                    <img src={item.image_url} alt="beer" />
                </div>
                <ItemProperties item={item} />
            </div>
        );
    }
}
export class ItemProperties extends Component {
    render(){
        const {item} = this.props;
        return(
            <div className="item-properties">
                <h1 className="title">
                    {item.name}
                </h1>
                <div className="tagline">
                    {item.tagline}
                </div>
                <hr className="separator" />
                <div className="properties">
                    <Property name="IBU" value={item.ibu} />
                    <Property name="ABV" value={item.abv + "%"} />
                    <Property name="EBC" value={item.ebc} />
                </div>
                <div className="description">
                    {item.description}
                </div>
                <ServingAdvice items = {item.food_pairing} />

            </div>
        );
    }
}
export class Property extends Component {
    render(){
        const {name, value} = this.props;
        return (
             <span className="property">
                <span className="name">{name}</span> &nbsp;
                <span className="value">{value}</span>
            </span>
        );
    }
}
export class ServingAdvice extends Component {
    render(){
        const {items} = this.props;
        return (
            <div className="advice">
                <div className="heading">
                    Best Served With
                </div>
                <div className="items">
                    <ul>
                        {items.map((item)=><li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}
export class SimilarItems extends Component {
    render(){
        const {items} = this.props;
        return (
            <div className="similar-items">
              <h3 className="heading">
                  You Might Also Like:
              </h3>
              <div className="recommended-items">
                  {items.map((item, index)=> <StockItem onItemSelected={this.props.onShowItem} key={item.id} item={item} extraClasses={index===0 ? ' stock-item-offset-3':'' } />)}
              </div>
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
              <div className="stock-name" onClick={() => this.selectItem(item.id)}>
               { item.name }
              </div>
              <div className="stock-tagline" >
              { item.tagline }
              </div>
          </div>  
      );
  }
}