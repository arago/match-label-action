const core = require('@actions/core')
const {context} = require('@actions/github')
const match = require('./match.js')

function run() {
  try {
    const prefix = core.getInput('prefix')
    const prx = new RegExp(`^${prefix}`, 'g')
    const pr = context.payload.pull_request || {}
    const labels = pr.labels || []
    const labelNames = labels.map((label) => label.name)
    const allowedLabels = match.parseAllowed(core.getInput('allowed'), prefix)
    const allowedMultipleLabels = match.parseAllowed(
      core.getInput('allowed_multiple')
    )
    let matchingLabel
    if (allowedLabels.length > 0) {
      matchingLabel = match.findMatching(labelNames, allowedLabels, false)
    } else if (allowedMultipleLabels.length > 0) {
      matchingLabel = match.findMatching(
        labelNames,
        allowedMultipleLabels,
        true
      )
    } else {
      return core.setFailed(
        'You must provide either `allowed` or `allowed_multiple` as input.'
      )
    }

    const matches = matchingLabel.map((l) => (prefix ? l.replace(prx, '') : l))

    core.setOutput('match', matches.join(', '))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
