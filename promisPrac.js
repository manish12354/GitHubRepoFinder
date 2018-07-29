const https = require("https");
const users = process.argv.slice(2, process.argv.length);
const getOption = function(user) {
  let options = {
    protocol: "https:",
    hostname: 'api.github.com',
    path: `/users/${user}/repos`,
    method: 'GET',
    headers: {
      // 'Authorization': "manish12354",
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  };
  return options;
};

const callBack = function(res, resolve) {
  let userDetails = "";
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    userDetails += chunk;
  });
  res.on('end', () => {
    details = JSON.parse(userDetails);
    return resolve(details);
  });
}

const sendHttpsReqFor = function(user) {
  return new Promise((resolve, reject) => {
    const req = https.request(getOption(user), (res) => callBack(res, resolve));
    req.on('error', (err) => reject(err));
    req.end();
  })
}

const getRepos = function(userDetails) {
  let isArray = Array.isArray(userDetails);
  if (isArray) {
    let repos = userDetails.map((repo, index) => `${index+1}. ${repo.name}`);
    return repos;
  }
  return userDetails;
}

const show = function(repos, header) {
  console.log(header);
  let isArray = Array.isArray(repos);
  if (isArray) {
    repos.forEach((repo) => console.log(repo));
  } else {
    console.log(repos);
  }
}
const showRepos = function(user) {
  let header = `\n${user} ====>\n`;
  sendHttpsReqFor(user)
    .then(getRepos)
    .then((repos) => show(repos, header))
    .catch((err) => console.log(err));
}

const main = function(users) {
  users.forEach(showRepos);
}

main(users);
