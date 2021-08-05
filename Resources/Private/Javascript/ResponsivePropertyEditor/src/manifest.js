import manifest from '@neos-project/neos-ui-extensibility';

manifest('Networkteam.Neos.ResponsiveProperties:ResponsivePropertyEditor', {}, globalRegistry => {
  const editorsRegistry = globalRegistry.get('inspector').get('editors');
  editorsRegistry.set('Networkteam.Neos.ResponsiveProperties/ResponsivePropertyEditor', {
    component: <div></div>
  });
});
