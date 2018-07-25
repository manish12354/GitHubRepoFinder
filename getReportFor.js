const https = require("https");
const users = process.argv.slice(2,process.argv.length);
const getOption = function(user) {
  let options = {
    protocol: "https:",
    hostname: 'api.github.com',
    path: `/users/${user}/repos`,
    method: 'GET',
    headers: {
      'Authorization': "manish12354",
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  };
  return options;
};

const callBack = function(res,user) {
  let userDetails = "";
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    userDetails += chunk;
  });
  res.on('end', () => {
    details = JSON.parse(userDetails);
    let repos = details.map(element=>element.name)
    userDetails = JSON.stringify(userDetails, null, 2);
    console.log(`\n                   <<<=============== ${user} ===============>>>`);
    repos.forEach((repo,index)=>console.log(`${index+1}. ${repo}`));
  });
}

const getReport = function(users){
  users.forEach((user)=>{
    const req = https.request(getOption(user), (res)=>callBack(res,user));
    req.end();
  })
}

getReport(users);
