// content of index.js
const http = require('http')
const  url = require('url');
const request = require('request')

const port = 7000
const token='eyJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJhcGktZGVtby5zdGFybGluZ2JhbmsuY29tIiwic3ViIjoiYTU1MDNlYmQtMjdkYS00NGI5LTk3OTYtMjc0MDcwMTQ1Y2Y2IiwiZXhwIjoxNTc1Mjk1MjQzLCJpYXQiOjE1NzUyMDg4NDMsInNjb3BlIjoiYWNjb3VudC1ob2xkZXItbmFtZTpyZWFkIGFjY291bnQtaG9sZGVyLXR5cGU6cmVhZCBhY2NvdW50LWlkZW50aWZpZXI6cmVhZCBhY2NvdW50LWxpc3Q6cmVhZCBhY2NvdW50OnJlYWQgYWRkcmVzczplZGl0IGFkZHJlc3M6cmVhZCBhdHRhY2htZW50OnJlYWQgYXR0YWNobWVudDp3cml0ZSBhdXRob3Jpc2luZy1pbmRpdmlkdWFsOnJlYWQgYmFsYW5jZTpyZWFkIGNhcmQtY29udHJvbDplZGl0IGNhcmQ6cmVhZCBjb25maXJtYXRpb24tb2YtZnVuZHM6cmVhZCBjdXN0b21lcjpyZWFkIGVtYWlsOmVkaXQgbWFuZGF0ZTpkZWxldGUgbWFuZGF0ZTpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczp3cml0ZSBtZXJjaGFudDpyZWFkIG1ldGFkYXRhOmNyZWF0ZSBtZXRhZGF0YTplZGl0IHBheWVlOmNyZWF0ZSBwYXllZTpkZWxldGUgcGF5ZWU6ZWRpdCBwYXllZS1pbWFnZTpyZWFkIHBheWVlOnJlYWQgcGF5LWxvY2FsOmNyZWF0ZSBwYXktbG9jYWwtb25jZTpjcmVhdGUgcGF5LWxvY2FsOnJlYWQgcHJvZmlsZS1pbWFnZTplZGl0IHByb2ZpbGUtaW1hZ2U6cmVhZCByZWNlaXB0OnJlYWQgcmVjZWlwdHM6cmVhZCByZWNlaXB0OndyaXRlIHNhdmluZ3MtZ29hbDpjcmVhdGUgc2F2aW5ncy1nb2FsOmRlbGV0ZSBzYXZpbmdzLWdvYWw6cmVhZCBzYXZpbmdzLWdvYWwtdHJhbnNmZXI6Y3JlYXRlIHNhdmluZ3MtZ29hbC10cmFuc2ZlcjpkZWxldGUgc2F2aW5ncy1nb2FsLXRyYW5zZmVyOnJlYWQgc3RhbmRpbmctb3JkZXI6Y3JlYXRlIHN0YW5kaW5nLW9yZGVyOmRlbGV0ZSBzdGFuZGluZy1vcmRlcjpyZWFkIHN0YXRlbWVudC1jc3Y6cmVhZCBzdGF0ZW1lbnQtcGRmOnJlYWQgdHJhbnNhY3Rpb246ZWRpdCB0cmFuc2FjdGlvbjpyZWFkIiwiYWNjb3VudEhvbGRlclVpZCI6IjY5ZjhhYmExLWZjOTUtNDRmZC1iNWExLTE3YjZiN2I3NjRkYyIsInRva2VuVWlkIjoiOThhODVjMDgtM2YyYi00NTBiLTk0NTAtZjE0MTVmZTFlMTRlIiwiYXBpQWNjZXNzVWlkIjoiYmY2ZmZlZDMtMTM2NC00NGJiLTkzZWItYWVmNWYxOThmODhmIn0.oohDWZKu7sh8441qYGT3e060_SFBu1EcZzjwevu05kD1W6MgqyBqwHEc7pc3idfW3F2J7HTM7GpBMNtzDQ-t3j8Z-RD2OZfV3sgPZbZlQ5nofdMdPS7sOtEcA38q023T4FDnXeLrWNMuwTWsYAPMvZB3weqQ9tHHlIdF1qUpcs9KV3eua3Ah_2Qcgjq4yZ-DZHErr03jKOmlkQz8x-WZIDJHoHI1sqUFrqh7qE7b2ZFIYHkMVdr5TZn4PzvtPzFRDPsQ6r-zb98s922dYMvmKPxQqCGjvXDpBWgqYkFYGv1pSxGsgfP7Fg7H3qEGeWaPUvoaGNHi9tm7t7SHOgEBvcWqzukIGIXmFW7s4QRNenOd4fB3xbn7hLo1lgLPaPYJOET6unIBJ8uXveA3VsLvhkEjwQCcGJZqp9WIwY5PED-mD8jMJvsAqTTXEgRgu_DK29lQkSTXJyhqZoDJtwcq5K7MVFHo8lswKY6udJSkA698osrl_pCsi-sIfY0FObXPGjjf0mkGxFpI2ZhM208bebQ_RLtAFcHsbGJ5jYux1dRP8wMWPUXLpFlVY1n8JXeF4FkVF6VZw6WGC767n3H_r06MfgB3bRFWRPUUssm0l4OTRdkotp50pWQFBpIbR-4Xr87H6OO-_idzEQWezWW0CZywIqwBQjBv8HtLMjXTKVI'
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
  
  // fetch account info
  if(requestURL === "/" && req.method === "GET"){
    const x = starlingApi({}).getAccounts
    x.pipe(resp)  
    return
  }

  // fetch all spending goals
  if(requestURL === `/savings-goals?accountUid=${queryData.accountUid}` && req.method === "GET"){
    const {accountUid} = queryData
    const x = starlingApi({accountUid}).getSpendingGoals
    x.pipe(resp)
    return
  }

  // create a spending goal
  if(requestURL === `/savings-goals?accountUid=${queryData.accountUid}` && req.method === "PUT"){
    collectRequestData(req, result => {
      const x = starlingApi({accountUid}, result).createSpendingGoals
       x.pipe(resp)
    });
    return
  }

  // add money to a spending goal
  if(requestURL === `/add-money?accountUid=${accountUid}&savingsGoalUid=${savingsGoalUid}&transferUid=${transferUid}` && req.method === "PUT"){
    collectRequestData(req, result => {
      const x = starlingApi({accountUid, savingsGoalUid, transferUid}, result).addMoneyToSavings
        x.pipe(resp)
    });
    return
  }

  // get round-up
  if(requestURL === `/round-up?accountUid=${accountUid}` && req.method === 'GET'){
    console.log("get the round u[p")
    const x = starlingApi({accountUid}).getRoundup
    x.pipe(resp)
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
    createSpendingGoals: starlingHandler({...putBaseOptions, body, url: `${baseURL}/api/v2/account/${accountUid}/savings-goals`}),
    addMoneyToSavings: starlingHandler({...putBaseOptions, body, url: `${baseURL}/api/v2/account/${accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`}),
    getRoundup: starlingHandler({...getBaseOptions, url: `${baseURL}/api/v2/feed/account/${accountUid}/round-up`})
  })
}



