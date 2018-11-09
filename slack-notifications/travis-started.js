let Slack = require('slack-node');

if(process.env.NOW) {

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);
   
  slack.webhook({
    channel: "#web-dev",
    icon_emoji: "https://file-ructyqhftk.now.sh/now.png",
    username: "Travis CI",
    text: `Travis CI is hard at work...`,
  }, function(err, response) {
    console.log(response);
  });

}