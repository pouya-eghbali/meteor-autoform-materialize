/*jshint esversion: 6 */

export const dsk = () => {
  const instance = Template.instance();
  return {
    'data-schema-key': instance.atts['data-schema-key']
  };
};
