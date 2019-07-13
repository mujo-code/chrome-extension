workflow "Test Workflow" {
  on = "push"
  resolves = ["Test Code", "Lint Code"]
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "install"
  env = {
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "true"
  }
}

action "Lint Code" {
  needs = "Install Dependencies"
  uses = "actions/npm@master"
  args = "run lint"
}

action "Test Code" {
  uses = "jcblw/puppeteer-headful@master"
  needs = "Install Dependencies"
  args = ["test"],
  env = {
    CI = "true"
  }
}
