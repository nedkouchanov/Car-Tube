import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllListings, getListingsCount } from '../api/data.js';

const allListingsTemplate = (cars, page, pages) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
    <div>Page ${page} / ${pages} 
    ${page <= 1 ? '' : html`<a class="button-list" href="/allListings?page=${page - 1}">&lt; Previous</a>`}
    ${page >= pages ? '' : html`<a class="button-list" href="/allListings?page=${page + 1}">Next &gt;</a>`}
    </div>
    ${cars.length > 0 ? cars.map(carTemplate) : html`<p class="no-cars">No cars in database.</p>`}
        
    </div>
</section>`;

const carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function allListingsPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;

    const count = await getListingsCount();
    const pages = Math.ceil(count / 3);
    const cars = await getAllListings(page);
    ctx.render(allListingsTemplate(cars, page, pages));
}