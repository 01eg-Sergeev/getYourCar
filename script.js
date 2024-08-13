function checkCart() {
    Ecwid.Cart.get(function (cart) {
        let uniqueProductIds = new Set(cart.items.map(item => item.product.id));

        if (uniqueProductIds.size >= 5) {
            document.getElementById('carImage').style.display = 'none';
            document.getElementById('title').style.display = 'none';
            document.getElementById('instructions').style.display = 'none';
            document.getElementById('carCompleteMessage').style.display = 'block';
        } else {
            document.getElementById('carImage').style.display = 'block';
            document.getElementById('title').style.display = 'block';
            document.getElementById('instructions').style.display = 'block';
            document.getElementById('carCompleteMessage').style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(checkCart, 500);
});

function addToCart(productId) {
    var product = {
        id: productId,
        quantity: 1,
        options: {
            "Size": "L"
        },
        callback: function (success, product, cart) {
            checkCart();
        }
    }
    Ecwid.Cart.addProduct(product);
}
Ecwid.OnCartChanged.add(function (cart) {
    checkCart();
});
