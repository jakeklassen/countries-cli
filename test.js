import test from 'ava';
import execa from 'execa';

test('main', async t => {
  const { stdout } = await execa('./cli.js');
  t.regex(stdout, /usage/gi);
});

test('unsupported option', async t => {
  const option = 'missing';

  await execa('./cli.js', [`--${option}`]).catch(error => {
    t.regex(error.stderr, new RegExp(`unknown argument: ${option}`, 'gi'));
  });
});

test('valid country by name', async t => {
  const { stdout } = await execa('./cli.js', [
    '--name',
    'canada',
    '--pretty',
    'false',
  ]);
  const [country] = JSON.parse(stdout);

  t.is(country.alpha2, 'CA');
});
