import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
//TODO
//implement error handling and null value protection
//implement editing recipe

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
    }
];
    

    localStorage.setItem('recipeData', JSON.stringify(recipes));
    

class App extends Component {
  constructor() {
    super();
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.setRecipeTitle = this.setRecipeTitle.bind(this)
    this.setRecipeIngredients = this.setRecipeIngredients.bind(this)
    this.state = {
      recipeData: JSON.parse(localStorage.getItem('recipeData')),
      recipeTitle: '',
      recipeIngredients: []
    }
  }

  deleteRecipe(name) {
    var newRecipeList = this.state.recipeData;
    for(var i = 0; i < newRecipeList.length; i++) {
       if(newRecipeList[i].name === name) {
        newRecipeList.splice(i, 1);
       }
    }
    this.setState({recipeData: newRecipeList})
    console.log(this.state.recipeData);
  }

  addRecipe() {
    var newRecipeList = JSON.parse(localStorage.getItem('recipeData'));
    var newRecipe = {
      name: this.state.recipeTitle,
      ingredients: this.state.recipeIngredients
    }
    newRecipeList.push(newRecipe);
    this.setState({recipeData: newRecipeList})
  }

  setRecipeTitle(e) {
    //update this components state to match title value being entered by user
    this.setState({recipeTitle: e.target.value})
    
  }

  setRecipeIngredients(e) {
    var newIngredients = e.target.value.split(',');
    this.setState({recipeIngredients: newIngredients})
  }

  render() {
    localStorage.setItem('recipeData', JSON.stringify(this.state.recipeData));
    console.log(JSON.parse(localStorage.getItem('recipeData')));
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Recipe Box!</h2>
        </div>
        
        <div className="container">
          <button id="addButton" data-toggle="modal" data-target="#addModal" className="btn btn-lg btn-info center-block">Add Recipe</button>
          {this.state.recipeData.map(recipe => {
            return (
            <Recipe name={recipe.name} key={recipe.name} ingredients={recipe.ingredients} deleteRecipe={this.deleteRecipe}/>
            )
          })}
        </div>

        <div className="modal modal-lg" id="addModal">
            <div className="modal-content">
              <div className="modal-body">
                <h3>Add A Recipe</h3>
                <input id="titleInput" type="text" placeholder="Name" onChange={this.setRecipeTitle}></input>
                <hr/>
                <textarea id="ingredientInput" onChange={this.setRecipeIngredients} placeholder="Enter ingredients seperated by commas"></textarea>
              </div>
              <div className="modal-footer">
                <div className="btn-group">
                  <button className="btn btn-sm btn-danger" data-dismiss="modal"
                    onClick={this.addRecipe}>Add</button>
                  <button className="btn btn-sm btn-info" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

class Recipe extends Component {
  constructor() {
    super();
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this)
  }
  
  componentWillMount(){   //set state when component is about to mount
    this.state = {
      name: this.props.name,
      ingredients: this.props.ingredients,
      
    }
  }

  onDeleteRecipe() {
        this.props.deleteRecipe(this.state.name);
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
                        data-target={'#' + (this.state.name).replace(/\s/g, '') + 'RemoveModal'}
                        >Delete</button>
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
                  <button className="btn btn-sm btn-danger" data-dismiss="modal" onClick={this.onDeleteRecipe}>Delete</button>
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
