const productTable = document.querySelector('.product-table');
const itemName = document.querySelector('#itemName');
const forms = document.querySelector('.needs-validation');
const addProduct = document.querySelector('.btn.add-product');
const btnCancel = document.querySelector('.btn.cancel-btn');
const [productId, setProductId] = useState(null);

const boostrapModalProduct = new bootstrap.Modal(document.querySelector('.modal-product > div.modal'));


const modalSelectors = [
  { name: 'title', selector: '.modal-title' },
  { name: 'name', selector: '#itemName', RegExp: /^[a-zA-ZÀ-ÿ\s]{1,20}$/ },
  { name: 'price', selector: '#itemPrice', RegExp: /^[0-9]{1,10}$/ },
  { name: 'description', selector: '#itemDescription', RegExp: /^[0-9a-zA-ZÀ-ÿ\s]{1,100}$/ },
  { name: 'imgSrc', selector: '#itemImage' },
  { name: 'quantity', selector: '#itemQuantity', RegExp: /^[0-9]{1,10}$/ },
];


const [values, handleInputChange, setValues, reset, errors] = useForm(modalSelectors);

btnCancel.addEventListener('click', () => {
  reset();
  Object.keys(errors()).forEach((key) => {
    errors()[key].innerHTML = '';
  });
})

modalSelectors.forEach(({ name }) => {
  values()[name].value?.addEventListener('keydown', (e) => {
    handleInputChange(e)
  })
})

btnCancel.addEventListener('click', () => {
  forms.classList.remove('was-validated');
})


addProduct.addEventListener('click', (event) => {

  if (forms.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    return forms.classList.add('was-validated');
  }

  const product = {
    id: productId() || addId(),
    name: values().name.value.value,
    price: values().price.value.value,
    description: values().description.value.value,
    imgSrc: values().imgSrc.value.value,
    quantity: values().quantity.value.value,
  }

  if (products.find(({ id }) => id === product.id)) {
    const findedProduct = productTable.querySelector(`#product-${product.id}`)
    findedProduct.querySelector('.product-name').textContent = product.name;
    findedProduct.querySelector('.product-description').textContent = product.description;
    findedProduct.querySelector('.product-price').textContent = product.price;
    findedProduct.querySelector('.product-quantity').textContent = product.quantity;
    findedProduct.querySelector('.product-image').src = product.imgSrc;
    products[products.findIndex(({ id }) => id === product.id)] = product;
    reset();
    productId(null);
    forms.classList.remove('was-validated');
    return boostrapModalProduct.hide();
  };
  productsActions['add'](product);
  products.push(product);
  boostrapModalProduct.hide();
  forms.classList.remove('was-validated');
  reset();
})


/* Array.prototype.filter.call(forms, function (form) {
  addProduct.addEventListener('click', function (event) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return form.classList.add('was-validated');
    }

    const product = {
      id: productId() || generateHash(),
      name: values().name.value.value,
      price: values().price.value.value,
      description: values().description.value.value,
      imgSrc: values().imgSrc.value.value,
      quantity: values().quantity.value.value,
    }

    if (products.find(({ id }) => id === product.id)) {
      const findedProduct = productTable.querySelector(`#product-${product.id}`)
      findedProduct.querySelector('.product-name').textContent = product.name;
      findedProduct.querySelector('.product-description').textContent = product.description;
      findedProduct.querySelector('.product-price').textContent = product.price;
      findedProduct.querySelector('.product-quantity').textContent = product.quantity;
      findedProduct.querySelector('.product-image').src = product.imgSrc;
      reset();
      productId(null);
      return boostrapModalProduct.hide();
    };
    productsActions['add'](product);
    products.push(product);
    boostrapModalProduct.hide();
    reset();

  }, false);
});
 */

const productTemplate = ({ id, name, price, description, imgSrc, quantity }) => {
  const product = document.createElement('tr');
  product.classList.add('product-information');
  product.setAttribute('id', `product-${id}`);
  product.innerHTML = `
    <th scope="row">${id}</th>
    <td><img src="${imgSrc}" alt="Producto 1" class="img-thumbnail product-image" width="100"></td>
    <td class="product-name">${name}</td>
    <td class="product-description">${description}</td>
    <td>
      <strong>$<spam class="product-price">${price}</spam></strong>
    </td>
    <td class="product-quantity">${quantity}</td>
    <td>
      <button type="button" class="btn  btn-sm btn-info show-product-modal btn-edit" data-bs-toggle="modal" data-bs-target="#miModal">
        Editar
      </button>
      <a href="#" class="btn btn-danger btn-sm btn-delete">Eliminar</a>
    </td>
  `;

  const deleteButton = product.querySelector('.btn-delete');
  const editButton = product.querySelector('.btn-edit');

  deleteButton.addEventListener('click', () => {
    productsActions['delete'](product);
  });

  editButton.addEventListener('click', () => {
    const product = products.find(({ id: productId }) => productId === id);
    const modalValues = [{ name: 'title', value: 'Editar producto' }, { name: 'name', value: product.name }, { name: 'price', value: product.price }, { name: 'description', value: product.description }, { name: 'imgSrc', value: product.imgSrc }, { name: 'quantity', value: product.quantity }]
    setProductId(id);
    modalValues.forEach(({ name, value }) => {
      values()[name].value.value = value;
    });
  });

  return product;
}




const productsActions = {
  add: (product) => {
    const newProduct = productTemplate(product);
    newProduct && productTable.appendChild(newProduct);
  },
  delete: (product) => {
    productTable.removeChild(product)
    const index = products.findIndex(({ id }) => id === product.id);
    products.splice(index, 1);
    console.log(products)
  },
}

products && products.forEach(product => {
  productsActions['add'](product);
});


