<?php

namespace Networkteam\Neos\ResponsiveProperties\Aspects;

use Exception;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\AOP\JoinPointInterface;

/**
 * @Flow\Scope("singleton")
 * @Flow\Aspect
 */
class NodeTypeConfigurationEnrichmentAspect
{
    const SELECT_BOX_PREFIX = 'selectBoxEditor.';
    const VALUES_PREFIX = 'values.';
    const PROPERTIES_PREFIX = 'property.';
    const LABEL_SUFFIX = '.label';

    /**
     * @Flow\Around("method(Neos\ContentRepository\Domain\Model\NodeType->__construct())")
     * @param JoinPointInterface $joinPoint
     * @return void
     */
    public function enrichNodeTypeLabelsConfiguration(JoinPointInterface $joinPoint): void
    {
        $configuration = $joinPoint->getMethodArgument('configuration');
        $nodeTypeName = $joinPoint->getMethodArgument('name');
        if (isset($configuration['properties'])) {
            $this->setPropertyLabels($nodeTypeName, $configuration);
        }

        $joinPoint->setMethodArgument('configuration', $configuration);
        $joinPoint->getAdviceChain()->proceed($joinPoint);
    }

    /**
     * @param string $nodeTypeLabelIdPrefix
     * @param array $configuration
     * @return void
     */
    protected function setPropertyLabels($nodeTypeName, array &$configuration)
    {
        $nodeTypeLabelIdPrefix = $this->generateNodeTypeLabelIdPrefix($nodeTypeName);
        foreach ($configuration['properties'] as $propertyName => &$propertyConfiguration) {
            if (isset($propertyConfiguration['ui']['inspector']['editor']) && isset($propertyConfiguration['ui']['inspector']['editorOptions'])) {
                $translationIdGenerator = function ($path) use ($nodeTypeLabelIdPrefix, $propertyName) {
                    return $this->getPropertyConfigurationTranslationId($nodeTypeLabelIdPrefix, $propertyName, $path);
                };
                $this->applyResponsiveEditorLabels($propertyConfiguration['ui']['inspector']['editor'], $propertyConfiguration['ui']['inspector']['editorOptions'], $translationIdGenerator);
            }
        }
    }

    /**
     * @param string $editorName
     * @param array $editorOptions
     * @param callable $translationIdGenerator
     * @return void
     */
    public function applyResponsiveEditorLabels($editorName, array &$editorOptions, $translationIdGenerator)
    {
        if ($editorName === 'Networkteam.Neos.ResponsiveProperties/ResponsivePropertyEditor') {

            if (isset($editorOptions) && $this->shouldFetchTranslation($editorOptions, 'placeholder')) {
                $editorOptions['placeholder'] = $translationIdGenerator('selectBoxEditor.placeholder');
            }

            if (isset($editorOptions['values']) && is_array($editorOptions['values'])) {
                $this->translateValues($editorOptions['values'], $translationIdGenerator);
            }


            if (isset($editorOptions['properties']) && is_array($editorOptions['values'])) {
                $this->translateProperties($editorOptions['properties'], $translationIdGenerator);
            }
        }
    }

    /**
     * @param array $propertiesArray
     * @param callable $translationIdGenerator
     * @return void
     */
    protected function translateProperties(array &$propertiesArray, $translationIdGenerator)
    {
        foreach ($propertiesArray as $value => &$optionConfiguration) {
            if ($optionConfiguration === null) {
                continue;
            }
            if ($this->shouldFetchTranslation($optionConfiguration)) {
                $optionConfiguration['label'] = $translationIdGenerator($this::PROPERTIES_PREFIX . $value . $this::LABEL_SUFFIX);

                if (isset($optionConfiguration['values']) && is_array($optionConfiguration['values'])) {
                    $this->translateValues($optionConfiguration['values'], $translationIdGenerator, $this::PROPERTIES_PREFIX . $value . '.');
                }
            }
        }
    }

    /**
     * @param array $valuesArray
     * @param callable $translationIdGenerator
     * @param string $translationIdPrefix
     * @return void
     */
    protected function translateValues(array &$valuesArray, $translationIdGenerator, string $translationIdPrefix = '')
    {
        foreach ($valuesArray as $value => &$optionConfiguration) {
            if ($optionConfiguration === null) {
                continue;
            }
            if ($this->shouldFetchTranslation($optionConfiguration)) {
                $optionConfiguration['label'] = $translationIdGenerator($translationIdPrefix . $this::SELECT_BOX_PREFIX  . $this::VALUES_PREFIX  . $value);
            }
        }
    }

    /**
     * Should a label be generated for the given field or is there something configured?
     *
     * @param array $parentConfiguration
     * @param string $fieldName Name of the possibly existing subfield
     * @return boolean
     */
    protected function shouldFetchTranslation(array $parentConfiguration, $fieldName = 'label')
    {
        $fieldValue = array_key_exists($fieldName, $parentConfiguration) ? $parentConfiguration[$fieldName] : '';
        return (trim($fieldValue) === 'i18n');
    }

    /**
     * Generates a property configuration-label with the given $nodeTypeSpecificPrefix.
     *
     * @param string $nodeTypeSpecificPrefix
     * @param string $propertyName
     * @param string $labelPath
     * @return string
     */
    protected function getPropertyConfigurationTranslationId($nodeTypeSpecificPrefix, $propertyName, $labelPath)
    {
        return $nodeTypeSpecificPrefix . 'properties.' . $propertyName . '.' . $labelPath;
    }

    /**
     * Generates a label prefix for a specific node type with this format: "Vendor_Package:NodeTypes.NodeTypeName"
     *
     * @param string $nodeTypeName
     * @return string
     */
    protected function generateNodeTypeLabelIdPrefix($nodeTypeName)
    {
        $nodeTypeNameParts = explode(':', $nodeTypeName, 2);
        // in case the NodeType has just one section we default to 'Neos.Neos' as package as we don't have any further information.
        $packageKey = isset($nodeTypeNameParts[1]) ? $nodeTypeNameParts[0] : 'Neos.Neos';
        $nodeTypeName = isset($nodeTypeNameParts[1]) ? $nodeTypeNameParts[1] : $nodeTypeNameParts[0];

        return sprintf('%s:%s:', $packageKey, 'NodeTypes.' . $nodeTypeName);
    }
}
