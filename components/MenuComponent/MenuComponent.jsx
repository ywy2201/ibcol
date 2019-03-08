import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from '/routes';



import { media, style } from 'helpers/styledComponents.js';

import NavLinkComponent from 'components/NavLinkComponent';

import styled from 'styled-components';

import { transparentize } from 'polished'
import {translate} from 'helpers/translate.js';

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

  li.languageMenuHeaderTrigger,
  div.languageMenuHeaderTriggerMobile {

    cursor: pointer;
    
    

    background-color: #EEE;
    background-size: cover;
    background-position: center center;


    border: solid 1px #CCC;



    border-radius: 10rem;

  }


  li.languageMenuHeaderTrigger {
    
    width: 3rem;
    height: 3rem;
    
    margin-top: -0.25rem;

    @media only screen and (max-width:800px) {
      display: none;
    }

  }

  div.languageMenuHeaderTriggerMobile {
    @media only screen and (min-width:801px) {
      display: none;
    }

    position: fixed;
    right: 10rem;
    top: 3.5rem;

    width: 3.5rem;
    height: 3.5rem;


  }
  
  
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
      isMobileMenuOpened: false,
      wasSticky: false
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

    if (this.props.isSticky === false && prevProps.isSticky === true) {
      this.setState({
        wasSticky: true
      })
    } else if (this.props.isSticky === true && prevProps.isSticky === false) {
      this.setState({
        wasSticky: false
      })
    }
    
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

    // console.log("this.props.style", this.props.style);
    // console.log("this.props.className", this.props.className);
    // console.log("this.props", this.props);

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

      <li onClick={this.props.onToggleLanguageSelector} className="languageMenuHeaderTrigger" alt={this.translate('_locale.name')} title={this.translate('_locale.name')} style={{
        backgroundImage: `url("/static/images/flags/1x1/${this.translate('_locale.flag')}")`
      }}></li>
    </>

    return (
      <MenuHeader className={classNames('s-header', this.props.className, {
        'menu-is-open': this.state.isMobileMenuOpened === true,
        wasSticky: this.state.wasSticky
      })} style={this.props.style}>
        
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



        <div onClick={this.props.onToggleLanguageSelector} className="languageMenuHeaderTriggerMobile" alt={this.translate('_locale.name')} title={this.translate('_locale.name')} style={{
        backgroundImage: `url("/static/images/flags/1x1/${this.translate('_locale.flag')}")`
      }}></div>

        <a className="header-menu-toggle" onClick={this.toggleMobileMenu}>
          <span className="header-menu-icon"></span>
        </a>

        
      </MenuHeader>
    );
  }
}


MenuComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  onToggleLanguageSelector: PropTypes.func.isRequired
}

MenuComponent.defaultProps = {
}


export default withRouter(MenuComponent);