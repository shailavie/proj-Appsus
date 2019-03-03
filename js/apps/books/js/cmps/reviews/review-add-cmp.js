import { makeId } from '../../services/util-service.js';
import { eventBus } from './event-bus.js'

const textBox = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <input type="text" v-model="txt" @blur="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            txt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', { [this.data.for]: this.txt })
        }
    }
}
const textArea = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <textarea type="text" v-model="textArea" @blur="reportVal" ></textarea> 
            </label>
        </div>
    `,
    data() {
        return {
            textArea: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', { [this.data.for]: this.textArea })
        }
    }
}
const selectBox = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <select v-model="selectedOpt" @blur="reportVal">
                    <option v-for="opt in data.opts">{{opt}}</option>
                </select>
            </label>
        </div>
    `,
    data() {
        return {
            selectedOpt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', { [this.data.for]: this.selectedOpt })
        }
    }
}

const rangeBox = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <input type="number" v-model.number="range.min" /> -
                <input type="number" v-model.number="range.max" @blur="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            range: { min: this.data.min, max: this.data.max }
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.range)
        }
    }
}



export default {
    props: ['booktitle'],
    template: `
    <section class="review-add">
    <h2> Add a new review for {{captilizeTitle}}</h2>
    <form @submit.prevent="save">
            <component v-for="(currCmp, idx) in cmps" 
                        class="add-review-field  flex   space-between"
                        :is="currCmp.type" 
                        :data="currCmp.data"
                        :key="currCmp.id"
                        @setInput="setInput($event, idx)">
            </component>
            <button type="submit" class="btn">Add Review</button>
        </form>
    </section>
    `,
    data() {
        return {
            cmps: [
                {
                    id: makeId(),
                    type: 'textBox',
                    data: {
                        label: 'Your Name:',
                        for: 'name',
                        class: 'add-review-field flex center-all space-between',
                        // placeholder: 'Enter your name'
                    }
                },
                {
                    id: makeId(),
                    type: 'textBox',
                    data: {
                        label: 'To sum it up',
                        for: 'subject',
                        class: 'add-review-field flex center-all space-between',
                        // placeholder: 'Sum up this title in one sentence'
                    }
                },
                {
                    id: makeId(),
                    type: 'textArea',
                    data: {
                        label: 'Your Review',
                        for: 'txt',
                        class: 'add-review-field flex center-all space-between',
                        // placeholder: 'Tell others what you think about this'
                    }
                },
                {
                    id: makeId(),
                    type: 'selectBox',
                    data: {
                        label: 'Rate this title',
                        opts: [1, 2, 3, 4, 5],
                        for: 'rate',
                        class: 'add-review-field flex center-all space-between'
                    }
                }
            ],
            answers: []
        }
    },
    methods: {
        setInput(ans, inputIdx) {
            this.answers.splice(inputIdx, 1, ans);
            console.log('Survey Got ev', ans);
        },
        save() {
            console.log('Survey Answers', this.answers);
            let newReview = {}
            this.answers.forEach(answer => {
                if (answer.name) newReview.name = answer.name
                if (answer.subject) newReview.subject = answer.subject
                if (answer.rate) newReview.rate = answer.rate
                if (answer.txt) newReview.txt = answer.txt
            });
            let now = new Date()
            newReview.readAt = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
            console.log('newrev', newReview)
            this.$emit('newreview', newReview)
            eventBus.$emit('newreview', newReview)
        }
    },
    created() {

    },
    computed: {
        captilizeTitle() {
            return this.booktitle
                .split(' ')
                .map(title => title.charAt(0).toUpperCase() + title.slice(1))
                .join(' ')
        }

    },
    watch: {

    },
    components: {
        textBox,
        selectBox,
        rangeBox,
        textArea,
        eventBus
    }
}

