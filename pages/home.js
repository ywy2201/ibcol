import React from 'react';
import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';

import translate from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';

import Head from 'next/head';

import jQuery from 'jquery';

const $ = jQuery;

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
  
  translate = (t) => translate(t, 'home', this.props.query.locale);


  componentDidMount = () => {
    /*!
    * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
    * @copyright 2016 PixelCog, Inc.
    * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
    */
    !function(t,i,e,s){function o(i,e){var h=this;"object"==typeof e&&(delete e.refresh,delete e.render,t.extend(this,e)),this.$element=t(i),!this.imageSrc&&this.$element.is("img")&&(this.imageSrc=this.$element.attr("src"));var r=(this.position+"").toLowerCase().match(/\S+/g)||[];if(r.length<1&&r.push("center"),1==r.length&&r.push(r[0]),("top"==r[0]||"bottom"==r[0]||"left"==r[1]||"right"==r[1])&&(r=[r[1],r[0]]),this.positionX!=s&&(r[0]=this.positionX.toLowerCase()),this.positionY!=s&&(r[1]=this.positionY.toLowerCase()),h.positionX=r[0],h.positionY=r[1],"left"!=this.positionX&&"right"!=this.positionX&&(this.positionX=isNaN(parseInt(this.positionX))?"center":parseInt(this.positionX)),"top"!=this.positionY&&"bottom"!=this.positionY&&(this.positionY=isNaN(parseInt(this.positionY))?"center":parseInt(this.positionY)),this.position=this.positionX+(isNaN(this.positionX)?"":"px")+" "+this.positionY+(isNaN(this.positionY)?"":"px"),navigator.userAgent.match(/(iPod|iPhone|iPad)/))return this.imageSrc&&this.iosFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;if(navigator.userAgent.match(/(Android)/))return this.imageSrc&&this.androidFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;this.$mirror=t("<div />").prependTo("body");var a=this.$element.find(">.parallax-slider"),n=!1;0==a.length?this.$slider=t("<img />").prependTo(this.$mirror):(this.$slider=a.prependTo(this.$mirror),n=!0),this.$mirror.addClass("parallax-mirror").css({visibility:"hidden",zIndex:this.zIndex,position:"fixed",top:0,left:0,overflow:"hidden"}),this.$slider.addClass("parallax-slider").one("load",function(){h.naturalHeight&&h.naturalWidth||(h.naturalHeight=this.naturalHeight||this.height||1,h.naturalWidth=this.naturalWidth||this.width||1),h.aspectRatio=h.naturalWidth/h.naturalHeight,o.isSetup||o.setup(),o.sliders.push(h),o.isFresh=!1,o.requestRender()}),n||(this.$slider[0].src=this.imageSrc),(this.naturalHeight&&this.naturalWidth||this.$slider[0].complete||a.length>0)&&this.$slider.trigger("load")}function h(s){return this.each(function(){var h=t(this),r="object"==typeof s&&s;this==i||this==e||h.is("body")?o.configure(r):h.data("px.parallax")?"object"==typeof s&&t.extend(h.data("px.parallax"),r):(r=t.extend({},h.data(),r),h.data("px.parallax",new o(this,r))),"string"==typeof s&&("destroy"==s?o.destroy(this):o[s]())})}!function(){for(var t=0,e=["ms","moz","webkit","o"],s=0;s<e.length&&!i.requestAnimationFrame;++s)i.requestAnimationFrame=i[e[s]+"RequestAnimationFrame"],i.cancelAnimationFrame=i[e[s]+"CancelAnimationFrame"]||i[e[s]+"CancelRequestAnimationFrame"];i.requestAnimationFrame||(i.requestAnimationFrame=function(e){var s=(new Date).getTime(),o=Math.max(0,16-(s-t)),h=i.setTimeout(function(){e(s+o)},o);return t=s+o,h}),i.cancelAnimationFrame||(i.cancelAnimationFrame=function(t){clearTimeout(t)})}(),t.extend(o.prototype,{speed:.2,bleed:0,zIndex:-100,iosFix:!0,androidFix:!0,position:"center",overScrollFix:!1,refresh:function(){this.boxWidth=this.$element.outerWidth(),this.boxHeight=this.$element.outerHeight()+2*this.bleed,this.boxOffsetTop=this.$element.offset().top-this.bleed,this.boxOffsetLeft=this.$element.offset().left,this.boxOffsetBottom=this.boxOffsetTop+this.boxHeight;var t=o.winHeight,i=o.docHeight,e=Math.min(this.boxOffsetTop,i-t),s=Math.max(this.boxOffsetTop+this.boxHeight-t,0),h=this.boxHeight+(e-s)*(1-this.speed)|0,r=(this.boxOffsetTop-e)*(1-this.speed)|0;if(h*this.aspectRatio>=this.boxWidth){this.imageWidth=h*this.aspectRatio|0,this.imageHeight=h,this.offsetBaseTop=r;var a=this.imageWidth-this.boxWidth;this.offsetLeft="left"==this.positionX?0:"right"==this.positionX?-a:isNaN(this.positionX)?-a/2|0:Math.max(this.positionX,-a)}else{this.imageWidth=this.boxWidth,this.imageHeight=this.boxWidth/this.aspectRatio|0,this.offsetLeft=0;var a=this.imageHeight-h;this.offsetBaseTop="top"==this.positionY?r:"bottom"==this.positionY?r-a:isNaN(this.positionY)?r-a/2|0:r+Math.max(this.positionY,-a)}},render:function(){var t=o.scrollTop,i=o.scrollLeft,e=this.overScrollFix?o.overScroll:0,s=t+o.winHeight;this.boxOffsetBottom>t&&this.boxOffsetTop<=s?(this.visibility="visible",this.mirrorTop=this.boxOffsetTop-t,this.mirrorLeft=this.boxOffsetLeft-i,this.offsetTop=this.offsetBaseTop-this.mirrorTop*(1-this.speed)):this.visibility="hidden",this.$mirror.css({transform:"translate3d(0px, 0px, 0px)",visibility:this.visibility,top:this.mirrorTop-e,left:this.mirrorLeft,height:this.boxHeight,width:this.boxWidth}),this.$slider.css({transform:"translate3d(0px, 0px, 0px)",position:"absolute",top:this.offsetTop,left:this.offsetLeft,height:this.imageHeight,width:this.imageWidth,maxWidth:"none"})}}),t.extend(o,{scrollTop:0,scrollLeft:0,winHeight:0,winWidth:0,docHeight:1<<30,docWidth:1<<30,sliders:[],isReady:!1,isFresh:!1,isBusy:!1,setup:function(){if(!this.isReady){var s=t(e),h=t(i),r=function(){o.winHeight=h.height(),o.winWidth=h.width(),o.docHeight=s.height(),o.docWidth=s.width()},a=function(){var t=h.scrollTop(),i=o.docHeight-o.winHeight,e=o.docWidth-o.winWidth;o.scrollTop=Math.max(0,Math.min(i,t)),o.scrollLeft=Math.max(0,Math.min(e,h.scrollLeft())),o.overScroll=Math.max(t-i,Math.min(t,0))};h.on("resize.px.parallax load.px.parallax",function(){r(),o.isFresh=!1,o.requestRender()}).on("scroll.px.parallax load.px.parallax",function(){a(),o.requestRender()}),r(),a(),this.isReady=!0}},configure:function(i){"object"==typeof i&&(delete i.refresh,delete i.render,t.extend(this.prototype,i))},refresh:function(){t.each(this.sliders,function(){this.refresh()}),this.isFresh=!0},render:function(){this.isFresh||this.refresh(),t.each(this.sliders,function(){this.render()})},requestRender:function(){var t=this;this.isBusy||(this.isBusy=!0,i.requestAnimationFrame(function(){t.render(),t.isBusy=!1}))},destroy:function(e){var s,h=t(e).data("px.parallax");for(h.$mirror.remove(),s=0;s<this.sliders.length;s+=1)this.sliders[s]==h&&this.sliders.splice(s,1);t(e).data("px.parallax",!1),0===this.sliders.length&&(t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"),this.isReady=!1,o.isSetup=!1)}});var r=t.fn.parallax;t.fn.parallax=h,t.fn.parallax.Constructor=o,t.fn.parallax.noConflict=function(){return t.fn.parallax=r,this},t(function(){t('[data-parallax="scroll"]').parallax()})}(jQuery,window,document);


    
  }

  componentWillUnmount = () => {
    $('.parallax-mirror').remove();
  }
  
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

        


        <section id="home" className="s-home page-hero target-section" data-parallax="scroll" data-image-src="/static/images/bg-international-blockchain-olympiad-(ibcol).jpg" data-natural-width="3000" data-natural-height="2000" data-position-y="center">

          <div className="grid-overlay">
              <div></div>
          </div>

          <div className="home-content">

            <div className="row home-content__main">

              <h1>
                {this.translate('mainHeading')}
              </h1>

              <h3>
                {this.translate('subHeading')}
              </h3>

              <div className="home-content__button">
                <Link prefetch route="registration" params={{ locale }}>
                  <a className="btn btn--primary btn--large">
                    {this.translate('register')}
                  </a>
                </Link>
                <Link prefetch href="#timeline" params={{ locale }}>
                  <a className="btn btn--large">
                    {this.translate('competitionRules')}
                  </a>
                </Link>
              </div>

            </div>

            {/* <div className="home-content__scroll">
              <Link prefetch route="home" params={{ locale }} hash="about">
                <a className="scroll-link smoothscroll">
                  {this.translate('scroll')}
                </a>
              </Link>
            </div> */}

          </div>
        </section>
        

        <section id="intro" className="s-section target-section">
          <div className="row">
              <div className="block-1-2 block-tab-full">
                  <div className="col-block no-results">
                      <div className="item-process__text">
                          <h1>{this.translate('introSection.leftBlock.title')}</h1>
                          <ol dangerouslySetInnerHTML={{__html: this.translate('introSection.leftBlock.infoList') }}/>
                      </div>
                  </div>
                  <div className="col-block get-results">
                      <div className="item-process__text">
                          <h1>{this.translate('introSection.rightBlock.title')}</h1>
                          <ol dangerouslySetInnerHTML={{__html: this.translate('introSection.rightBlock.infoList') }}/>
                      </div>
                  </div>
              </div>
          </div>
        </section>

        <section id="timeline" className="s-section target-section">
        <div className="row">
            <h1>{this.translate('timelineSection.heading')}</h1>
            <div className="about-process">
                <div className="block-1-6 block-tab-full icon timeline">
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="material-icons yellow">schedule</i>
                            <h4 className="item-title">{this.translate('timelineSection.block1.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('timelineSection.block1.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="material-icons green">description</i>
                            <h4 className="item-title">{this.translate('timelineSection.block2.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('timelineSection.block2.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="material-icons black">chat</i>
                            <h4 className="item-title">{this.translate('timelineSection.block3.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('timelineSection.block3.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="material-icons purple">devices_other</i>
                            <h4 className="item-title">{this.translate('timelineSection.block4.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('timelineSection.block4.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="material-icons orange">assessment</i>
                            <h4 className="item-title">{this.translate('timelineSection.block5.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('timelineSection.block5.details')}}/>
                            <span className="time-line"></span>
                        </div>
                    </div>
                    <div className="col-block item-process">
                        <div className="item-process__text">
                            <i className="material-icons red">loop</i>
                            <h4 className="item-title">{this.translate('timelineSection.block6.title')}</h4>
                            <p dangerouslySetInnerHTML={{__html: this.translate('timelineSection.block6.details')}}/>
                        </div>
                    </div>            
                </div>
            </div>
          </div>
        </section>




        




    <section className="s-section target-section">

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



    <section className="s-section target-section" style={{"paddingBottom": "16rem"}}>

        
        <div className="row">

            <div className="col-block">
                <h1>{this.translate('section01.languageTitle')}</h1>
            </div>

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
        
        
      </ThisPageContainerComponent>
    )
  }
}
    