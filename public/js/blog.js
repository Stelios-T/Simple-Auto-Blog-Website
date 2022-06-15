let blogId = decodeURI(location.pathname.split("/").pop());
let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    console.log(doc)
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})


const setupBlog = (data) => {

    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    publish.innerHTML += ` -- ${data.author}`;

    try {
        if(data.author == auth.currentUser.email.split('@')[0]){
            let editBtn = document.getElementById('edit-blog-btn');
            editBtn.style.display = "inline";
            editBtn.href = `${blogId}/editor`;
        }
    } catch {
        //nothing here
    }
       
    const article = document.querySelector('.article');
    addArticle(article, data.article);
}


const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}

if (document.getElementById("disqus_thread")) {
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    
    /* var disqus_config = function () {
    this.page.url = blogId;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = blogId; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    }; */
    
    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://car-blog-1.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
}




