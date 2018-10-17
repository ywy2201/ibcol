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
  
    translate = (t) => translate(t, 'corporate-relations', this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>
            <Head>
                <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
            </Head>
        
            <section className="s-section target-section first last">

                <div className="row section-header bit-narrow">
                    <div className="col-full">
                        <h3 className="subhead">{this.translate('subhead')}</h3>
                        <h1>
                            {this.translate('section01.heading')}
                </h1>
                    </div>
                </div> 
        
        <div className="row bit-narrow innerpage">
                    <div className="col-full">
                        <p className="lead">
                            {this.translate('section01.lead')}
                </p>
                    </div>
                </div> 
        
        <div className="row corporate-logo bit-narrow">
                    <div className="block-1-2 block-tab-full" dangerouslySetInnerHTML={{__html: this.translate('section01.partnersHTML')}}/>
                </div>

            </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    