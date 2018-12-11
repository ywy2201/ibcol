import React from 'react';
import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';

import translate from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';

import Head from 'next/head';


// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }





const ThisPageContainerComponent = styled(PageContainerComponent)`


  

`;


export default class extends React.Component {
  static async getInitialProps({ query }) {
    
    return { query }
  }
  
  translate = (t) => translate(t, 'schedule', this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>
        <Head>
          <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
          <meta name="description" content={this.translate('seoDescription')}/>
          <meta name="keywords" content={this.translate('keywords')}/>
          <meta property="og:image" content={this.translate('ogImage')} />
          <meta property="og:type" content="website" />
        </Head>
        
        <section className="s-section target-section first">

          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h3 className="subhead">{this.translate('subhead')}</h3>
              <h1>
                {this.translate('section01.heading')}
                </h1>
            </div>
          </div> 
  
        <div className="row bit-narrow innerpage">
            <div className="block-tab-full">
              <img src={this.translate('section01.imgSrc')} style={{ display: "block", margin: "0 auto" }} alt="schedule" />
            </div>
          </div>

        </section>
    
    <section className="s-section last">

          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h1>
                {this.translate('section02.heading')}
                </h1>
            </div>
          </div>
  
        <div className="row bit-narrow innerpage">
            <div className="block-1-2 block-tab-full" dangerouslySetInnerHTML={{__html: this.translate('section02.contentHTML')}}/>
          </div>
  
    </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    