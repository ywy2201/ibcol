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
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>

        
        <section id="general" className="s-section target-section first last">

          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h3 className="subhead">Contact Us</h3>
              <h1>
                General Info / Enquiries
                </h1>
            </div>
          </div>
  
          <div className="row bit-narrow">

              <div className="block-1-1 block-tab-full">
                <div className="col-block sr-pack yellow">
                  <div className="item-process__text">
                    <h3>E-mail Address</h3>
                    <a className="btn btn--stroke full-width" href="mailto:info@ibcol.org" target="_blank">info@ibcol.org</a>
                  </div>
                </div>
              </div> 
          </div>
        </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    