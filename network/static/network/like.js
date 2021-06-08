function like_post(post_id) {
    fetch(`/like/${post_id}`, {
        method: "POST"
    })
    .then(response => response.json())
    .then(result => {
        if (result.stat == "Success") {
            var icn = "❤";
            if (result.action == "u") { icn = "🤍"; }
            document.getElementById(`like-btn-${post_id}`).innerHTML = `<div id="like-btn-${post_id}">
            <a class="like-btn" onclick="like_post('${post_id}');">
                ${icn}<label class="bi-heart" id="like-no-${post_id}">${result.likes}</label>   
            </a>                         
        </div>`;
        }
    })
    false
}

function follow(user_id) {
    
    fetch(`/user/${user_id}`, {
    method: "POST"
    })
    .then(response => response.json())
    .then(result => {
    document.getElementById("follow-btn").innerHTML = `${result.stat}`;
    document.getElementById("follow-data").innerHTML = `Followers: ${result.followers} | Following: ${result.following}`;
    })
    
    false
}