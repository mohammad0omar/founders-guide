// JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Generate table of contents for pages with long content
    const contentDiv = document.querySelector('.page-content');
    if (contentDiv) {
        const headings = contentDiv.querySelectorAll('h2');
        
        // Only create TOC if there are at least 3 headings
        if (headings.length >= 3) {
            const toc = document.createElement('div');
            toc.className = 'toc';
            
            const tocTitle = document.createElement('h3');
            tocTitle.textContent = 'Table of Contents';
            toc.appendChild(tocTitle);
            
            const tocList = document.createElement('ul');
            
            headings.forEach(function(heading, index) {
                // Add ID to the heading if it doesn't have one
                if (!heading.id) {
                    heading.id = 'section-' + index;
                }
                
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#' + heading.id;
                link.textContent = heading.textContent;
                
                listItem.appendChild(link);
                tocList.appendChild(listItem);
            });
            
            toc.appendChild(tocList);
            
            // Insert TOC after the first paragraph
            const firstParagraph = contentDiv.querySelector('p');
            if (firstParagraph) {
                firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
            } else {
                contentDiv.insertBefore(toc, contentDiv.firstChild.nextSibling);
            }
        }
    }

    // Add highlight boxes around important content
    const highlightSections = [
        { selector: 'h2:contains("Critical Success Factors")', nextElements: 5 },
        { selector: 'h2:contains("Common Success Patterns")', nextElements: 7 },
        { selector: 'h2:contains("Key Takeaways")', nextElements: 5 },
        { selector: 'h3:contains("Key Strategies")', nextElements: 3 }
    ];

    // Custom contains selector
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    highlightSections.forEach(function(section) {
        const heading = document.querySelector(section.selector);
        if (heading) {
            const highlightBox = document.createElement('div');
            highlightBox.className = 'highlight-box';
            
            // Clone the heading
            const headingClone = heading.cloneNode(true);
            highlightBox.appendChild(headingClone);
            
            // Get the next elements to include in the highlight box
            let nextElement = heading.nextElementSibling;
            for (let i = 0; i < section.nextElements && nextElement; i++) {
                const nextElementClone = nextElement.cloneNode(true);
                highlightBox.appendChild(nextElementClone);
                nextElement = nextElement.nextElementSibling;
            }
            
            // Replace the original heading with the highlight box
            heading.parentNode.replaceChild(highlightBox, heading);
        }
    });
});
