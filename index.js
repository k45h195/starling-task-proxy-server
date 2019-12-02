// content of index.js
const http = require('http')
const  url = require('url');
const request = require('request')

const port = 7000
const token=''
const baseURL = 'https://api-sandbox.starlingbank.com'



const headers = Object.freeze({
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization" : `Bearer ${token}` 
})


function collectRequestData(req, callback) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
          callback(JSON.parse(body));
      });
  
}

const requestHandler = async (req, resp) => {


  const requestURL = req.url
  const queryData = url.parse(req.url, true).query;
  const {accountUid, savingsGoalUid, transferUid} = queryData
  
  	// Set CORS headers
	resp.setHeader('Access-Control-Allow-Origin', '*');
	resp.setHeader('Access-Control-Request-Method', '*');
	resp.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, GET');
	resp.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		resp.writeHead(200);
		resp.end();
		return;
	}

  // fetch account info
  if(requestURL === "/" && req.method === "GET"){
    starlingApi({}).getAccounts
    .on("response", starlingRes => {
      starlingRes.headers["statusCode"] = starlingRes.statusCode
      starlingRes.headers["Access-Control-Allow-Origin"] = "*"
    }) 
    .pipe(resp)  
    return
  }

  // fetch all spending goals
  if(requestURL === `/savings-goals?accountUid=${queryData.accountUid}` && req.method === "GET"){
    const {accountUid} = queryData
    starlingApi({accountUid}).getSpendingGoals
    .on("response", starlingRes => {
      starlingRes.headers["statusCode"] = starlingRes.statusCode
      starlingRes.headers["Access-Control-Allow-Origin"] = "*"
    }) 
    .pipe(resp)
    return
  }

  // create a spending goal
  if(requestURL === `/savings-goals?accountUid=${queryData.accountUid}` && req.method === "PUT"){
    collectRequestData(req, result => {
      starlingApi({accountUid}, result).createSpendingGoals
      .on("response", starlingRes => {
        starlingRes.headers["statusCode"] = starlingRes.statusCode
        starlingRes.headers["Access-Control-Allow-Origin"] = "*"
      }) 
      .pipe(resp)
    });
    return
  }

  // add money to a spending goal
  if(requestURL === `/add-money?accountUid=${accountUid}&savingsGoalUid=${savingsGoalUid}&transferUid=${transferUid}`){
    collectRequestData(req, result => {
      starlingApi({accountUid, savingsGoalUid, transferUid}, result).addMoneyToSavings
      .on("response", starlingRes => {
        starlingRes.headers["statusCode"] = starlingRes.statusCode
        starlingRes.headers["Access-Control-Allow-Origin"] = "*"
      }) 
      .pipe(resp)
    });
    return
  }

  // get round-up
  if(requestURL === `/round-up?accountUid=${accountUid}` && req.method === 'GET'){
    starlingApi({accountUid}).getRoundup
    .on("response", starlingRes => {
      starlingRes.headers["statusCode"] = starlingRes.statusCode
      starlingRes.headers["Access-Control-Allow-Origin"] = "*"
    }) 
    .pipe(resp)
    return
  }

  resp.writeHead(404, {'Content-Type': 'text/html'});
  resp.end(`
  <!doctype html>
  <html>
    <p>This route does not exist</p>
  </html>
`)
}


const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.error('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})




const starlingHandler = (options) => request(options, function (error, response, body) {
  if (!error) {
      return  body
  }else{
      console.error(error)
  }
})


 const starlingApi = (params, body) => {
  const {accountUid, savingsGoalUid, transferUid} = params
  const getBaseOptions = {
    method: 'GET',
    headers
  }

  const putBaseOptions = {
    method: 'PUT',
    json: true,
    headers 
  }

  return Object.freeze({
    getAccounts: starlingHandler({...getBaseOptions, url: `${baseURL}/api/v2/accounts`}),
    getSpendingGoals: starlingHandler({...getBaseOptions, url:`${baseURL}/api/v2/account/${accountUid}/savings-goals`}),
    createSpendingGoals: starlingHandler({...putBaseOptions, json: true,  body, url: `${baseURL}/api/v2/account/${accountUid}/savings-goals`}),
    addMoneyToSavings: starlingHandler({...putBaseOptions, json: true, body, url: `${baseURL}/api/v2/account/${accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`}),
    getRoundup: starlingHandler({...getBaseOptions, url: `${baseURL}/api/v2/feed/account/${accountUid}/round-up`})
  })
}



