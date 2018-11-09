let Slack = require('slack-node');

// console.log("debug: here are some envs...");
// console.log(process.env);

if(process.env.TRAVIS) {

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);

  var text = "";
  
  if (process.env.TRAVIS_EVENT_TYPE === 'push') {
    text = `Test completed. Deploying build <${process.env.TRAVIS_BUILD_WEB_URL}|#${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})> to server...`;
  } else {
    text = `Build <${process.env.TRAVIS_BUILD_WEB_URL}|#${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})> of ${process.env.TRAVIS_REPO_SLUG}@${process.env.TRAVIS_BRANCH}:\n Test completed. Deploying for a build trigged by Travis CI event ${process.env.TRAVIS_EVENT_TYPE} to server...`;
  }


  slack.webhook({
    channel: "#web-dev",
    icon_emoji: "https://file-gfcrqwuzya.now.sh/travis-ci-female.png",
    username: "Travis CI",
    attachments: [
      {
        "color": "#80cbc4",
        text
      }
    ],
  }, function(err, response) {
    console.log(response);
  });
  

}