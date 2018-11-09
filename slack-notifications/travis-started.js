let Slack = require('slack-node');

console.log("debug: here are some envs...");
console.log(process.env);

if(process.env.TRAVIS) {

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);
  
  if (process.env.TRAVIS_EVENT_TYPE === 'push') {
    slack.webhook({
      channel: "#web-dev",
      icon_url: "https://file-gfcrqwuzya.now.sh/travis-ci-female.png",
      username: "Travis CI",
      text: `Travis CI started working a new build <a href="${process.env.TRAVIS_BUILD_WEB_URL}">#${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})</a> for new commit push <a href="https://github.com/${process.env.TRAVIS_REPO_SLUG}/commit/${process.env.TRAVIS_COMMIT}">#${process.env.TRAVIS_COMMIT}</a> on <a href="https://github.com/${process.env.TRAVIS_REPO_SLUG}">${process.env.TRAVIS_REPO_SLUG}</a> <a href="https://github.com/${process.env.TRAVIS_REPO_SLUG}/tree/${process.env.TRAVIS_BRANCH}">${process.env.TRAVIS_BRANCH}</a>: ${process.env.TRAVIS_COMMIT_MESSAGE}`,
    }, function(err, response) {
      console.log(response);
    });
  } else {

  }
  

}