// Ambil data artikel dari file JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Menampilkan artikel di halaman
        const articlesContainer = document.getElementById('articles-container');

        data.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p class="author">author | ${article.date}</p>
                <p>${article.content}</p>
                <a href="${article.link}" class="read-more">Read More</a>
            `;

            articlesContainer.appendChild(articleElement);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));
