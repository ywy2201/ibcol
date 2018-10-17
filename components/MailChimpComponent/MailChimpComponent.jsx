import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';

const MailChimpForm = styled.form`
  display: flex;
  flex-wrap: wrap;

  
  font-size: .875rem;
  
  justify-content: center;

  ${'' /* width: 100%;
  margin: 6rem auto;
  padding: 0;
  justify-content: space-between; */}

  ${media.smallDown`
    flex-direction: column;
  `}



  input[type="text"],
  input[type="email"] {
    background: transparent;
    &::placeholder {
      color: ${style.color.trueWhite};
    }
    padding-bottom: 0.3rem;
    border: 0;
    outline: none;
    border-bottom: 1px solid transparent;
    color: ${style.color.trueWhite};
  }

  input[type="text"],
  input[type="email"], div {
    flex: 1;
    
    &:not(:last-child) {
      margin-right: 2rem;
    }

    ${media.smallDown`
      &:not(:last-child) {
        margin-right: 0rem;
      }
      margin-bottom: 2rem;
    `}
  }

  

  .emailSubmitBlock {
    display: flex;
    border-bottom: 1px solid transparent;
    padding-bottom: 0.3rem;
    
    

    input[type="text"],
    input[type="email"] {
      
      width: 100%;
      border-bottom: none;
      margin: 0;
      padding-bottom: 0rem;

      ${media.smallDown`
        
        margin-bottom: 0rem;
      `}

      
    }
    

    input[type="submit"] {
      
      flex: 0;
      color: transparent;
      background-color: transparent;
      background-size: contain;
      background-repeat: no-repeat;
      width: 1rem;
      height: 1rem;
      outline: none;
      border: none;

      cursor: pointer;
    }
  }



  &.colormode-aqua {
    input[type="text"],
    input[type="email"],
    .emailSubmitBlock {
      border-color: ${style.color.aquaBlue};

      input[type="submit"] {
        background-image: url('/static/images/submit_button_aqua.png');
      }
    }
  }


  &.colormode-lime {
    input[type="text"],
    input[type="email"],
    .emailSubmitBlock {
      border-color: ${style.color.lime};

      input[type="submit"] {
        background-image: url('/static/images/submit_button_lime.png');
      }
    }
  }

  &.colormode-bittersweet {
    input[type="text"],
    input[type="email"],
    .emailSubmitBlock {
      border-color: ${style.color.bittersweet};

      input[type="submit"] {
        background-image: url('/static/images/submit_button_bittersweet.png');
      }
    }
  }

  &.colormode-darkBlueInverted {
    
    input[type="text"],
    input[type="email"],
    .emailSubmitBlock {
      border-color: ${style.color.darkBlue};

      &::placeholder {
        color: ${style.color.darkBlue};
      }
      color: ${style.color.darkBlue};

      input[type="text"],
      input[type="email"] {
        &::placeholder {
          color: ${style.color.darkBlue};
        }
        color: ${style.color.darkBlue};
      }

      input[type="submit"] {
        background-image: url('/static/images/submit_button_darkBlue.png');
      }
    }
  }
  

  
`;



class MailChimpComponent extends React.Component {


  render() {

    const componentName = "MailChimpComponent";

    

    return (
      <MailChimpForm className={classNames(componentName, `colormode-${this.props.colormode}`)}>
        
        { this.props.name === true &&
          <input type="text" placeholder="Name" />
        }

        <div className="emailSubmitBlock">
          <input type="text" placeholder="Email" />
          <input type="submit" value="Submit"/>
        </div>

      </MailChimpForm>
    );
  }
}


MailChimpComponent.propTypes = {
  name: PropTypes.bool,
  colormode: PropTypes.string
}

MailChimpComponent.defaultProps = {
  name: false,
  colormode: 'aqua'
}

export default MailChimpComponent;
