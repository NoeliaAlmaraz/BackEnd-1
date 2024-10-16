document.querySelectorAll('.deleteButton').forEach(button => {
    button.addEventListener('click', function() {
        console.log("boton clicado");
        const productId = this.getAttribute('data-id'); 

        
        
        Swal.fire({
            title: "You're sure?",
            text: "You will not be able to recover this product!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                
                fetch(`/products/delete/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el producto');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Product removed:', data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Product removed',
                        text: 'The product has been disposed of correctly.',
                        showConfirmButton: true,
                        confirmButtonText: 'Accept'
                    }).then(() => {
                        location.reload(); 
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to delete',
                        text: error.message,
                        showConfirmButton: true,
                        confirmButtonText: 'Accept'
                    });
                });
            }
        });
    });
});