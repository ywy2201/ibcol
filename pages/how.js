import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { media, style } from 'helpers/styledComponents.js';

import configs from 'configs';

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
  
  translate = (t) => translate(t, 'how', this.props.query.locale, {"project-categories": true});
  
  render() {
    
    // console.log(">>> query", this.props.query);

    
    const locale = this.props.query.locale;

    const projectCategories = this.translate('projectCategories');
    const FaqSection = this.translate('faqSection').map(
      function (faq, index) {
        console.log(faq);
        return (
                <div id="faqList" key={index}>
                  <ul>
                      <li><font size="5"><b>{faq.question}</b></font></li>
                      <li><font size="4">{faq.answer}</font></li>
                  </ul>  
                </div>    
        );
      }
    );

    return (
      <ThisPageContainerComponent>
        <Head>
            <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
            <meta name="description" content={this.translate('seoDescription')}/>
            <meta name="keywords" content={this.translate('keywords')}/>
            <meta property="og:image" content={`${configs.url}${this.translate('ogImage')}`} />
            <meta property="og:type" content="website" />
        </Head>
        
        <section className="s-section first target-section">

            <div className="row section-header">

                <div className="col-block">
                    <h4 className="subhead">{this.translate('subhead')}</h4>
                </div>
            </div>

        </section>

        <section className="s-section target-section">
        <div className="row">
            <div className="col-block">
                <h1>{this.translate('eligibility')}</h1>
            </div>

            <div className="col-block">
                <font size="4"><b>{this.translate('eligibilityGeneral')}</b></font>
                <ul>
                    <li><font size="4">{this.translate('eligibilityCategory')}</font></li>
                    <li><font size="4">{this.translate('eligibilityTeam')}</font></li>
                </ul>
            </div>
        </div>
        
        </section>

    <section className="s-section target-section">
        <div className="row">
            <div className="col-block">
                <h1>{this.translate('howToJoinHeading')}</h1>
            </div>
            <div className="about-process">
                <div className="block-1-3 block-tab-full icon how">
                    <div className="col-block blue">
                        <div className="item-process__text">
                            <i className="material-icons blue">face</i>
                            <i className="material-icons yellow">face</i>
                            <i className="material-icons black">face</i>
                            <br/>
                            <i className="material-icons green">face</i>
                            <i className="material-icons red">face</i>
                            <i className="material-icons purple">face</i>
                            <h4 className="item-title">{this.translate('teamLabel')}</h4>
                            <p dangerouslySetInnerHTML={{__html:this.translate('teamExplained')}}/>
                        </div>
                    </div>
                    <div className="col-block yellow">
                        <div className="item-process__text">
                            <i className="material-icons blue">developer_mode</i>
                            <i className="material-icons yellow">widgets</i>
                            <i className="material-icons black">devices</i>
                            <br/>
                            <i className="material-icons green">storage</i>
                            <i className="material-icons red">dock</i>
                            <i className="material-icons purple">laptop_chromebook</i>
                            <h4 className="item-title">{this.translate('projectLabel')}</h4>
                            <p dangerouslySetInnerHTML={{__html:this.translate('projectExplained')}}/>
                        </div>
                    </div>
                    <div className="col-block green">
                        <div className="item-process__text">
                            <i className="material-icons blue">show_chart</i>
                            <i className="material-icons black">account_balance</i>
                            <i className="material-icons red">local_hospital</i>
                            <br/>
                            <i className="material-icons yellow">local_shipping</i>
                            <i className="material-icons green">color_lens</i>
                            <h4 className="item-title">{this.translate('categoryLabel')}</h4>
                            <p dangerouslySetInnerHTML={{__html:this.translate('categoryExplained')}}/>
                        </div>
                    </div>
                </div>
            </div> 

        </div>
    </section>
    <section className="s-section target-section">
        <div className="row">
            <div className="col-block">
                <h1>{this.translate('categoriesHeading')}</h1>
            </div>
            <div className="about-process icon">
                <div className="block-1-5 block-tab-full">
                    {
                        Object.keys(projectCategories).map((projectCategoryKey, index) => {
                              return <div className="col-block" key={projectCategoryKey}>
                                <div className="item-process__text">
                                    <i className={classNames("material-icons", projectCategories[projectCategoryKey].color)}>{projectCategories[projectCategoryKey].icon}</i>
                                    <h4 className="item-title">{projectCategories[projectCategoryKey].name}</h4>
                                    <p dangerouslySetInnerHTML={{__html: projectCategories[projectCategoryKey].description}}/>
                                </div>
                            </div>
                    
                    })
                    }
                    
                </div>
            </div>
        </div> 
    </section>
    
    <section className="s-section target-section">
        <div className="row">
            <div className="col-block">
                <h1>{this.translate('faqHeading')}</h1>
            </div>
            <div className="col-block" style={{"width": "100%"}}>
                {FaqSection}
            </div>
        </div>       
      </section>
             
      <section className="s-section target-section" style={{"paddingBottom": "16rem"}} >

            <div className="block-tab-full">
                <div className="col-block" style={{"width": "100%"}}>
                    <Link prefetch route="registration" params={{ locale }}>
                        <a className="btn btn--large btn--primary" style={{"margin": "3rem auto", "display": "block", "width": "60%"}}>
                            {this.translate('applyNowCTALabel')}
                        </a>
                    </Link>
                </div>
            </div>
    </section>
    </ThisPageContainerComponent>
    )
  }
}
    