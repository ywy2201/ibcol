let Slack = require('slack-node');

if(process.env.NOW) {

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);
   
  slack.webhook({
    channel: "#web-dev",
    icon_url: "https://file-ructyqhftk.now.sh/now.png",
    username: "Now @ Zeit",
    text: `A new deployment is ready at: ${process.env.NOW_URL}`,
  }, function(err, response) {
    console.log(response);
  });

}