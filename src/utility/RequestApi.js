let request = require('request')
let rp = require('request-promise');
let cheerio = require('cheerio')
let qs = require('qs')

let loginParam = {
  __EVENTARGUMENT:'',
  __EVENTTARGET:'',
  __LASTFOCUS:'',
  __VIEWSTATE:'',
  __VIEWSTATEGENERATOR:'',
  ctl00$MainContent$duoPwd:'',
  ctl00$MainContent$duoQueryString:'',
  ctl00$MainContent$duoUserNameDisplayText:'',
  ctl00$MainContent$loginUI$cmdLogin:'Login',
  ctl00$MainContent$loginUI$txtCompanyName:'DFLocal854',
  ctl00$MainContent$loginUI$txtUserName:'cadmin',
  ctl00$MainContent$loginUI$txtUserPass:'1',
  ctl00$MainContent$txtEmail:''
}
let url = 'http://localhost:8000/MyDayforce.aspx'

var options = {
  uri: url,
  transform: function (body) {
    return cheerio.load(body);
  }
};
var option2 = {
  uri: url,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },

};


rp(options)
  .then(function ($) {
    viewState = $('#__VIEWSTATE').val()
    viewStateGenerator = $('#__VIEWSTATEGENERATOR').val()
    loginParam.__VIEWSTATE = viewState
    loginParam.__VIEWSTATEGENERATOR = viewStateGenerator
    //console.log(loginParam)
    var option2 = {
      method: 'POST',
      uri: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      simple: false,
      form:loginParam
     };
    rp(option2, (err, response, body)=>{
      let reason;
      if(err){
        reson={
          cause: err,
          error: err,
          options: options,
          response: response
        }
        console.log(err)
      }
      else{
        console.log(response.statusCode)
        console.log(response.caseless.dict.location)
        let loc= response.caseless.dict.location
        let myRegexp = /(^.*(?=([/]Common)))/g;
        let match = myRegexp.exec(loc)
        let ajaxCommonUrl = 'http://localhost:8000'+match[1]+'/Framework/Startup/GetUserRoles'
        console.log(ajaxCommonUrl)
        let option3 ={
          method: 'POST',
          uri: ajaxCommonUrl,
          headers: {
            'Content-Type': 'application/json'
          },
          json: true
        }
        rp(option3,function(err,response,body){
          console.log(body)
        })
      }
    }).then((response)=>{
      console.log("DELETE succeeded with status %d", response.statusCode)
    })
  })
  .catch(function (err) {
    // Crawling failed or Cheerio choked...
  });
