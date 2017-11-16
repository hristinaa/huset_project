function getData () {
    fetch("http://hrissi.com/mywpsite/wp-json/wp/v2/posts?_embed&per_page=11")
    .then(res=>res.json())
    .then(showPosts)
}

function getAllPostsByTag(id){
    fetch("http://hrissi.com/mywpsite/wp-json/wp/v2/posts?_embed&tags="+id)
    .then(res=>res.json())
    .then(showPosts)
}



function getSinglePostById(myId){
    console.log(myId);
    fetch("http://hrissi.com/mywpsite/wp-json/wp/v2/posts/"+myId+"/?_embed")
    .then(res=>res.json())
    .then(showSinglePost)

}


function getMenu(){
    fetch("http://hrissi.com/mywpsite/wp-json/wp/v2/tags")
    .then(e=>e.json())
    .then(showMenu)
}

function showMenu(tags){
    console.log(tags);
    let lt=document.querySelector("#linkTemplate").content;


    tags.forEach(function(tag){
        if(tag.count > 0){

          let clone= lt.cloneNode(true);        //very important !!!!!!!!
          let parent= document.querySelector("#tagmenu");
          clone.querySelector("a").textContent=tag.name;
          clone.querySelector("a").setAttribute("href", "index.html?tagid="+tag.id)

          parent.appendChild(clone);    //never delete!!!!!!!!!
        }

    });


}


function showSinglePost(json){
    console.log(json);
    document.querySelector("#single h1").textContent=json.title.rendered;
    document.querySelector("#single img").setAttribute('src',json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    document.querySelector(".postcontent").innerHTML=json.content.rendered;

    document.querySelector(".price span").textContent=json.acf.price;

}




function showPosts(data){
//    console.log(data)
    let list=document.querySelector("#list");
    let template=document.querySelector("#postTemplate").content;  //we create the template in html

    data.forEach(function(thePost){
        console.log(thePost)

//        here we get stuff:

        let clone=template.cloneNode(true);      //       very important without this it's not working
        let title=clone.querySelector("h1"); //title
        let excerpt=clone.querySelector(".excerpt");  //content of the post
        let price=clone.querySelector(".price span");
        let img=clone.querySelector("img");
        let link=clone.querySelector("a.read-more");


//        here we change stuff:

        title.textContent=thePost.title.rendered;
        excerpt.innerHTML=thePost.excerpt.rendered;
        price.textContent=thePost.acf.price;   //custom fields example
        console.log(thePost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        img.setAttribute("src",thePost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
       link.setAttribute("href", "post.html?id="+thePost.id);

        list.appendChild(clone); //DOOOOOO NOOOTTT DELETEEE THISSSSSS!!!!!!!!!!!!!!!!


    });
                }


let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let tagid = searchParams.get("tagid");
//console.log(id)


getMenu();//call the function getMenu here


if(id){
    getSinglePostById(id);
}

if(tagid){
    getAllPostsByTag(tagid);



} else{
    getData();               //here we are calling the function getData//////

}


