let Slack = require('slack-node');

if(process.env.NOW) {

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);


  var text = `${process.env.ENV} deployment at ${process.env.NOW_URL} has been aliased to https://www.uat.ibcol.org.`;

  if(process.env.TRAVIS) {
    text = `Travis CI Build <${process.env.TRAVIS_BUILD_WEB_URL}|#${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})>:\n${text}`;
  }

  slack.webhook({
    channel: "#web-dev",
    icon_emoji: "https://file-ructyqhftk.now.sh/now.png",
    username: "Now @ Zeit",
    attachments: [
      {
        "color": "#004d40",
        text
      }
    ],
  }, function(err, response) {
    console.log(response);
  });

}