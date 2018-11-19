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
  
  translate = (t) => translate(t, 'contact', this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>
        <Head>
          <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
        </Head>
        
        <section className="s-section target-section first last">

          <div className="row section-header">
            <div className="col-full">
              <h3 className="subhead">{this.translate('subhead')}</h3>
            </div>
          </div>
  
          <div className="row">

            <div className="block-1-2 block-tab-full">
                <div className="col-block">
                    <div className="item-process__text">
                        <h3>{this.translate('mailingAddressTitle')}</h3>
                        <p dangerouslySetInnerHTML={{__html: this.translate('mailingAddressHTML')}}/>
                    </div>
                </div>
                <div className="col-block">
                    <div className="item-process__text">
                        <h3>{this.translate('emailAddressTitle')}</h3>
                        <p>
                            {this.translate('generalEnquiriesLabel')}<br/>
                            <a href={`mailto:${this.translate('generalEnquiriesEmail')}`}>{this.translate('generalEnquiriesEmail')}</a>
                        </p>
                        <p>
                            {this.translate('sponsorshipLabel')}<br/>
                            <a href={`mailto:${this.translate('sponsorshipEmail')}`}>{this.translate('sponsorshipEmail')}</a>
                        </p>
                    </div>
                </div>
            </div> 
        
          </div>
        </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    