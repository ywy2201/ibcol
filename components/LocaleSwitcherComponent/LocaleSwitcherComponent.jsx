import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import _ from 'lodash';
import routes, { Link } from '/routes';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';

// import NavLinkComponent from 'components/NavLinkComponent';

import styled from 'styled-components';
import theme from 'styled-theming';
import { transparentize } from 'polished'


import { withRouter } from 'next/router';

const pagePadding = {
  xSmall: style.dimension.normal.pagePadding.xSmall,
  small: style.dimension.normal.pagePadding.small,
  medium: style.dimension.normal.pagePadding.medium,
  large: style.dimension.normal.pagePadding.large,
  xLarge: style.dimension.normal.pagePadding.xLarge,
  xxLarge: style.dimension.normal.pagePadding.xxLarge
}

const Nav = styled.nav`

  position: absolute;
  top: 0.5rem;
  
  
  ${media.smallDown`
    right: ${pagePadding.small};
  `}
  ${media.mediumDown`
    right: ${pagePadding.medium};
  `}
  ${media.largeUp`
    right: ${pagePadding.large};
  `}
  ${media.xLargeUp`
    right: ${pagePadding.xLarge};
  `}
  ${media.xxLargeUp`
    right: ${pagePadding.xxLarge};
  `}

  

  ul {
    margin: 0;
    padding: 0;

    display: flex;

    font-size: 0.8rem;

    li {
      margin: 0;
      padding: 0;
      display: block;


      line-height: 0.8rem;
      &:not(:last-child) {
        border-right: 1px solid ${style.color.almostBlack};
        margin-right: 0.8rem;
        padding-right: 0.8rem;
      }
        

      

      a {
        color: ${style.color.almostBlack};
        text-decoration: none;
      }

      &.current {
        a {
          text-decoration: underline;
        }
      }
    }
  }

  
`;


class LocaleSwitcherComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // isOpened: false
    }
  }


  componentWillReceiveProps = (nextProps) => {

    // console.log('componentWillReceiveProps', nextProps);

    if (this.props.router.route !== nextProps.router.route) {
      // this.toggleMenu(false);
    }
  }



  // toggleMenu = (override) => {

  //   if (typeof (override) === 'object') {
  //     this.setState({
  //       isOpened: !this.state.isOpened
  //     })
  //   } else {

  //     this.setState({
  //       isOpened: override
  //     })
  //   }
  // }



  render() {
    const componentName = "LocaleSwitcherComponent";




    // const { activeClassName, className, children, router, href, ...props } = this.props;




    return (
      <Nav className={classNames(componentName)}>

        {/* <div className="localeMenuTriggerFooter" onClick={this.toggleMenu}>
          {_.find(configs.locales, { id: this.props.locale }).name}
        </div> */}
    





        <ul>
          {
            configs.locales.map((locale, index) => {

              const route = routes.findAndGetUrls(this.props.router.asPath, this.props.router.query).route;

              const routeName = route !== undefined ? route.name : 'index';

              return <li key={index} className={classNames({
                'current': locale.id === this.props.locale
              })}>
                <Link prefetch route={routeName} params={Object.assign({}, this.props.router.query, { locale: locale.id })}>
                  <a>
                    {/* <span className="icon" style={{ backgroundImage: `url("/static/images/locale-flags/${locale.id}.svg")` }}>
                    </span> */}

                    {
                      locale.name
                    }

                  </a>
                </Link>
              </li>
            })
          }





        </ul>

      </Nav>
    );
  }
}


LocaleSwitcherComponent.propTypes = {
  locale: PropTypes.string,
}

LocaleSwitcherComponent.defaultProps = {
  locale: configs.locales[0].id,
}


export default withRouter(LocaleSwitcherComponent);