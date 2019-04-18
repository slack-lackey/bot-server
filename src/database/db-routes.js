// Route to populate mongo db
app.get('/test', test);

function test(request, response) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let obj = {
    title: 'chris-merritt-1555531821767.js',
    author: 'Chris Merritt',
    date: 'Wednesday, April 17th 2019, 12:10:23 pm',
    channel: 'CHQM8RNMP',
    keywords: undefined,
    user: 'UHL424Y9F',
    url: 'https://gist.github.com/SlackLackey/2086215da0ad8a174476f409b2f7a341'
  };
  db.post(obj);

  response.status(200).send('posted ok check compass');
}