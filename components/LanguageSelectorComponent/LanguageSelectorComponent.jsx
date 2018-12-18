import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';

import _ from 'lodash';

import translate from 'helpers/translate.js';

import translations from 'translations';


import routes, { Link } from '/routes';

import { withRouter } from 'next/router';


const LanguageSelectorContainerDiv = styled.div` 
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;
  z-index: 501;

  background: rgba(255,255,255, 0.98);

  display: flex;
  justify-content: center;
  align-items: center;

  

  .header-nav__close span::before, .header-nav__close span::after {
    background-color: #000;
  }

  ${media.largeUp`

  .header-nav__close span::before, .header-nav__close span::after {
    width: 32px;
  }
  .header-nav__close {
    width: 60px;
    height: 60px;
  }

  `}


  

  ul.translationList {
    padding: 13rem 0;
    margin: 0;
    
    display: flex;

    

    ${'' /* height: 100%; */}
    ${'' /* padding-top: 20rem; */}
    max-height: 100%;
    width: 100%;
    overflow: auto;

    justify-content: center;
    align-items: center;

    flex-wrap: wrap;

    a {

      text-decoration: none;
      margin: 1rem 4rem;

      ${media.small`
        margin: 1rem 1rem;

        &:nth-child(even) {
          margin-left: 0;
        }

        width: calc(50% - 3rem);
      `}

      ${media.xSmallDown`
        margin: 1rem 1.5rem;
        width: 100%;
      `}


      li {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        color: #666;

        

        cursor: pointer;
        padding: 0.3rem 3rem 0.25rem;

        

        border: 1px solid #CCC;
        border-radius: 1rem;

        box-sizing: border-box;

        ${media.small`
          width: 100%;
          padding: 0.3rem 0rem 0.25rem;
        `}

        ${media.xSmallDown`
          width: 100%;
          padding: 0.5rem 0rem 0.45rem;
        `}


        &.disabled {
          
          opacity: 0.3;
        }


        > .translationFlag {
          display: inline-block;

          cursor: pointer;
          
          width: 2rem;
          height: 2rem;

          margin-right: 1.5rem;

          background-color: #EEE;
          background-size: cover;
          background-position: center center;

          border: solid 1px #CCC;



          border-radius: 10rem;



        }
      }
    
    }

  }
  
`;




class LanguageSelectorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpened: false,
      wasSticky: false
    }
  }

  translate = (t, locale = this.props.locale) => translate(t, '_global', locale);

  componentDidMount() {
    $('body').addClass('noScroll');
  }

  componentWillUnmount() {
    $('body').removeClass('noScroll');
  }


  render() {
    const componentName = "LanguageSelectorComponent";
    let selectableTranslations = Object.assign({}, translations);
    delete selectableTranslations._default;
    // const translationKeys = Object.keys(translations).filter((x) => x !== "_default");
    selectableTranslations = _.sortBy(selectableTranslations, (o)=>o._locale.name);
    // console.log('selectableTranslations', selectableTranslations);

    const route = routes.findAndGetUrls(this.props.router.asPath, this.props.router.query).route;

    const routeName = route !== undefined ? route.name : 'index';

    return <LanguageSelectorContainerDiv >
    <a className="header-nav__close" onClick={()=>{this.props.onToggleLanguageSelector(false)}} title="close"><span>{this.translate('close')}</span></a>
    <ul className="translationList">
      {
        selectableTranslations.map((selectableTranslation, index) =>{
          const locale = selectableTranslation['_locale'];
          if (process.env.ENV === 'production' && locale.disabled === true)
            return undefined;

          
          return <Link key={index} prefetch route={routeName} params={Object.assign({}, this.props.router.query, { locale: locale.id })}>
                  <a onClick={()=>{this.props.onToggleLanguageSelector(false)}}>
                  
                  <li className={classNames({disabled: locale.disabled === true})}>
            <span className="translationFlag" alt={locale.name} title={locale.name} style={{
              backgroundImage: `url("/static/images/flags/1x1/${locale.flag}")`
            }}></span>
            {
              locale.name
            }
          </li></a></Link>
        })
      }
    </ul>

    </LanguageSelectorContainerDiv>

  }


}

LanguageSelectorComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  onToggleLanguageSelector: PropTypes.func.isRequired
}

LanguageSelectorComponent.defaultProps = {
}


export default withRouter(LanguageSelectorComponent);