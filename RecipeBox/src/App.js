import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//fake data mimicking local storage

var recipes = [
    {
      name: 'Pumpkin Pie',
      ingredients: ['Pumpkin', 'Crust', 'Whipped Cream'],
      index: 0
    }, 
    
    {
      name: 'Enchiladas',
      ingredients: ['Beans', 'Rice', 'Tortillas'],
      index: 1
    }, 

    {
      name: 'Spaghetti',
      ingredients: ['Noodles', 'Sauce', 'Garlic Bread'],
      index: 2
    },
    
    {
      name: 'Beef',
      ingredients: ['Meat', 'Sausage', 'Beer'],
      index: 3
    }
    ];

    localStorage.setItem('recipeData', JSON.stringify(recipes));
    

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipeData: JSON.parse(localStorage.getItem('recipeData'))
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Recipe Box!</h2>
        </div>
        
        <div className="container">
          {this.state.recipeData.map(recipe => {
            return (
            <Recipe name={recipe.name} ingredients={recipe.ingredients}/>
            )
          })}
        </div>
      </div>
    );
  }
}

class Recipe extends Component {
  constructor() {
    super();
    
  }
  
  componentWillMount(){   //set state when component is about to mount
    this.state = {
      name: this.props.name,
      ingredients: this.props.ingredients
    }
  }
  
  render() {
    return (
    <div>
      <div className="panel-group">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h2 className="panel-title">
              <a data-toggle="collapse" data-target={'#' + (this.state.name).replace(/\s/g, '')} href={'#' + (this.state.name).replace(/\s/g, '')}>
                 {this.state.name}
              </a>
            </h2>>              
          </div>
         <div id={(this.state.name).replace(/\s/g,'')} className="panel-collapse collapse">
          <div className="panel-body"> 
              {this.state.ingredients.map(ingredient => {
                return <li className="list-group-item">{ingredient}</li>
              })}
              <div className="btn-group">
                <button className="btn btn-sm btn-info" data-toggle="modal" 
                        data-target={'#' + (this.state.name).replace(/\s/g, '') + 'EditModal'}>Edit</button>
                <button className="btn btn-sm btn-danger" data-toggle="modal"
                        data-target={'#' + (this.state.name).replace(/\s/g, '') + 'RemoveModal'}>Delete</button>
              </div>
          </div>
         </div>
        </div>
      </div>


        <div className="modal modal-lg" id={(this.state.name).replace(/\s/g, '') + 'EditModal'} >
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit {this.state.name}</h2>
              </div>
              <div className="modal-body">
                <ul className="list-group list-unstyle">
                  {this.state.ingredients.map( ingredient => {
                    return <li className="list-group-item">{ingredient}</li>
                  })}
                </ul>
              </div>
              <div className="modal-footer">
                <div className="btn-group">
                  <button className="btn btn-sm btn-info"  data-dismiss="modal">Save</button>
                  <button className="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

 
          <div className="modal modal-lg" id={this.state.name.replace(/\s/g, '') + 'RemoveModal'}>
            <div className="modal-content">
              <div className="modal-body">
                <h3>This will remove the selected recipe. Are you sure?</h3>
              </div>
              <div className="modal-footer">
                <div className="btn-group">
                  <button className="btn btn-sm btn-danger" data-dismiss="modal">Remove</button>
                  <button className="btn btn-sm btn-info" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
     </div>
    );
  }
}

export default App;


/*
          <div className="modal modal-lg" id="editModal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit {this.state.name}</h2>
              </div>
              <div className="modal-body">
              <h3>{this.state.name}</h3>
                <ul className="list-group list-unstyle">
                  {this.state.ingredients.map( ingredient => {
                    return <li className="list-group-item">{ingredient}</li>
                  })}
                </ul>
              </div>
              <div className="modal-footer">
                <div className="btn-group">
                  <button className="btn btn-sm btn-info" onClick={this.saveRecipe} data-dismiss="modal">Save</button>
                  <button className="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

 
          <div className="modal modal-lg" id="removeModal">
            <div className="modal-content">
              <div className="modal-body">
                <h3>This will remove the selected recipe. Are you sure?</h3>
              </div>
              <div className="modal-footer">
                <div className="btn-group">
                  <button className="btn btn-sm btn-danger" onClick={this.props.deleteRecipe} data-dismiss="modal">Remove</button>
                  <button className="btn btn-sm btn-info" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          */

      
