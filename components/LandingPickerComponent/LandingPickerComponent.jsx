import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import configs from 'configs';

import styled from 'styled-components';
import theme from 'styled-theming';
import { transparentize } from 'polished';

import { media, style } from 'helpers/styledComponents.js';

import { Link } from '/routes';

import translate from 'helpers/translate.js';

const LandingUL = styled.ul`
  
  padding-left: 0;

  display: flex;
  justify-content: center;

  ${media.xSmall`
    display: block;

  `}

  > li {
    display: block;

    &:not(:last-child) {
      margin-right: 3rem;
      ${media.smallDown`
        margin-right: 1rem;
      `}

      ${media.xSmall`
        margin-right: 0rem;
      `}
    }

    

    position: relative;

    

    &::before {
      content: " ";
      background-repeat: no-repeat;
      background-size: contain;
      display: block;
      width: 178px;
      height: 178px;

      ${media.smallDown`
    
        width: calc(25vw + 8px);
        height: calc(25vw + 8px);

      `}

      ${media.xSmall`
        background-position: center center;
        width: calc(100% + 8px);
        height: calc(100% + 8px);

      `}

      position: absolute;
      left: -0.4rem;
      top: -0.1rem;

      pointer-events: none;
    }

    &.type-developer {
      &::before {
        background-image: url('/static/images/landing_select_developer.png');
      }

      &:hover {
        &::before {
          background-image: url('/static/images/landing_select_developer_hover.png');
        }
      }
    }

    &.type-exchange {
      &::before {
        background-image: url('/static/images/landing_select_exchange.png');
      }

      &:hover {
        &::before {
          background-image: url('/static/images/landing_select_exchange_hover.png');
        }
      }
    }

    &.type-trader {
      &::before {
        background-image: url('/static/images/landing_select_trader.png');
      }

      &:hover {
        &::before {
          background-image: url('/static/images/landing_select_trader_hover.png');
        }
      }
    }

    > a {

      .lead {
        ${'' /* margin-right: 0.3rem; */}
        display: block;
        ${'' /* font-size: 0.8em; */}
      }

      text-align: center;
      text-decoration: none;
      border-bottom: none;
      display: block;
      width: 170px;
      height: 170px;

      ${media.smallDown`
    
        width: 25vw;
        height: 25vw;

      `}

      ${media.xSmall`
        
        width: 50vw;
        height: 50vw;

        margin: 2rem auto;
        
        
      `}
      

      background-color: ${transparentize(0.5, style.color.lightBlue)};

      color: ${style.color.trueWhite};
      border-radius: 10rem;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 2px;

      &:hover {
        background-color: ${style.color.lightBlue};
      }

      

      

    }
  }

`;




class LandingPickerComponent extends React.Component {

  translate = (t) => translate(t, this.props.locale);

  render() {
    const componentName = "LandingPickerComponent";







    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <LandingUL className={componentName}>
        <li className="type-developer"><Link prefetch route="landingDeveloper" params={{ locale: this.props.locale }}><a><div>
          {this.props.showLead === true &&
            <span className="lead">{
              this.translate({
                "en-gb": "I am a",
                "zh-cn": "我是一个"
              })
            } </span>
          }
          {
            this.translate({
              "en-gb": "Developer",
              "zh-cn": "开发者"
            })
          }
            
          </div></a></Link></li>
        <li className="type-exchange"><Link prefetch route="landingExchange" params={{ locale: this.props.locale }}><a><div>
          {this.props.showLead === true &&
            <span className="lead">{
              this.translate({
                "en-gb": "I am an",
                "zh-cn": "我是一个"
              })
            } </span>
          }
            {
              this.translate({
                "en-gb": "Exchange",
                "zh-cn": "交易所"
              })
            }
          </div></a></Link></li>
        <li className="type-trader"><Link prefetch route="landingTrader" params={{ locale: this.props.locale }}><a><div>
          {this.props.showLead === true &&
            <span className="lead">{
              this.translate({
                "en-gb": "I am a",
                "zh-cn": "我是一个"
              })
            } </span>
          }
          {
            this.translate({
              "en-gb": "Trader",
              "zh-cn": "交易用户"
            })
          }
          </div></a></Link></li>
      </LandingUL>
    )
  }



}


LandingPickerComponent.propTypes = {
  // activeClassName: PropTypes.string.isRequired,
  showLead: PropTypes.bool,
  locale: PropTypes.string
}

LandingPickerComponent.defaultProps = {
  // activeClassName: "active"
  showLead: true,
  locale: configs.locales[0]
}

// export default withRouter(EventListComponent);
export default LandingPickerComponent;
