// JavaScript source code
var req = require('request');
var pg = require('pg'), JSONStream = require('JSONStream'), fs = require('fs'), es = require('event-stream'), json2csv = require('json2csv'), Chart = require('Chart.js');
var blocklist2; var max_height, num_opreturns, block_list;
req('https://blockchain.info/latestblock', function (error, response, blocklist)// gets the height of the latest block chain
{
  blocklist2 = JSON.parse(blocklist);
  //console.log(blocklist2);
  max_height = blocklist2.height;
  console.log('maximum height is ' + blocklist2.height);
  var fields = ['block height', 'timestamp', 'transaction ID', 'script', 'protocol'];
  console.log(fields);
  var count = 0;
  var callAPI = function(callback) {
    setTimeout(function () {
      console.log(count  + 'Api called');
      req('http://api.coinsecrets.org/block/' + count, function (error, response, body) //calling OP_return API
      {
        console.log('error: ', error);
        console.log('response: ', response && response.statusCode);
        console.log('body:', body);
        var result = json2csv({ data: body, fields: fields });
        console.log('Datat convrted to csv');
        fs.writeFile('c:\dev\opreturn.csv',result,function(err){if(err) throw error; console.log('file saved')});
        count += 1;
        if (count<max_height) {
          callAPI();
        }
         //  
      });
    }, 5000)};
  callAPI(callAPI);})
//     //for(count = 0;count<=obj.op_returns.length;count++)
//     //{console.log(obj.op_returns[count].script);}
//     num_opreturns[blk] = obj.opreturns.length;
//     block_list[blk] = blocklist2.height;
//   })
// }


// var ctx = 'myChart';
// var myChart = new Chart(ctx, 
// { type: 'line',
//   data: {
//       datasets: [{
//       data: [num_opreturns],
//       backgroundColor: "rgba(153,255,51,0.6)"
//     }],
//     labels: [block_list],
//   },
//   options: {
//       scales:{
//         yAxes:[{scaleLabel:
//               {display: true, labelString:'Number of Transactions'}}]}}
// })
