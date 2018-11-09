let Slack = require('slack-node');

// console.log("debug: here are some envs...");
// console.log(process.env);

if(process.env.TRAVIS) {

  webhookUri = "https://hooks.slack.com/services/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";
   
  slack = new Slack();
  slack.setWebhook(webhookUri);
  
  if (process.env.TRAVIS_EVENT_TYPE === 'push') {
    slack.webhook({
      channel: "#web-dev",
      icon_emoji: "https://file-gfcrqwuzya.now.sh/travis-ci-female.png",
      username: "Travis CI",
      text: `Travis CI started working on a new build <${process.env.TRAVIS_BUILD_WEB_URL}|#${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})> for new commit push <https://github.com/${process.env.TRAVIS_REPO_SLUG}/commit/${process.env.TRAVIS_COMMIT}|#${process.env.TRAVIS_COMMIT}> with <https://github.com/${process.env.TRAVIS_REPO_SLUG}/compare/${process.env.TRAVIS_COMMIT_RANGE}|changes> on <https://github.com/${process.env.TRAVIS_REPO_SLUG}|${process.env.TRAVIS_REPO_SLUG}> <https://github.com/${process.env.TRAVIS_REPO_SLUG}/tree/${process.env.TRAVIS_BRANCH}|${process.env.TRAVIS_BRANCH}>: ${process.env.TRAVIS_COMMIT_MESSAGE}`,
    }, function(err, response) {
      console.log(response);
    });
  } else {
    slack.webhook({
      channel: "#web-dev",
      icon_emoji: "https://file-gfcrqwuzya.now.sh/travis-ci-female.png",
      username: "Travis CI",
      text: `Travis CI started working on a new build trigged by Travis CI event ${process.env.TRAVIS_EVENT_TYPE}`,
    }, function(err, response) {
      console.log(response);
    });
  }
  

}