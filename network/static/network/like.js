function like_post(post_id) {
    fetch(`/like/${post_id}`, {
        method: "POST"
    })
    .then(response => response.json())
    .then(result => {
        if (result.stat == "Success") {
            console.log("It was a success.");
            var likes = document.getElementById(`like-no-${post_id}`).innerHTML;
            likes++;
            document.getElementById(`like-btn-${post_id}`).innerHTML = `<div id="like-btn-{{ post.id }}">
            <a class="like-btn" onclick="like_post('{{ post.id }}');">
                💖<label class="bi-heart" id="like-no-{{ post.id }}">${likes}</label>   
            </a>                         
        </div>`;
        }
    })
    false
}
