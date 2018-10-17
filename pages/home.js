import React from 'react';
import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';

import translate from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';




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
  
  translate = (t) => translate(t, this.props.query.locale);


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
        <section id="home" className="s-home page-hero target-section" data-parallax="scroll" data-image-src="/static/images/hero-bg-2.jpg" data-natural-width="3000" data-natural-height="2000" data-position-y="center">

          <div className="grid-overlay">
              <div></div>
          </div>

          <div className="home-content">

            <div className="row home-content__main">

              <h1>
                  International Blockchain Olympiad
              </h1>

              <h3>
                  Global Blockchain Application Build Challenge
              </h3>

              <div className="home-content__button">
                <Link prefetch route="contact" params={{ locale }}>
                  <a className="btn btn--primary btn--large">
                    Contact
                  </a>
                </Link>
                <Link prefetch route="criteria" params={{ locale }}>
                  <a className="btn btn--large">
                      Competition Rules
                  </a>
                </Link>
              </div>

            </div>

            <div className="home-content__scroll">
              <Link prefetch route="home" params={{ locale }} hash="about">
                <a className="scroll-link smoothscroll">
                    Scroll
                </a>
              </Link>
            </div>

          </div>
        </section>
        



        <section id="about" className="s-about target-section">

          <div className="row bit-narrow" style={{marginBottom:"60px"}}>
            <h1>What is it?</h1>
            <p>
            The inaugural edition of the IBCOL is a two-day competition and exposition of blockchain and distributed ledger applications in Hong Kong. It provides an exceptional opportunity for students to learn and grow with their peers through solving real-world problems with cutting-edge technology and carving out a legacy in a nascent industry.
            </p>
            <p>
            IBCOL 2019 is hosted by the Hong Kong Blockchain Society (HKBCS), which ran the predecessor of the IBCOL at the City University of Hong Kong in 2018: DappCamp International Student Blockchain Competition.
            </p>
          </div>

          <div className="row section-header bit-narrow" style={{marginBottom:"60px"}}>
            <h1>When to Join</h1>
            <div className="table-responsive">
              <table>
                <tbody>
                  <tr>
                    <td></td>
                    <td><b>Super Early Bird</b></td>
                    <td><b>Early Bird</b></td>
                    <td><b>Regular</b></td>
                  </tr>
                  <tr>
                    <td>From</td>
                    <td>Monday<br/>3 September 2018<br/>00:00 HKT</td>
                    <td>Saturday<br/>2 February 2019<br/>00:00 HKT</td>
                    <td>Tuesday<br/>2 April 2019<br/>00:00 HKT</td>
                  </tr>
                  <tr>
                    <td>Unitl</td>
                    <td>Friday<br/>1 February 2019<br/>23:59 HKT</td>
                    <td>Monday<br/>1 April 2019<br/>23:59 HKT</td>
                    <td>Sunday<br/>21 April 2019<br/>23:59 HKT</td>
                  </tr>
                  <tr>
                    <td>Registration</td>
                    <td>Fee is waived</td>
                    <td>Fee is waived</td>
                    <td>Fee is required</td>
                  </tr>
                  <tr>
                    <td>Financial Assistance</td>
                    <td>Eligible for travel subsidies</td>
                    <td>Ineligible for travel subsidies</td>
                    <td>Ineligible for travel subsidies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

            <div className="row bit-narrow" style={{marginBottom:"60px"}}>
                <h1>How To Join</h1>
                <div className="about-process process">
                    <div className="block-1-3 block-tab-full">
                        <div className="col-block item-process blue">
                            <div className="item-process__text">
                                <h4 className="item-title">Team</h4>
                                <p>
                                    Up to 6 <b>students</b> can register into one <b>team</b>
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process yellow">
                            <div className="item-process__text">
                                <h4 className="item-title">Project</h4>
                                <p>
                                    A team can submit more than one <b>project</b>
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process green">
                            <div className="item-process__text">
                                <h4 className="item-title">Category</h4>
                                <p>
                                    Each project is entered into a <b>category</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
        
        
      </ThisPageContainerComponent>
    )
  }
}
    