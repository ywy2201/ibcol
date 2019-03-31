import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as FilePond from 'filepond';
import '/node_modules/filepond/dist/filepond.min.css';

// import css from 'styled-jsx/css'


// import _ from 'lodash';

// import jQuery from 'jquery';

// const $ = jQuery;


// NOTE: disabled for now

const FilePondComponentContainerDiv = styled.div` 

  .filepond--drop-label {
    opacity: 0;
    height: 0;
  }

`;



class FilePondComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pond: undefined
    }

    this.myRef = React.createRef();
  }

  

  componentDidMount = () => {
    console.log('componentDidMount');
    const inputElement = document.querySelector('input[type="file"]', this.myRef);
    console.log('inputElement', inputElement);
    const pond = FilePond.create( inputElement );


    this.setState({
      pond
    })


  }

  componentWillUnmount = () => {
    
  }


  render() {
    const componentName = "FilePondComponent";
    

    return <FilePondComponentContainerDiv className={classNames(componentName)} ref={this.myRef}>
      

      {/* <input type="file"/> */}

      

    </FilePondComponentContainerDiv>

  }


}

FilePondComponent.propTypes = {
  // height: PropTypes.string,
  // locale: PropTypes.string.isRequired,
  // onToggleLanguageSelector: PropTypes.func.isRequired
}

FilePondComponent.defaultProps = {
  // height: "76px"
}


export default FilePondComponent;