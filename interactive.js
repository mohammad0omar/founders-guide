// Additional interactive elements for the $1M ARR website
document.addEventListener('DOMContentLoaded', function() {
    // Add search functionality
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Search the guide...">
        <button id="search-button"><i class="fas fa-search"></i></button>
        <div id="search-results" class="search-results"></div>
    `;
    
    // Insert search container in the navigation
    const navContainer = document.querySelector('nav .container');
    if (navContainer) {
        navContainer.appendChild(searchContainer);
    }
    
    // Simple search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchButton && searchInput && searchResults) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (query.length < 3) {
            searchResults.innerHTML = '<p>Please enter at least 3 characters</p>';
            searchResults.style.display = 'block';
            return;
        }
        
        const content = document.querySelector('.page-content');
        if (!content) return;
        
        const paragraphs = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
        const matches = [];
        
        paragraphs.forEach(function(element) {
            const text = element.textContent.toLowerCase();
            if (text.includes(query)) {
                matches.push({
                    element: element,
                    text: element.textContent
                });
            }
        });
        
        if (matches.length > 0) {
            searchResults.innerHTML = '';
            const resultsList = document.createElement('ul');
            
            matches.slice(0, 5).forEach(function(match) {
                const listItem = document.createElement('li');
                const text = match.text.length > 100 ? 
                    match.text.substring(0, 100) + '...' : 
                    match.text;
                
                listItem.textContent = text;
                listItem.addEventListener('click', function() {
                    match.element.scrollIntoView({ behavior: 'smooth' });
                    match.element.style.backgroundColor = '#ffff99';
                    setTimeout(function() {
                        match.element.style.backgroundColor = '';
                    }, 2000);
                    searchResults.style.display = 'none';
                });
                
                resultsList.appendChild(listItem);
            });
            
            searchResults.appendChild(resultsList);
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<p>No results found</p>';
            searchResults.style.display = 'block';
        }
    }
    
    // Add progress tracker for comprehensive guide
    if (window.location.href.includes('comprehensive-guide.html')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const fullHeight = document.body.scrollHeight;
            const scrolled = window.scrollY;
            
            const percentScrolled = (scrolled / (fullHeight - windowHeight)) * 100;
            progressBar.style.width = percentScrolled + '%';
        });
    }
    
    // Add collapsible sections for implementation plan
    if (window.location.href.includes('implementation-plan.html')) {
        const phases = document.querySelectorAll('h2');
        
        phases.forEach(function(phase) {
            if (phase.textContent.includes('Phase') || phase.textContent.includes('Month')) {
                // Make the heading clickable
                phase.style.cursor = 'pointer';
                phase.innerHTML += ' <i class="fas fa-chevron-down"></i>';
                
                // Find content to collapse (everything until next h2)
                const content = [];
                let nextElement = phase.nextElementSibling;
                
                while (nextElement && nextElement.tagName !== 'H2') {
                    content.push(nextElement);
                    nextElement = nextElement.nextElementSibling;
                }
                
                // Create collapsible container
                const container = document.createElement('div');
                container.className = 'collapsible-content';
                
                // Move content into container
                content.forEach(function(element) {
                    container.appendChild(element.cloneNode(true));
                });
                
                // Insert container after heading
                phase.parentNode.insertBefore(container, phase.nextSibling);
                
                // Remove original elements
                content.forEach(function(element) {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                });
                
                // Add click event
                phase.addEventListener('click', function() {
                    this.classList.toggle('active');
                    container.classList.toggle('active');
                    
                    // Toggle icon
                    const icon = this.querySelector('i');
                    if (icon) {
                        if (container.classList.contains('active')) {
                            icon.className = 'fas fa-chevron-up';
                        } else {
                            icon.className = 'fas fa-chevron-down';
                        }
                    }
                });
            }
        });
    }
});
