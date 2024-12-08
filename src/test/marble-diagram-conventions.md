# Marble Diagram Conventions

This document outlines the conventions used for marble diagrams in our tests.

## Syntax

The following syntax is used to represent different states in our marble diagrams:

### isLoading$ Conventions

For `isLoading$` observables, the following syntax is used:

* `i`: Initial value (usually `false`)
* `l`: Loading state (usually `true`)
* `c`: Cached value (usually an empty array if no cached value is expected)
* `r`: Reloaded value (usually `true` if a reload is expected)
* `f`: Final value (usually `false`)

### Data Retrieval Conventions

For observables that retrieve data, the following syntax is used:

* `0`: Initial value (if using a subject)
* `1`, `2`, `3`, etc.: Each subsequent emit, numbered sequentially

Note: If a state is not represented in the marble diagram, it means that state is not expected to occur.
