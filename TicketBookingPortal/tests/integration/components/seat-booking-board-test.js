import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('seat-booking-board', 'Integration | Component | seat booking board', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{seat-booking-board}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#seat-booking-board}}
      template block text
    {{/seat-booking-board}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
