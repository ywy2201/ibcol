import App, { Container } from 'next/app';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import translate from 'helpers/translate.js';

import { Link } from '/routes';
// import css from 'styled-jsx/css';

import MenuComponent from 'components/MenuComponent';
import LoaderComponent from 'components/LoaderComponent';
// import LocaleSwitcherComponent from 'components/LocaleSwitcherComponent';


import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';



// import theme from 'styled-theming';

import { media, style } from 'helpers/styledComponents.js';
import { transparentize } from 'polished';

import translations from 'translations';


// CSS
import "styles/base.css";
import "styles/vendor.css";
import "styles/main.css";
import "styles/flag-icon.min.css";


const GlobalStyle = createGlobalStyle`

  

  
`;











class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // width: 0, height: 0
    }

    
  }


  translate = (t, locale = this.props.router.query.locale) => translate(t, '_global', locale);



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
    const locale = query !== undefined ? query.locale !== undefined ? query.locale : translations["_default"]._locale.id : translations["_default"]._locale.id;



    return <Container>
      
      <GlobalStyle/>

      
      {/* <LoaderComponent/> */}


      <MenuComponent locale={locale}/>
      

    <Component {...pageProps} locale={locale} />





      <footer>
        <div className="ss-go-top">

          <a href="registration.html" className="register btn btn--primary btn--large">
              {this.translate('footerMenu.registrationInfo')}
          </a>
          <Link prefetch route="competition" params={{ locale }}>
            <a className="more-info btn btn--large">
                {this.translate('footerMenu.aboutCompetition')}
            </a>
          </Link>
          <a className="smoothscroll btn btn--large" title={this.translate('footerMenu.backToTop')} href="#top">
              {this.translate('footerMenu.backToTop')}
          </a>
        </div>

        <div className="row">
          <div className="col-full ss-copyright">
            <span dangerouslySetInnerHTML={{ __html: this.translate('copyright') }} />
          </div>
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
