// content of index.js
const http = require('http')
const  url = require('url');
const request = require('request')

const port = 7000
const token='eyJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJhcGktZGVtby5zdGFybGluZ2JhbmsuY29tIiwic3ViIjoiYTU1MDNlYmQtMjdkYS00NGI5LTk3OTYtMjc0MDcwMTQ1Y2Y2IiwiZXhwIjoxNTc1NDAyODQyLCJpYXQiOjE1NzUzMTY0NDIsInNjb3BlIjoiYWNjb3VudC1ob2xkZXItbmFtZTpyZWFkIGFjY291bnQtaG9sZGVyLXR5cGU6cmVhZCBhY2NvdW50LWlkZW50aWZpZXI6cmVhZCBhY2NvdW50LWxpc3Q6cmVhZCBhY2NvdW50OnJlYWQgYWRkcmVzczplZGl0IGFkZHJlc3M6cmVhZCBhdHRhY2htZW50OnJlYWQgYXR0YWNobWVudDp3cml0ZSBhdXRob3Jpc2luZy1pbmRpdmlkdWFsOnJlYWQgYmFsYW5jZTpyZWFkIGNhcmQtY29udHJvbDplZGl0IGNhcmQ6cmVhZCBjb25maXJtYXRpb24tb2YtZnVuZHM6cmVhZCBjdXN0b21lcjpyZWFkIGVtYWlsOmVkaXQgbWFuZGF0ZTpkZWxldGUgbWFuZGF0ZTpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczp3cml0ZSBtZXJjaGFudDpyZWFkIG1ldGFkYXRhOmNyZWF0ZSBtZXRhZGF0YTplZGl0IHBheWVlOmNyZWF0ZSBwYXllZTpkZWxldGUgcGF5ZWU6ZWRpdCBwYXllZS1pbWFnZTpyZWFkIHBheWVlOnJlYWQgcGF5LWxvY2FsOmNyZWF0ZSBwYXktbG9jYWwtb25jZTpjcmVhdGUgcGF5LWxvY2FsOnJlYWQgcHJvZmlsZS1pbWFnZTplZGl0IHByb2ZpbGUtaW1hZ2U6cmVhZCByZWNlaXB0OnJlYWQgcmVjZWlwdHM6cmVhZCByZWNlaXB0OndyaXRlIHNhdmluZ3MtZ29hbDpjcmVhdGUgc2F2aW5ncy1nb2FsOmRlbGV0ZSBzYXZpbmdzLWdvYWw6cmVhZCBzYXZpbmdzLWdvYWwtdHJhbnNmZXI6Y3JlYXRlIHNhdmluZ3MtZ29hbC10cmFuc2ZlcjpkZWxldGUgc2F2aW5ncy1nb2FsLXRyYW5zZmVyOnJlYWQgc3RhbmRpbmctb3JkZXI6Y3JlYXRlIHN0YW5kaW5nLW9yZGVyOmRlbGV0ZSBzdGFuZGluZy1vcmRlcjpyZWFkIHN0YXRlbWVudC1jc3Y6cmVhZCBzdGF0ZW1lbnQtcGRmOnJlYWQgdHJhbnNhY3Rpb246ZWRpdCB0cmFuc2FjdGlvbjpyZWFkIiwiYWNjb3VudEhvbGRlclVpZCI6IjY5ZjhhYmExLWZjOTUtNDRmZC1iNWExLTE3YjZiN2I3NjRkYyIsInRva2VuVWlkIjoiOWZhYTZkZTctMjAxMi00NjhjLWEyZmYtOTc4MjA5OThiMzk2IiwiYXBpQWNjZXNzVWlkIjoiYmY2ZmZlZDMtMTM2NC00NGJiLTkzZWItYWVmNWYxOThmODhmIn0.zGRt-XLoeqeYmIlm8XF9JnJSsY5ZyGSg4p8vyPizvjHQRJbLyVQFE7B45S9JFY1faEipPOJqo93NwWayFe4sOEGki1NuX-CIL6RZDZalY_P-k6mGUkvDSYlkNSK1eH9ahaWZqIV56Tx_COuui-HZF4kXFX8DLatR6aCocaI00sWEwPUrjNgQHqFThq1cGm3CK8JR8wlWYqOi995VG-Kz3kYpevAOPEirhE8oUc6WsByl2b45NEki4wf6o_iNN6_lPjkV2ersTlknGbyEJc1NMIYSREq0eN5GokoWwtDIrSFtE0Q-ysomfHyat1UDcS8Bdwcgc023aArgRUt1_6ksBhZIlzklEhLaHT4LSTVaeF81uLXAoY3xAHyaji-S0bDVCiHA2oKg3xmi7ZJllP_ZzmmwcdccixHz_mDEcEIFEz7TdG07qETd577jgu2FLQcrv9th5nEaDrGhvYBSr09qikpPw-OL5jLDwdAg4PZe6dnd2oUlibriD6AGDfAVRKWv6MmjvqXkwK05WpzOy9RO8yWYfdk-iYvZkPN_kcnuF3EUESZxyJN2vuJjS4MYS0zI4KZJyBBaxxFAN0YvgvY6OW_6Xy2k_l6acI4fZnAoEqLzmEN5Ayd9h4zzBjEQ1qOB6UvN_6XPTT3d34f5nSmoYTrryIkw4n29JXv97l62RoM'
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



