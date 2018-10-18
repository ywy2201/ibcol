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


class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // isOpened: false
    }
  }

  translate = (t, locale = this.props.router.query.locale) => translate(t, '_global', locale);

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
              <img src="/static/images/logo-subpage.png" alt={this.translate('logoTag')}/>
            </a>
          </Link>
        </div>

        <div className="desktop-nav">
          <ul className="nav_list">
            <li>
              <NavLinkComponent prefetch route="home" params={{ locale }}>
                {this.translate('menu.home')}
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="about" params={{ locale }}>
                {this.translate('menu.about')}
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="criteria" params={{ locale }}>
                {this.translate('menu.criteria')}
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="student-relations" params={{ locale }}>
                {this.translate('menu.studentRelations')}
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="corporate-relations" params={{ locale }}>
                {this.translate('menu.corporateRelations')}
              </NavLinkComponent>
            </li>
            <li>
              <NavLinkComponent prefetch route="schedule" params={{ locale }}>
                {this.translate('menu.schedule')}
              </NavLinkComponent>
            </li>

            <li>
              <NavLinkComponent prefetch route="contact" params={{ locale }}>
                {this.translate('menu.contact')}
              </NavLinkComponent>
            </li>
          </ul>
        </div>

        <nav className="header-nav">

          <a href="#0" className="header-nav__close" title="close"><span>{this.translate('close')}</span></a>

          <h3>{this.translate('menu.navigateTo')}</h3>

          <div className="header-nav__content">

            <ul className="header-nav__list">
              <li>
                <NavLinkComponent prefetch route="home" params={{ locale }}>
                  {this.translate('menu.home')}
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="about" params={{ locale }}>
                  {this.translate('menu.about')}
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="criteria" params={{ locale }}>
                  {this.translate('menu.criteria')}
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="student-relations" params={{ locale }}>
                  {this.translate('menu.studentRelations')}
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="corporate-relations" params={{ locale }}>
                  {this.translate('menu.corporateRelations')}
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="schedule" params={{ locale }}>
                  {this.translate('menu.schedule')}
                </NavLinkComponent>
              </li>
              <li>
                <NavLinkComponent prefetch route="contact" params={{ locale }}>
                  {this.translate('menu.contact')}
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
}


export default withRouter(MenuComponent);