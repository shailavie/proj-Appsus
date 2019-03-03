export default {
    template: `
        <section>
            <h5 v-if="isCollapsed">{{shortTxt}}</h5>
            <h5 v-else>{{txt}}</h5>
            <button v-if="isLongTxt" @click="isCollapsed = !isCollapsed">
                {{isCollapsed? 'show more' : 'show less'}}
            </button>
        </section>
    `,
    props: ['txt'],
    data() {
        return {
            isCollapsed: true
        }
    },
    methods: {
    },
    created() {
        console.log('i was created')
    },
    computed: {
        isLongTxt() {
            return this.txt.length > 100
        },
        shortTxt() {
            if (this.isLongTxt) return this.txt.substr(0, 100) + '...'
            else return this.txt
        }
    }
}
