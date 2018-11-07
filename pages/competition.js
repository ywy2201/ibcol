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
  
  translate = (t) => translate(t, 'competition', this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>
        <Head>
            <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
        </Head>
        
        <section className="s-section first target-section">

            <div className="row section-header">

                <div className="col-block">
                    <h4 className="subhead">{this.translate('subhead')}</h4>
                </div>
            </div>



            <div className="row">
                <div className="col-block">
                    <h1>{this.translate('section01.heading')}</h1>
                </div>
            <div className="about-process icon number competition timeline">
                <div className="block-1-5 block-tab-full">
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="blue">1</i>
                            <h4 className="item-title">{this.translate('section01.block01.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('section01.block01.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="yellow">2</i>
                            <h4 className="item-title">{this.translate('section01.block02.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('section01.block02.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="black">3</i>
                            <h4 className="item-title">{this.translate('section01.block03.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('section01.block03.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="green">4</i>
                            <h4 className="item-title">{this.translate('section01.block04.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('section01.block04.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="red">5</i>
                            <h4 className="item-title">{this.translate('section01.block05.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('section01.block05.details')}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">

            <div className="block-1-2 block-tab-full">
                <div className="col-block">
                    <p>
                        <b>{this.translate('section01.writtenLanguageLabel')}</b> <br/>
                        {this.translate('section01.writtenLanguages')}
                    </p>
                </div>
                <div className="col-block">
                    <p>
                        <b>{this.translate('section01.spokenLanguageLabel')}</b><br/>
                        {this.translate('section01.spokenLanguages')}
                    </p>
                </div>
            </div>       
        </div>

            

    </section>




    <section className="s-section target-section" style={{"paddingBottom": "16rem"}}>

        <div className="row">
            <div className="col-block">
                <h1>{this.translate('section02.heading')}</h1>
            </div>
            <div className="about-process icon number">
                <div className="block-1-3 block-tab-full">
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="gold">{this.translate('section02.awards.gold.quantity')}</i>
                            <h4 className="item-title">{this.translate('section02.awards.gold.title')}</h4>
                            <p>
                                {this.translate('section02.awards.gold.description')}
                            </p>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="silver">{this.translate('section02.awards.silver.quantity')}</i>
                            <h4 className="item-title">{this.translate('section02.awards.silver.title')}</h4>
                            <p>
                                {this.translate('section02.awards.silver.description')}
                            </p>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="bronze">{this.translate('section02.awards.bronze.quantity')}</i>
                            <h4 className="item-title">{this.translate('section02.awards.bronze.title')}</h4>
                            <p>
                                {this.translate('section02.awards.bronze.description')}
                            </p>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="blue">{this.translate('section02.awards.nominee.quantity')}</i>
                            <h4 className="item-title">{this.translate('section02.awards.nominee.title')}</h4>
                            <p>
                                {this.translate('section02.awards.nominee.description')}
                            </p>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="green">{this.translate('section02.awards.finalist.quantity')}</i>
                            <h4 className="item-title">{this.translate('section02.awards.finalist.title')}</h4>
                            <p>
                                {this.translate('section02.awards.finalist.description')}
                            </p>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="red">{this.translate('section02.awards.merit.quantity')}</i>
                            <h4 className="item-title">{this.translate('section02.awards.merit.title')}</h4>
                            <p>
                                {this.translate('section02.awards.merit.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div className="row">
            <div className="block-tab-full">
                <div className="col-block">
                    <p>
                        {this.translate('section02.awards.note')}
                    </p>
                </div>
            </div>  
        </div>
    </section>




    {/* <section className="s-section target-section">

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

        </section> */}
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    