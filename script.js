const library = [];
const mainContainer = document.querySelector(".main-container")


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
    addToLib() {
        library.push(this);
    }
}


function addBookToLib(title, author, pages, read) {
    newBook = new Book(title, author, pages, read);
    newBook.addToLib();

}

function renderBooks() {
    for (const book of library) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-id", book.id);
        const h2 = document.createElement("h2");
        h2.textContent = book.title;
        const h4 = document.createElement("h4");
        h4.textContent = book.author;
        const h6 = document.createElement("h6");
        h6.textContent = book.pages;
        const h5 = document.createElement("h5");
        if (book.read == 0)
            h5.textContent = "Unread";
        else
            h5.textContent = "Read";

        const delButton = document.createElement("Button");
        delButton.innerHTML = "Delete";
        delButton.addEventListener("click", () => {
            const id = div.dataset.id;
            const index = library.findIndex(books => books.id === id);
            if (index != -1) {
                library.splice(index, 1);
                div.remove();
            }
        });

        const readUnread = document.createElement("Button");
        readUnread.innerHTML = "Read/Unread";
        readUnread.addEventListener("click", () => {
            const id = div.dataset.id;
            const index = library.findIndex(books => books.id === id);
            if (library[index].read == 0) {
                library[index].read = 1;
                h5.textContent = "Read";
            }
            else {
                library[index].read = 0;
                h5.textContent = "UnRead";
            }
        });

        mainContainer.appendChild(div);
        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(h6);
        div.appendChild(h5);
        div.appendChild(delButton);
        div.appendChild(readUnread)
    }
}
const modal = document.querySelector("#modal-container")
const form = document.querySelector(".modal");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    mainContainer.innerHTML = "";
    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const pages = form.elements.pages.value;
    const read = form.elements.read.checked;
    addBookToLib(title, author, pages, read);
    modal.classList.add("hidden");
    form.reset();
    renderBooks();
})

const addNewBookButton = document.querySelector(".addNewBook");
addNewBookButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
});
console.log(modal)
addBookToLib("johnson", "book", 300, 0);
addBookToLib("eming", "fire", 500, 0);
addBookToLib("gointee", "h", 100, 1);
renderBooks();

