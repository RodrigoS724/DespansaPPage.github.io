const currentUrl = window.location.href;
const url = new URL(currentUrl);
const protocol = url.protocol;
const host = url.host;

// fetch(`${protocol}://${host}/store/api/items`)
fetch(`http://localhost:3000/store/api/items`)
    .then(res => res.json())
    .then(store => {
        const html = store.map(store => {
            if (store.brand === "") store.brand = "sin marca";
            switch (store.type) {
                case "f":
                    store.type = "Fruta o Verdura"
                    break;
                case "c":
                    store.type = "Consumible"
                    break;
                case "o":
                    store.type = "Otros"
                    break;
            }
            let url = store.photo_url;
            if (store.photo_url === "http://without/" || store.photo_url === "http://withOut/") {
                url = '<div cards="without">No Image</div>'
            } else {
                url = `<img src="${store.photo_url}" alt="imagen the ${store.name}"></img>`
            }
            
            return `
          <article cards="card">
                <h2>${store.name}</h2>
                <div>
                ${url}
                </div>
                <h4>${store.type}</h4>
                <h4>${store.brand}</h4>
                <div cards="price&stock">
                    <h4>price: $${store.price}</h4>
                    <h4>stock:
                        <button>+</button>
                        <span>5</span>
                        <button>-</button>
                    </h4>
                </div>
                <div cards="buttons">
                    <button>Upgrade</button>
                    <button>Delete</button>
                </div>
            </article>
          `
        }).join('');
        console.log(html);
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.insertAdjacentHTML('beforeend', html);
        
        //document.querySelector('#cardContainer').innerHTML = html;
    }).catch(error => console.error('Error fetching items:', error));