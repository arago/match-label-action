# Match Label Action

This action locates one of a given list of labels in the labels active on the workflow PR. You can use this to change what actions run when a PR merges, for instance.

## Inputs

### `allowed`

**Required** The labels to look for. Separate via commas or newlines (using a block string).

### `prefix`

Prefix can be used for monorepo support. Will return the non-prefixed tag for use in other actions.
e.g. `component@` prefix used with tag `component@minor` will return `minor`.

## Outputs

### `match`

The one label from the `allowed` list that was located. The action will fail if no labels matched or more than one was found.

## Example usage

```yaml
uses: arago/match-label-action@v1
with:
  allowed: major, minor, patch
  prefix: component@
```
