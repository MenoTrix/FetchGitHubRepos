let input = document.querySelector("input");
let getButton = document.querySelector(".get-repos");
let showData = document.querySelector(".show-data");

getButton.onclick = function () {
  getReposFun();
};
function getReposFun() {
  if (input.value == "") {
    showData.innerHTML = "<span>Please Write Github UserName</span>";
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        showData.innerHTML = "";
        let data = result;
        for (let i = 0; i < data.length; i++) {
          let mainDiv = document.createElement("div");
          let linkUrl = document.createElement("a");
          let repoStars = document.createElement("span");
          let repoName = document.createTextNode(data[i]["name"]);
          let repoStarsText = document.createTextNode(`
           Stars ${data[i]["stargazers_count"]}`);
          mainDiv.classList = "repo-box";
          //   let repoUrl = document.createTextNode(data[i]["html_url"]);
          let repoUrlText = document.createTextNode("Visit");
          linkUrl.appendChild(repoUrlText);
          linkUrl.href = `${data[i]["html_url"]}`;
          linkUrl.setAttribute("target", "_blank");
          repoStars.appendChild(repoStarsText);
          mainDiv.appendChild(repoName);
          showData.appendChild(mainDiv);
          mainDiv.appendChild(linkUrl);
          mainDiv.appendChild(repoStars);
        }
        return data;
      })
      .catch((err) => {
        console.log(Error(err));
      });
  }
}
