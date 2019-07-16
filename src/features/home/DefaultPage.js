import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import moment from "moment";


export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
       show_category: false,
    }
  }
  
  componentDidMount(){
    this.props.actions.categories();
  }

  getCategory = (args) => {
    this.props.actions.category(args);
  }

  render() {
    const categories = this.props.home.categoriesData;
    const category = this.props.home.categoryData;
    const cursorStyle = {
      cursor: 'pointer'
    }

    return (
      <div className="home-default-page">
       <div className="container mt-5">
        <div>
            <ul className="list-group">
              {categories.map((element, index) => (
                  <li
                    key={index}
                    onClick={() => this.getCategory(element)}
                    className="list-group-item mb-2 list-group-item-dark"
                    style={cursorStyle}
                  >
                    {element.toUpperCase()}
                  </li>
              ))}
            </ul>
          </div>

          <div style={this.state.categoryShowedStyle}> 
            <div className="card text-secondary mb-3">
              <div className="card-header text-light bg-dark">Welcome to Category</div>
              {Object.entries(category).length > 0 ? 
                  <div className="card-body">
                    <img
                      src={category.icon_url}
                      width="100px"
                      alt="url_icon"
                    />
                    <h2 className="card-title">{category.categories}</h2>
                    <p className="card-text">{category.value}</p>
                    <span>
                      {moment(category.created_at).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                :
                  <div>
                    Category not find
                  </div>
              }
              </div>
          </div>
       </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
