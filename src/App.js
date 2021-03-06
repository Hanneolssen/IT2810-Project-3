import React, {Component} from 'react';
import './App.css';
import Table from './components/table'
import Header from './components/header'
import getActors2 from './components/data.js';
import getHotList from './components/graphChart/fillGraph'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchActorsAction from './components/fetchActors'
import {getActorsError, getActorsPending} from './reducers/reducer'
import FormContainer from './components/FormContainer'
import GraphContainer from './components/graphChart/GraphContainer'
import fetchTopActorsAction from './components/fetchTopActors'
import Search from './components/search'
import Button from './components/Button';


class App extends Component {
  constructor(props){
    super(props);
    this.shouldComponentRender=this.shouldComponentRender.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleButtonClickClear = this.handleButtonClickClear.bind(this);
    this.fire= this.fire.bind(this);
    this.state = {
      values:{
      rating: "",
      firstName: '',
      lastName: '',
      year: '',
      Sorting:"firstName",
      SortDirection:"descending"

  } }
  }

  generateURLQuery = () => {
    return "http://it2810-09.idi.ntnu.no:8000/api/persons?" + ((!this.state.values.firstName) ? '' : `&firstName=${this.state.values.firstName}`)+ 
        ((!this.state.values.lastName) ? '' : `&lastName=${this.state.values.lastName}`) +
        ((!this.state.values.rating) ? '' : `&rating=${this.state.values.rating}`) +
        ((!this.state.values.year) ? '' : `&year=${this.state.values.year}`)+
        ((!this.state.values.Sorting) ? '' : `&sort=${this.state.values.Sorting}`)+
        ((this.state.values.SortDirection === 'ascending') ? '&sortAsc=True' : '');
        
};

  componentDidMount(){
    const {fetchActors}=this.props;
    fetchActors(this.generateURLQuery())
    const {fetchTopActors}=this.props;
    fetchTopActors('http://it2810-09.idi.ntnu.no:8000/api/persons?sort=rating')
  }

  shouldComponentRender(){
      if(this.pending === false) return false;
      return true;
  }

  fire() {
    const {fetchActors}=this.props;
    fetchActors(this.generateURLQuery())

  }

   handleButtonClick() {
      this.setState({values:{firstName: this.props.values.Fornavn, 
        lastName:this.props.values.Etternavn, year:parseInt(this.props.values.Født),
        rating:parseInt(this.props.values.Rating), Sorting:this.props.values.Sorting,
        SortDirection:this.props.values.SortDirection}},this.fire)
   }

   handleButtonClickClear() {
    this.setState({values:{firstName: "", 
      lastName:"", year:"",
      rating:"", Sorting:"firstName",
      SortDirection:"asc"}},this.fire)
 }

  render() {
    const { error} = this.props;
     if(!this.shouldComponentRender()) return (<div>Appen laster ikke</div>)
     getActors2()
      return (
        getHotList(),
          <div>
              {error && <span >{error}</span>}
              <div className="App">
                  <Header/>
                  <div className="mainContent">
                    <div className="search">
                      <Search />
                      <Button 
                        title = "APPLY"
                        id={'applyButton'}
                        type = {'button' }
                        action={this.handleButtonClick}
                        className = {'applyButton'}
                      />
                      <Button 
                        title = {"SHOW ALL"}
                        id={'showButton'}
                        type = {'button' }
                        action={this.handleButtonClickClear}
                        className = {'applyButton'}
                      />
                    </div> 
                    <div className="table1">
                      <Table/>
                    </div>
                    <div className="formContainer">
                      <FormContainer/>
                    </div>

                    <div className="graphContainer">
                      <GraphContainer/>
                    </div>
                  </div>
            </div>  
          </div>
      )
  }
}


const mapStateToProps = state => {
  return {
  actors: state.actors.actors,
  topactors: state.topactors.topactors,
  error: getActorsError(state),
  pending: getActorsPending(state),
  values: state.values.values
 
}}

 

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchActors: fetchActorsAction,
  fetchTopActors: fetchTopActorsAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



