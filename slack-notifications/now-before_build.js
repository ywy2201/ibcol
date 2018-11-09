let Slack = require('slack-node');

if(process.env.NOW) {

  // console.log("ENVs", process.env);

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);
  
  var text = `Building ${process.env.ENV} at <${process.env.NOW_URL}/_logs|${process.env.NOW_URL}>...`;

  if(process.env.TRAVIS) {
    text = `Travis CI Build <${process.env.TRAVIS_BUILD_WEB_URL}|#${process.env.TRAVIS_BUILD_NUMBER}> (<https://github.com/${process.env.TRAVIS_REPO_SLUG}/compare/${process.env.TRAVIS_COMMIT_RANGE}|${process.env.TRAVIS_COMMIT.substring(0,7)}>):\n${text}`;
  }

  slack.webhook({
    channel: "#web-dev",
    icon_emoji: "https://file-ructyqhftk.now.sh/now.png",
    username: "Now @ Zeit",
    attachments: [
      {
        "color": "#ECECEC",
        text
      }
    ],
  }, function(err, response) {
    console.log(response);
  });

}