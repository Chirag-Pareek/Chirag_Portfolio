const fs = require('fs');

async function fetchRepos() {
  try {
    const res = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN'}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const repos = await res.json();
    const data = repos.map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      url: r.html_url,
      private: r.private,
      topics: r.topics,
      homepage: r.homepage,
      archived: r.archived
    }));
    fs.writeFileSync('repos.json', JSON.stringify(data, null, 2));
    console.log(`Saved ${data.length} repos to repos.json`);
  } catch (e) {
    console.error(e);
  }
}

fetchRepos();
