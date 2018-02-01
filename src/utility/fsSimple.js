var fs = require('fs')
var cheerio = require('cheerio')
var content;
// First I want to read the file
fs.readFile('../../static/sample.html', function read(err, data) {
  if (err) {
    throw err;
  }
  content = data;
  $ = cheerio.load(content.toString())
  // Invoke the next step here however you like
 // console.log(content.toString());   // Put all of the code here (not the best solution)
  //processFile();
  //Or put the next step in a function and invoke it
  let viewState = $('#__VIEWSTATE').val()
  let viewStateGenerator = $('#__VIEWSTATEGENERATOR').val()
  console.log(viewState)
  console.log(viewStateGenerator)
  //res.request.uri.href responded url
  //regex = r"(^.*(?=([/]Common)))"
 // adjaxUrl = re.search(regex, temp)
//  print(adjaxUrl.group(0))
 // frameworkUrl = adjaxUrl.group(0)+"/Framework/Startup/GetUserRoles"
});

function processFile() {
  console.log(content);
}


var json = {
  "store": {
    "book": { "category": "reference",
      "author": "Nigel Rees",
      "title": "Sayings of the Century",
      "price": [8.95, 8.94, 8.93]
    },
    "books": [
      { "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": [8.95, 8.94, 8.93]
      }
    ]
  }
};


console.log( json.store.books)
console.log( Array.isArray(json.store.books))
