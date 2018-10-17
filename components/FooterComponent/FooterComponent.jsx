import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from '/routes';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';

import NavLinkComponent from 'components/NavLinkComponent';
import MailChimpComponent from 'components/MailChimpComponent';

import LocaleSwitcherComponent from 'components/LocaleSwitcherComponent';

import styled from 'styled-components';
import { transparentize } from 'polished'


import translate from 'helpers/translate.js';



const pagePadding = {
  xSmall: style.dimension.normal.pagePadding.xSmall,
  small: style.dimension.normal.pagePadding.small,
  medium: style.dimension.normal.pagePadding.medium,
  large: style.dimension.normal.pagePadding.large,
  xLarge: style.dimension.normal.pagePadding.xLarge,
  xxLarge: style.dimension.normal.pagePadding.xxLarge
}






const Footer = styled.footer`
  
  
  background: ${style.color.darkBlue};
  width: 100%;


  color: ${style.color.trueWhite};

  box-sizing: border-box;
  ${media.smallDown`
    padding: 2rem ${pagePadding.small} 2rem;
  `}
  ${media.mediumDown`
    padding: 2rem ${pagePadding.medium} 2rem;
  `}
  ${media.largeUp`
    padding: 2rem ${pagePadding.large} 2rem;
  `}
  ${media.xLargeUp`
    padding: 2rem ${pagePadding.xLarge} 2rem;
  `}
  ${media.xxLargeUp`
    padding: 2rem ${pagePadding.xxLarge} 2rem;
  `}

  
  
  .mainFooterMenu {
    display: block;
    margin: 0;
    padding: 0;

    li {
      display: block;
      margin: 0;
      padding: 0;

      margin-bottom: 1rem;

      a {
        color: ${style.color.trueWhite};
        text-decoration: none;

        font-weight: bold;
      }
    }
  }


  .footerLogoContainer {
    display: flex;
    justify-content: flex-end;
    a {
      display: inline;
      margin: 0;
      padding: 0;

      img {
        max-width: 350px;
        
      }
    }
    
  }


  .finalRow {
    border-top: 1px solid ${style.color.trueWhite};
    font-size: 0.85rem;
    


    .secondaryFooterMenu {
      margin: 0;
      padding: 0.5rem 0 0.4rem;
      display: flex;

      li {
        margin: 0;
        padding: 0;
        display: block;

        line-height: 0.8rem;
        &:not(:last-child) {
          border-right: 1px solid ${style.color.trueWhite};
          margin-right: 0.8rem;
          padding-right: 0.8rem;
        }
          

        

        a {
          color: ${style.color.trueWhite};
          text-decoration: none;
        }
      }
      
    }

  }


`;






class FooterComponent extends React.Component {


  

  translate = (t) => translate(t, this.props.locale);

  render() {
    // const componentName = "FooterComponent";


    const locale = this.props.locale;


    console.log('locale', locale);


    return (
      <Footer>
        <div className="footerContainer">
          
          <div>
            <ul className="mainFooterMenu">
              <li>
                <Link prefetch route="company" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Company',
                        'zh-hk': 'Company',
                      })
                    }
                  </a>
                </Link>
              </li>
              <li>
                <Link prefetch route="index" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Products',
                        'zh-hk': 'Products',
                      })
                    }
                  </a>
                </Link>
              </li>
              <li>
                <Link prefetch route="index" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Contact Us',
                        'zh-hk': 'Contact Us',
                      })
                    }
                  </a>
                </Link>
              </li>
            </ul>

            <div className="footerLogoContainer">
                <Link prefetch route="index" params={{ locale }}>
                  <a><img src="/static/images/logo_alt.png" alt={this.translate(configs.siteTitle)} /></a>
                </Link>
            </div>
          </div>

          <div className="finalRow">
            
            <ul className="secondaryFooterMenu">
              <li>
                <Link prefetch route="index" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Disclaimer',
                        'zh-hk': 'Company',
                      })
                    }
                  </a>
                </Link>
              </li>
              <li>
                <Link prefetch route="index" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Privacy Statement',
                        'zh-hk': 'Products',
                      })
                    }
                  </a>
                </Link>
              </li>
              <li>
                <Link prefetch route="index" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Copyright',
                        'zh-hk': 'Contact Us',
                      })
                    }
                  </a>
                </Link>
              </li>
              <li>
                <Link prefetch route="index" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Sitemap',
                        'zh-hk': 'Contact Us',
                      })
                    }
                  </a>
                </Link>
              </li>
              <li>
                <Link prefetch route="index" params={{ locale }}>
                  <a>
                    {
                      this.translate({
                        'en-gb': 'Contact Us',
                        'zh-hk': 'Contact Us',
                      })
                    }
                  </a>
                </Link>
              </li>
            </ul>
            
            <div className="copyright" dangerouslySetInnerHTML={{
              __html: 
                this.translate({
                  'en-gb': 'COPYRIGHT &copy; 2018 ica pro LIMITED. ALL RIGHTS RESERVED.',
                  'zh-hk': 'COPYRIGHT &copy; 2018 ica pro LIMITED. ALL RIGHTS RESERVED.',
                })
              }}/>
          </div>
        
          {/* <div className="footerRow">
            <div className="footerMailChimp">
              <header>Don't miss any news</header>
              <MailChimpComponent colormode="darkBlueInverted" />
            </div>
            <div className="footerLanguageSelector"><header>Language</header>
              <LocaleSwitcherComponent type="desktop-footer" locale={this.props.locale}/>
            
            </div>
            <div className="footerSocialListing">
              <header>Keep in touch</header>
              <SocialContactUL>
                <li><a href="https://gitter.im/exchangeunion/Lobby?source=orgpage" target="_blank">
                  <img src="/static/images/social_icon_gitter.png" />
                </a></li>
                <li><a href="https://t.me/exchangeunion" target="_blank">
                  <img src="/static/images/social_icon_telegram.png" />
                </a></li>
                <li><a href="https://angel.co/exchange-union" target="_blank">
                  <img src="/static/images/social_icon_angel_list.png" />
                </a></li>
                <li><a href="https://twitter.com/exchange_union" target="_blank">
                  <img src="/static/images/social_icon_twitter.png" />
                </a></li>
                <li><a href="https://www.youtube.com/channel/UCCY2iSMy_Pjo_4XvXdxNeHg" target="_blank">
                  <img src="/static/images/social_icon_youtube.png" />
                </a></li>
                <li><a href={`/${locale}/wechat`} target="_blank">
                  <img src="/static/images/social_icon_wechat.png" />
                </a></li>
              </SocialContactUL>
            </div>
            <div className="footerMenu">
              <header>More</header>
              <FooterMenuUL>

                <li>
                  <NavLinkComponent prefetch route="faq" params={{ locale }}>FAQ</NavLinkComponent>
                </li>
                <li>
                  <NavLinkComponent prefetch route="terms" params={{ locale }}>Terms</NavLinkComponent>
                </li>
                <li>
                  <NavLinkComponent prefetch route="privacy" params={{ locale }}>Privacy</NavLinkComponent>
                </li>

                <li>
                  <NavLinkComponent prefetch route="contact" params={{ locale }}>Contact</NavLinkComponent>
                </li>





              </FooterMenuUL>

            </div>
          </div>

          <div className="footerRow">
            <div className="footer-remarks">
              &copy; 2018 Exchange Union<br />
              Created with♥︎from people all over planet earth. <a href="https://digital-business-lab.com/" target="_blank">Powered by Digital Business Lab</a>.
                </div>
          </div> */}



        </div>

      </Footer>
    );
  }
}


FooterComponent.propTypes = {
  locale: PropTypes.string,
  type: PropTypes.string
}

FooterComponent.defaultProps = {
  locale: configs.locales[0].id,
  type: 'desktop'
}


export default FooterComponent;