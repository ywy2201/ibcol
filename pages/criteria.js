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
  
  translate = (t) => translate(t, 'criteria', this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>
        <Head>
            <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
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

            <div className="row bit-narrow">
                <div className="about-process process">
                    <div className="block-1-4 block-tab-full" dangerouslySetInnerHTML={{__html: this.translate('section01.contentHTML01')}}/>
              <div className="block-tab-full" style={{ marginTop: "6rem" }}>
                            <div className="col-block" dangerouslySetInnerHTML={{ __html: this.translate('section01.contentHTML02')}}/>
                    </div>
                </div>
            </div>

    </section>

    <section className="s-section target-section">

            <div className="row section-header bit-narrow">
                <div className="col-full">
                    <h1>{this.translate('section02.heading')}</h1>
                </div>
            </div>

            <div className="row bit-narrow">

                <div className="about-process process">
                    <div className="block-1-3 block-tab-full" dangerouslySetInnerHTML={{__html: this.translate('section02.contentHTML')}}/>
                </div>
            </div>

        </section>

        <section className="s-section target-section">
        
            <div className="row section-header bit-narrow">
                <div className="col-full">
                    <h1>
                        {this.translate('section03.heading')}
                    </h1>
                </div>
            </div>
             <div className="row bit-narrow innerpage no-bottom">
                <div className="col-twelve">    
                    <div className="table-responsive" dangerouslySetInnerHTML={{__html: this.translate('section03.contentTableHTML')}}/>
                    </div>
                </div>
        </section>


        <section className="s-section last target-section">
            
            <div className="row section-header bit-narrow">
                <div className="block-tab-full">
                    <div className="col-twelve">
                        <h1>
                            {this.translate('section04.heading')}
                        </h1>
                    </div>
                </div>
                <div className="block-tab-full">
                    <div className="col-block" dangerouslySetInnerHTML={{ __html: this.translate('section04.contentHTML01') }}/>
                </div>
            </div>

            <div className="row bit-narrow">
                <div className="about-process process">
                    <div className="block-1-4 block-tab-full" dangerouslySetInnerHTML={{ __html: this.translate('section04.contentHTML02') }}/>
                </div>
            </div> 

        </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    