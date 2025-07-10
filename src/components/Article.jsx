function Article({ data }) {

    const { name, price } = data;

    return (
        <article>
            <h2>Articolo: {name}</h2>
            <span>Prezzo: {price} euro</span>
        </article>
    )
}

export default Article;