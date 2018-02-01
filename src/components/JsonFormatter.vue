<template>
  <div :id="guid">
  </div>
</template>

<script>
  import JSONFormatter from 'json-formatter-js'
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  export default {
    props: ['messages'],
    computed: {
      jsonMessage() {
        const myJSON = {ans: 42}
        const formatter = new JSONFormatter(myJSON)
        let message = formatter.render()
        document.getElementById(this.guid).appendChild(message)

      },
      guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

    }
  }
</script>
