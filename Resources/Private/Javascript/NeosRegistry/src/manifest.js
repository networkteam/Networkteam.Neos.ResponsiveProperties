import manifest from '@neos-project/neos-ui-extensibility';
import Editor from '@networkteam/neos-responsive-properties-editor';

manifest('Networkteam.Neos.ResponsiveProperties:ResponsivePropertyEditor', {}, globalRegistry => {
  const editorsRegistry = globalRegistry.get('inspector').get('editors');
  editorsRegistry.set('Networkteam.Neos.ResponsiveProperties/ResponsivePropertyEditor', {
    component: Editor
  });
});
