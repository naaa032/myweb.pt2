const form = document.getElementById('belanjaForm');
const namaInput = document.getElementById('namaBarang');
const hargaInput = document.getElementById('hargaBarang');
const tabel = document.getElementById('tabelBelanja');
const tabelBody = tabel.querySelector('tbody');
const totalDisplay = document.getElementById('totalHarga');
const resetBtn = document.getElementById('resetBtn');

let daftarBelanja = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = namaInput.value.trim();
  const harga = parseFloat(hargaInput.value);

  if (nama && harga > 0) {
    daftarBelanja.push({ nama, harga });
    renderTabel();
    namaInput.value = '';
    hargaInput.value = '';
  }
});

resetBtn.addEventListener('click', function() {
  daftarBelanja = [];
  renderTabel();
});

function renderTabel() {
  tabelBody.innerHTML = '';
  let total = 0;

  if (daftarBelanja.length === 0) {
    tabel.classList.add('hidden');
    return;
  } else {
    tabel.classList.remove('hidden');
  }

  daftarBelanja.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nama}</td>
      <td>${item.harga.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
      <td><button class="delete-btn" onclick="hapusItem(${index})">Hapus</button></td>
    `;
    tabelBody.appendChild(row);
    total += item.harga;
  });

  totalDisplay.textContent = `Rp ${total.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;
}

function hapusItem(index) {
  daftarBelanja.splice(index, 1);
  renderTabel();
}
