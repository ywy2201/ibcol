import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { media, style } from 'helpers/styledComponents.js';

import { H2 } from 'components/BaseComponents';

import styled from 'styled-components';

import { transparentize } from 'polished'



const SlideControllerUL = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;

  position: fixed;
  height: 100vh;

  top: 0rem;
  right: 1rem;

  

  li {
    display: block;
    margin: 0 0rem 1rem;

    .slideSelector {
      padding: 0.35rem;
      cursor: pointer;
      background: ${style.color.placeholderBlue};
      border-radius: 5rem;
      &.selected {
        position: relative;

        > div {
          position: absolute;
          
          padding: 0.8rem;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
          top: -0.4rem;
          left: -0.48rem;
          

        }

        &.colormode-aqua {
          background-color: ${style.color.aquaBlue};

          > div {
            background-image: url("/static/images/slide_selected_aqua.png");
          }
        }

        &.colormode-lime {
          background-color: ${style.color.lime};
          > div {
            background-image: url("/static/images/slide_selected_lime.png");
          }
        }
        
        &.colormode-bittersweet {
          background-color: ${style.color.bittersweet};
          > div {
            background-image: url("/static/images/slide_selected_bittersweet.png");
          }
        }


        
        background: red;
      
      }

    }
    
    
  }

`;



class SlideControllerComponent extends React.Component {
  goToPage = (slide) => {
    // console.log('goToPage', slide);

    if (this.props.goToPage !== undefined) {
      this.props.goToPage(slide);
    }

  }
  render() {
    const componentName = "SlideControllerComponent";

    const slideSelector = Array.apply(null, Array(this.props.totalSlides)).map((x, i) => { return i; });

    return (
      <SlideControllerUL className={classNames(componentName)}>
        
        {
          slideSelector.map((slide, key) => {

            return <li key={key}>
              <div className={classNames("slideSelector", {
                selected: this.props.currentSlide - 1 === slide
              }, `colormode-${this.props.colormode}`)} onClick={this.goToPage.bind(this, slide)}>
                {
                  this.props.currentSlide - 1 === slide &&
                  <div/>
                }
              </div>
            </li>
            
          })
        }
        

      </SlideControllerUL>
    )
  }



}


SlideControllerComponent.propTypes = {
  totalSlides: PropTypes.number.isRequired,
  currentSlide: PropTypes.number.isRequired,
  goToPage: PropTypes.func,
  colormode: PropTypes.string
}

SlideControllerComponent.defaultProps = {
  colormode: 'aqua'
}

export default SlideControllerComponent;
