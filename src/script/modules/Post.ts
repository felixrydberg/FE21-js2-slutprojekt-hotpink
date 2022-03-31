import ShortUniqueId from 'short-unique-id';
import { db } from './db';
import {
  ref,
  update,
  push,
  remove,
  get,
  DataSnapshot,
} from 'firebase/database';

export default class Post {
  private readonly uid: ShortUniqueId | string;
  private readonly timestamp: Date | string;

  constructor(
    public readonly username: string,
    public title: string,
    public message: string
  ) {
    this.uid = new ShortUniqueId({ length: 10 })();
    this.timestamp = new Date().toLocaleString('sv-SE');
  }
}

export const createPostgui = (): void => {
  const main: HTMLElement = document.querySelector('main');
  const sessionName = sessionStorage.getItem('name');
  const category = sessionStorage.getItem('category');
  console.log(category);
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }

  get(ref(db, `/posts/${category}`)).then((snapshot: DataSnapshot): void => {
    const article = document.createElement('article');
    article.classList.add('category-wrapper');
    const categoryTitle = document.createElement('h2');
    categoryTitle.classList.add('category-title');
    article.appendChild(categoryTitle);
    categoryTitle.innerText = category.toUpperCase();
    if (snapshot.exists()) {
      // If data exists create article to store category data in & attach to <main> element
      if (sessionStorage.getItem('login')) {
        for (const id in snapshot.val()) {
          const { username, uid, title, timestamp, message } =
            snapshot.val()[id];

          // Post Body with header div containing timestamp, who posted, title and message
          const postWrapperDiv = document.createElement('div');
          const postHeaderDiv = document.createElement('div');
          const postTitle = document.createElement('h5');
          const idParagraph = document.createElement('p');
          const createdByParagraph = document.createElement('p');
          const timeOfPost = document.createElement('p');
          const messageBody = document.createElement('p');

          postWrapperDiv.classList.add('message-wrapper');

          idParagraph.innerText = `#${uid}`;
          idParagraph.classList.add('post-id');

          postTitle.innerText = `Title: ${title}`;
          postTitle.classList.add('post-title');

          createdByParagraph.innerHTML = `Poster:<a href=""> ${username}</a>`;
          createdByParagraph.classList.add('poster');
          createdByParagraph.addEventListener(
            'click',
            (e: MouseEvent): void => {
              e.preventDefault();
              sessionStorage.setItem('profile', username);
              window.location.replace('../profile.html');
            }
          );

          timeOfPost.innerText = `Posted: ${timestamp}`;
          timeOfPost.classList.add('timestamp');

          messageBody.innerText = message;
          messageBody.classList.add('post');

          postHeaderDiv.appendChild(idParagraph);
          postHeaderDiv.appendChild(postTitle);
          postHeaderDiv.appendChild(createdByParagraph);
          postHeaderDiv.appendChild(timeOfPost);
          postWrapperDiv.appendChild(postHeaderDiv);
          postWrapperDiv.append(messageBody);

          // if user is owner of post, add possibility to remove it.
          if (sessionName === username) {
            const removeBtn: HTMLButtonElement =
              document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.innerText = 'Delete Post';
            removeBtn.addEventListener('click', (e: MouseEvent): void => {
              e.preventDefault();
              remove(ref(db, `/posts/${category}/${id}`));
            });
            postWrapperDiv.append(removeBtn);
          }
          article.appendChild(postWrapperDiv);
        }
      }
    }
    if (sessionStorage.getItem('login')) {
      article.appendChild(createForm(category));
    }

    main.appendChild(article);
  });
};

const createForm = (category: string): HTMLDivElement => {
  const username: string = sessionStorage.getItem('name');

  const container: HTMLDivElement = document.createElement('div');
  container.classList.add('form-container');
  const form: HTMLFormElement = document.createElement('form');

  form.setAttribute('name', `${category}`);
  form.classList.add('post-forms');

  const titleLabel: HTMLLabelElement = document.createElement('label');
  titleLabel.innerText = 'Title: ';
  titleLabel.setAttribute('for', 'title');
  const title: HTMLInputElement = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.setAttribute('id', 'title');
  title.setAttribute('placeholder', 'Add a title.. ');
  title.required = true;

  const messageLabel: HTMLLabelElement = document.createElement('label');
  messageLabel.setAttribute('for', 'message');
  messageLabel.innerText = 'Message: ';
  const message: HTMLInputElement = document.createElement('input');
  message.setAttribute('type', 'text');
  message.setAttribute('name', 'message');
  message.setAttribute('id', 'message');
  message.setAttribute('placeholder', 'Write something interesting.. ');
  message.required = true;

  const submitButton: HTMLInputElement = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Post Message');

  submitButton.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();

    if (
      message.value !== '' &&
      message.value.length < 500 &&
      title.value !== '' &&
      title.value.length > 5
    ) {
      createPost({
        username: username,
        title: title.value,
        message: message.value,
        category,
      });
      message.value = '';
      title.value = '';
    }
  });

  const resetButton: HTMLInputElement = document.createElement('input');
  resetButton.setAttribute('type', 'reset');
  resetButton.setAttribute('value', 'Cancel');

  form.appendChild(titleLabel);
  form.appendChild(title);
  form.appendChild(messageLabel);
  form.appendChild(message);

  form.appendChild(submitButton);
  form.appendChild(resetButton);

  container.append(form);

  return container;
};
interface config {
  username: string;
  title: string;
  message: string;
  category: string;
}
const createPost = (newPost: config): void => {
  const dbRef = ref(db, `/posts/${newPost.category}`);

  const post = new Post(newPost.username, newPost.title, newPost.message);
  const uuid: string = push(dbRef).key;
  const posts = {};
  posts[uuid] = post;
  update(dbRef, posts);
};
