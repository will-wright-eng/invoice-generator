# Invoice Generator

This is a simple invoice generator for tech contractors, built with HTML, CSS, and JavaScript, and containerized with Docker.

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. Clone this repository
2. Navigate to the project directory
3. Copy `src/config.example.json` to `src/config.json` and update it with your details
4. Run `docker-compose up --build`
5. Open your browser and go to `http://localhost:8080`

## Features

- Generate professional-looking invoices
- Export invoices to PDF
- Customizable invoice details via configuration file
- Responsive design

## Project Structure


/invoice-generator
    /src
        /static
            styles.css
            script.js
        index.html
        config.json
        config.example.json
    /nginx
        nginx.conf
    docker-compose.yml
    Dockerfile
    README.md
    .gitignore


## Customization

To customize the invoice details, edit the `config.json` file in the `src` directory. For styling changes, modify `styles.css`, and for functionality changes, update `script.js`.

## Security Note

The `config.json` file contains sensitive information and is ignored by git. Make sure to keep your actual `config.json` file secure and never commit it to version control.

## License

This project is open source and available under the MIT License.

