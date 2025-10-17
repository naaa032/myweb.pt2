const container = document.getElementById('biodataContainer');

fetch('../user.json')
  .then(response => {
    if (!response.ok) throw new Error('Gagal memuat data biodata');
    return response.json();
  })
  .then(data => {
    container.innerHTML = `
      <p><strong>Nama:</strong> ${data.nama}</p>
      <p><strong>NIM:</strong> ${data.nim}</p>
      <p><strong>Jurusan:</strong> ${data.jurusan}</p>
      <p><strong>Universitas:</strong> ${data.universitas}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>GitHub:</strong> 
        <a href="https://github.com/${data.github}" target="_blank">${data.github}</a>
      </p>
    `;
  })
  .catch(error => {
    container.innerHTML = `<p style="color:red;">${error.message}</p>`;
  });
