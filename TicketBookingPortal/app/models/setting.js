import DS from 'ember-data';

export default DS.Model.extend({
	mailling: DS.attr('boolean'),
	sms: DS.attr('boolean')
});