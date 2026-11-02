# stargazers-log

A small page that displays a log of starred repositories from `events.json`.

## Preview

From the project directory, start a local web server:

```sh
python3 -m http.server
```

Then open <http://localhost:8000> in a browser. Edit `events.json` to add or
update repositories; each entry has a `name`, `url`, `description`, and
`starredAt` date (`YYYY-MM-DD`).
