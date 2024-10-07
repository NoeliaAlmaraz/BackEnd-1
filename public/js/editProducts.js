document.querySelectorAll('.editButton').forEach(button => {
    button.addEventListener('click', function() {

        const productId = this.getAttribute('data-id');
        const originalTitle = this.getAttribute('data-title');
        const originalAuthor = this.getAttribute('data-author');
        const originalPrice = this.getAttribute('data-price');
        const originalStock = this.getAttribute('data-stock');
        const originalCategory = this.getAttribute('data-category');
        const originalPhoto = this.getAttribute('data-photo');


        
        Swal.fire({
            title: 'Edit Product',
            html: `
                <form id="editProductForm" class="container">
                    <div class="mb-3">
                        <label for="swal-input-title" class="form-label">Title</label>
                        <input id="swal-input-title" class="form-control" value="${originalTitle}">
                    </div>
                    <div class="mb-3">
                        <label for="swal-input-author" class="form-label">Author</label>
                        <input id="swal-input-author" class="form-control" value="${originalAuthor}">
                    </div>
                    <div class="mb-3">
                        <label for="swal-input-price" class="form-label">Price</label>
                        <input id="swal-input-price" class="form-control" type="number" value="${originalPrice}" step="0.01">
                    </div>
                    <div class="mb-3">
                        <label for="swal-input-stock" class="form-label">Stock</label>
                        <input id="swal-input-stock" class="form-control" type="number" value="${originalStock}">
                    </div>
                    <div class="mb-3">
                        <label for="swal-input-category" class="form-label">Category</label>
                        <input id="swal-input-category" class="form-control" value="${originalCategory}">
                    </div>
                    <div class="mb-3">
                        <label for="swal-input-photo" class="form-label">URL photo</label>
                        <input id="swal-input-photo" class="form-control" value="${originalPhoto}">
                    </div>
                </form>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            preConfirm: () => {

                const updatedProduct = {};
        
                const newTitle = document.getElementById('swal-input-title').value;
                const newAuthor = document.getElementById('swal-input-author').value;
                const newPrice = document.getElementById('swal-input-price').value;
                const newStock = document.getElementById('swal-input-stock').value;
                const newCategory = document.getElementById('swal-input-category').value;
                const newPhoto = document.getElementById('swal-input-photo').value;
        
                if (newTitle !== originalTitle) updatedProduct.title = newTitle;
                if (newAuthor !== originalAuthor) updatedProduct.author = newAuthor;
                if (newPrice !== originalPrice) updatedProduct.price = newPrice;
                if (newStock !== originalStock) updatedProduct.stock = newStock;
                if (newCategory !== originalCategory) updatedProduct.category = newCategory;
                if (newPhoto !== originalPhoto) updatedProduct.photo = newPhoto;
        
                return updatedProduct;
            }
        }).then((result) => {
            if (result.isConfirmed && Object.keys(result.value).length > 0) {

                const updatedProduct = result.value;

                fetch(`/products/update/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating product');
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated product',
                        text: 'The product has been successfully updated.',
                        confirmButtonText: 'Accept'
                    }).then(() => {

                        location.reload();
                    });
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error updating',
                        text: error.message,
                        confirmButtonText: 'Accept'
                    });
                });
            }
        });
    });
});