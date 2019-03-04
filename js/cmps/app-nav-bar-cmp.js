
export default {
    template: `
            <div class="nav-drawer flex center-all" @click="showDrawer = !showDrawer" title="Apps"><i class="fas fa-th"></i>
                <nav v-show="showDrawer" class="apps-container-nav" >
                    <div class="app-container-nav">
                        <router-link to="/" exact class="nb-link" title="Home">
                        <i class="fas fa-home"></i>
                             Home
                        </router-link>
                    </div>
                    <div class="app-container-nav">
                    <router-link to="/email"  class="nb-link" title="Email">
                        <i class="fas fa-envelope-open"></i>
                             Email
                        </router-link>
                    </div>
                    <div class="app-container-nav">
                        <router-link to="/keep"  class="nb-link" title="Keep">
                            <i class="fas fa-sticky-note"></i>
                            Keep
                        </router-link>
                    </div>
                    <div class="app-container-nav">
                        <router-link to="/books" class="nb-link" title="Books">
                            <i class="fas fa-book"></i>
                            Books
                        </router-link>
                    </div>
                </nav>
            </div>
        `,
    data() {
        return {
            showDrawer: false,
        }
    }
}
