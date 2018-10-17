import App, { Container } from 'next/app';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import translate from 'helpers/translate.js';

import { Link } from '/routes';
// import css from 'styled-jsx/css';

import MenuComponent from 'components/MenuComponent';
import LoaderComponent from 'components/LoaderComponent';
import LocaleSwitcherComponent from 'components/LocaleSwitcherComponent';


import styled, { injectGlobal, ThemeProvider } from 'styled-components';



// import theme from 'styled-theming';

import { media, style } from 'helpers/styledComponents.js';
import { transparentize } from 'polished';

import configs from 'configs';
import FooterComponent from 'components/FooterComponent/FooterComponent';



// CSS
import "styles/base.css";
import "styles/vendor.css";
import "styles/main.css";



// const maxSiteWidth = style.dimension.normal.maxSiteWidth;

// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }



injectGlobal`
  ${'' /* html { 
    font-size: 16px; 
    ${media.xSmall`

      font-size: 14px; 
      
      
    `}

    ${media.small`

      font-size: 15px; 
      
      
    `}
  } 
  body {

    margin: 0;
    padding: 0;

    font-family: ${style.font.family.standard};

    font-weight: 300;

  
    

    background: ${style.color.almostWhite};




    .withPadding {

      ${media.smallDown`
        padding: 0 ${pagePadding.small};
      `}
      ${media.mediumDown`
        padding: 0 ${pagePadding.medium};
      `}
      ${media.largeUp`
        padding: 0 ${pagePadding.large};
      `}
      ${media.xLargeUp`
        padding: 0 ${pagePadding.xLarge};
      `}
      ${media.xxLargeUp`
        padding: 0 ${pagePadding.xxLarge};
      `}

    }
    
  } */}

  ${'' /* .fancy-fonts {
    font-family: ${style.font.family.fancy};
  } */}


  

  
`;








const AppContainerDiv = styled.div`
  padding: 0;
  margin: 0 auto;
  width: 100%;
  ${'' /* max-width: ${maxSiteWidth}; */}
  
  ${'' /* min-height: 100vh; */}
  box-sizing: border-box;
  background: ${style.color.trueWhite};
  color: ${style.color.almostBlack};

  
  

  

`;




const HeaderContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  
  width: 100%;

  padding: 1.5rem 0;



  .logoContainer {
    margin: 0 auto;
  }
  
  
  
  ${'' /* max-width: ${maxSiteWidth};
  margin: 0 auto;
  box-sizing: border-box; */}

  

  ${'' /* .desktop-menus {
    display: none;
  }

  ${media.xSmallUp`
    padding: 0.6rem ${pagePadding.xSmall} 0.6rem;
  `}
  ${media.smallUp`
    padding: 0.8rem ${pagePadding.small} 0.8rem;
  `}
  ${media.mediumUp`
    padding: 1.1rem ${pagePadding.medium} 1.1rem;

    .desktop-menus {
      display: flex;

      .LocaleSwitcherComponent {
        margin-right: 2rem;
      }
    }
  `}
  ${media.largeUp`
    padding: 1.5rem ${pagePadding.large} 1.5rem;
  `}
  ${media.xLargeUp`
    padding: 1.5rem ${pagePadding.xLarge} 1.5rem;
  `}
  ${media.xxLargeUp`
    padding: 1.5rem ${pagePadding.xxLarge} 1.5rem;
  `} */}

`;


const BodyContainerDiv = styled.div`
  width: 100%;
  min-height: 20vh;

  position: relative;

  
`;








class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // width: 0, height: 0
    }

    
  }


  translate = (t, locale = this.props.router.query.locale) => translate(t, );



  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);

      console.debug('incoming pageProps >>>', pageProps);
      
    }

    

    return { pageProps, router }
  }


  
  


  render() {
    const { Component, pageProps, router } = this.props;
    const query = router.query;
    const locale = query !== undefined ? query.locale !== undefined ? query.locale : configs.locales[0].id : configs.locales[0].id;

    // console.debug('this.props >>>', this.props);
    // console.debug('pageProps >>>', pageProps);
    // console.debug('router >>>', router);

    // const slideMode = this.props.router === undefined ? false : (this.props.router.asPath === '/landing/developer' || this.props.router.asPath === '/landing/exchange' || this.props.router.asPath === '/landing/trader' || this.props.router.asPath === '/landing/general') ? true : false;
    

    // const displayMode = invertMode ? 'invert' : 'default';

    // console.log('invertMode', invertMode);


    return <Container>
      


      
      {/* <LoaderComponent/> */}


      <MenuComponent/>
      

    <Component {...pageProps} locale={locale} />





      <footer>
        <div className="row">
          <div className="col-full ss-copyright">
            <span>© Copyright International Blockchain Competition 2018</span>
          </div>
        </div>
        <div className="ss-go-top">
          <a className="smoothscroll" title="Back to Top" href="#top">Back to Top</a>
        </div>
      </footer>
      
      
    </Container>
  }
}



MyApp.propTypes = {
  
}

MyApp.defaultProps = {
  // activeClassName: "active"
}

export default MyApp;
