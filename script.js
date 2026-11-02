const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function formatStarredDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium"
  }).format(date);
}

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const heading = document.createElement("h2");
  const link = document.createElement("a");
  link.href = repository.url;
  link.textContent = repository.name;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  heading.append(link);
  item.append(heading);

  const description = document.createElement("p");
  description.textContent = repository.description;
  item.append(description);

  if (repository.starredAt) {
    const date = document.createElement("time");
    date.dateTime = repository.starredAt;
    date.textContent = `Starred ${formatStarredDate(repository.starredAt)}`;
    item.append(date);
  }

  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();

    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list");
    }

    repositoryList.replaceChildren(...repositories.map(renderRepository));
    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    statusMessage.textContent = "Starred repositories could not be loaded. Please try again later.";
  }
}

loadRepositories();
