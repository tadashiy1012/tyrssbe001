const out = document.getElementById('out');
const inUrl = document.getElementById('inUrl');
document.getElementById('btn').addEventListener('click', () => {
    const url = inUrl.value;
    fetch('http://localhost:3000/rss?url=' + url).then((resp) => {
        return resp.text();
    }).then((resp) => {
        out.innerHTML = resp;
    }).catch((err) => console.error(err));
});
