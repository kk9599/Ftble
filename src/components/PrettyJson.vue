<template>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-main>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="respond" name="respond"><pre>{{example}}</pre></el-tab-pane>
      <el-tab-pane label="preview" name="preview">
        <div id="preview"></div>
      </el-tab-pane>
      <el-tab-pane label="jsonpath"  name="jsonpath" >
        <el-input v-model="jsonpath" placeholder="enter json path"></el-input>
        <pre>{{jsonpathresult}} </pre>
      </el-tab-pane>
      <el-tab-pane label="handlebar"  name="handlebar">HandleBar</el-tab-pane>
    </el-tabs>
      </el-main>

    </el-container>
</template>
<script>
  import Renderjson from '../../node_modules/renderjson/renderjson.js'
  import ElContainer from '../../node_modules/element-ui/packages/container/src/main.vue'
  let jq = require('jsonpath')
  export default{
    components: {ElContainer},
    name:"pretty_json",
    data(){
      return {
          jsonpathresult:"",
          jsonpath:"",
          activeName: 'respond',
          example:{
          "title": "example glossary",
          "comprehensive": true,
          "link": undefined,
          "count": 1,
          "GlossDiv": {
            "title": "S",
            "GlossList": {
              "GlossEntry": {
                "ID": "SGML",
                "SortAs": "SGML",
                "GlossTerm": "Standard Generalized Markup Language",
                "Acronym": "SGML",
                "Abbrev": "ISO 8879:1986",
                "GlossDef": {
                  "para": "A meta-markup language, used to create markup languages such as DocBook.",
                  "GlossSeeAlso": ["GML", "XML"]
                },
                "GlossSee": "markup"
              }
            }
          }
        },
        result:""
      }
    },
     methods:{
       handleClick(tab, event){
         if(tab.name=='preview'){
         let preview = document.getElementById("preview")
         if (!preview.hasChildNodes()) {
           document.getElementById("preview").appendChild(
             Renderjson
               .set_icons('▸', '▾')
               .set_show_to_level(4)
               (this.example));
         }
        }
        else if(tab.name =='jsonpath'){

                let path = this.jsonpath
                let resultSet =jq.query(this.example,path )
                console.log(resultSet)
                this.jsonpathresult= resultSet}

       }

     }


  }

</script>
<style>
  .renderjson {background-color: ghostwhite;}
  .renderjson .object {text-align: left; }
  .renderjson a              { text-decoration: none; }
  .renderjson .disclosure    { color: black;
    font-size: 150%; }
  .renderjson .syntax        { color: grey; }
  .renderjson .string        { color: grey; }
  .renderjson .number        { color: cyan; }
  .renderjson .boolean       { color: plum; }
  .renderjson .key           { color: darkblue; }
  .renderjson .keyword       { color: lightgoldenrodyellow; }
  .renderjson .object.syntax { color: lightseagreen; }
  .renderjson .array.syntax  { color: lightsalmon; }
</style>
