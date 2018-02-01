<template>
  <div class="el-card">
    <el-tabs style="height: 200px;">
      <el-tab-pane
        v-for = "(item,key,index) in respResult.tabs"
        :key="item.key"
        :label="item.labelName"
        :name="item.value"
      >{{key}},{{item.data}},{{index}}
        <pre v-html="item.data"></pre>
     </el-tab-pane>
     </el-tabs>

  </div>

</template>
<script>
 // import JSONFormatter from 'json-formatter-js'
  import JsonFormatter from '@/components/JsonFormatter.vue'
  export default {
    components: {JsonFormatter},

    data() {
      return {
        respResult: {
          sucess: true,
          resultId: '',
          apiName:'',
          apiUrl:'',
          requestParam:'',
          respondData:'',
          jsonParam:'',
          tabs: [
            {
              labelName: 'Ftable',
              data: '<div style="color:red">hihi</div>'
            },
            {
              labelName: 'JsonPath',
              data: '3'
            },
            {
            labelName: 'Preview',
            data: '1'
            },
            {
              labelName: 'Respond',
              data: '2'
            }
          ]
        }
      };
    }//end of the data
    ,
    methods:{

    },
    computed:{
//      jsonFormat(){
//        const myJSON = {ans: 42};
//        const formatter = new JSONFormatter(myJSON);
//        console.log(formatter.render())
//      }
    }
  };
</script>

<style>


</style>
