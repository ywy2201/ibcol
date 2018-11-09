let Slack = require('slack-node');

console.log("debug: here are some envs...");
console.log(process.env);

if(process.env.TRAVIS) {

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