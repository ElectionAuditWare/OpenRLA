# OpenRLA Assistant

## API

### POST /manifest

Accepts an object of shape:

```json
{
  "vendor": <String>
  "type": <String>
  "filePath": <String>
}
```

Returns an object of shape:

```json
{
  "filePath": <String>
  "type": <String>
  "data": <Object>
}
```

Where "data" is new state that should be merged over the client app
state to represent what has been updated.

### GET /election
Fetch a list of defined elections.

### POST /election
Define a new election.

### GET /election/:id
Fetch the election indexed by `id`.

### PUT /election/:id
Edit the election indexed by `id`.

### GET /election/active
Get the active election.

### PUT /election/active
Change which election is active.

### GET /ballot
Fetch a list of ballots.

### POST /ballot
Upload a new ballot.

### GET /ballot/:id
Fetch the ballot indexed by `id`.

### PUT /ballot/:id
Edit the ballot indexed by `id`.

### GET /audit
Fetch a list of audits.

### POST /audit
Define a new audit.

### GET /audit/:id
Fetch the audit indexed by `id`.

### PUT /audit/:id
Edit the audit indexed by `id`.

### GET /audit/active
Get the active audit.

### PUT /audit/active
Change which audit is active.