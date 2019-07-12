workflow "Test Workflow" {
  on = "push"
  resolves = ["Test Code"]
}

action "Test" {
  uses = "ianwalter/puppeteer@v2.0.0"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Lint Code" {
  needs = "Install Dependencies"
  uses = "actions/npm@master"
  args = "run lint"
}

action "Test Code" {
  uses = "./puppeteer-headful"
  needs = "Lint Code"
  runs = "npm"
  args = "test",
  env = {
    CI = "true"
  }
}
