const container = document.getElementById("dataContainer");

/**
 * Function to start the promise chain
 */
function startChain() {
    container.innerHTML = ""; // Clear old data

    PromiseAPI1().then((res1) => {
        if (res1) return PromiseAPI2(); // Part 3: If condition before returning next
    }).then((res2) => {
        if (res2) return PromiseAPI3();
    }).catch((e) => console.error(e));
}

/**
 * Part 2: PromiseAPI1 - Fetch Posts
 */
function PromiseAPI1(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://dummyjson.com/posts')
                .then(res => res.json())
                .then(data => {
                    displayPosts(data.posts);
                    resolve(true); // Resolve only after display
                })
                .catch(reject);
        }, 1000);
    });
}

/**
 * Part 2: PromiseAPI2 - Fetch Products
 */
function PromiseAPI2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products')
                .then(res => res.json())
                .then(data => {
                    displayProducts(data.products);
                    resolve(true); // Resolve only after display
                })
                .catch(reject);
        }, 2000);
    });
}

/**
 * Part 2: PromiseAPI3 - Fetch Todos
 */
function PromiseAPI3(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://dummyjson.com/todos')
                .then(res => res.json())
                .then(data => {
                    displayTodos(data.todos);
                    resolve(true); // Resolve only after display
                })
                .catch(reject);
        }, 3000);
    });
}

/**
 * Display Posts in a table
 */
function displayPosts(posts) {
    let html = `<h2>Posts</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Tags</th>
                    <th>Likes</th>
                    <th>Dislikes</th>
                    <th>Views</th>
                    <th>User ID</th>
                </tr>
            </thead><tbody>`;
    posts.forEach(post => {
        html += `<tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
            <td>${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</td>
            <td>${post.reactions.likes}</td>
            <td>${post.reactions.dislikes}</td>
            <td>${post.views}</td>
            <td>${post.userId}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML += html;
}

/**
 * Display Products in a table
 */
function displayProducts(products) {
    let html = `<h2>Products</h2>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title & Description</th>
                    <th>Category / Brand</th>
                    <th>Price / Discount / Stock</th>
                    <th>Warranty / Shipping / Availability</th>
                    <th>Tags</th>
                </tr>
            </thead><tbody>`;
    products.forEach(product => {
        html += `<tr>
            <td><img src="${product.thumbnail}" alt="${product.title}"></td>
            <td><b>${product.title}</b><br>${product.description}</td>
            <td>${product.category} <br> <b>${product.brand}</b></td>
            <td>$${product.price} <br> -${product.discountPercentage}% <br> Stock: ${product.stock}</td>
            <td>${product.warrantyInformation || "-"}<br>${product.shippingInformation || "-"}<br>${product.availabilityStatus || "-"}</td>
            <td>${product.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML += html;
}

/**
 * Display Todos in a table
 */
function displayTodos(todos) {
    let html = `<h2>Todos</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Todo</th>
                    <th>Completed</th>
                    <th>User ID</th>
                </tr>
            </thead><tbody>`;
    todos.forEach(todo => {
        html += `<tr>
            <td>${todo.id}</td>
            <td>${todo.todo}</td>
            <td>${todo.completed ? "✅" : "❌"}</td>
            <td>${todo.userId}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML += html;
}
