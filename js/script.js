// element overview where profile info will be
const overview = document.querySelector(".overview"); 

// username
const username = "KSaldinger";

///  Repos list ///
const reposList = document.querySelector(".repo-list");

/////  GitHub profile  ///
const gitProfile = async function() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    userInfo(data);
};

gitProfile();

//// fetch & display the user info from gitHub /////
const userInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name} </p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>    
    `;
    overview.append(div);
showRepos();
};

////// fetch the repos from gitHub ///////
const showRepos = async function () {
    const res = await fetch(` https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await res.json();
    //console.log(repoData);
    displayRepos(repoData);
};
showRepos();

///// Lets see those repos displayed ////
const displayRepos = function (repos) {
    
    for (repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(li);
    };
};