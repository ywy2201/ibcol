import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { media, style } from 'helpers/styledComponents.js';


import styled from 'styled-components';
import theme from 'styled-theming';

const ContactForm = styled.form`
  width: 100%;
  
  > div {
    display: flex;
    margin-bottom: 2rem;

    ${media.xSmall`
        
      flex-direction: column;
    `}


    input {
      width: 100%;
      background: transparent;
      border: 0;
      color: ${style.color.trueWhite};
      &::placeholder {
        color: ${style.color.trueWhite};
      }

      padding: 0.5rem 0.5rem;
      box-sizing: border-box;

      background-image: linear-gradient(to right, ${style.color.aquaBlue}, ${style.color.placeholderBlue});

      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
    }

    &:first-child {
      input:nth-child(odd) {
        margin-right: 1rem;
      }
      input:nth-child(even) {
        margin-left: 1rem;
      }

      ${media.xSmall`
        
        input:nth-child(odd) {
          margin-right: 0rem;
        }
        input:nth-child(even) {
          margin-left: 0rem;
        }
      `}
    }

    

    

    
    textarea {
      width: 100%;
      background: transparent;
      border: 1px solid ${style.color.aquaBlue};
      border-radius: 5px;

      min-height: 200px;

      color: ${style.color.trueWhite};
      &::placeholder {
        color: ${style.color.trueWhite};
      }

      padding: 0.5rem 0.5rem;

      box-sizing: border-box;
    }

    button {
      margin: 0 auto;
      background: transparent;
      border: 0;

      color: ${style.color.trueWhite};

      min-width: 282px;
      padding: 1.40rem 2rem 1.35rem;
      
      
      background-image: url('/static/images/Button_background.png');

      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;

      ${media.xSmall`
        
        min-width: unset;
        width: 100%;
      `}


    }
    



    
  }

  &.colormode-white {
    > div {
      
      input {
        background-image: linear-gradient(to right, ${style.color.trueWhite}, ${style.color.trueWhite});
        
      }

      textarea {
        border: 1px solid ${style.color.trueWhite};
      }
    }
    
  }
`;


class ContactFormComponent extends React.Component {

  render() {
    const componentName = "ContactFormComponent";





    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <ContactForm className={classNames(componentName, this.props.className, 'colormode-' + this.props.colormode)}>
        
        <div>
          <input placeholder="Name" type="text"/>
          <input placeholder="Email" type="email"/>
        </div>
        <div>
          <textarea placeholder="Message"/>
        </div>

        <div>
          <button>Submit</button>
        </div>

      </ContactForm>
    );
  }
}

ContactFormComponent.propTypes = {
  // activeClassName: PropTypes.string.isRequired,
  colormode: PropTypes.string
}

ContactFormComponent.defaultProps = {
  colormode: 'aqua'
}

export default ContactFormComponent;