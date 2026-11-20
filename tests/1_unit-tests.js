const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

const AB = 'american-to-british';
const BA = 'british-to-american';

suite('Unit Tests', () => {

  suite('American to British', () => {
    test('Translate Mangoes are my favorite fruit. to British English', function () {
      assert.equal(translator.translate('Mangoes are my favorite fruit.', AB),
        'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });
    test('Translate I ate yogurt for breakfast. to British English', function () {
      assert.equal(translator.translate('I ate yogurt for breakfast.', AB),
        'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });
    test("Translate We had a party at my friend's condo. to British English", function () {
      assert.equal(translator.translate("We had a party at my friend's condo.", AB),
        'We had a party at my friend\'s <span class="highlight">flat</span>.');
    });
    test('Translate Can you toss this in the trash for me? to British English', function () {
        assert.equal(translator.translate('Can you toss this in the trash for me?', AB),
            'Can you toss this in the <span class="highlight">rubbish</span> for me?');
    });

    test('Translate The parking lot was full. to British English', function () {
      assert.equal(translator.translate('The parking lot was full.', AB),
        'The <span class="highlight">car park</span> was full.');
    });
    test('Translate Like a high tech Rube Goldberg machine. to British English', function () {
      assert.equal(translator.translate('Like a high tech Rube Goldberg machine.', AB),
        'Like a high tech <span class="highlight">Heath Robinson device</span>.');
    });
    test('Translate To play hooky means to skip class or work. to British English', function () {
      assert.equal(translator.translate('To play hooky means to skip class or work.', AB),
        'To <span class="highlight">bunk off</span> means to skip class or work.');
    });
    test('Translate No Mr. Bond, I expect you to die. to British English', function () {
      assert.equal(translator.translate('No Mr. Bond, I expect you to die.', AB),
        'No <span class="highlight">Mr</span> Bond, I expect you to die.');
    });
    test('Translate Dr. Grosh will see you now. to British English', function () {
      assert.equal(translator.translate('Dr. Grosh will see you now.', AB),
        '<span class="highlight">Dr</span> Grosh will see you now.');
    });
    test('Translate Lunch is at 12:15 today. to British English', function () {
      assert.equal(translator.translate('Lunch is at 12:15 today.', AB),
        'Lunch is at <span class="highlight">12.15</span> today.');
    });
  });

  suite('British to American', () => {
    test('Translate We watched the footie match for a while. to American English', function () {
      assert.equal(translator.translate('We watched the footie match for a while.', BA),
        'We watched the <span class="highlight">soccer</span> match for a while.');
    });
    test('Translate Paracetamol takes up to an hour to work. to American English', function () {
      assert.equal(translator.translate('Paracetamol takes up to an hour to work.', BA),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
    test('Translate First, caramelise the onions, then add the garlic. to American English', function () {
      assert.equal(translator.translate('First, caramelise the onions, then add the garlic.', BA),
        'First, <span class="highlight">caramelize</span> the onions, then add the garlic.');
    });
    test('Translate I spent the bank holiday at the funfair. to American English', function () {
      assert.equal(translator.translate('I spent the bank holiday at the funfair.', BA),
        'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
    });
    test('Translate I had a bicky then went to the chippy. to American English', function () {
      assert.equal(translator.translate('I had a bicky then went to the chippy.', BA),
        'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
    });
    test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
      assert.equal(translator.translate("I've just got bits and bobs in my bum bag.", BA),
        'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.');
    });
    test('Translate The car boot sale at Boxted Airfield was called off. to American English', function () {
      assert.equal(translator.translate('The car boot sale at Boxted Airfield was called off.', BA),
        'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
    });
    test('Translate Have you met Mrs Kalyani? to American English', function () {
      assert.equal(translator.translate('Have you met Mrs Kalyani?', BA),
        'Have you met <span class="highlight">Mrs.</span> Kalyani?');
    });
    test("Translate Prof Joyner of King's College, London. to American English", function () {
      assert.equal(translator.translate("Prof Joyner of King's College, London.", BA),
        '<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
    });
    test('Translate Tea time is usually around 4.30. to American English', function () {
      assert.equal(translator.translate('Tea time is usually around 4.30.', BA),
        'Tea time is usually around <span class="highlight">4:30</span>.');
    });
  });

  suite('Highlight translation', () => {
    test('Highlight translation in Mangoes are my favorite fruit.', function () {
      assert.include(translator.translate('Mangoes are my favorite fruit.', AB),
        '<span class="highlight">favourite</span>');
    });
    test('Highlight translation in I ate yogurt for breakfast.', function () {
      assert.include(translator.translate('I ate yogurt for breakfast.', AB),
        '<span class="highlight">yoghurt</span>');
    });
    test('Highlight translation in We watched the footie match for a while.', function () {
      assert.include(translator.translate('We watched the footie match for a while.', BA),
        '<span class="highlight">soccer</span>');
    });
    test('Highlight translation in Paracetamol takes up to an hour to work.', function () {
      assert.include(translator.translate('Paracetamol takes up to an hour to work.', BA),
        '<span class="highlight">Tylenol</span>');
    });
  });

});