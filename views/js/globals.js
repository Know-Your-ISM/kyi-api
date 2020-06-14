/* Globals */
const admnoRegex = /\d/;
let currentPage = 1;

/* State */
let state = {
    page: 1,
    screenWidth: document.documentElement.clientWidth,
    filters: this.screenWidth < 767 ? 'closed' : 'open',
    lastAlert: '',
    currentAlert: '',
    online: true,
    scheme: 'light'
}