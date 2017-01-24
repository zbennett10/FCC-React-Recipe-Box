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

    localStorage.setItem('recipeData', JSON.stringify(recipes));
    

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
    return {recipeList: JSON.parse(localStorage.getItem('recipeData'))}
  },

  render: function() {
    return (
      //foreach recipe in list state - create recipe with its properties.
      <div className="container">
        {this.state.recipeList.map(recipe => {
          return <Recipe name={recipe.name} ingredients={recipe.ingredients}/>
        })}
      </div>
    );
  }
});

var Recipe = React.createClass({
  getInitialState: function() {
return {recipeList: JSON.parse(localStorage.getItem('recipeData'))}
  },
  
  render: function() {
    return (
        <div>
          <h3>{this.props.name}</h3>
            <ul className="list-unstyled list-group"> 
               {this.props.ingredients.map(ingredient => {
                 return <li className="list-group-item">{ingredient}</li>
               })}
            </ul>
        </div>
    );
  }
});

export default App;
