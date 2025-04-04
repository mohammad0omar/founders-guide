import markdown
import os

def convert_markdown_to_html(markdown_file, html_file, content_placeholder_id="content-placeholder"):
    """
    Convert markdown file to HTML and insert it into the HTML template file.
    
    Args:
        markdown_file: Path to the markdown file
        html_file: Path to the HTML template file
        content_placeholder_id: ID of the element where content should be inserted
    """
    # Read markdown content
    with open(markdown_file, 'r') as f:
        markdown_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(markdown_content, extensions=['tables', 'fenced_code'])
    
    # Read the HTML template
    with open(html_file, 'r') as f:
        html_template = f.read()
    
    # Replace the placeholder with the HTML content
    updated_html = html_template.replace(
        f'<div id="{content_placeholder_id}">',
        f'<div id="{content_placeholder_id}">\n{html_content}'
    )
    
    # Write the updated HTML back to the file
    with open(html_file, 'w') as f:
        f.write(updated_html)
    
    print(f"Successfully converted {markdown_file} to HTML and inserted into {html_file}")

# Define the mapping of markdown files to HTML files
file_mapping = [
    ('/home/ubuntu/million_arr_research/saas_business_models.md', '/home/ubuntu/million_arr_website/business-models.html'),
    ('/home/ubuntu/million_arr_research/case_studies.md', '/home/ubuntu/million_arr_website/case-studies.html'),
    ('/home/ubuntu/million_arr_research/key_revenue_strategies.md', '/home/ubuntu/million_arr_website/revenue-strategies.html'),
    ('/home/ubuntu/million_arr_research/actionable_implementation_plan.md', '/home/ubuntu/million_arr_website/implementation-plan.html'),
    ('/home/ubuntu/million_arr_research/achieving_1m_arr_comprehensive_guide.md', '/home/ubuntu/million_arr_website/comprehensive-guide.html')
]

# Convert each markdown file to HTML and insert into the corresponding HTML file
for markdown_file, html_file in file_mapping:
    convert_markdown_to_html(markdown_file, html_file)

print("All markdown files have been converted to HTML and inserted into the website.")
