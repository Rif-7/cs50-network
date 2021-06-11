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

function edit_request(post_id) {
    var data = document.getElementById(`post-text-${post_id}`);
    var data_copy = data.innerHTML;
    data.innerHTML = '';

    var txtArea = document.createElement('textarea');
    txtArea.value = data_copy;
    txtArea.style.width = '100%';
    txtArea.setAttribute('id', `edit-${post_id}`);
    data.appendChild(txtArea);
    data.appendChild(document.createElement("br"));

    var btn_sub = document.createElement('button');
    btn_sub.className = "btn btn-dark";
    btn_sub.innerHTML = "Sumbit";
    btn_sub.addEventListener('click', function () {
        fetch(`/edit/${post_id}`, {
            method: "POST",
            body: JSON.stringify({
                edited: document.getElementById(`edit-${post_id}`).value 
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.stat ==  "Success") {
                document.getElementById(`post-text-${post_id}`).innerHTML = result.content;
            } else {
                document.getElementById(`post-text-${post_id}`).innerHTML = data_copy;
                alert("You do not have permission to edit this post");
            }
        })
        
    }); 
    data.appendChild(btn_sub);

    var btn_can = document.createElement('button');
    btn_can.className = "btn btn-dark";
    btn_can.style.marginLeft = '5px';
    btn_can.innerHTML = "Cancel"; 
    btn_can.addEventListener('click', function () {
        document.getElementById(`post-text-${post_id}`).innerHTML = data_copy;
    });
    data.appendChild(btn_can);

    false

}