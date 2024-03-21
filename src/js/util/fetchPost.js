export async function fetchPosts() {
    const response = await fetch(`${window.location.origin}/src/postsList/postsList.json`);
    if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다.');
    }
    return await response.json();
}