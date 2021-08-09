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
    margin:
      type: array
      ui:
        inspector:
          # ...
          editor: 'Networkteam.Neos.ResponsiveProperties/ResponsivePropertyEditor'
```

### Basic Select Boxes

You can use the exact same editor options of a select box (except custom data sources atm.). In addition you can define properties with a label and icon, each of them will render its own select box. Make sure to set multiple to false for single selects. This is necessary because neos automatically sets multiple to true if the property type is `array`:

```yaml
'Vendor.Site:MyContent':
  # ...
  properties:
    margin:
      type: array
      ui:
        inspector:
          # ...
          editorOptions:
            allowEmpty: true
            multiple: false
            properties:
              desktop:
                label: i18n
                icon: icon-desktop
              tablet:
                label: 'Tablet'
              mobile:
                label: 'Mobile'
            values:
              exmaple-value:
                label: i18n
              another-example:
                label: i18n
```

### Overwriting Values

To overwrite the select box options in only one case, the values can be set as part of the property itself

You can use the exact same editor options of a select box (except custom data sources atm.). In addition you can define properties with a label and icon, each of them will render its own select box. Make sure to set multiple to false for single selects. This is necessary because neos automatically sets multiple to true if the property type is `array`:

```yaml
'Vendor.Site:MyContent':
  # ...
  properties:
    margin:
      type: array
      ui:
        inspector:
          # ...
          editorOptions:
            allowEmpty: true
            multiple: false
            properties:
              desktop:
                label: 'Desktop'
                icon: icon-desktop
                values:
                  special-value:
                    label: i18n
                  another-special-value:
                    label: i18n
              # ...
```

## I18n

For translations of the dropdown items, you can use the same keys as for a simple select box:

```xml
  <trans-unit id="properties.margin.selectBoxEditor.values.example-value" xml:space="preserve">
      <source>Example label</source>
  </trans-unit>
```

Translating the property labels and values follows the known path-scheme

```xml
  <trans-unit id="properties.margin.property.desktop.label" xml:space="preserve">
    <source>Example label</source>
  </trans-unit>

  <trans-unit id="properties.margin.property.desktop.selectBoxEditor.values.special-margin" xml:space="preserve">
    <source>Example overwritten value label</source>
  </trans-unit>
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

### TODO

* make it work with custom data source
* add styling
