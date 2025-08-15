const container = document.getElementById("dataContainer");

function startChain() {
  container.innerHTML = "";
  PromiseAPI1()
    .then((data) => {
      displayPosts(data.posts);
      return PromiseAPI2();
    })
    .then((data) => {
      displayProducts(data.products);
      return PromiseAPI3();
    })
    .then((data) => {
      displayTodos(data.todos);
    })
    .catch((e) => console.error(e));
}

function PromiseAPI1() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((resData) => resData.json())
        .then((json) => res(json))
        .catch(rej);
    }, 1000);
  });
}

function PromiseAPI2() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((resData) => resData.json())
        .then((json) => res(json))
        .catch(rej);
    }, 2000);
  });
}

function PromiseAPI3() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((resData) => resData.json())
        .then((json) => res(json))
        .catch(rej);
    }, 3000);
  });
}

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
            </thead>
            <tbody>`;
  posts.forEach((post) => {
    html += `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>${post.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}</td>
                <td>${post.reactions.likes}</td>
                <td>${post.reactions.dislikes}</td>
                <td>${post.views}</td>
                <td>${post.userId}</td>
            </tr>`;
  });
  html += `</tbody></table>`;
  container.innerHTML += html;
}

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
                    <th>Dimensions (W×H×D)</th>
                    <th>Barcode</th>
                    <th>Min Order</th>
                    <th>Return Policy</th>
                    <th>Reviews</th>
                </tr>
            </thead>
            <tbody>`;
  products.forEach((product) => {
    html += `
            <tr>
                <td><img src="${product.thumbnail}" alt="${product.title}"></td>
                <td><b>${product.title}</b><br>${product.description}</td>
                <td>${product.category} <br> <b>${product.brand}</b></td>
                <td>$${product.price} <br> -${
      product.discountPercentage
    }% <br> Stock: ${product.stock}</td>
                <td>${product.warrantyInformation || "-"}<br>${
      product.shippingInformation || "-"
    }<br>${product.availabilityStatus || "-"}</td>
                <td>${product.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}</td>
                <td>${product.dimensions.width} × ${
      product.dimensions.height
    } × ${product.dimensions.depth}</td>
                <td>${product.meta?.barcode || "-"}</td>
                <td>${product.minimumOrderQuantity || "-"}</td>
                <td>${product.returnPolicy || "-"}</td>
                <td>
                    <ul>
                        ${product.reviews
                          .map(
                            (r) =>
                              `<li><b>${r.reviewerName}</b> (${r.rating}★): ${r.comment}</li>`
                          )
                          .join("")}
                    </ul>
                </td>
            </tr>`;
  });
  html += `</tbody></table>`;
  container.innerHTML += html;
}

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
            </thead>
            <tbody>`;
  todos.forEach((todo) => {
    html += `
            <tr>
                <td>${todo.id}</td>
                <td>${todo.todo}</td>
                <td>${todo.completed ? "✅" : "❌"}</td>
                <td>${todo.userId}</td>
            </tr>`;
  });
  html += `</tbody></table>`;
  container.innerHTML += html;
}
