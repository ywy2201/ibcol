let Slack = require('slack-node');

if(process.env.NOW) {

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);


  var text = `A new ${process.env.ENV} deployment is ready at: ${process.env.NOW_URL}.`;

  if(process.env.TRAVIS) {
    text = `Travis CI Build <${process.env.TRAVIS_BUILD_WEB_URL}|#${process.env.TRAVIS_BUILD_NUMBER}> (<https://github.com/${process.env.TRAVIS_REPO_SLUG}/compare/${process.env.TRAVIS_COMMIT_RANGE}|${process.env.TRAVIS_COMMIT.substring(0,7)}>):\n${text}`;
  }

  slack.webhook({
    channel: "#web-dev",
    icon_emoji: "https://file-ructyqhftk.now.sh/now.png",
    username: "Now @ Zeit",
    attachments: [
      {
        "color": "#333",
        text
      }
    ],
  }, function(err, response) {
    console.log(response);
  });

}