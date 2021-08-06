# Networkteam.Neos.ResponsiveProperties

## Installation

```bash
composer require networkteam/neos-responsive-properties
```

## Usage

To use the inspector editor in your NodeType, define it in the chosen property:

```yaml
'Vendor.Site:MyContent':
  # ...
  properties:
    link:
      type: string
      ui:
        inspector:
          # ...
          editor: 'Networkteam.Neos.ResponsiveProperties/ResponsivePropertyEditor'
```

## Development

### Javascript

The javascript is built and the dependencies are managed with yarn workspaces.

#### Installing dependencies

To manage dependencies in a workspace call `yarn workspace <WorkspaceName> <Command>` from the root directory, not the workspace itself. e.g.

```bash
yarn workspace @networkteam/neos-responsive-properties-editor add <PackageName>
```

#### Development

To start the watcher for development run in the package root folder:

```bash
yarn start
```

#### Production Build

The artifacts are part of the repository and should always be committed. To build the finished product run in root folder:

```bash
yarn build
```
