workflow "Test Workflow" {
  on = "push"
  resolves = ["Test Code"]
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
  needs = "Lint Code"
  uses = "actions/npm@master"
  args = "test"
  env = {
    CI = "true"
  }
}
