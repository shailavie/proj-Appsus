import { eventBus, EVENT_NOTE_TO_EMAIL, EVENT_APP_CHANGE } from './services/eventbus-service.js'

export default {
    template: `
      <section>
        <div class="home-apps">
            <div class="apps-container">
                <div class="app-container">
                    <router-link to="/email" class="nb-link" title="Email">
                        <i class="fas fa-envelope-open"></i>
                        <h2>Email</h2>
                    </router-link>
                </div>
                <div class="app-container">
                    <router-link to="/keep" class="nb-link" title="Keep">
                        <i class="fas fa-sticky-note"></i>
                        <h2>Keep</h2>
                    </router-link>
                </div>
                <div class="app-container">
                    <router-link to="/books" class="nb-link" title="Books">
                        <i class="fas fa-book"></i>
                        <h2>Books</h2>
                    </router-link>
                </div>
            </div>
            <div class="about-us flex row space-between">
                <div class="creator-card flex column center-all">
                    <img class="creator-img" src="https://sarelk.github.io/my-gallery/img/sarel.jpg" />
                    <h2>Sarel K</h2>
                    <p> 
                    A truly web geek since the days of 2007. Feel free to browse my projects (link below), 
                    and contact me in case you want to work on something togheter. 
                    <br>
                    <br>
                    Will love to hear from you 
                    </p>
                    <ul class="list-inline social-buttons">
						<li class="list-inline-item">
							<a href="https://github.com/sarelk">
								<i class="fab fa-github"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a href="https://www.facebook.com/sarel.kaminsky/">
								<i class="fab fa-facebook"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a href="https://il.linkedin.com/in/sarel-kaminsky-514346107/">
								<i class="fab fa-linkedin"></i>
							</a>
						</li>
					</ul>               
                </div>
                <div class="creator-card flex column center-all">
                    <img class="creator-img" src="https://shailavie.github.io/proj-myPortfolio/img/about/profile-pic.png" />
                    <h2>Shai L</h2>
                    <p>Product Marketing Manager with additional experience in product, UX and analysis. 
                        <br/>
                        <br/>
                    I am passionate, creative and collaborative with strong communication and interpersonal abilities. 
                    </p> 
                    <ul class="list-inline social-buttons">
						<li class="list-inline-item">
							<a href="https://github.com/shailavie">
								<i class="fab fa-github"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a href="https://api.whatsapp.com/send?phone=972528985898">
                                <i class="fab fa-whatsapp"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a href="https://www.instagram.com/shai.lavie/">
								<i class="fab fa-instagram"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a href="https://www.linkedin.com/in/shai-lavie-5a294285/">
								<i class="fab fa-linkedin"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a href="https://www.facebook.com/shai.lavie">
								<i class="fab fa-facebook"></i>
							</a>
						</li>
					</ul>               
                </div>
            </div>
        </div>
    </section>`,
    created() {
        window.document.title = 'Appsus'
        eventBus.$emit(EVENT_APP_CHANGE,'Appsus')
        eventBus.$on(EVENT_NOTE_TO_EMAIL, emailFromNote => {
            let url = `index.html#/email/compose/${emailFromNote.id}&${emailFromNote.subject}&${emailFromNote.body}`
            window.location = url
        })
    },
    component: {
        eventBus,
    }
}