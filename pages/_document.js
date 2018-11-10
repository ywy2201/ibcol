import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { style } from 'helpers/styledComponents.js';


export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  
  
  render() {  
    

    return (
      <html>
        <Head>


          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/static/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/static/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/static/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicons/apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="/static/favicons/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/static/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/static/favicons/favicon-128.png" sizes="128x128" />
          <meta name="application-name" content="&nbsp;"/>
          <meta name="msapplication-TileImage" content="/static/favicons/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/static/favicons/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/static/favicons/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/static/favicons/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/static/favicons/mstile-310x310.png" />

          
          <meta name="msapplication-TileColor" content={style.color.trueWhite}/>
          {/* <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/> */}
          <meta name="theme-color" content={style.color.trueWhite}/>

          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>


          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Nunito+Sans:300,400,400i,600,600i,700,700i" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
          
          {this.props.styleTags}

          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <script src="/static/js/modernizr.js"></script>


        </Head>
        <body id="top">
          <Main/>
          <NextScript />


          <script src="/static/js/jquery-3.2.1.min.js"></script>
          {/* <script src="/static/js/plugins.js"></script> */}
          <script src="/static/js/main.js"></script>
        </body>
      </html>
    )
  }
}