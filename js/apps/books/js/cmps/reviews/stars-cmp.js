export default {
    props:['rate'],
    template:`
    <section>
        <span class="stars">{{convertRateToStars}}</span> {{rate}}
    </section>
    `,
    computed: {
        convertRateToStars(){
            let stars = '';
            for (let i=0; i < 5 ; i++){
                if (i < this.rate) {
                    stars += '★'
                } else {
                    stars += '☆'
                }
            }
            return stars
        }
    }
}