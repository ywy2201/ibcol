import React from 'react';
import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';


import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';


import translate from 'helpers/translate.js';

import Head from 'next/head';


const ThisPageContainerComponent = styled(PageContainerComponent)`


  

`;


export default class extends React.Component {
  static async getInitialProps({ query }) {
    
    return { query }
  }
  
  translate = (t) => translate(t, 'about', this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);
    
    const locale = this.props.query.locale;
    // console.log('locale:', locale);
    
    // console.log(translate('pageTitle', 'about', locale));
    
    
    return (
      <ThisPageContainerComponent>
        <Head>
          <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
          <meta name="description" content={this.translate('seoDescription')}/>
          <meta name="keywords" content={this.translate('keywords')}/>
          <meta property="og:image" content={this.translate('ogImage')} />
          <meta property="og:type" content="website" />
          
        </Head>
        
        <section className="s-section first target-section">

          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h4 className="subhead">{this.translate('subhead')}</h4>
              <h1>
                {this.translate('section01.heading')}
                </h1>
            </div>
          </div>
  
        <div className="row bit-narrow innerpage no-bottom">
            <div className="block-tab-full">
              <div className="col-block" dangerouslySetInnerHTML={{ __html:  this.translate('section01.contentHTML') }}/>
              
            </div>
          </div>

        </section>



        <section className="s-section target-section">
          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h1>
                {this.translate('section02.heading')}
                </h1>
            </div>
          </div>
  
        <div className="row bit-narrow innerpage no-bottom">
            <div className="block-tab-full">
              <div className="col-block" dangerouslySetInnerHTML={{ __html: this.translate('section02.contentHTML') }}/>
            </div>
          </div>

        </section>

        
        <section className="s-section last target-section">

          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h1>
                {this.translate('section03.heading')}
                </h1>
            </div>
          </div> 
  
        <div className="row bit-narrow innerpage">
            <div className="block-tab-full">
              <div className="col-block" dangerouslySetInnerHTML={{ __html: this.translate('section03.contentHTML') }}/>
            </div>
          </div>

        </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    