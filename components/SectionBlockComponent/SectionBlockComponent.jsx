import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import theme from 'styled-theming';

import { media, style } from 'helpers/styledComponents.js';

// import Link from 'next/link';
// import { withRouter } from 'next/router';


// import { A } from 'components/BaseComponents';
const pagePadding = {
  xSmall: theme("spacing", { normal: style.dimension.normal.pagePadding.xSmall }),
  small: theme("spacing", { normal: style.dimension.normal.pagePadding.small }),
  medium: theme("spacing", { normal: style.dimension.normal.pagePadding.medium }),
  large: theme("spacing", { normal: style.dimension.normal.pagePadding.large }),
  xLarge: theme("spacing", { normal: style.dimension.normal.pagePadding.xLarge }),
  xxLarge: theme("spacing", { normal: style.dimension.normal.pagePadding.xxLarge })
}



const maxSiteWidth = theme("spacing", {
  normal: style.dimension.normal.maxSiteWidth
})

const SectionBlockContainer = styled.div`
  margin-top: 5rem;
  padding-bottom: 6rem;

   
  @media screen and (min-width: ${maxSiteWidth}) {
    text-align: center;
    
    > section {
      
      max-width: calc(${maxSiteWidth} - ${pagePadding.xLarge});
      text-align: left;

    
      margin-left: auto;
      margin-right: auto;
      
    }
  }


  > section {
    width: 100%;
    > article {
      width: 100%;
    }


    &.asGrid {
      display: flex;

      ${media.smallDown`
        flex-direction: column;
      `}

      > div {

        ${'' /* ${media.xSmallUp`
          margin: calc(${pagePadding.xSmall} / 2);
        `};

        ${media.smallUp`
          margin: calc(${pagePadding.small} / 2);
        `}; */}

        ${media.xSmall`
          margin-bottom: ${pagePadding.xSmall};
        `}
        
        ${media.small`
          margin-bottom: ${pagePadding.small};
        `}
        

        ${media.mediumUp`
          margin: calc(${pagePadding.medium} / 2);
        `};

        ${media.largeUp`
          margin: calc(${pagePadding.large} / 2);
        `};

        ${media.xLargeUp`
          margin: calc(${pagePadding.xLarge} / 2);
        `};

        ${media.xxLargeUp`
          margin: calc(${pagePadding.xxLarge} / 2);
        `};

        flex: 1;


        ${media.mediumUp`
          &.grid-3 {
            flex: 3;
          }

          &.grid-2 {
            flex: 2;
          }

          &.grid-1 {
            flex: 1;
          }

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        `}
        

        
      }

    }

    
  }
  

  &.asSlide {
    height: 100vh;
    ${'' /* overflow: scroll; */}

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;
    
    

    ${'' /* padding: 0 4rem; */}
    padding: 0;

    margin: 0 auto;


    
    padding-top: 1vh;
    
    ${media.medium`
      padding-top: 3vh;
    `}

    ${media.largeUp`
      padding-top: 3vh;
    `}


    box-sizing: border-box;
    
    
    max-width: 1000px;

    article {
      ${'' /* height: 50vh; */}
    }
  }
  
  
  


  

  &.withBackground {
    background-image: url('/static/images/SectionBlockContainer_border.png');
    background-repeat: repeat-x;
    background-size: auto 50px;
    background-position: left bottom;
  }

  ${media.smallDown`
    margin-left: -${pagePadding.small};
    margin-right: -${pagePadding.small};

    padding-left: ${pagePadding.small};
    padding-right: ${pagePadding.small};
  `}
  ${media.mediumDown`
    margin-left: -${pagePadding.medium};
    margin-right: -${pagePadding.medium};

    padding-left: ${pagePadding.medium};
    padding-right: ${pagePadding.medium};
  `}
  ${media.largeUp`
    margin-left: -${pagePadding.large};
    margin-right: -${pagePadding.large};

    padding-left: ${pagePadding.large};
    padding-right: ${pagePadding.large};
  `}
  ${media.xLargeUp`
    margin-left: -${pagePadding.xLarge};
    margin-right: -${pagePadding.xLarge};

    padding-left: ${pagePadding.xLarge};
    padding-right: ${pagePadding.xLarge};
  `}
  ${media.xxLargeUp`
    margin-left: -${pagePadding.xxLarge};
    margin-right: -${pagePadding.xxLarge};

    padding-left: ${pagePadding.xxLarge};
    padding-right: ${pagePadding.xxLarge};
  `}


  ${'' /* @media screen and (min-width: ${maxSiteWidth}) {
    text-align: center;
    
    section {
      max-width: calc(#{$maxSiteWidth - #{$pagePadding.xLarge});
      text-align: left;

    
      margin-left: auto;
      margin-right: auto;
    }
  } */}
  
  
  


  article {
    width: 100%;
    display: flex;
    flex-direction: column;

    align-items: flex-start;

    &.align-middle {
      align-items: center;
    }

    ${media.largeUp`
      flex-direction: row;
    `}

    &.mobile-reversed {
      flex-direction: column-reverse;
      ${media.largeUp`
        flex-direction: row;
      `}
    }

    
    img {
      max-width: 100%;
    }

    > div, > section {
      flex: 1;
      ${'' /* &.flex-none {
        flex: unset;
      } */}

      &.align-right {
        text-align: right;
      }

      &.align-center {
        text-align: center;
      }

      
      &.align-left {
        text-align: left;
      }

      ${media.mediumDown`
        &.align-left-mediumDown {
          text-align: left;
        }
        &.align-center-mediumDown {
          text-align: center;
        }
        &.align-right-mediumDown {
          text-align: right;
        }
      `}

      
      
      margin-bottom: 1.5rem;
      ${media.smallDown`
        margin-bottom: 0.8rem;
      `}



      ${media.largeUp`
        margin-bottom: 0rem;
        box-sizing: border-box;
        padding: 0 0.5rem;

        &.grid-3 {
          flex: 3;
        }

        &.grid-2 {
          flex: 2;
        }

        &.grid-1 {
          flex: 1;
        }
          ${'' /* margin-top: 15vw; */}

      `}


      
      

      
    }
  }

  header {
    width: 100%;
    
    
  
    font-weight: 300;
    font-size: 1.875rem;
    padding-bottom: 0.2rem;
    margin-bottom: 1.5rem;
    ${media.largeUp`
      margin-bottom: 4rem;
    `}

    ${media.smallDown`
      font-weight: 300;
    `}
    
    
  }

  &.colormode-white {
    header {
      border-bottom: 1px ${style.color.trueWhite} solid;
    }
  }

  &.colormode-aqua {
    header {
      border-bottom: 1px ${style.color.aquaBlue} solid;
    }
  }

  &.colormode-lime {
    header {
      border-bottom: 1px ${style.color.lime} solid;
    }
  }

  &.colormode-bittersweet {
    header {
      border-bottom: 1px ${style.color.bittersweet} solid;
    }
  }


  .videoContainer {
    text-align: center;
    margin: 0 auto;
    ${'' /* text-align: right; */}
    ${'' /* padding-bottom: calc(100%/3*2); */}

    iframe {
      ${'' /* width: 100%; */}
      max-width: 100%;
      
      ${'' /* max-width: 522px; */}
      ${'' /* height: 293px; */}
    }
  }







  .wrapped-12-grids {
    display: flex;
    flex-wrap: wrap;

    > * {
      margin: 0.5rem;
      width: calc(100% - 1rem);
    }

    ${'' /* .grid-1 {
      width: calc((100%/12 * 1) - 1rem);
    }

    .grid-2 {
      width: calc((100%/12 * 2) - 1rem);
    }

    .grid-3 {
      width: calc((100%/12 * 3) - 1rem);
    }

    .grid-4 {
      width: calc((100%/12 * 4) - 1rem);
    }

    .grid-5 {
      width: calc((100%/12 * 5) - 1rem);
    }

    .grid-6 {
      width: calc((100%/12 * 6) - 1rem);
    }

    .grid-7 {
      width: calc((100%/12 * 7) - 1rem);
    }

    .grid-8 {
      width: calc((100%/12 * 8) - 1rem);
    }

    .grid-9 {
      width: calc((100%/12 * 9) - 1rem);
    }

    .grid-10 {
      width: calc(1(00%/12 * 10) - 1rem);
    }

    .grid-11 {
      width: calc(1(00%/12 * 11) - 1rem);
    }

    .grid-12 {
      width: calc(1(00%/12 * 12) - 1rem);
    } */}

    



  ${media.largeUp`
      
      .largeUp-grid-1 {
        width: calc((100%/12 * 1) - 1rem);
        
      }

      .largeUp-grid-2 {
        width: calc((100%/12 * 2) - 1rem);
        
      }

      .largeUp-grid-3 {
        width: calc((100%/12 * 3) - 1rem);
        
      }

      .largeUp-grid-4 {
        width: calc((100%/12 * 4) - 1rem);
        
      }

      .largeUp-grid-5 {
        width: calc((100%/12 * 5) - 1rem);
        
      }

      .largeUp-grid-6 {
        width: calc((100%/12 * 6) - 1rem);
        
      }

      .largeUp-grid-7 {
        width: calc((100%/12 * 7) - 1rem);
        
      }

      .largeUp-grid-8 {
        width: calc((100%/12 * 8) - 1rem);
        
      }

      .largeUp-grid-9 {
        width: calc((100%/12 * 9) - 1rem);
        
      }

      .largeUp-grid-10 {
        width: calc(1(00%/12 * 10) - 1rem);
        
      }

      .largeUp-grid-11 {
        width: calc(1(00%/12 * 11) - 1rem);
        
      }

      .largeUp-grid-12 {
        width: calc(1(00%/12 * 12) - 1rem);
        
      }
    `}
  }

  ${media.smallUp`

      .smallUp-grid-1 {
        width: calc((100%/12 * 1) - 1rem);
        
      }

      .smallUp-grid-2 {
        width: calc((100%/12 * 2) - 1rem);
        
      }

      .smallUp-grid-3 {
        width: calc((100%/12 * 3) - 1rem);
        
      }

      .smallUp-grid-4 {
        width: calc((100%/12 * 4) - 1rem);
        
      }

      .smallUp-grid-5 {
        width: calc((100%/12 * 5) - 1rem);
        
      }

      .smallUp-grid-6 {
        width: calc((100%/12 * 6) - 1rem);
        
      }

      .smallUp-grid-7 {
        width: calc((100%/12 * 7) - 1rem);
        
      }

      .smallUp-grid-8 {
        width: calc((100%/12 * 8) - 1rem);
        
      }

      .smallUp-grid-9 {
        width: calc((100%/12 * 9) - 1rem);
        
      }

      .smallUp-grid-10 {
        width: calc(1(00%/12 * 10) - 1rem);
        
      }

      .smallUp-grid-11 {
        width: calc(1(00%/12 * 11) - 1rem);
        
      }

      .smallUp-grid-12 {
        width: calc(1(00%/12 * 12) - 1rem);
        
      }
    `}
  }


`;


class SectionBlockComponent extends React.Component {

  render() {
    const componentName = "SectionBlockComponent";







    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <SectionBlockContainer className={classNames(componentName, this.props.className, 'colormode-' + this.props.colormode, {
        'asSlide': this.props.mode === 'slide'})}>
        <section className={classNames({
          'asGrid': this.props.mode === 'grid'
        })}>
          {
            this.props.children &&
              this.props.children
          }
        </section>
      </SectionBlockContainer>
    )
  }



}


SectionBlockComponent.propTypes = {
  // activeClassName: PropTypes.string.isRequired,
  colormode: PropTypes.string
}

SectionBlockComponent.defaultProps = {
  colormode: 'aqua'
}

// export default withRouter(EventListComponent);
export default SectionBlockComponent;
