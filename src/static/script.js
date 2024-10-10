// Load configuration
fetch('/config.json')
    .then(response => response.json())
    .then(config => {
        // Populate business details
        document.getElementById('businessName').textContent = config.businessName;
        document.getElementById('businessAddress').innerHTML = `
            ${config.businessAddress.name}<br>
            ${config.businessAddress.street}<br>
            ${config.businessAddress.city}, ${config.businessAddress.state} ${config.businessAddress.zip}<br>
            ${config.businessAddress.country}<br>
            ${config.businessAddress.phone}<br>
            ${config.businessAddress.email}
        `;

        // Populate client details
        document.getElementById('clientAddress').innerHTML = `
            ${config.clientName}<br>
            ${config.clientAddress.street}<br>
            ${config.clientAddress.city}, ${config.clientAddress.state} ${config.clientAddress.zip}<br>
            ${config.clientAddress.country}
        `;

        // Populate bank details
        document.getElementById('bankDetails').innerHTML += `
            <p><strong>Bank Name:</strong> ${config.bankDetails.bankName}</p>
            <p><strong>Account Name:</strong> ${config.bankDetails.accountName}</p>
            <p><strong>Account Number:</strong> ${config.bankDetails.accountNumber}</p>
            <p><strong>Routing Number:</strong> ${config.bankDetails.routingNumber}</p>
        `;

        // Populate invoice number and dates from config
        document.getElementById('invoiceNumber').textContent = config.invoiceNumber;
        document.getElementById('issueDate').textContent = new Date(config.issueDate).toISOString().split('T')[0];
        document.getElementById('dueDate').textContent = new Date(config.dueDate).toISOString().split('T')[0];

        // Update items with work period from config
        const workPeriod = `${config.workPeriod.startDate} - ${config.workPeriod.endDate}`;
        items[0].description = `Software Development (${workPeriod})`;

        // Populate items and calculate total
        populateItems();
    });

// Sample items (you can replace this with dynamic data)
const items = [
    { description: "Software Development", quantity: 160, rate: 78.125 }//,
    // { description: "UI/UX Design", quantity: 40, rate: 120 },
    // { description: "Project Management", quantity: 20, rate: 100 }
];

// Function to populate items and calculate total
function populateItems() {
    const itemList = document.getElementById('itemList');
    let total = 0;

    items.forEach(item => {
        const row = itemList.insertRow();
        row.insertCell(0).textContent = item.description;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `$${item.rate.toFixed(3)}/hour`;
        const itemTotal = item.quantity * item.rate;
        row.insertCell(3).textContent = `$${itemTotal.toFixed(2)}`;
        total += itemTotal;
    });

    document.getElementById('invoiceTotal').textContent = total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// PDF export functionality
document.getElementById('exportButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    html2canvas(document.getElementById('invoice')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Generate filename with current date and time
        const now = new Date();
        const dateTime = now.toISOString().replace(/[:.]/g, '-').slice(0, -5); // Format: YYYY-MM-DDTHH-mm
        doc.save(`will_wright_engineering_invoice_${dateTime}.pdf`);
    });
});
