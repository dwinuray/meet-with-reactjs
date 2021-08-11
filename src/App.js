import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import List from './List';


// Routing
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'





/** State */
class Timer extends Component{

  constructor( props ){

    // nilai properti
    super(props)

    this.state = {

      time : props.start
    }
  }

  // lifecycle
  componentDidMount(){

    this.addInterval = setInterval( () => this.increase(), 1000 )
  }



  componentWillUnmount(){

    clearInterval(this.addInterval)
  }


  increase(){

    // update state time every second
    this.setState( (state, props) => ({

      time: parseInt(state.time) + 1
    }))
  }



  render(){

    return <div> {this.state.time} detik </div>
  }
}




// Event
class Switcher extends Component{

  constructor(props) {

    super(props)

    // state
    this.state = {

      toggleStatus : true
    }

    this.handleClick = this.handleClick.bind(this)
  }


  handleClick() {

    this.setState( state => ({
      toggleStatus : !state.toggleStatus
    }) );
  }


  render(){ 

    return (

        <a href="#"
          className="App-link"
          onClick = {this.handleClick}
        >
          Event in React is {this.state.toggleStatus ? 'aktif' : 'nonaktif'}
        </a>
    )
  }


}


class App extends Component{


  constructor(props){

    super(props)
    this.state = {

      todoItem: '',
      items : [],
      
      
      // API
      isLoading: true,
      dataAPI : []
    }
  }


  // mengkonsumsi API
  componentDidMount() {

    fetch( "https://jsonplaceholder.typicode.com/users" )
    .then( Response => Response.json() )
    .then(data => this.setState( { dataAPI : data, isLoading : true } ) )
  }




  handleSubmit = (event => {
      
    // isi array items
    this.setState({

      items : this.state.items.concat(this.state.todoItem),
      todoItem : ''
    });
    event.preventDefault();
  })



  // change
  handleChange = (event => {

    let value = event.target.value

    this.setState({
      todoItem : value 
    })
  })



  // check loading
  handleLoading = ( () => {


    if ( this.state.isLoading ) {

      return 'Mohon tunggu sebentar'
    }
  })



  // link
  /** Home */
  Home = ( () => {
    
    return <h2>Oke Home</h2>
  } )


  /** Users */
  ListView = ( () => {
    
    return (
      
      <div>
        <h2>Oke Users</h2>
        <small><Link className="App-Link" to="/users/1">Coba klik detail</Link></small>
      </div>
    )
  } )



  DetailView = ( ( {match} ) => {

    return <h2>Oke Id {match.params.id}</h2>
  } )


  PageNotFound = ( () => {

    return <h2>Page Not Found</h2>
  } )


  render(){


    // variable API 
    const { dataAPI } = this.state

    

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <BrowserRouter>
              <div>
                  <Link className="App-link" to='/'>Home</Link>&emsp;
                  <Link className="App-link" to='/users'>User</Link>

                <main>
                  <Switch>
                    <Route path='/' exact component={this.Home} />
                    <Route path='/users' exact component={this.ListView} />
                    <Route path='/users/:id' exact component={this.DetailView} />

                    <Route component={this.PageNotFound} />
                  </Switch>
                </main>
              </div> 
            </BrowserRouter>
          </p>

          {/* State */}
          <Timer start="0" />
          <Switcher />

          <hr/>

          <p>Konsumsi API</p>

          <div onLoad={this.handleLoading}></div>
          <ul>

            {

              dataAPI.map( (item, index) => (
                
                <li key={index}> {item.name} </li>
              ) )
            }
          </ul>


          --------

          <form onSubmit={this.handleSubmit}>
            <input value={this.state.todoItem} onChange={this.handleChange} />
            <button>Add</button>
          </form>


          ---

          <List items={this.state.items}/>
          
        </header>
      </div>
    );

  }
}


export default App;
