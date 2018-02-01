var axios = require('axios')
var cheerio = require('cheerio')
var qs = require('qs')
//var FormData = require('form-data');

let viewState=''
let viewStateGenerator=''
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
//const loginData = new FormData();
//console.log('the viewstate is '+viewState)
// console.log('the generate is ' +viewStateGenerator)
//  loginData.append('__EVENTARGUMENT', '');
//  loginData.append('__EVENTTARGET', '');
//  loginData.append('__LASTFOCUS', '');
//  loginData.append('__VIEWSTATE', viewState);
//  loginData.append('__VIEWSTATEGENERATOR', viewStateGenerator);
//  loginData.append('ctl00$MainContent$duoPwd', '');
//  loginData.append('ctl00$MainContent$duoQueryString', '');
//  loginData.append('ctl00$MainContent$loginUI$cmdLogin', 'Login');
//  loginData.append('ctl00$MainContent$loginUI$txtCompanyName', 'DFLocal854');
//  loginData.append('ctl00$MainContent$loginUI$txtUserName', 'cadmin');
//  loginData.append('ctl00$MainContent$loginUI$txtUserPass', '1');
//  loginData.append('ctl00$MainContent$txtEmail', '');

function createApiCall(url, param){
  axios.get(url).then((res,html)=>{
   // console.log(res)
    let content= res.data
    $ = cheerio.load(content.toString())
    viewState = $('#__VIEWSTATE').val()
    viewStateGenerator = $('#__VIEWSTATEGENERATOR').val()
    loginParam.__VIEWSTATE = viewState
    loginParam.__VIEWSTATEGENERATOR = viewStateGenerator
     return anotherCall(url,qs.stringify(loginParam))
    //console.log(res)
  }).catch((reror)=>{
    console.log(error)
  })

}

function anotherCall(url, data){
  axios.post(url, data, {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      //  // 'Content-Type':'application/json'
      }
    }
  )
    .then(
      (res,html)=>{
        console.log(res.status)
        console.log(res)
        console.log(res.data.location)
      }).catch((err)=>{
    console.log(err)
  })
}



let url = 'http://localhost:8000/MyDayforce.aspx'
createApiCall(url)


