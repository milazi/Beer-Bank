import React, {Component} from 'react';
export class Header extends Component {
    render() {
        return (
            <header>
                <NavigationMenu 
                    onResetFavourites={this.props.onResetFavourites} 
                    onShowFavourites={this.props.onShowFavourites} />
                <div className="center-items">
                    <h1>
                        <span className="title">The Beer Bank</span>
                    </h1>    
                    <p className="sub-title">Find your favourite beer here</p>  
                    <SearchBar 
                        onResetFavourites={this.props.onResetFavourites} 
                        onSearch={this.props.onSearch} 
                        onAdvSearch={this.props.onAdvSearch} />
                </div>
            </header>
        );
    }
}
export class SearchBar extends Component {
    constructor(props){
        super(props);
        this.searchItem = this.searchItem.bind(this);
        this.toggleAdvancedSearch = this.toggleAdvancedSearch.bind(this);
        this.resetFavourites = this.resetFavourites.bind(this);
        this.state = {
            searchValue: '',
            advancedSearch: false,
        };
    }
    resetFavourites(){
        this.setState({searchValue: '', advancedSearch: false});
        this.props.onResetFavourites();
    }
    searchItem(event){
        let value = event.target.value;
        this.setState({searchValue: value});
        this.props.onSearch(value);
    }

    toggleAdvancedSearch() {
        if(!this.state.advancedSearch) {
            this.setState({advancedSearch: true});
        } else {
            this.setState({advancedSearch: false});
        }
    }
    render(){
        return (
                <div className="search-options">
                    <div className="basic-search">
                        <input type="text" className="search-bar form-control" placeholder="Search for beer name" value={this.state.value} onKeyPress={(e) => this.searchItem(e)} />
                    </div>
                    <div className="clearfix">
                        <p>&nbsp;</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => this.toggleAdvancedSearch()}> {this.state.advancedSearch ? 'Hide': 'Show'}  Advanced Search</button>
                        <span>&nbsp;</span>
                        <button className="btn btn-secondary" onClick={() => this.resetFavourites()}> Reset Search</button>
                        <div className="clearfix">
                        <p>&nbsp;</p>
                    </div>
                    <AdvancedSearch 
                            onAdvSearch={this.props.onAdvSearch} 
                            extraClasses={this.state.advancedSearch ? '': 'hidden'} />
                </div>
                
        );
    }
}
export class AdvancedSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            ibu_gt: '',
            ibu_lt: '',
            abv_gt: '',
            abv_lt: '',
            ebc_gt: '',
            ebc_lt: '',
            brewed_before: '',
            brewed_after: '',
            per_page: '80',
        };
        this.setMinIBU = this.setMinIBU.bind(this);
        this.setMaxIBU = this.setMaxIBU.bind(this);
        this.setMinABV = this.setMinABV.bind(this);
        this.setMaxABV = this.setMaxABV.bind(this);
        this.setMinEBC = this.setMinEBC.bind(this);
        this.setMaxEBC = this.setMaxEBC.bind(this);
        this.setBrewedBefore = this.setBrewedBefore.bind(this);
        this.setBrewedAfter = this.setBrewedAfter.bind(this);

        this.search = this.search.bind(this);
    }
    setMinIBU(num){
        this.setState({
            ibu_gt: num,
        });
    }
    setMaxIBU(num){
        this.setState({
            ibu_lt: num,
        });
    }
    setMinABV(num){
        this.setState({
            abv_gt: num,
        });
    }
    setMaxABV(num){
        this.setState({
            abv_lt: num,
        });
    }
    setMinEBC(num){
        this.setState({
            ebc_gt: num,
        });
    }
    setMaxEBC(num){
        this.setState({
            ebc_lt: num,
        });
    }
    setBrewedBefore(event){
        const correctFormat = event.target.value.split('-').reverse().join('-');
        this.setState({
            brewed_before: correctFormat,
        });
    }
    setBrewedAfter(event){
        const correctFormat = event.target.value.split('-').reverse().join('-');
        this.setState({
            brewed_after: correctFormat,
        });
    }
    search(){
        this.props.onAdvSearch(this.state);
    }
    render() {
        return (
            <div className={"advanced-search " + this.props.extraClasses}>
                <SearchItem label="Min IBU" name="min_ibu" onInput={(value)=>this.setMinIBU(value)} />
                <SearchItem label="Max IBU" name="max_ibu" onInput={(value)=>this.setMaxIBU(value)} />
                <SearchItem label="Min ABV" name="min_abv" onInput={(value)=>this.setMinABV(value)} />
                <SearchItem label="Max ABV" name="max_abv" onInput={(value)=>this.setMaxABV(value)} />
                <SearchItem label="Min EBC" name="min_ebc" onInput={(value)=>this.setMinEBC(value)} />
                <SearchItem label="Max EBC" name="max_ebc" onInput={(value)=>this.setMaxEBC(value)} />
                <div>
                    &nbsp;
                </div>
                <div class="search-item form-group">
                    <label>Brewed Before</label> <input className="form-control" type="month" onBlur={(e)=>this.setBrewedBefore(e)} />
                </div>    
                <div class="search-item form-group">
                    <label>Brewed After</label> <input className="form-control" type="month"  onBlur={(e)=> this.setBrewedAfter(e)} />
                </div>
                <div class="search-button">
                    <button onClick={()=>this.search()} className="btn btn-primary"> Search </button>
                </div>
            </div>
        );
    }
}
export class SearchItem extends Component {
    constructor(props){
        super(props);
        this.setValue = this.setValue.bind(this);
        this.reportValue = this.reportValue.bind(this);
        this.state = {
            value: ''
        }
    }

    setValue(event){
        let value = event.target.value;
        this.setState({value: value});
    }
    reportValue(event) {
        let value = event.target.value;
        this.props.onInput(value);
    }

    render(){
        return (
            <div className="search-item form-group">
                <label>{this.props.label}</label> <input placeholder={"Enter "+this.props.label} name={this.props.name} onKeyPress={(e) => this.setValue(e)} onBlur={(e)=> this.reportValue(e)} class="form-control" type="text" value={this.props.value} />
            </div>
        );
    }
}
export class NavigationMenu extends Component {
    constructor(props) {
        super(props);
        this.showFavourites = this.showFavourites.bind(this);
        this.resetFavourites = this.resetFavourites.bind(this);
    }
    showFavourites(){
        this.props.onShowFavourites();
    }
    resetFavourites(){
        this.props.onResetFavourites();
    }
    render() { 
        return (
            <nav>
                <ul>
                    <li><a href="#home" onClick={() => this.resetFavourites()}>Home</a></li>
                    <li><a href="#fav" onClick={() => this.showFavourites()}>Favourites</a></li>
                </ul>
            </nav>
        );
    }
}