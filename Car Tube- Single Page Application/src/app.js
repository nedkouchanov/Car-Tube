import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout as logoutUser } from './api/data.js';
import { homePage } from './views/home.js';
import { allListingsPage } from './views/allListings.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myListingsPage } from './views/myListings.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('site-content');
document.getElementById('logout').addEventListener('click', logout);

setNav();

page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/', decorateContext, homePage);
page('/allListings', decorateContext, allListingsPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/myListings', decorateContext, myListingsPage);
page('/search', decorateContext, searchPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setNav = setNav;
    next();
}

function setNav() {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('welcome').innerHTML = `Welcome, ${username}`;
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }
}

async function logout() {
    await logoutUser();
    setNav();
    page.redirect('/');
}