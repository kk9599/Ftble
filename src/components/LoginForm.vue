<template>
  <section>
  <el-row class="container">
    <el-col :span="6">
      <fieldset>
        <legend>HCM Login Form</legend>
       <el-form ref="loginForm" :model="loginForm" label-width="80px">
         <el-form-item label="HCM URL">
           <el-input placeholder="请输入内容" v-model="loginForm.url">
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
      </fieldset>
    </el-col>
    <el-col :span="6">
      <fieldset>
        <legend>Api Form</legend>
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
      </fieldset>
    </el-col>
    <el-col :span="12">
      <el-tabs type="border-card"  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Responds" name="resp"></el-tab-pane>

        <pre v-if="apiForm.resp">
        {{apiForm.resp}}
        </pre>
        <el-tab-pane label="Preview" name="preview">
          <span id="preview"></span>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
    </section>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import Renderjson from '../../node_modules/renderjson/renderjson.js'
  import _ from 'lodash'
  import axios from 'axios';
  export default {
    components: {
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
      },
      handleClick(tab,e){
        let example ={
          "login": "mojombo",
          "id": 1,
          "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/mojombo",
          "html_url": "https://github.com/mojombo",
          "followers_url": "https://api.github.com/users/mojombo/followers",
          "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
          "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
          "organizations_url": "https://api.github.com/users/mojombo/orgs",
          "repos_url": "https://api.github.com/users/mojombo/repos",
          "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
          "received_events_url": "https://api.github.com/users/mojombo/received_events",
          "type": "User",
          "site_admin": false
        }
         if(tab.name=='preview'){

           document.getElementById("preview").appendChild(
             Renderjson
               .set_icons('▸', '▾')
               .set_show_to_level(4)
               (example));
           }
         }
      }


  }
</script>
<style>
  pre {
    height: 800px;
    overflow-y: scroll;
    text-align: left;
  }

</style>
