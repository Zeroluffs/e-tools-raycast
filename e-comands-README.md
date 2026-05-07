# e-comands

A small JSON manifest of commonly used **encompass** shell commands. Acts as the source of truth for the [encompass-command-tools Raycast extension](#) — the extension fetches `commands.json` from this repo at launch so new commands can be added without republishing the extension.

## Why this repo exists

Setting up a fresh SSH machine for encompass work involves a recurring set of shell commands. Rather than dig through notes or scroll back through past terminal sessions, the Raycast extension surfaces them as a searchable list — one keystroke and the command is pasted into the active terminal.

Keeping the manifest in its own repo means:

- New commands can be added with a single PR / push, no extension rebuild.
- Multiple tools (Raycast extension today, anything else tomorrow) can consume the same source of truth.
- Diffs are reviewable.

## File structure

```
.
├── commands.json   # the manifest consumed by clients
└── README.md
```

## `commands.json` schema

Each entry describes one command:

```json
[
  {
    "id": "ssh-keygen",
    "title": "Generate SSH Keypair",
    "subtitle": "Creates an ed25519 keypair for the current user",
    "section": "SSH Setup",
    "command": "ssh-keygen -t ed25519 -C \"$(whoami)@$(hostname)\""
  }
]
```

| Field      | Type   | Required | Notes                                                                 |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| `id`       | string | yes      | Stable identifier — used as a React key. Don't reuse across entries.  |
| `title`    | string | yes      | Friendly name shown in the list.                                      |
| `subtitle` | string | no       | Short description shown next to the title.                            |
| `section`  | string | no       | Group label — items with the same `section` render under one header.  |
| `command`  | string | yes      | The literal shell command to copy / paste.                            |

## Adding a new command

1. Open `commands.json`.
2. Append a new object following the schema above. Make sure `id` is unique.
3. Commit and push to `main`.
4. The Raycast extension will pick it up on next launch (or when its cache revalidates).

## Consuming the manifest

The raw URL clients should fetch:

```
https://raw.githubusercontent.com/Zeroluffs/e-comands/main/commands.json
```

## License

MIT.
