import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { Row, Col, FormGroup, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';

class FormulaListItem extends Component {
  constructor(props) {
    super(props);

  }

  deleteThisFormula() {
    if (confirm('Delete the Final Product?')) {
      Meteor.call('formulas.remove', this.props.formula._id)
    };
  }

  render() {
    let user = Meteor.user();
    let editButton = null;
    let deleteButton = null;

    if (Roles.userIsInRole(user, ['admin'])) {
      editButton = <Link to={{
        pathname: '/editFormula/'+this.props.formula._id, 
        state: {
          formula: this.props.formula,
        }}}>
          <Button
          bsStyle="info"
        >
          Edit Final Product
      </Button>
        </Link>

      deleteButton = <button className="delete" onClick={this.deleteThisFormula.bind(this)}>
            &times;
          Delete Final Product
          </button>
          
    } 
    
    else {
      editButton = <div className="containerNone"></div>;
      deleteButton = <div className="containerNone"></div>
    }

    return (
      <li>

        {deleteButton}
        
        <p> <b>Final Product Name:</b> {this.props.formula.name}</p>
        <p> <b>Description:</b> {this.props.formula.description}</p>
        <p> <b>Product Units:</b> {this.props.formula.productUnits}</p>
        
        <div className="side-container-zero">

        <div className="container-button">
        <Link to={{
            pathname: '/viewFormula/'+this.props.formula._id, 
            state: {
              formula: this.props.formula,
            }}}>
              <Button
              
            >
              View Final Product
          </Button>
            </Link>
            </div>

          
            <div className="container-button">
          {editButton}
            </div>

          </div>
      </li>
    );
  }
}

export default FormulaListItem;