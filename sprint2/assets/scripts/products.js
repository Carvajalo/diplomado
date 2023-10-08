const addId = (id) => {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
  const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');

  return timestamp + machineId + processId + counter;
}

const productBoilerplate = ({ id }) => {
  return {
    id: addId(id),
    name: `Product ${id}`,
    price: Math.floor(Math.random() * (500 - 100) +100),
    description: `Description ${id}`,
    imgSrc: 'assets/descarga.svg',
    quantity: id,
  }
};


const testProduct = productBoilerplate({ id: 1 });

const products = Array.from({ length: 6 }, (_, i) => productBoilerplate({ id: i + 1 }));