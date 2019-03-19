import React from 'react';
import styled from 'styled-components';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';

import { translate } from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';

import Head from 'next/head';

import classNames from 'classnames';

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

function getInfo(info) {
  if (info !== undefined) {
    return (
      <div>
        <h4 className="item-title" id="CommunitiesContactInfo">
          <span className={classNames("flag-icon", info.flag)}></span>
          {info.country}
        </h4>
        <p className="rep">
          <a href={info.facebookUrl} target="_blank">{info.facebook}</a>
          {info.telegramUrl.length > 0 && (<span> • <a href={info.telegramUrl} target="_blank">{info.telegram} </a> </span>)}
        </p>
      </div>);
  }
}

export default class extends React.Component {
  state = { communitiesInfo: [] }
  static async getInitialProps({ query }) {
    return { query }
  }

  translate = (t) => translate(t, 'contact', this.props.query.locale);


  componentWillMount() {
    let communitiesInfo = [];
    this.translate('officialCommunitiesInfo').forEach((info, index) => {
      if (index % 2 === 0) {
        communitiesInfo.push([this.translate('officialCommunitiesInfo')[index], this.translate('officialCommunitiesInfo')[index + 1]]);
      }
    });
    console.log(communitiesInfo);
    this.setState({ communitiesInfo: communitiesInfo });
  }


  render() {
    const getOfficialCommunitiesInfo = this.state.communitiesInfo.map(
      function (info, index) {
        console.log(info, index);
        return (
          <div className="block-1-2 block-tab-full">
            <div className="col-block" key={index}>{getInfo(info[0])}</div>
            <div className="col-block" key={index + 1}>{getInfo(info[1])}</div>
          </div>
        )
      }
    );

    return (
      <ThisPageContainerComponent>
        <Head>
          <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
          <meta name="description" content={this.translate('seoDescription')} />
          <meta name="keywords" content={this.translate('keywords')} />
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
            <div className="block-1-2 block-tab-full">
              <div className="col-block">
                <div className="item-process__text">
                  <h3>{this.translate('mailingAddressTitle')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: this.translate('mailingAddressHTML') }} />
                </div>
              </div>
              <div className="col-block">
                <div className="item-process__text">
                  <h3>{this.translate('emailAddressTitle')}</h3>
                  <p>
                    {this.translate('generalEnquiriesLabel')}<br />
                    <a href={`mailto:${this.translate('generalEnquiriesEmail')}`}>{this.translate('generalEnquiriesEmail')}</a>
                  </p>
                  <p>
                    {this.translate('sponsorshipLabel')}<br />
                    <a href={`mailto:${this.translate('sponsorshipEmail')}`}>{this.translate('sponsorshipEmail')}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="s-section target-section last">
          <div className="row">
            <div className="col-block">
              <h3>{this.translate('officialCommunitiesTitle')}</h3>
              {getOfficialCommunitiesInfo}
            </div>
          </div>
        </section>
      </ThisPageContainerComponent>
    )
  }
}
