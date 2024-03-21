import { fetchPosts } from './util/fetchPost.js';
import { createPostView } from './views/postListView.js';
import { createPostDetailView } from './views/postDetailView.js';


async function renderPostDetail(fileName) {
    try {
      const postDetailView = await createPostDetailView(fileName);
      if (postDetailView) {
        const mainElement = document.querySelector('main');
        mainElement.innerHTML = '';
        mainElement.appendChild(postDetailView);
      } else {
        console.error(`Failed to render post detail for post fileName: ${fileName}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

async function renderMainContent() {
    const main = document.querySelector('main');

    try {
        const posts = await fetchPosts();
        const postSections = posts.map(post => {
            const postSection = createPostView(post)
            postSection.addEventListener('click', (event) => {
                if (event.target.tagName === 'A' && event.target.dataset.id) {
                    const postId = event.target.dataset.id;
                    // console.log(postId);
                    renderPostDetail(posts[parseInt(postId)-1].fileName);
                }
            });
            return postSection
        });

        main.innerHTML = '';
        postSections.forEach(section => main.appendChild(section));
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다. 애러명을 확인해주세요.', error);
        main.innerHTML = '<p>데이터를 가져오는데 실패했습니다. console에 찍힌 애러명을 확인해주세요.</p>';
    }
}

renderMainContent();