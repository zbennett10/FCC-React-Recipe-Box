import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//TODO
//implement error handling and null value protection

var recipes = JSON.parse(localStorage.getItem('_zbennett10_recipes')) === null ? 
              [
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
              ] : JSON.parse(localStorage.getItem('_zbennett10_recipes'));
    

class App extends Component {
  constructor() {
    super();
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.setRecipeTitle = this.setRecipeTitle.bind(this)
    this.setRecipeIngredients = this.setRecipeIngredients.bind(this)
    this.state = {
      recipeData:  recipes,
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
  }

  addRecipe() {
    if(this.state.recipeTitle && this.state.recipeIngredients) {
      var newRecipeList = JSON.parse(localStorage.getItem('_zbennett10_recipes'));
      var newRecipe = {
        name: this.state.recipeTitle,
        ingredients: this.state.recipeIngredients
      }
      newRecipeList.push(newRecipe);
      this.setState({recipeData: newRecipeList})
      } else {
        alert("Please enter values for the title and ingredients");
        return;
      }
  }

  setRecipeTitle(e) {
    this.setState({recipeTitle: e.target.value})
  }

  setRecipeIngredients(e) {
    console.log(e.target.value);
    var newIngredients = e.target.value.split(',');
    this.setState({recipeIngredients: newIngredients})
  }

  render() {
    localStorage.setItem('_zbennett10_recipes', JSON.stringify(this.state.recipeData));
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
    this.saveIngredients = this.saveIngredients.bind(this)
  }
  
  componentWillMount(){   //set state when component is about to mount
    this.state = {
      displayName: this.props.name,
      name: (this.props.name).replace(/\s/g, ''),
      ingredients: this.props.ingredients
      
    }
  }

  saveIngredients() {
    this.setState({ingredients: this.refs.ingredientInput.value.split(',')})
    
  }

  onDeleteRecipe() {
        this.props.deleteRecipe(this.state.displayName);
  }
    
  render() {
    return (
    <div>
      <div className="panel-group">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h2 className="panel-title">
              <a data-toggle="collapse" data-target={'#' + this.state.name} href={'#' + this.state.name}>
                 {this.state.displayName}
              </a>
            </h2>>              
          </div>
         <div id={this.state.name} className="panel-collapse collapse">
          <div className="panel-body"> 
              {this.state.ingredients.map(ingredient => {
                return <li key={ingredient.replace(/\s/g, '')} className="list-group-item">{ingredient}</li>
              })}
              <div className="btn-group">
                <button className="btn btn-sm btn-info" data-toggle="modal" 
                        data-target={'#' + this.state.name + 'EditModal'} onClick={this.prepareEditor}>Edit</button>
                <button className="btn btn-sm btn-danger" data-toggle="modal"
                        data-target={'#' + this.state.name + 'RemoveModal'}
                        >Delete</button>
              </div>
          </div>
         </div>
        </div>
      </div>


        <div className="modal modal-lg" id={this.state.name + 'EditModal'} >
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit {this.state.displayName}</h2>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <textarea className="form-control" rows="3" ref="ingredientInput">
                    {this.state.ingredients.join(',')} 
                  </textarea>
                </div>
              </div>
              <div className="modal-footer">
                <div className="btn-group">
                  <button className="btn btn-sm btn-info" onClick={this.saveIngredients} data-dismiss="modal">Save</button>
                  <button className="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

 
          <div className="modal modal-lg" id={this.state.name + 'RemoveModal'}>
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
