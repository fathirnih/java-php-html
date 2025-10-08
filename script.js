// Ambil data artikel dari file JSON
fetch('data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Jaringan atau file JSON tidak ditemukan');
        }
        return response.json();
    })
    .then(data => {
        const articlesContainer = document.getElementById('articles-container');

        if (data && data.length > 0) {
            data.forEach((article, index) => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');

                articleElement.innerHTML = `
                    <img src="${article.image}" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p class="author">author | ${article.date}</p>
                    <p>${article.content.substring(0, 100)}...</p>
                    <a href="#" class="read-more" data-index="${index}">Read More</a>
                `;

                articlesContainer.appendChild(articleElement);
            });
        } else {
            articlesContainer.innerHTML = '<p>Tidak ada artikel yang ditemukan.</p>';
        }

        // ===== Modal logic =====
        const modal = document.getElementById('article-modal');
        const closeBtn = document.querySelector('.close');
        const modalTitle = document.getElementById('modal-title');
        const modalAuthor = document.getElementById('modal-author');
        const modalContent = document.getElementById('modal-content');
        const modalImage = document.getElementById('modal-image');

        // Event listener untuk tombol "Read More"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more')) {
                e.preventDefault();
                const index = e.target.dataset.index;
                const article = data[index];

                // Isi modal dengan data dari artikel
                modalTitle.textContent = article.title;
                modalAuthor.textContent = `author | ${article.date}`;
                modalContent.textContent = article.content;
                modalImage.src = article.image;

                modal.style.display = 'block';
            }
        });

        // Tutup modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Klik di luar modal untuk menutup
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

// ========== DARK MODE ==========
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Cek jika dark mode sudah disimpan di localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '🌞';
}

// Menambahkan event listener untuk tombol
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '🌞';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙';
    }
});
