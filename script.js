// Sample data
const invoiceData = {
    soldBy: {
        name: "Varasidihi Silk Exports",
        address: "75, 3rd Cross, Lalbagh Road, BENGALURU, KARNATAKA, 560027, IN",
        pan: "AACFV3325K",
        gst: "29AACFV3325K1ZY"
    },
    billing: {
        name: "Madhu B",
        address: "Eurofins IT Solutions India Pvt Ltd., 1st Floor, Maruti Platinum, Lakshminarayana Pura, AECS Layout, BENGALURU, KARNATAKA, 560037, IN",
        code: "29"
    },
    shipping: {
        name: "Madhu B",
        address: "Eurofins IT Solutions India Pvt Ltd., 1st Floor, Maruti Platinum, Lakshminarayana Pura, AECS Layout, BENGALURU, KARNATAKA, 560037, IN",
        code: "29"
    },
    supplyPlace: "KARNATAKA",
    deliveryPlace: "KARNATAKA",
    order: {
        number: "403-3225714-7676307",
        date: "28.10.2019"
    },
    invoice: {
        number: "IN-761",
        details: "KA-310565025-1920",
        date: "28.10.2019"
    },
    reverseCharge: "No",
    items: [
        {
            description: "Varasidihi Silks Men's Formal Shirt (SH-05-42, Navy Blue, 42)",
            unitPrice: 538.10,
            quantity: 1,
            discount: 0,
            netAmount: 538.10,
            taxRate: 18
        },
        {
            description: "Shipping Charges",
            unitPrice: 30.96,
            quantity: 1,
            discount: 0,
            netAmount: 30.96,
            taxRate: 18
        },
        {
            description: "Varasidihi Silks Men's Formal Shirt (SH-05-40, Navy Blue, 40)",
            unitPrice: 538.10,
            quantity: 1,
            discount: 0,
            netAmount: 538.10,
            taxRate: 18
        },
        {
            description: "Shipping Charges",
            unitPrice: 30.96,
            quantity: 1,
            discount: 0,
            netAmount: 30.96,
            taxRate: 18
        }
    ]
};
function numberToWords(num) {
    const a = [
        '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const g = ['', 'thousand', 'million', 'billion', 'trillion'];
    
    let w = '';
    
    for (let i = 0, p = 1; i < g.length && num > 0; i++, num = Math.floor(num / 1000)) {
        let h = Math.floor(num % 1000);
        if (h === 0) continue;
        let n = '';
        if (Math.floor(h / 100) > 0) n += a[Math.floor(h / 100)] + ' hundred ';
        h = h % 100;
        if (h > 0) n += (n !== '' ? 'and ' : '') + (h < 20 ? a[h] : b[Math.floor(h / 10)] + (h % 10 > 0 ? '-' + a[h % 10] : ''));
        w = n + ' ' + g[i] + ' ' + w;
    }
    return w.trim();
}
document.getElementById('sold-by').innerText = invoiceData.soldBy.name;
document.getElementById('sold-address').innerText = invoiceData.soldBy.address;
document.getElementById('sold-pan').innerText = "PAN No: " + invoiceData.soldBy.pan;
document.getElementById('sold-gst').innerText = "GST Registration No: " + invoiceData.soldBy.gst;

document.getElementById('billing-name').innerText = invoiceData.billing.name;
document.getElementById('billing-address').innerText = invoiceData.billing.address;
document.getElementById('billing-code').innerText = "State/UT Code: " + invoiceData.billing.code;

document.getElementById('shipping-name').innerText = invoiceData.shipping.name;
document.getElementById('shipping-address').innerText = invoiceData.shipping.address;
document.getElementById('shipping-code').innerText = "State/UT Code: " + invoiceData.shipping.code;
document.getElementById('supply-place').innerText = "Place of supply: " + invoiceData.supplyPlace;
document.getElementById('delivery-place').innerText = "Place of delivery: " + invoiceData.deliveryPlace;

document.getElementById('order-number').innerText = "Order Number: " + invoiceData.order.number;
document.getElementById('order-date').innerText = "Order Date: " + invoiceData.order.date;

document.getElementById('invoice-number').innerText = "Invoice Number: " + invoiceData.invoice.number;
document.getElementById('invoice-details').innerText = "Invoice Details: " + invoiceData.invoice.details;
document.getElementById('invoice-date').innerText = "Invoice Date: " + invoiceData.invoice.date;

document.getElementById('reverse-charge').innerText = invoiceData.reverseCharge;

let totalAmount = 0;

invoiceData.items.forEach(item => {
    const netAmount = item.unitPrice * item.quantity - item.discount;
    const taxAmount = netAmount * (item.taxRate / 100);
    const totalItemAmount = netAmount + taxAmount;

    const taxType = invoiceData.supplyPlace === invoiceData.deliveryPlace ? 'CGST 9% + SGST 9%' : 'IGST 18%';

    totalAmount += totalItemAmount;

    document.getElementById('items-list').innerHTML += `
        <tr class="item">
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>₹${item.unitPrice.toFixed(2)}</td>
            <td>₹${netAmount.toFixed(2)}</td>
            <td>${item.taxRate}%</td>
            <td>${taxType}</td>
            <td>₹${taxAmount.toFixed(2)}</td>
            <td>₹${totalItemAmount.toFixed(2)}</td>
        </tr>
    `;
});

document.getElementById('total-amount').innerText = `Total: ₹${totalAmount.toFixed(2)}`;
document.getElementById('amount-in-words').innerText = "Amount in Words: " + numberToWords(totalAmount) + " only";
document.getElementById('seller-name').innerText = invoiceData.soldBy.name;
