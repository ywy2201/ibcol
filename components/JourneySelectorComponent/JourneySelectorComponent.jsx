import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import configs from 'configs';

import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';
import { transparentize } from 'polished';
import theme from 'styled-theming';

import { Link } from '/routes';

// import NavLinkComponent from 'components/NavLinkComponent';


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

const selectorBackgroundColor = theme("scheme", {
  default: `linear-gradient(to top, ${style.color.darkBlue}, ${transparentize(0.8, style.color.darkBlue)} 80%, ${transparentize(1, style.color.darkBlue)})`
});

const selectorBackgroundColorTrader = theme("scheme", {
  default: `linear-gradient(to top, ${style.color.bittersweet}, ${transparentize(0.8, style.color.bittersweet)} 2rem, ${transparentize(0.8, style.color.backgroundBlue)} 80%, ${transparentize(1, style.color.backgroundBlue)})`
});

const selectorBackgroundColorExchange = theme("scheme", {
  default: `linear-gradient(to top, ${style.color.lime}, ${transparentize(0.8, style.color.lime)} 2rem, ${transparentize(0.8, style.color.backgroundBlue)} 80%, ${transparentize(1, style.color.backgroundBlue)})`
});

const selectorBackgroundColorDeveloper = theme("scheme", {
  default: `linear-gradient(to top, ${style.color.aquaBlue}, ${transparentize(0.8, style.color.aquaBlue)} 2rem, ${transparentize(0.8, style.color.backgroundBlue)} 80%, ${transparentize(1, style.color.backgroundBlue)})`
});


const JourneySelectorContainer = styled.div`

  &.stickToBottom {
    position: fixed;
    bottom: 0;
  }
  ${'' /* position: fixed; */}
  z-index: 10;
  left: 0;
  
  width: 100vw;
  ${'' /* height: 500px; */}

  

  ${'' /* background: blue; */}

  ${'' /* ${media.smallDown`
    bottom: 10rem;
    
  `} */}
  ${'' /* ${media.xSmall`
    bottom: 28.9rem;
    
  `}
  ${media.small`
    bottom: 23.2rem;
  `}
  ${media.mediumUp`
    bottom: 9.5rem;
  `} */}

  
  
  &.current-trader {
    .JourneySelector {

      background: ${selectorBackgroundColorTrader};
    }
  }

  &.current-exchange {
    .JourneySelector {

      background: ${selectorBackgroundColorExchange};
    }
  }

  &.current-developer {
    .JourneySelector {

      background: ${selectorBackgroundColorDeveloper};
    }
  }

  
  .JourneySelector {

    background: ${selectorBackgroundColor};
    ${'' /* background: red; */}

    position: relative;

    

    margin: 0 auto;

    box-sizing: border-box;

    ${'' /* max-width: ${maxSiteWidth}; */}

    display: flex;

    ${media.smallDown`
      padding: 2rem ${pagePadding.small} 1rem;
      
    `}
    ${media.mediumDown`
      padding: 2rem ${pagePadding.medium} 1rem;
    `}
    ${media.largeUp`
      padding: 2rem ${pagePadding.large} 1rem;
    `}
    ${media.xLargeUp`
      padding: 2rem ${pagePadding.xLarge} 1rem;
    `}
    ${media.xxLargeUp`
      padding: 2rem ${pagePadding.xxLarge} 1rem;
    `}


    ul.journeyOptions {
      text-align: right;
      display: inline-block;
      padding-left: 0;
      margin-right: 60px;
      margin-left: auto;
      

      



      ${'' /* position: absolute; */}
      
      ${'' /* ${media.smallDown`
        right: calc(${pagePadding.small} + 49px + 2rem);
        bottom: calc(${pagePadding.small}/3);
      `}
      ${media.mediumDown`
        right: calc(${pagePadding.medium} + 49px + 2rem);
        bottom: calc(${pagePadding.medium}/3);
      `}
      ${media.largeUp`
        right: calc(${pagePadding.large} + 49px + 2rem);
        bottom: calc(${pagePadding.large}/3);
      `}
      ${media.xLargeUp`
        right: calc(${pagePadding.xLarge} + 49px + 2rem);
        bottom: calc(${pagePadding.xLarge}/3);
      `}
      ${media.xxLargeUp`
        right: calc(${pagePadding.xxLarge} + 49px + 2rem);
        bottom: calc(${pagePadding.xxLarge}/3);
      `} */}
      

      li {
        display: block;
        
        
        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        
        a {
          font-size: .8875rem;
          padding-bottom: 0.3rem;
          border-bottom: none;

          background-repeat: no-repeat;
          background-size: 100% 3px;
          background-position: left bottom;

          span {
            font-size: .9rem;
          }
        }

        &.type-trader {
          a{
            ${'' /* border-color: ${style.color.bittersweet} */}
            background-image: url('/static/images/journey_selector_background_trader.png');
          }
        }

        &.type-exchange {
          a {
            ${'' /* border-color: ${style.color.lime}; */}

            background-image: url('/static/images/journey_selector_background_exchange.png');
          }
        }

        &.type-developer {
          a {
            ${'' /* border-color: ${style.color.aquaBlue}; */}
            background-image: url('/static/images/journey_selector_background_developer.png');
          }
        }
        

        
      }
    }

    .selectorTrigger {


      background-repeat: no-repeat;
      background-size: contain;
      background-image: url('/static/images/journey_selector.png');

      position: absolute;

      width: 49px;
      height: 49px;

      ${'' /* z-index: 9; */}

      cursor: pointer;

      ${media.smallDown`
        right: calc(${pagePadding.small});
        bottom: calc(${pagePadding.small}/3);
      `}
      ${media.mediumDown`
        right: calc(${pagePadding.medium});
        bottom: calc(${pagePadding.medium}/3);
      `}
      ${media.largeUp`
        right: calc(${pagePadding.large});
        bottom: calc(${pagePadding.large}/3);
      `}
      ${media.xLargeUp`
        right: calc(${pagePadding.xLarge});
        bottom: calc(${pagePadding.xLarge}/3);
      `}
      ${media.xxLargeUp`
        right: calc(${pagePadding.xxLarge});
        bottom: calc(${pagePadding.xxLarge}/3);
      `}
    }
  }

  
  ${'' /* bottom: 0; */}
  

  

  

  
`;





class JourneySelectorComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpened: false

    }
  }


  toggleSelector = (override) => {
    
    if (typeof (override) === 'object') {
      this.setState({
        isOpened: !this.state.isOpened
      })
    } else {
      
      this.setState({
        isOpened: override
      })
    }
  }


  render() {

    const componentName = "JourneySelectorComponent";

    

    return (
      <JourneySelectorContainer className={classNames(componentName, `current-${this.props.current}`, {
        stickToBottom: this.props.stickToBottom === true
      })} onMouseLeave={this.toggleSelector.bind(this, false)}>
        <div className="JourneySelector">
          {/* Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget risus varius blandit sit amet non magna. */}

          <div className="selectorTrigger" onClick={this.toggleSelector}></div>

          {
            this.state.isOpened === true &&
            <ul className="journeyOptions" onClick={this.toggleSelector.bind(this, false)}>
              <li className="type-developer"><Link prefetch route="landingDeveloper" params={{ locale: this.props.locale }}><a><span>Developers</span></a></Link></li>
              <li className="type-exchange"><Link prefetch route="landingExchange" params={{ locale: this.props.locale }}><a><span>Exchanges</span></a></Link></li>
              <li className="type-trader"><Link prefetch route="landingTrader" params={{ locale: this.props.locale }}><a><span>Traders</span></a></Link></li>
            </ul>
          }
        </div>
        

      </JourneySelectorContainer>
    );
  }
}


JourneySelectorComponent.propTypes = {
  current: PropTypes.string,
  locale: PropTypes.string,
  stickToBottom: PropTypes.bool
}

JourneySelectorComponent.defaultProps = {
  current: "general",
  locale: configs.locales[0].id,
  stickToBottom: false
}

export default JourneySelectorComponent;
