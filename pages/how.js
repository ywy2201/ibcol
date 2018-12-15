import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { media, style } from 'helpers/styledComponents.js';

import translate from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';

import Head from 'next/head';
import configs from 'configs';

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

            <div className="row section-header">

                <div className="col-block">
                    <h4 className="subhead">{this.translate('subhead')}</h4>
                </div>
            </div>


            <div className="row innerpage no-bottom">
            <div className="block-tab-full">
                <div className="col-block">
                    <h1>{this.translate('whenToJoinHeading')}</h1>
                </div>
                <div className="col-block" style={{"width": "100%"}}>
                    <div className="table-responsive">
                        <table><tbody>
                            <tr>
                                <td className="minw"></td>
                                <td className="minw"><b>{this.translate('plans.superEarlyBird.name')}</b></td>
                                <td className="minw"><b>{this.translate('plans.earlyBird.name')}</b></td>
                                <td className="minw"><b>{this.translate('plans.regular.name')}</b></td>
                            </tr>
                            <tr>
                                <td>{this.translate('plans.fromLabel')}</td>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.superEarlyBird.fromDate')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.earlyBird.fromDate')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.regular.fromDate')}}/>
                            </tr>
                            <tr>
                                <td>{this.translate('plans.toLabel')}</td>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.superEarlyBird.toDate')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.earlyBird.toDate')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.regular.toDate')}}/>
                            </tr>
                            <tr>
                                <td>{this.translate('plans.feeLabel')}</td>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.superEarlyBird.fee')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.earlyBird.fee')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.regular.fee')}}/>
                            </tr>
                            <tr>
                                <td>{this.translate('plans.financialAssistanceLabel')}</td>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.superEarlyBird.financialAssistanceDetails')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.earlyBird.financialAssistanceDetails')}}/>
                                <td dangerouslySetInnerHTML={{__html:this.translate('plans.regular.financialAssistanceDetails')}}/>
                            </tr>
                        </tbody></table>
                        <p className="show-mobile">{this.translate('plans.viewMoreLabel')}<br/><i className="material-icons">arrow_right_alt</i></p>
                    </div>
                </div>
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
    <section className="s-section target-section" style={{"paddingBottom": "16rem"}}>

        <div className="row innerpage">
            <div className="block-tab-full">
                <div className="col-block">
                    <h1>{this.translate('feeScheduleHeading')}</h1>
                </div>
                <div className="col-block" style={{"width": "100%"}}>
                    <div className="table-responsive">
                        <table><tbody>
                            <tr>
                                <td className="minw"></td>
                                <td className="minw"><b>{this.translate('plans.superEarlyBird.name')}</b></td>
                                <td className="minw"><b>{this.translate('plans.earlyBird.name')}</b></td>
                                <td className="minw"><b>{this.translate('plans.regular.name')}</b></td>
                            </tr>
                            <tr>
                                <td>{this.translate('plans.secondaryLabel')}</td>
                                <td>{this.translate('plans.superEarlyBird.feeSchedule.secondary')}</td>
                                <td>{this.translate('plans.earlyBird.feeSchedule.secondary')}</td>
                                <td>{this.translate('plans.regular.feeSchedule.secondary')}</td>
                            </tr>
                            <tr>
                                <td>{this.translate('plans.postSecondaryLabel')}</td>
                                <td>{this.translate('plans.superEarlyBird.feeSchedule.postSecondary')}</td>
                                <td>{this.translate('plans.earlyBird.feeSchedule.postSecondary')}</td>
                                <td>{this.translate('plans.regular.feeSchedule.postSecondary')}</td>
                            </tr>
                            <tr>
                                <td>{this.translate('plans.additionalCategoryLabel')}</td>
                                <td>{this.translate('plans.superEarlyBird.feeSchedule.additionalCategory')}</td>
                                <td>{this.translate('plans.earlyBird.feeSchedule.additionalCategory')}</td>
                                <td>{this.translate('plans.regular.feeSchedule.additionalCategory')}</td>
                            </tr>
                        </tbody></table>
                    </div>
                    <p className="show-mobile">{this.translate('plans.viewMoreLabel')}<br/><i className="material-icons">arrow_right_alt</i></p>
                    <p style={{color: "red"}}>{this.translate('plans.specialNotice')}</p>
                </div>
            </div>


            <div className="block-tab-full">
                <div className="col-block" style={{"width": "100%"}}>
                    <Link prefetch route="registration" params={{ locale }}>
                        <a className="btn btn--large btn--primary" style={{"margin": "3rem auto", "display": "block", "width": "60%"}}>
                            {this.translate('applyNowCTALabel')}
                        </a>
                    </Link>
                </div>
            </div>



            
        </div>
    </section>



    
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    