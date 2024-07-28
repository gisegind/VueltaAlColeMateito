// Para clickear sobre el boton de la barra de menu en dispositivos mobile
document.querySelector('.menu-mobile').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('show');
});

//con este script realizo la búsqueda del producto en la pantalla de productos y tambien en descargables
document.querySelector('.search-input').addEventListener('input', function () {
    const query = this.value.toLowerCase();

    const destacadoContainer = document.getElementById('destacado-container');
    const resultContainer = document.getElementById('result-container');
    const resultGrid = resultContainer.querySelector('.result-grid');
    const destacadosTitle = document.getElementById('destacados-title');
    const destacadoGrid = document.getElementById('destacado-grid');

    if (query === '') {
        // Mostrar destacados y ocultar resultados si el input está vacío
        destacadoContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        resultGrid.innerHTML = '';
    } else {
        // Buscar en ambos archivos
        const promises = [fetch('productos.html'), fetch('descargables.html')];

        Promise.all(promises)
            .then(responses => Promise.all(responses.map(response => response.text())))
            .then(data => {
                let results = '';

                data.forEach(htmlContent => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html');
                    const rows = doc.querySelectorAll('.product-row');

                    rows.forEach(row => {
                        const productName = row.querySelector('.product-name').textContent.toLowerCase();
                        if (productName.includes(query)) {
                            results += `
                <div class="product-row">
                  <div class="product-image">
                    ${row.querySelector('.product-image').innerHTML}
                  </div>
                  <div class="product-details">
                    <h3 class="product-name">${row.querySelector('.product-name').innerHTML}</h3>
                    <p class="product-description">${row.querySelector('.product-description').innerHTML}</p>
                    <p class="product-price">${row.querySelector('.product-price').innerHTML}</p>
                  </div>
                </div>
              `;
                        }
                    });
                });

                if (results) {
                    // Mostrar resultados y ocultar destacados
                    resultGrid.innerHTML = results;
                    destacadoContainer.style.display = 'none';
                    resultContainer.style.display = 'block';
                } else {
                    // Mostrar destacados y ocultar resultados si no hay coincidencias
                    resultGrid.innerHTML = '';
                    destacadoContainer.style.display = 'block';
                    resultContainer.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Manejar posibles errores al obtener los archivos
            });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const resultContainer = document.getElementById('result-container-p');
    const productContainer = document.getElementById('product-container');
    const resultGrid = document.querySelector('.result-grid');
    const products = document.querySelectorAll('.product-row');

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        let matches = 0;

        products.forEach(function (product) {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();

            if (productName.includes(searchTerm)) {
                product.style.display = 'flex';
                resultGrid.appendChild(product.cloneNode(true)); // Clona y añade el producto al resultado de búsqueda
                matches++;
            } else {
                product.style.display = 'none';
            }
        });

        if (matches > 0) {
            productContainer.style.display = 'none';
            resultContainer.style.display = 'block';
        } else {
            productContainer.style.display = 'block';
            resultContainer.style.display = 'none';
        }
    });
});





