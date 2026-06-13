'use strict';

/* ====== PRODUCTS ===== */

// INDEX

const querySelectAll = 'select * from `products`';

// SHOW
const querySelectById = 'SELECT * FROM `products` WHERE id = ?';

// FEATURED - i 5 prodotti più recenti in base a data di pubblicazione
const querySelectFeaturedProducts = `select p.*
    from products p 
    order by updated_at desc
    limit 5;`;

/* restituisce le row dei prodotti che contengono la stringa ricevuta dalla richiesta la ricerca in p.name/p.description/c.name/c.description  */

const querySelectProductBySearchString = `
    select p.*
    from products p
    join category_product cp on p.id = cp.product_id
    join categories c on c.id = cp.category_id
    where p.name like ? 
    or p.marketing_description like ? 
    or c.name like ? 
    or c.marketing_description like ?;
    `;



/* restituisce la media delle review del prodotto a partire dall'id ricevuto in request */

const querySelectProductStarRatingById = `
    select avg(r.start_rating)
    from reviews r
	join products p on p.id = r.product_id
    where p.id = ?;`;




/* ====== REVIEWS ===== */

// Query di partenza se non viene specificato alcun filtro.
const querySelectAllReviews = "SELECT * FROM reviews";

/* mostra le 3 reviews più recenti */

const querySelectFeaturedReviews = `select r.*, p.name as product_name
    from reviews r join products p on p.id = r.product_id
    where p.id = ?
    ORDER BY r.submission_date DESC
    LIMIT 3;`;

// mostra tutte le revie in base a id di un prodotto

const queryShowAllProductReviews = `select r.*, p.name as product_name, p.id as product_id
    from reviews r join products p on p.id = r.product_id
    where p.id = ?
    ORDER BY r.submission_date DESC`;

// create 

const queryCreateReview = `INSERT INTO reviews
            (title, body, start_rating, author_name, submission_date, find_it_useful, product_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

// destroy
const queryDestroyReview = `delete r.*
    from reviews r
    where r.id = ? `;


/* ====== CATEGORIES ===== */

export {
    querySelectAll,
    querySelectById,
    querySelectFeaturedProducts,
    querySelectProductBySearchString,
    querySelectProductStarRatingById,
    querySelectAllReviews,
    querySelectFeaturedReviews,
    queryShowAllProductReviews,
    queryCreateReview,
    queryDestroyReview
};