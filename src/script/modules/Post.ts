import ShortUniqueId from 'short-unique-id';
import { db } from './db';
import {
  set,
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
    public message: string,
    uid?: string,
    timestamp?: string
  ) {
    this.uid =
      typeof uid === 'undefined' ? new ShortUniqueId({ length: 10 })() : uid;
    this.timestamp =
      typeof timestamp === 'undefined'
        ? new Date().toLocaleString('sv-SE')
        : timestamp;
  }
}

export const createPostgui = async (): Promise<void> => {
  const categories: string[] = ['gaming', 'programmering', 'mat'];
  const main = document.querySelector('main');
  const sessionName = sessionStorage.getItem('name');

  categories.forEach((category: string): void => {
    get(ref(db, `/posts/${category}`)).then((snapshot: DataSnapshot): void => {
      if (snapshot.exists()) {
        const article = document.createElement('article');
        article.classList.add('category-wrapper');
        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('category-title');

        article.appendChild(categoryTitle);
        categoryTitle.innerText = category.toUpperCase();
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
        main.appendChild(article);
      }
    });
    // Create article to store category data in & attach to <main> element
  });
};

interface config {
  username: string;
  title: string;
  message: string;
  category: string;
}

export const createPost = (newPost: config): void => {
  const dbRef = ref(db, `/posts/${newPost.category}`);

  const post = new Post(newPost.username, newPost.title, newPost.message);
  const uuid: string = push(dbRef).key;
  const posts = {};
  posts[uuid] = post;
  update(dbRef, posts);
};

// Kategorier: Gaming, Programmering, Mat
