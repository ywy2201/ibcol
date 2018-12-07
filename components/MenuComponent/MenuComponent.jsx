import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from '/routes';



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


const MobileNavBackdrop = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  ${'' /* background: red; */}
  
`;


class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpened: false
    }
  }

  translate = (t, locale = this.props.router.query.locale) => translate(t, '_global', locale);

  // componentWillReceiveProps = (nextProps) => {

  //   // console.log('componentWillReceiveProps', nextProps);

  //   if (this.props.router.route !== nextProps.router.route) {
  //     // this.toggleMenu(false);
  //   }
  // }
  
 
  componentDidUpdate = (prevProps, prevState) => {
    // console.log('prevProps', prevProps);
    // console.log('this.props', this.props);
    
    if (this.props.router !== undefined) {
      if (prevProps.router.asPath !== this.props.router.asPath) {
        this.setState({
          isMobileMenuOpened: false
        })
      }
    }

  }
  
  
  toggleMobileMenu = () => {
    this.setState({
      isMobileMenuOpened: !this.state.isMobileMenuOpened
    });
  }


  render() {
    const componentName = "MenuComponent";



    const locale = this.props.locale;

    // const { activeClassName, className, children, router, href, ...props } = this.props;

    const menuItems = <>
      <li>
        <NavLinkComponent prefetch route="home" params={{ locale }}>
          {this.translate('menu.home')}
        </NavLinkComponent>
      </li>
      {/* <li>
        <NavLinkComponent prefetch route="about" params={{ locale }}>
          {this.translate('menu.about')}
        </NavLinkComponent>
      </li> */}
      <li>
        <NavLinkComponent prefetch route="how" params={{ locale }}>
          {this.translate('menu.how')}
        </NavLinkComponent>
      </li>
      {/* <li>
        <NavLinkComponent prefetch route="competition" params={{ locale }}>
          {this.translate('menu.competition')}
        </NavLinkComponent>
      </li> */}
      <li>
        <NavLinkComponent prefetch route="ambassadors" params={{ locale }}>
          {this.translate('menu.ambassadors')}
        </NavLinkComponent>
      </li>
      <li>
        <NavLinkComponent prefetch route="sponsors" params={{ locale }}>
          {this.translate('menu.sponsors')}
        </NavLinkComponent>
      </li>
      {/* <li>
        <NavLinkComponent prefetch route="schedule" params={{ locale }}>
          {this.translate('menu.schedule')}
        </NavLinkComponent>
      </li> */}

      <li>
        <NavLinkComponent prefetch route="contact" params={{ locale }}>
          {this.translate('menu.contact')}
        </NavLinkComponent>
      </li>

      <li className="featured">
        <NavLinkComponent prefetch route="registration" params={{ locale }}>
          {this.translate('menu.registration')}
        </NavLinkComponent>
      </li>
    </>

    return (
      <MenuHeader className={classNames('s-header', {
        'menu-is-open': this.state.isMobileMenuOpened === true
      })}>
        
        <div className="header-logo">
          <Link prefetch route="home" params={{ locale }}>
            <a className="site-logo">
              <img src="/static/images/logo-international-blockchain-olympiad-(ibcol)-subpage.png" alt={this.translate('logoTag')}/>
            </a>
          </Link>
        </div>

        <div className="desktop-nav">
          <ul className="nav_list">
            
            {menuItems}

          </ul>
        </div>

        {
          this.state.isMobileMenuOpened === true &&
          
          <nav className="header-nav">

            <a className="header-nav__close" onClick={this.toggleMobileMenu} title="close"><span>{this.translate('close')}</span></a>

            <h3>{this.translate('navigateTo')}</h3>

            <div className="header-nav__content">

              <ul className="header-nav__list">

                {menuItems}


                
              </ul>
            </div>

          </nav>
        }

        {
          this.state.isMobileMenuOpened === true &&
          <MobileNavBackdrop onClick={this.toggleMobileMenu}>
            
          </MobileNavBackdrop>
        }





        <a className="header-menu-toggle" onClick={this.toggleMobileMenu}>
          <span className="header-menu-icon"></span>
        </a>

        
      </MenuHeader>
    );
  }
}


MenuComponent.propTypes = {
  locale: PropTypes.string.isRequired,
}

MenuComponent.defaultProps = {
}


export default withRouter(MenuComponent);