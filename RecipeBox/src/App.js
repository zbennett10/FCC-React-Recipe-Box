import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//fake data mimicking local storage
var recipes = [
    {
      name: 'Pumpkin Pie',
      ingredients: ['Pumpkin', 'Crust', 'Whipped Cream']
    }, 
    
    {
      name: 'Enchiladas',
      ingredients: ['Beans', 'Rice', 'Tortillas']
    }, 

    {
      name: 'Spaghetti',
      ingredients: ['Noodles', 'Sauce', 'Garlic Bread']
    }];

class App extends Component {
  
  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Recipe Box</h2>
        </div>
        
        <RecipeContainer />
      </div>
    );
  }
}

var RecipeContainer = React.createClass({
  getInitialState: function() {
    return {recipeList: recipes}
  },

  render: function() {
    return (
      //foreach recipe in list state - create recipe with its properties.
      <div className="container">
        {this.state.recipeList.map(recipe => {
          return <Recipe name={recipe.name}/>
        })}
      </div>
    );
  }
});

var Recipe = React.createClass({
  
  render: function() {
    return (
      //foreach bit of recipe, create an item
      <ul>
        <li>{this.props.name}</li>
      </ul>
    );
  }
});

export default App;
