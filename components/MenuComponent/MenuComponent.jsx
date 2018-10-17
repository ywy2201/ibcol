import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from '/routes';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';

import NavLinkComponent from 'components/NavLinkComponent';

import styled from 'styled-components';

import { transparentize } from 'polished'
import translate from 'helpers/translate.js';

import { withRouter } from 'next/router';

// const MenuComponent = styled.div`
//   display: block;
//   ${'' /* margin-bottom: 4rem; */}
// `;

// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }



const MenuHeader = styled.header`
  
  
`;


class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // isOpened: false
    }
  }

  translate = (t) => translate(t, this.props.locale);

  // componentWillReceiveProps = (nextProps) => {

  //   // console.log('componentWillReceiveProps', nextProps);

  //   if (this.props.router.route !== nextProps.router.route) {
  //     // this.toggleMenu(false);
  //   }
  // }
  
 
  
  



  render() {
    const componentName = "MenuComponent";



    const locale = this.props.locale;

    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <MenuHeader className={classNames('s-header')}>
        
        <div className="header-logo">
          <Link prefetch route="home" params={{ locale }}>
            <a className="site-logo">
              <img src="/static/images/logo.png" alt="Homepage"/>
            </a>
          </Link>
        </div>

        <div className="desktop-nav">
          <ul className="nav_list">
            <li>
              <NavLinkComponent prefetch route="home" params={{ locale }}>
                Home
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="about" params={{ locale }}>
                About
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="criteria" params={{ locale }}>
                Competition
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="student-relations" params={{ locale }}>
                Student Relations
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="corporate-relations" params={{ locale }}>
                Corporate Relations
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="schedule" params={{ locale }}>
                Schedule & Programme
              </NavLinkComponent>
            </li>

            <li>
              <NavLinkComponent prefetch route="contact" params={{ locale }}>
                Contact
              </NavLinkComponent>
            </li>
          </ul>
        </div>

        <nav className="header-nav">

          <a href="#0" className="header-nav__close" title="close"><span>Close</span></a>

          <h3>Navigate to</h3>

          <div className="header-nav__content">

            <ul className="header-nav__list">
              <li>
                <NavLinkComponent prefetch route="home" params={{ locale }}>
                  Home
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="about" params={{ locale }}>
                  About
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="criteria" params={{ locale }}>
                  Competition
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="student-relations" params={{ locale }}>
                  Student Relations
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="corporate-relations" params={{ locale }}>
                  Corporate Relations
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="schedule" params={{ locale }}>
                  Schedule & Programme
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="contact" params={{ locale }}>
                  Contact
                </NavLinkComponent>
              </li>
            </ul>
          </div>

        </nav>





        <a className="header-menu-toggle" href="#0">
          <span className="header-menu-icon"></span>
        </a>

        
      </MenuHeader>
    );
  }
}


MenuComponent.propTypes = {
  locale: PropTypes.string,
}

MenuComponent.defaultProps = {
  locale: configs.locales[0].id,
}


export default withRouter(MenuComponent);