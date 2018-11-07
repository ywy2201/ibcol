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


          {/* <link rel="apple-touch-icon" sizes="57x57" href="/static/favicons/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/static/favicons/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/static/favicons/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/static/favicons/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/static/favicons/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/static/favicons/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/static/favicons/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/static/favicons/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicons/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png"/>
          <link rel="manifest" href="/static/favicons/manifest.json"/> */}
          
          <meta name="msapplication-TileColor" content={style.color.almostWhite}/>
          {/* <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/> */}
          <meta name="theme-color" content={style.color.almostWhite}/>

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