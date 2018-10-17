import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { media, style } from 'helpers/styledComponents.js';


import styled from 'styled-components';
import theme from 'styled-theming';

const FilterForm = styled.form`
  width: 100%;
  display: flex;

  background-image: url('/static/images/ConactForm_input_background.png');
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;

  input {
    width: 100%;
    background: transparent;
    border: 0;
    color: ${style.color.trueWhite};
    &::placeholder {
      color: ${style.color.trueWhite};
    }

    padding: 0.5rem 0.5rem;

    
  }


  
  button {
    margin: 0 auto;
    background: transparent;
    border: 0;

    cursor: pointer;

    
    width: 0px;

    
    
    background-image: url('/static/images/search_looking_glass.png');

    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;

    color: transparent;


  }


`;


class FAQFilterComponent extends React.Component {

  render() {
    const componentName = "FAQFilterComponent";





    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <FilterForm className={classNames(componentName, this.props.className)}>

        

        <input placeholder="Enter your search here" type="text" />

        
        <button>Search</button>
      

      </FilterForm>
    );
  }
}

export default FAQFilterComponent;