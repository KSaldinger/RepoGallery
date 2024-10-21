
// element overview where profile info will be
const overview = document.querySelector(".overview"); 
// username
const username = "KSaldinger";
///  Repos list ///
const reposList = document.querySelector(".repo-list");
///  My Repos in the repos element ///
const myRepos = document.querySelector(".repos")
///   element where individual repo data will appear ///
const viewRepoData = document.querySelector(".repo-data");


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

//////   Click event    /////
reposList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    };
    //console.log(reposList);
});

///////   Get specific repo info  //////
const specificRepoInfo = async function (repoName) {
    const oneRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await oneRepo.json();
    console.log(repoInfo);

    // Grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    /// Make a list of languages 
    const languages = [];
        for (let key in languageData) {
            //console.log(key);
            languages.push(key);  
        }
        displayRepoInfo(repoInfo,languages);
};

/////  Display specific repo info  ////
const displayRepoInfo = function (repoInfo, languages) {
    viewRepoData.innerHTML = "";

    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(" , ")}</p>
            <a class-"visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">
        View Repo on GitHub!</a>`;
    viewRepoData.append(repoDiv);
    viewRepoData.classList.remove("hide");
    myRepos.classList.add("hide");
};