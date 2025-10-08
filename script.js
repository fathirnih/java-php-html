// Ambil data artikel dari file JSON
fetch('data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Jaringan atau file JSON tidak ditemukan');
        }
        return response.json();
    })
    .then(data => {
        // Menampilkan artikel di halaman
        const articlesContainer = document.getElementById('articles-container');

        // Cek jika data ada
        if (data && data.length > 0) {
            data.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');

                articleElement.innerHTML = `
                    <img src="${article.image}" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p class="author">author | ${article.date}</p>
                    <p>${article.content}</p>
                    <a href="${article.link}" class="read-more">Read More</a>
                `;

                articlesContainer.appendChild(articleElement);
            });
        } else {
            articlesContainer.innerHTML = '<p>Tidak ada artikel yang ditemukan.</p>';
        }
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });


// Ambil elemen tombol Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Cek jika dark mode sudah disimpan di localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '🌞'; // Ganti ikon menjadi 🌞 saat dark mode aktif
}

// Menambahkan event listener untuk tombol
darkModeToggle.addEventListener('click', () => {
    // Toggle class dark-mode pada body
    document.body.classList.toggle('dark-mode');
    
    // Cek apakah dark mode aktif dan simpan statusnya di localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '🌞'; // Ganti ikon menjadi 🌞 saat dark mode aktif
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙'; // Ganti ikon menjadi 🌙 saat light mode aktif
    }
});
