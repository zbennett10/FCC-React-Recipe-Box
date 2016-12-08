var Modal = window.ReactModalBootstrap.Modal;
var ModalHeader = window.ReactModalBootstrap.ModalHeader;
var ModalTitle = window.ReactModalBootstrap.ModalTitle;
var ModalClose = window.ReactModalBootstrap.ModalClose;
var ModalBody = window.ReactModalBootstrap.ModalBody;
var ModalFooter = window.ReactModalBootstrap.ModalFooter;

var placeholderRecipes = {
  1: {Name: "Scrambled Eggs", Recipe: ["Eggs", "Frying Pan", "Butter", "Cheese"]},
  2: {Name: "Pumpkin Pie", Recipe: ["Pumpkin", "Flour", "Eggs"]},
  3: {Name: "Special Sauce", Recipe: ["Wouldn't you like to know"]}
};

localStorage.setItem('recipes', JSON.stringify(placeholderRecipes));
var recipes = JSON.parse(localStorage.getItem('recipes'));
var hashKeys = Object.keys(recipes);


class App extends React.Component {
  state = {
    recipeList: recipes,
    isOpen: false,
  };

  open = () => {
    this.setState({
      isOpen: true
    });
  };

  hide = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
     
          <div className='container'>
            <button className='btn btn-primary' onClick={this.open}>
              Open Modal
            </button>
        
        <ul>
          {this.props.keys.map(key => {
            return <li>{this.state.recipeList[key].Name}</li>
          })}
  
        </ul>

            <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hide}>
              <ModalHeader>
                <ModalClose onClick={this.hide}/>
                <ModalTitle>Modal title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                
                <hr/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aspernatur assumenda ex iure, necessitatibus odit optio quas
                  recusandae repellat totam. Alias dignissimos ea obcaecati quae
                  qui recusandae rem repellendus, vel veniam!</p> 
              </ModalBody>
              <ModalFooter>
                <button className='btn btn-default' onClick={this.hide}>
                  Close
                </button>
               
              </ModalFooter>
            </Modal>
          </div>       
    );
  }
}


  ReactDOM.render( < App keys={hashKeys}/ > , document.getElementById('app'));
