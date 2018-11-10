let Slack = require('slack-node');



webhookUri = "https://hooks.slack.com/services/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";
  
slack = new Slack();
slack.setWebhook(webhookUri);

const NOW_URL = (process.argv.length > 2) ? process.argv[2] : process.env.NOW_URL;

const ALIAS_PATH = (process.argv.length > 3) ? process.argv[3] : process.env.ALIAS_PATH;


var text = `Deployment at ${NOW_URL} has been aliased to ${ALIAS_PATH}.`;

if(process.env.TRAVIS) {
  text = `Build <${process.env.TRAVIS_BUILD_WEB_URL}|#${process.env.TRAVIS_BUILD_NUMBER}> (<https://github.com/${process.env.TRAVIS_REPO_SLUG}/compare/${process.env.TRAVIS_COMMIT_RANGE}|${process.env.TRAVIS_COMMIT.substring(0,7)}>):\n${text}`;
}

slack.webhook({
  channel: "#web-dev",
  icon_emoji: "https://file-ructyqhftk.now.sh/now.png",
  username: "Now @ Zeit",
  attachments: [
    {
      "color": "#00695c",
      text
    }
  ],
}, function(err, response) {
  console.log(response);
});

