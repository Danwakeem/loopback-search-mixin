workflow "Build, Test, Lint, and Publish" {
  resolves = [
    "Publish",
    "Lint",
  ]
  on = "push"
}

action "Build" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Test" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "test"
}

action "Lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build"]
  args = "run lint"
}

action "Publish" {
  needs = ["Test", "Lint"]
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
