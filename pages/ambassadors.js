import React from 'react';
import styled from 'styled-components';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';

import {translate} from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';

import Head from 'next/head';

import classNames from 'classnames';
import _ from 'lodash';

import translations from 'translations';

// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }





const ThisPageContainerComponent = styled(PageContainerComponent)`


  .rep{margin-left:3em;}
  .flag-icon {
    margin-right: 1rem;
  }


`;


export default class extends React.Component {
  static async getInitialProps({ query }) {
  
  return { query }
  }
  
translate = (t) => translate(t, 'ambassadors', this.props.query.locale);
  
  render() {
  
  // console.log(">>> query", this.props.query);


  const locale = this.props.query.locale;

  const schoolAmbassadors = this.translate('schoolAmbassadors');

//   console.log('schoolAmbassadors', schoolAmbassadors);
  
  return (
    <ThisPageContainerComponent>

    <Head>
      <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
      <meta name="description" content={this.translate('seoDescription')}/>
      <meta name="keywords" content={this.translate('keywords')}/>
      <meta property="og:image" content={`${configs.url}${this.translate('ogImage')}`} />
      <meta property="og:type" content="website" />
    </Head>
    
    <section className="s-section target-section first">

    <div className="row section-header">
      <div className="col-full">
        <h3 className="subhead">{this.translate('subhead')}</h3>
      </div>
    </div> 






    <div className="row">
        <div className="col-block">
            <h1>{this.translate('schoolAmbassadorsTitle')}</h1>
            <p>{this.translate('schoolAmbassadorsDescriptions')}<br/><a href="#apply">{this.translate('applyAmbassadorsLabel')}</a></p>
        </div>
    </div>
    <div className="row">
        <div className="block-tab-full">
            {
                _.sortBy(schoolAmbassadors, ['countryCode']).map((school, i)=>{
                
                    return <div key={i} className="col-block school">
                        <h4 className="item-title">
                            <span className={classNames("flag-icon", school.flag)}></span>
                            {school.title}
                        </h4>

                        {
                            school.ambassadors.map((ambassador, j)=>{
                                return <p className="rep" key={j}>
                                    {ambassador.name} (<a href={`mailto:${ambassador.email}`}>{ambassador.email}</a>)
                                </p>
                            })
                        }
                        
                        
                    </div>
                })
            }

        </div>
    </div> 


  </section> 




    <section className="s-section target-section">

        <div className="row">
            <div className="col-block" id="apply">
                <h1>{this.translate('schoolAmbassadorProgrammeTitle')}</h1>
            </div>
        
            <div className="block-tab-full">
                <div className="col-block">
                    <p dangerouslySetInnerHTML={{__html: this.translate('schoolAmbassadorProgrammeDescription')}}/>
                </div>
            </div>
            <div className="block-1-2 block-tab-full">
                <div className="col-block item-process">
                    <h3>{this.translate('responsibilitiesTitle')}</h3>
                    <ul> 
                        {
                            this.translate('responsibilities').map((responsibility, index) => <li key={index} dangerouslySetInnerHTML={{__html: responsibility}}/>
                            )
                        }
                    </ul>
                </div>
                <div className="col-block item-process">
                    <h3>{this.translate('perksTitle')}</h3>
                    <ul>
                        {
                            this.translate('perks').map((perk, index) => <li key={index} dangerouslySetInnerHTML={{__html: perk}}/>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="block-tab-full">
                <div className="col-block" style={{"width": "100%"}}>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSc2U64f1PK6YZy8mlFVM1MgH8sEPZw-jwNBaxKhvyzuNfeNTA/viewform" target="_blank" className="btn btn--primary btn--large" style={{"margin": "3rem auto", "display": "block", "width": "60%"}}>
                        {this.translate('applyNowButtonLabel')}
                    </a>
                </div>
            </div>
        </div>

    </section>



    <section className="s-section target-section" style={{"paddingBottom": "16rem"}}>

        <div className="row">
            <div className="col-block">
                <h1>{this.translate('financialAssistanceTitle')}</h1>
            </div>
        
            <div className="block-tab-full">
                <div className="col-block">
                    <p dangerouslySetInnerHTML={{__html: this.translate('financialAssistanceDescription')}}/>
                </div>
            </div>
            <div className="block-tab-full">
                <div className="col-block" style={{"width": "100%"}}>
                    <a className="btn btn--large no-click" style={{"margin": "3rem auto", "display": "block", "width": "60%"}}>
                        {this.translate('comingSoonButtonLabel')}
                    </a>
                </div>
            </div>
        </div>

    </section>


  {/* <section className="s-section">

    <div className="row section-header bit-narrow">
      <div className="col-full">
        <h1>
          {this.translate('section02.heading')}
        </h1>
      </div>
    </div>

    <div className="row bit-narrow innerpage">
      <div className="block-tab-full">
        <div className="col-block">
          <p>
            {this.translate('section02.content')}
          </p>
        </div>
      </div>
    </div> 

  </section>


  <section className="s-section last">
    <div className="row section-header bit-narrow">
      <div className="col-full">
        <h1>
          {this.translate('section03.heading')}
        </h1>
      </div>
    </div>

    <div className="row bit-narrow innerpage">
      <div className="block-tab-full">
        <div className="col-block">
          <p>
            {this.translate('section03.content')}
          </p>
        </div>
      </div>
    </div> 
  </section>  */}
    
    
    
    </ThisPageContainerComponent>
  )
  }
}
  