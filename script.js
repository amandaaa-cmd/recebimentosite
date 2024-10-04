let isAuthenticated = false;
const correctPassword = "poloar2024";
let products = [];

function requestAuth() {
  if (!isAuthenticated) {
    document.getElementById('tableContainer').style.display = 'none';
    document.getElementById('authContainer').style.display = 'block';
  } else {
    showForm();
  }
}

function authenticate() {
  const enteredPassword = document.getElementById('authPassword').value;
  if (enteredPassword === correctPassword) {
    isAuthenticated = true;
    showForm();
  } else {
    alert("Senha incorreta!");
  }
}

function showForm() {
  document.getElementById('authContainer').style.display = 'none';
  document.getElementById('formContainer').style.display = 'block';
}

function showTable() {
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('authContainer').style.display = 'none';
  document.getElementById('tableContainer').style.display = 'block';
  renderTable();
}

function addProduct() {
  const product = {
    data: document.getElementById('data').value,
    fornecedor: document.getElementById('fornecedor').value,
    codigo: document.getElementById('codigo').value,
    descricao: document.getElementById('descricao').value,
    quantidade: document.getElementById('quantidade').value,
    status: document.getElementById('status').value
  };
  products.push(product);
  alert("Produto adicionado!");
  clearForm();
  renderTable();
}

function editProduct() {
  const selectedProductIndex = document.getElementById('productSelect').selectedIndex - 1;
  if (selectedProductIndex < 0) {
    alert("Selecione um produto para editar!");
    return;
  }
  products[selectedProductIndex] = {
    data: document.getElementById('data').value,
    fornecedor: document.getElementById('fornecedor').value,
    codigo: document.getElementById('codigo').value,
    descricao: document.getElementById('descricao').value,
    quantidade: document.getElementById('quantidade').value,
    status: document.getElementById('status').value
  };
  alert("Produto editado!");
  clearForm();
  renderTable();
}

function deleteProduct() {
  const selectedProductIndex = document.getElementById('productSelect').selectedIndex - 1;
  if (selectedProductIndex < 0) {
    alert("Selecione um produto para excluir!");
    return;
  }
  products.splice(selectedProductIndex, 1);
  alert("Produto excluído!");
  clearForm();
  renderTable();
}

function fillProductDetails() {
  const selectedProductIndex = document.getElementById('productSelect').selectedIndex - 1;
  if (selectedProductIndex < 0) return;

  const product = products[selectedProductIndex];
  document.getElementById('data').value = product.data;
  document.getElementById('fornecedor').value = product.fornecedor;
  document.getElementById('codigo').value = product.codigo;
  document.getElementById('descricao').value = product.descricao;
  document.getElementById('quantidade').value = product.quantidade;
  document.getElementById('status').value = product.status;
}

function clearForm() {
  document.getElementById('data').value = '';
  document.getElementById('fornecedor').value = 'LG';
  document.getElementById('codigo').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('status').value = 'Agendado';
  document.getElementById('productSelect').selectedIndex = 0;
}

function filterProducts() {
  const filterFornecedor = document.getElementById('filterFornecedor').value;
  const filterStatus = document.getElementById('filterStatus').value;
  const filterData = document.getElementById('filterData').value;
  const filterDescricao = document.getElementById('filterDescricao').value.toLowerCase();

  const filteredProducts = products.filter(product => {
    return (
      (filterFornecedor === '' || product.fornecedor === filterFornecedor) &&
      (filterStatus === '' || product.status === filterStatus) &&
      (filterData === '' || product.data === filterData) &&
      (filterDescricao === '' || product.descricao.toLowerCase().includes(filterDescricao))
    );
  });

  renderTable(filteredProducts);
}

function renderTable(filteredProducts = products) {
  const tableBody = document.getElementById('productTable');
  tableBody.innerHTML = '';

  filteredProducts.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.data}</td>
      <td>${product.fornecedor}</td>
      <td>${product.codigo}</td>
      <td>${product.descricao}</td>
      <td>${product.quantidade}</td>
      <td>${product.status}</td>
    `;
    tableBody.appendChild(row);
  });

  updateProductSelect();
}

function updateProductSelect() {
  const productSelect = document.getElementById('productSelect');
  productSelect.innerHTML = '<option value="">-- Selecione uma mercadoria --</option>';

  products.forEach((product, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${product.descricao} (${product.codigo})`;
    productSelect.appendChild(option);
  });
}
