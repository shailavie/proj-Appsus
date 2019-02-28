export default {
    props: ['msg', 'search', 'effect'],
    template: '<span><span v-for="(s, i) in parsedMsg" v-bind:class="getClass(i%2)">{{s}}</span></span>',
    methods: {
        getClass: function(i) {
          var myClass = {};
        myClass[this.effect] = !!i;
        return myClass;
      },
    },
    created(){
        // console.log('got ',this.msg,this.search,this.effect)
    },
    computed: {
        parsedSearch(){
            // console.log('got this  :  ',this.search)
          return '(' + this.search.trim().replace(/ +/g, '|') + ')';
      },
        parsedMsg() {
          return this.msg.split(
            new RegExp(this.parsedSearch , 'gi'));
      }
    }
  }

  