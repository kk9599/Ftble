<template>
  <section>
  <el-row class="container">
    <el-col :span="6">
      <el-card class="box-card">
       <el-form ref="loginForm" :model="loginForm" label-width="80px">
         <el-form-item label="HCM URL">
           <el-input placeholder="HCM" v-model="loginForm.url">
           <template slot="prepend">Http://</template>
           </el-input>
         </el-form-item>
         <el-form-item label="Client ID">
           <el-input placeholder="Client Name" v-model="loginForm.client">
           </el-input>
         </el-form-item>
         <el-form-item label="User Name">
           <el-input placeholder="User Name" v-model="loginForm.userName"></el-input>
         </el-form-item>
         <el-form-item label="Password">
           <el-input type="password" placeholder="password" v-model="loginForm.password"></el-input>
         </el-form-item>
          <el-form-item>
           <el-button type="primary" @click="onSubmit">Login</el-button>
          </el-form-item>
       </el-form>
      </el-card>
      {{ftble}}
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">

        <el-form :model="apiForm" :label-position="labelPosition" label-width="80px">
          <el-form-item label="Api URL">
            <el-input placeholder="api url" v-model="apiForm.url"></el-input>
          </el-form-item>
          <el-form-item label="Params">
            <el-input type="textarea" :rows="4" placeholder="param" v-model="apiForm.param"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onApiSend" :loading="buttonLoding">Send</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-tabs type="border-card"  v-model="activeName">
        <el-tab-pane label="Responds" name="resp">
          <pre>
           {{apiForm.resp}}
          </pre>
        </el-tab-pane>
        <el-tab-pane label="Preview" name="preview">
           <span id="preview">{{previewJson}}</span>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
    <el-row>
      <el-col :span="12">
        JsonPath<el-input placeholder="jsonPath" v-model="inputPath"></el-input>
      </el-col>
      <el-col :span="12">
      <el-card>
       <pre>
        {{jsonPathParse}}
         </pre>
      </el-card>
      </el-col>
    </el-row>
    </section>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import Renderjson from '../../node_modules/renderjson/renderjson.js'
  import JsonPath from 'jsonpath-plus'
  import _ from 'lodash'
  import axios from 'axios';
  import ElCard from "../../node_modules/element-ui/packages/card/src/main.vue";
  //import FtableClass from "../utility/Ftable-format"
  export default {
    components: {
      ElCard,
      ElInput,
      ElFormItem,
      ElCol},
    data() {
      return {
        loginForm:{
          url: '',
          client:'',
          username:'',
          password:''
        },
        labelPosition:'left',
        apiForm:{
          url:'',
          param:'',

          resp:''
        },
        ajaxComUrl:'https://api.github.com/users/',
        buttonLoding:false,
        _viewSate:'',
        activeName: 'resp',
        inputPath:'$.'
      }
    },
    methods:{
      onSubmit(){
         this.loginForm.url='/api.github.com/users'
         //this.ajaxComUrl= 'https://api.github.com/users/'
      },
      onApiSend(e) {
        let ajax_url = 'https://api.github.com/users'
//        _.debounce((e)=>{
//          ajax_url= this.ajaxComUrl+e.target.value
//          this.apiForm.url=ajax_url
//        })
        this.buttonLoding = true
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            method: 'get',
            url: ajax_url,
            responseType: 'json'
          }
        ).then((res) => {
          setTimeout(() => {
            this.buttonLoding = false
            this.apiForm.resp = res.data
          }, 2000)
        }).catch((error) => {
          console.log(error)
        })
      }
    },// end of method
    computed:{
      previewJson(){
        if(this.apiForm.resp){
          document.getElementById('preview').appendChild(
            Renderjson
              .set_icons('▸', '▾')
              .set_show_to_level(4)
              (this.apiForm.resp))
        }
       },
      jsonPathParse(){
       if(this.apiForm.resp){

         var result = JsonPath({json: this.apiForm.resp, path: this.inputPath});
         return result
       }
      },
      ftble(){
        if(this.jsonPathParse){
        console.log(this.jsonPathParse)
//          var ft = new FtableClass(this.jsonPathParse)
//          let result = ft.buildTable()
//          console.log(ft.reformatTable(result) )
        }
      }
    }//end of computed
  }
</script>
<style>
  pre {
    overflow-y: scroll;
    text-align: left;
    height: 800px;
  }

</style>
